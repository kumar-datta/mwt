const amqp = require('amqplib');

async function producer() {
    const exchange = 'college_announcement';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    const message = "Holiday Tomorrow";

    channel.publish(exchange, '', Buffer.from(message));

    console.log("Announcement Sent:", message);

    setTimeout(() => connection.close(), 500);
}

producer();