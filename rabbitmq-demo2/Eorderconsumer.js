const amqp = require('amqplib');

async function orderConsumer() {
    const exchange = 'ecommerce_topic';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    // pattern matching: all order events
    channel.bindQueue(q.queue, exchange, 'order.*');

    console.log("Waiting for ORDER events...");

    channel.consume(q.queue, (msg) => {
        console.log("ORDER:", msg.content.toString());
    }, { noAck: true });
}

orderConsumer();