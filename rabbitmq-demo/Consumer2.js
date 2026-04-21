const amqp = require('amqplib');

async function studentConsumer() {
    const exchange = 'college_announcement';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    channel.bindQueue(q.queue, exchange, '');

    console.log("Student waiting for announcements...");

    channel.consume(q.queue, (msg) => {
        console.log("Student Received:", msg.content.toString());
    }, { noAck: true });
}

studentConsumer();