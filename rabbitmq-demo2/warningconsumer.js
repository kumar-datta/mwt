const amqp = require('amqplib');

async function warningConsumer() {
    const exchange = 'logs_direct';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    channel.bindQueue(q.queue, exchange, 'warning');

    console.log("Waiting for WARNING logs...");

    channel.consume(q.queue, (msg) => {
        console.log("WARNING:", msg.content.toString());
    }, { noAck: true });
}

warningConsumer();