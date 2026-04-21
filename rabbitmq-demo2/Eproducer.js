const amqp = require('amqplib');

async function producer() {
    const exchange = 'ecommerce_topic';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', { durable: false });

    const messages = [
        { key: 'user.create', msg: 'User Registered' },
        { key: 'user.update', msg: 'User Profile Updated' },
        { key: 'order.create', msg: 'Order Placed' },
        { key: 'order.update', msg: 'Order Status Updated' }
    ];

    messages.forEach(data => {
        channel.publish(exchange, data.key, Buffer.from(data.msg));
        console.log("Sent:", data.key, "-", data.msg);
    });

    setTimeout(() => connection.close(), 500);
}

producer();