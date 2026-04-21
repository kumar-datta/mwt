const amqp = require('amqplib');

async function Send() {
    const queue = 'assignments';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    const message = "Assignment Submitted Successfully";

    channel.sendToQueue(queue, Buffer.from(message));

    console.log("Message Sent:", message);

    setTimeout(() => {
        connection.close();
    }, 500);
}

Send();