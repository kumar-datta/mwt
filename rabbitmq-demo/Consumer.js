const amqp = require('amqplib');

async function Consumer() {
    const queue = 'services';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    console.log("Waiting for messages...");

    channel.consume(queue, (msg) => {
        const message = msg.content.toString();
        console.log("Received:", message);

        channel.ack(msg);
    });
}

Consumer();