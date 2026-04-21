const amqp = require('amqplib');

async function studentConsumer() {
    const exchange = 'university_headers';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'headers', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    channel.bindQueue(q.queue, exchange, '', {
        'x-match': 'all',
        role: 'student'
    });

    console.log("Student waiting...");

    channel.consume(q.queue, (msg) => {
        console.log("Student Received:", msg.content.toString());
    }, { noAck: true });
}

studentConsumer();