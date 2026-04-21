const amqp = require('amqplib');

async function producer() {
    const exchange = 'university_headers';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'headers', { durable: false });

    // Messages with headers
    const messages = [
        { msg: "Admin Meeting", headers: { role: 'admin' } },
        { msg: "Faculty Meeting", headers: { role: 'faculty' } },
        { msg: "Assignment submission", headers: { role: 'student' } }
    ];

    messages.forEach(data => {
        channel.publish(exchange, '', Buffer.from(data.msg), {
            headers: data.headers
        });
        console.log("Sent:", data.msg, data.headers);
    });

    setTimeout(() => connection.close(), 500);
}

producer();