-- =========================================================================
-- GAZU FASHION — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase Project -> SQL Editor -> Click 'Run'
-- =========================================================================

-- 1. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    customer_email TEXT DEFAULT 'guest@gazu.in',
    shipping_address TEXT DEFAULT 'New Delhi',
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 5. Policies allowing anonymous insert (for public e-commerce store orders & newsletter)
CREATE POLICY "Allow public insert to orders" 
ON public.orders FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow public insert to order_items" 
ON public.order_items FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow public insert to newsletter" 
ON public.newsletter_subscribers FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow public read access to orders by order_number
CREATE POLICY "Allow public read orders" 
ON public.orders FOR SELECT 
TO anon, authenticated 
USING (true);
