# Video Setup Guide for VAHAN PHOTOS

This guide explains how to set up the video functionality for the VAHAN PHOTOS website.

## Features Added

### 1. Video Page (`video.html`)
- Beautiful, minimalistic video gallery
- Custom video player with modal overlay
- Responsive design for all devices
- Smooth animations and transitions
- Touch gestures support for mobile

### 2. Admin Panel Video Management
- Tab-based interface for photos and videos
- Upload videos with thumbnails
- Edit video metadata (title, category, description, duration)
- Delete videos
- Drag and drop file upload

### 3. Navigation Updates
- Added "Video" link to main navigation
- Added "Video" link to footer
- Active state highlighting

## Database Setup

### 1. Create Videos Table
Run the SQL script in Supabase SQL Editor:

```sql
-- Copy and paste the contents of create-videos-table.sql
```

### 2. Storage Bucket
The script automatically creates a `videos` storage bucket with proper permissions.

## File Structure

```
vahan-photos/
├── video.html              # Video gallery page
├── video-styles.css        # Video page styles
├── video-script.js         # Video page JavaScript
├── admin.html              # Updated admin panel
├── index.html              # Updated with video navigation
├── create-videos-table.sql # Database setup script
└── VIDEO_SETUP.md          # This file
```

## Usage

### For Administrators

1. **Access Admin Panel**: Go to `admin.html`
2. **Switch to Videos Tab**: Click the "Videos" tab
3. **Upload Video**:
   - Enter video title (required)
   - Select category (Wedding, Engagement, Portrait)
   - Add description (optional)
   - Set duration in seconds (optional)
   - Upload video file (max 100MB)
   - Upload thumbnail image (optional)
   - Click "Upload Video"

4. **Manage Videos**:
   - View all uploaded videos in grid
   - Edit video details by clicking "Edit"
   - Delete videos by clicking "Delete"

### For Visitors

1. **View Videos**: Click "Video" in navigation
2. **Play Video**: Click on any video thumbnail
3. **Close Video**: Click X button or press Escape
4. **Mobile**: Swipe up to close video modal

## Video Specifications

### Supported Formats
- MP4 (recommended)
- WebM
- OGG
- MOV

### File Size Limits
- Maximum video size: 100MB
- Recommended resolution: 1920x1080 or higher
- Recommended aspect ratio: 16:9

### Thumbnail Images
- Supported formats: JPG, PNG, WebP
- Recommended size: 1920x1080
- Will be automatically resized if needed

## Styling Customization

### Video Page Colors
The video page uses the same color scheme as the main site:
- Primary: #000000 (black)
- Secondary: #0a0a0a (dark gray)
- Accent: #d4af37 (gold)
- Text: #ffffff (white)

### Customization Options
Edit `video-styles.css` to customize:
- Video grid layout
- Play button appearance
- Modal styling
- Responsive breakpoints

## Technical Details

### JavaScript Features
- Lazy loading for better performance
- Touch gesture support
- Keyboard navigation
- Error handling
- Loading states

### CSS Features
- CSS Grid for responsive layout
- CSS Custom Properties for theming
- Smooth transitions and animations
- Mobile-first responsive design

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- High contrast support

## Troubleshooting

### Common Issues

1. **Videos not loading**
   - Check Supabase storage bucket permissions
   - Verify video file format is supported
   - Check browser console for errors

2. **Upload fails**
   - Check file size (max 100MB)
   - Verify file format is video/*
   - Check Supabase authentication

3. **Thumbnail not showing**
   - Ensure thumbnail file is image format
   - Check file size and dimensions
   - Verify upload completed successfully

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Optimization

### Video Optimization
- Use compressed video formats (H.264)
- Consider using video streaming services for large files
- Implement progressive loading for better UX

### Image Optimization
- Compress thumbnail images
- Use WebP format when possible
- Implement lazy loading

## Security Considerations

- All video uploads are authenticated
- File type validation on both client and server
- File size limits enforced
- RLS policies protect data access

## Future Enhancements

Potential features to add:
- Video compression on upload
- Multiple video quality options
- Video analytics
- Playlist functionality
- Social sharing
- Video comments system

## Support

For technical support or questions:
- Check browser console for errors
- Verify Supabase configuration
- Test with different video formats
- Check network connectivity

---

**Note**: Make sure to run the database setup script before using the video functionality. The video storage bucket must be created with proper permissions for the upload feature to work.
