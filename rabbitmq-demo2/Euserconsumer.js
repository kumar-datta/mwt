const amqp = require('amqplib');

async function userConsumer() {
    const exchange = 'ecommerce_topic';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    // pattern matching: all user events
    channel.bindQueue(q.queue, exchange, 'user.*');

    console.log("Waiting for USER events...");

    channel.consume(q.queue, (msg) => {
        console.log("USER:", msg.content.toString());
    }, { noAck: true });
}

userConsumer();