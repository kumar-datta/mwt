const amqp = require('amqplib');

async function Producer3() {
    const queue = 'services';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    const message = "Assignment Submitted Successfully";

    channel.sendToQueue(queue, Buffer.from(message));

    console.log("Notification Sent:", message);

    setTimeout(() => connection.close(), 500);
}

Producer3();