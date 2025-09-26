const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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

exports.handler = async (event, context) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ success: false, message: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const data = JSON.parse(event.body);
        const { name, email, message } = data;
        
        // Validate required fields
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    success: false,
                    message: 'All fields are required'
                })
            };
        }
        
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials not configured');
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    success: false,
                    message: 'Email service not configured'
                })
            };
        }
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@vahanphotos.com',
            subject: `New Contact Form Submission from ${name} - VAHAN PHOTOS`,
            html: createEmailTemplate({ name, email, message }),
            replyTo: email // Позволяет отвечать напрямую клиенту
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully to info@vahanphotos.com');
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                success: true,
                message: 'Email sent successfully!'
            })
        };
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                success: false,
                message: 'Failed to send email. Please try again later.'
            })
        };
    }
};
