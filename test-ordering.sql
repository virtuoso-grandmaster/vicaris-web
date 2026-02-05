-- Test script to check if ordering is working
-- This will help diagnose if the order column exists

-- Check if order column exists in shopee_collections table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'shopee_collections' 
AND column_name = 'order';

-- Test ordering by order column (will fail if column doesn't exist)
SELECT id, name, order, created_at 
FROM shopee_collections 
ORDER BY order ASC, created_at DESC 
LIMIT 10;

-- Test current ordering (fallback to created_at)
SELECT id, name, created_at 
FROM shopee_collections 
ORDER BY created_at DESC 
LIMIT 10;