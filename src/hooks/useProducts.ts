import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Product = Tables<'products'>;
export type ShopeeCollection = Tables<'shopee_collections'>;

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (productError) throw productError;
      
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('shopee_collections')
        .select('*')
        .eq('product_id', productData.id)
        .order('created_at', { ascending: false });
      
      if (collectionsError) throw collectionsError;
      
      return {
        ...productData,
        collections: collectionsData || []
      } as Product & { collections: ShopeeCollection[] };
    },
    enabled: !!slug
  });
};

export const useRelatedProducts = (excludeId: string) => {
  return useQuery({
    queryKey: ['related-products', excludeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .neq('id', excludeId)
        .limit(3);
      
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!excludeId
  });
};
