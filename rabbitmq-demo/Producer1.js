const amqp = require('amqplib');

async function Producer1() {
    const queue = 'services';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    const message = "Authentication Successful";

    channel.sendToQueue(queue, Buffer.from(message));

    console.log("Auth Sent:", message);

    setTimeout(() => connection.close(), 500);
}

Producer1();