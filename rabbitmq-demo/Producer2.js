const amqp = require('amqplib');

async function Producer2() {
    const queue = 'services';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    const message = "Payment Successful";

    channel.sendToQueue(queue, Buffer.from(message));

    console.log("Payment Sent:", message);

    setTimeout(() => connection.close(), 500);
}

Producer2();