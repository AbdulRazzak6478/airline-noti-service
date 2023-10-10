const { EmailService } = require('../services')
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { StatusCodes } = require('http-status-codes');

async function create(req, res) {
    try {
        console.log('start');
      const response = await EmailService.createTicket({
       subject: req.body.subject,
       content : req.body.content,
       recepientEmail : req.body.recepientEmail,
      });
      console.log('error');
      SuccessResponse.data = response;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    create
}