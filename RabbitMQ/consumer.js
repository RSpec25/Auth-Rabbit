const amqp = require('amqplib');
const user = require('../index');

class SignupConsumer {
    async consume() {
        try {
            const connection = await amqp.connect('amqp://localhost');
            console.log("inside consumer")
            const channel = await connection.createChannel();
            const queue = 'signup_queue';

            await channel.assertQueue(queue);
            await channel.consume(queue, (msg) => {
                if (!msg == null) {
                    const { email, pass } = JSON.parse(msg.content.toString);
                    user.push({ email, pass });
                    console.log("push into user", user);
                }
            }, { noAck: true });
            console.log("listening....");
        } catch (error) {
            console.error("error:", error);
        }
    }
}

module.exports = SignupConsumer;