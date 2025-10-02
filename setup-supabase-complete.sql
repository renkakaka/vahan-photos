-- Complete Supabase setup for VAHAN PHOTOS
-- Run this in Supabase SQL Editor

-- 1. Create photos table (if not exists)
CREATE TABLE IF NOT EXISTS photos (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Wedding',
    description TEXT,
    image_url TEXT NOT NULL,
    size TEXT DEFAULT 'large',
    is_carousel BOOLEAN DEFAULT FALSE,
    carousel_images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create videos table
CREATE TABLE IF NOT EXISTS videos (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Wedding',
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration INTEGER, -- Duration in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for photos
CREATE INDEX IF NOT EXISTS idx_photos_category ON photos(category);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);

-- 4. Create indexes for videos
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for photos
DROP POLICY IF EXISTS "Allow public read access to photos" ON photos;
CREATE POLICY "Allow public read access to photos" ON photos
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert photos" ON photos;
CREATE POLICY "Allow authenticated users to insert photos" ON photos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update photos" ON photos;
CREATE POLICY "Allow authenticated users to update photos" ON photos
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to delete photos" ON photos;
CREATE POLICY "Allow authenticated users to delete photos" ON photos
    FOR DELETE USING (auth.role() = 'authenticated');

-- 7. Create RLS policies for videos
DROP POLICY IF EXISTS "Allow public read access to videos" ON videos;
CREATE POLICY "Allow public read access to videos" ON videos
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert videos" ON videos;
CREATE POLICY "Allow authenticated users to insert videos" ON videos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update videos" ON videos;
CREATE POLICY "Allow authenticated users to update videos" ON videos
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to delete videos" ON videos;
CREATE POLICY "Allow authenticated users to delete videos" ON videos
    FOR DELETE USING (auth.role() = 'authenticated');

-- 8. Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Create storage policies for photos bucket
DROP POLICY IF EXISTS "Allow public read access to photos storage" ON storage.objects;
CREATE POLICY "Allow public read access to photos storage" ON storage.objects
    FOR SELECT USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Allow authenticated users to upload photos" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload photos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update photos storage" ON storage.objects;
CREATE POLICY "Allow authenticated users to update photos storage" ON storage.objects
    FOR UPDATE USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to delete photos storage" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete photos storage" ON storage.objects
    FOR DELETE USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- 10. Create storage policies for videos bucket
DROP POLICY IF EXISTS "Allow public read access to videos storage" ON storage.objects;
CREATE POLICY "Allow public read access to videos storage" ON storage.objects
    FOR SELECT USING (bucket_id = 'videos');

DROP POLICY IF EXISTS "Allow authenticated users to upload videos" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload videos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update videos storage" ON storage.objects;
CREATE POLICY "Allow authenticated users to update videos storage" ON storage.objects
    FOR UPDATE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to delete videos storage" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete videos storage" ON storage.objects
    FOR DELETE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');

-- 11. Create a test user (optional)
-- You can create a user through the Supabase Auth UI instead
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES ('admin@vahanphotos.com', crypt('adminpassword123', gen_salt('bf')), NOW(), NOW(), NOW());

-- 12. Add some sample data (optional)
INSERT INTO photos (title, category, description, image_url) VALUES
('Beautiful Wedding Ceremony', 'Wedding', 'A romantic wedding ceremony captured in cinematic style', 'https://example.com/photo1.jpg'),
('Engagement Session', 'Engagement', 'Sweet moments from an engagement photo session', 'https://example.com/photo2.jpg'),
('Portrait Session', 'Portrait', 'Professional portrait session with natural lighting', 'https://example.com/photo3.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO videos (title, category, description, video_url, duration) VALUES
('Beautiful Wedding Ceremony', 'Wedding', 'A romantic wedding ceremony captured in cinematic style', 'https://example.com/video1.mp4', 180),
('Engagement Session', 'Engagement', 'Sweet moments from an engagement photo session', 'https://example.com/video2.mp4', 120),
('Portrait Session', 'Portrait', 'Professional portrait session with natural lighting', 'https://example.com/video3.mp4', 90)
ON CONFLICT DO NOTHING;

-- 13. Verify setup
SELECT 'Setup completed successfully!' as status;
SELECT 'Photos table:' as info, count(*) as count FROM photos;
SELECT 'Videos table:' as info, count(*) as count FROM videos;
SELECT 'Storage buckets:' as info, count(*) as count FROM storage.buckets;
