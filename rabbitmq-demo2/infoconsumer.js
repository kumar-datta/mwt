const amqp = require('amqplib');

async function infoConsumer() {
    const exchange = 'logs_direct';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    channel.bindQueue(q.queue, exchange, 'info');

    console.log("Waiting for INFO logs...");

    channel.consume(q.queue, (msg) => {
        console.log("INFO:", msg.content.toString());
    }, { noAck: true });
}

infoConsumer();