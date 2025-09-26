#!/bin/bash

echo "🚀 Starting VAHAN PHOTOS Email Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env template..."
    echo "EMAIL_USER=your-email@gmail.com" > .env
    echo "EMAIL_PASS=your-app-password-here" >> .env
    echo "PORT=3000" >> .env
    echo ""
    echo "✏️  Please edit .env file with your email credentials"
    echo "📖 See EMAIL_SETUP.md for detailed instructions"
    echo ""
fi

echo "🌐 Starting server on http://localhost:3000"
echo "📧 Emails will be sent to: info@vahanphotos.com"
echo ""

# Start the server
npm start
