const amqp = require('amqplib');

class SignupProducer {
    async prod(email, pass) {
        try {
            const connection = await amqp.connect('amqp://localhost');
            console.log("inside producer");
            const channel = connection.createChannel();
            const queue = 'signup_queue';

            (await channel).assertQueue(queue);
            (await channel).sendToQueue(queue, Buffer.from(JSON.stringify({ email, pass })));
            console.log("message sent");
            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('error:', error);
        }
    }
}
module.exports = SignupProducer;