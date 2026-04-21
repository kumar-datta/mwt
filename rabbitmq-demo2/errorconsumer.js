const amqp = require('amqplib');

async function errorConsumer() {
    const exchange = 'logs_direct';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    channel.bindQueue(q.queue, exchange, 'error');

    console.log("Waiting for ERROR logs...");

    channel.consume(q.queue, (msg) => {
        console.log("ERROR:", msg.content.toString());
    }, { noAck: true });
}

errorConsumer();