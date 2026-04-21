const amqp = require('amqplib');

async function adminConsumer() {
    const exchange = 'university_headers';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'headers', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    channel.bindQueue(q.queue, exchange, '', {
        'x-match': 'all',
        role: 'admin'
    });

    console.log("Admin waiting...");

    channel.consume(q.queue, (msg) => {
        console.log("Admin Received:", msg.content.toString());
    }, { noAck: true });
}

adminConsumer();