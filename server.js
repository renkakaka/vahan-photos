const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail', // Можно изменить на другой сервис
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Замените на ваш email
        pass: process.env.EMAIL_PASS || 'your-app-password' // Замените на пароль приложения
    }
});

// HTML template for email
function createEmailTemplate(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - VAHAN PHOTOS</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f8f9fa;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 2rem;
                font-weight: 900;
                letter-spacing: 2px;
            }
            .header p {
                margin: 10px 0 0 0;
                font-size: 1rem;
                opacity: 0.8;
            }
            .content {
                padding: 30px;
            }
            .field {
                margin-bottom: 25px;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
            }
            .field:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            .field-label {
                font-weight: 600;
                color: #d4af37;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
                display: block;
            }
            .field-value {
                font-size: 1rem;
                color: #333;
                background: #f8f9fa;
                padding: 12px 15px;
                border-radius: 8px;
                border-left: 4px solid #d4af37;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            .footer {
                background: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                color: #666;
                font-size: 0.9rem;
            }
            .highlight {
                background: linear-gradient(135deg, #d4af37, #b8941f);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 700;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>VAHAN <span class="highlight">PHOTOS</span></h1>
                <p>New Contact Form Submission</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <span class="field-label">Client Name</span>
                    <div class="field-value">${data.name || 'Not provided'}</div>
                </div>
                
                <div class="field">
                    <span class="field-label">Email Address</span>
                    <div class="field-value">${data.email || 'Not provided'}</div>
                </div>
                
                <div class="field">
                    <span class="field-label">Project Details</span>
                    <div class="field-value">${data.message || 'No message provided'}</div>
                </div>
                
                <div class="field">
                    <span class="field-label">Submission Time</span>
                    <div class="field-value">${new Date().toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    })}</div>
                </div>
            </div>
            
            <div class="footer">
                <p>This message was sent from the VAHAN PHOTOS contact form.</p>
                <p>Reply directly to this email to contact the client.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: 'info@vahanphotos.com',
            subject: `New Contact Form Submission from ${name} - VAHAN PHOTOS`,
            html: createEmailTemplate({ name, email, message }),
            replyTo: email // Позволяет отвечать напрямую клиенту
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: 'Email sent successfully!'
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.'
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 VAHAN PHOTOS server running on port ${PORT}`);
    console.log(`📧 Email will be sent to: info@vahanphotos.com`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
});

module.exports = app;
