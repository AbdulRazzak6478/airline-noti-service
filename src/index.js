const express = require('express');

const amqplib = require('amqplib');

const {Logger, ServerConfig} = require('./config');
const apiRoutes =require('./routes');
const mailSender = require('./config/email-config');
const { EmailService } = require('./services');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

async function connectQueue()
{
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('noti-queue');
        channel.consume('noti-queue',(data)=>{
                const object = JSON.parse(Buffer.from(data.content));
                EmailService.sendEmail(ServerConfig.GMAIL_EMAIL,object.recepientEmail,object.subject,object.text)
                console.log('message queue consume data :',object)
                channel.ack(data);
             });

    } catch (error) {
        console.log('queue error ',error);
    }
}
app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `); 
    Logger.info("Successfully started server", {});
    await connectQueue();
    console.log('queue is up');
});
 