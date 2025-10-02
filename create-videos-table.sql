-- Create videos table for VAHAN PHOTOS
-- This table stores wedding videos and their metadata

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

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to videos" ON videos
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert videos
CREATE POLICY "Allow authenticated users to insert videos" ON videos
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update videos
CREATE POLICY "Allow authenticated users to update videos" ON videos
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete videos
CREATE POLICY "Allow authenticated users to delete videos" ON videos
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for videos bucket
CREATE POLICY "Allow public read access to videos" ON storage.objects
    FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Allow authenticated users to upload videos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update videos" ON storage.objects
    FOR UPDATE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete videos" ON storage.objects
    FOR DELETE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');

-- Add some sample data (optional)
INSERT INTO videos (title, category, description, video_url, duration) VALUES
('Beautiful Wedding Ceremony', 'Wedding', 'A romantic wedding ceremony captured in cinematic style', 'https://example.com/video1.mp4', 180),
('Engagement Session', 'Engagement', 'Sweet moments from an engagement photo session', 'https://example.com/video2.mp4', 120),
('Portrait Session', 'Portrait', 'Professional portrait session with natural lighting', 'https://example.com/video3.mp4', 90)
ON CONFLICT DO NOTHING;
