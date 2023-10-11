const {StatusCodes } = require('http-status-codes')
const { MAILER } = require('../config');
const { TicketRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const ticketRepository = new TicketRepository();


async function sendEmail(mailFrom, mailTo, mailSubject, mailText)
{
    try {
        const response = await MAILER.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : mailSubject,
            text : `${mailText}`,
        });
         return response;
    } catch (error) {
        console.log('mail service send mail ',error);
        throw new AppError(`Something went wrong while sending mail , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function createTicket(data)
{
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log('mail service create ticket ',error, error.message,error.statusCode,error.name);
        throw new AppError(`Something went wrong while creating ticket , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getPendingEmails()
{
    try {
        const response = await ticketRepository.getPendingTickets();
        return response;
    } catch (error) {
        console.log('mail service get pending tickets ',error);
        throw new AppError(`Something went wrong while creating ticket , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}