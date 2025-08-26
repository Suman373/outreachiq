const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.SMTP_UNAME,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (subject, body, address) => {
    try {
        console.log(`Sending email to ${address}`);
        const result = await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: address,
            subject,
            text:body });
        if (!result) throw new Error("Failed to send email");
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(`Email not sent ${error.message}`);
    }
};

module.exports = { sendEmail };