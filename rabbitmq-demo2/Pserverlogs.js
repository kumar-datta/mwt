const amqp = require('amqplib');

async function sendLogs() {
    const exchange = 'logs_direct';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });

    const logs = [
        { type: 'info', message: 'Server started' },
        { type: 'warning', message: 'High memory usage' },
        { type: 'error', message: 'Server crashed' }
    ];

    logs.forEach(log => {
        channel.publish(exchange, log.type, Buffer.from(log.message));
        console.log("Sent:", log.type, "-", log.message);
    });

    setTimeout(() => connection.close(), 500);
}

sendLogs();