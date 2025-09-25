# Deployment Guide for VAHAN PHOTOS

## Deploy to Netlify

### Method 1: Connect GitHub Repository (Recommended)

1. **Go to [Netlify](https://netlify.com)**
   - Sign up or log in to your account

2. **Create New Site**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub account

3. **Select Repository**
   - Find and select `renkakaka/vahan-photos`
   - Click "Deploy site"

4. **Configure Build Settings**
   - Build command: `echo 'No build step required'`
   - Publish directory: `.` (root directory)
   - Click "Deploy site"

5. **Site is Live!**
   - Netlify will provide a URL like `https://amazing-name-123456.netlify.app`
   - You can customize the domain name in Site settings

### Method 2: Drag & Drop Deployment

1. **Prepare Files**
   - Zip all project files (excluding `.git` folder)
   - Or use `git archive` command:
   ```bash
   git archive --format=zip --output=vahan-photos.zip HEAD
   ```

2. **Deploy**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the zip file to the deploy area
   - Wait for deployment to complete

### Method 3: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir .
   ```

## Post-Deployment Configuration

### 1. Update Supabase Settings

After deployment, update your Supabase project settings:

1. **Go to Supabase Dashboard**
   - Navigate to your project settings
   - Go to "Authentication" → "URL Configuration"

2. **Update Site URL**
   - Add your Netlify URL: `https://your-site-name.netlify.app`
   - Add to "Redirect URLs": `https://your-site-name.netlify.app/admin.html`

3. **Update CORS Settings**
   - Go to "Settings" → "API"
   - Add your Netlify domain to allowed origins

### 2. Environment Variables (Optional)

If you want to use environment variables instead of hardcoded values:

1. **In Netlify Dashboard**
   - Go to Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL`: Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

2. **Update script-supabase.js**
   ```javascript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_FALLBACK_URL';
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_FALLBACK_KEY';
   ```

### 3. Custom Domain (Optional)

1. **In Netlify Dashboard**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Netlify automatically provides SSL certificates
   - Force HTTPS redirect in Site settings

## Testing Your Deployment

### 1. Basic Functionality
- [ ] Website loads correctly
- [ ] Images display properly
- [ ] Lightbox works
- [ ] Mobile responsiveness

### 2. Admin Panel
- [ ] Can access `/admin.html`
- [ ] Can upload photos
- [ ] Can create carousels
- [ ] Can edit/delete photos

### 3. Performance
- [ ] Fast loading times
- [ ] Images load smoothly
- [ ] Mobile gestures work

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Check Supabase Storage bucket permissions
   - Verify CORS settings
   - Check image URLs in database

2. **Admin panel not working**
   - Verify Supabase authentication settings
   - Check redirect URLs
   - Ensure RLS policies are correct

3. **Mobile gestures not working**
   - Check if touch events are enabled
   - Verify JavaScript is loading correctly
   - Test on actual mobile device

### Debug Steps

1. **Check Browser Console**
   - Look for JavaScript errors
   - Check network requests
   - Verify Supabase connection

2. **Check Netlify Logs**
   - Go to Site settings → Functions
   - Check deployment logs
   - Look for build errors

3. **Test Supabase Connection**
   - Use browser dev tools
   - Check API responses
   - Verify authentication

## Maintenance

### Regular Updates

1. **Update Dependencies**
   - Check for Supabase updates
   - Update any CDN resources
   - Test after updates

2. **Backup Data**
   - Export Supabase data regularly
   - Keep local backups of important files
   - Document any custom configurations

3. **Monitor Performance**
   - Use Netlify Analytics
   - Check Core Web Vitals
   - Optimize images as needed

## Support

If you encounter issues:

1. Check this deployment guide
2. Review Netlify documentation
3. Check Supabase documentation
4. Contact support if needed

---

Your VAHAN PHOTOS portfolio is now live! 🎉
