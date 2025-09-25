# VAHAN PHOTOS - Wedding Photography Portfolio

A modern, responsive wedding photography portfolio website built with vanilla HTML, CSS, and JavaScript, integrated with Supabase for content management.

## Features

- 🎨 **Modern Design**: Clean, Instagram-inspired square grid layout
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🖼️ **Image Gallery**: Square grid layout with lightbox functionality
- 🎠 **Carousel Support**: Instagram-style image carousels
- 📸 **Admin Panel**: Easy photo upload and management via Supabase
- ⚡ **Fast Loading**: Optimized performance with lazy loading
- 🎯 **Mobile Gestures**: Pinch-to-close and swipe gestures
- 🌙 **Dark Theme**: Elegant dark design with smooth animations

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL + Storage)
- **Deployment**: Netlify
- **Fonts**: Inter (Google Fonts)

## Live Demo

Visit the live website: [https://vahan-photos.netlify.app](https://vahan-photos.netlify.app)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/renkakaka/vahan-photos.git
cd vahan-photos
```

### 2. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Create the `photos` table using the SQL from `SUPABASE_SETUP.md`
3. Configure Storage bucket for images
4. Update the Supabase credentials in `script-supabase.js`:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Local Development

```bash
# Start local server
python3 simple-server.py

# Or use any other local server
# npx serve .
# python -m http.server 8000
```

Visit `http://localhost:8080` to view the website.

## Admin Panel

Access the admin panel at `/admin.html` to:
- Upload new photos
- Create image carousels
- Edit photo details
- Delete photos
- Manage categories

## Project Structure

```
vahan-photos/
├── index.html              # Main website
├── admin.html              # Admin panel
├── styles.css              # Main stylesheet
├── script-supabase.js      # Main JavaScript
├── simple-server.py        # Local development server
├── netlify.toml           # Netlify configuration
├── SUPABASE_SETUP.md      # Supabase setup instructions
└── README.md              # This file
```

## Features in Detail

### Image Gallery
- Square grid layout (Instagram-style)
- Responsive design for all devices
- Smooth hover animations
- Lightbox with full-screen viewing

### Carousel Support
- Multiple images per portfolio item
- Navigation arrows and dots
- Touch/swipe support on mobile
- Smooth transitions

### Mobile Experience
- Pinch-to-zoom functionality
- Swipe gestures for navigation
- Touch-friendly interface
- Optimized performance

### Admin Panel
- Drag & drop photo upload
- Real-time preview
- Batch operations
- User-friendly interface

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `echo 'No build step required'`
3. Set publish directory: `.`
4. Deploy!

### Manual Deployment

1. Build the project
2. Upload files to your web server
3. Configure CORS for Supabase
4. Set up SSL certificate

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy loading for images
- Optimized CSS and JavaScript
- Minimal dependencies
- Fast loading times

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- Website: [vahan-photos.netlify.app](https://vahan-photos.netlify.app)
- Email: info@vahanphotos.com
- Phone: +1 (747) 389-4391

---

Built with ❤️ for wedding photography