const express = require('express');
const {Logger, ServerConfig} = require('./config');
const apiRoutes =require('./routes');
const mailSender = require('./config/email-config')
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `); 
    Logger.info("Successfully started server", {});
    try {
        const response = await mailSender.sendMail({
            from : ServerConfig.GMAIL_EMAIL,
            to : 'abc@gmail.com',
            subject:'Is the service working ? is this working now as well',
            text : 'Yes it is working'
        });
        console.log('mail response : ',response);
    } catch (error) {
        console.log('mail error ',error);
    }
});
