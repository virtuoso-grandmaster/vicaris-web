import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type NewsItem = Tables<'news'>;

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as NewsItem[];
    }
  });
};

export const useNewsItem = (slug: string) => {
  return useQuery({
    queryKey: ['news', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as NewsItem;
    },
    enabled: !!slug
  });
};

export const useFeaturedNews = () => {
  return useQuery({
    queryKey: ['featured-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as NewsItem | null;
    }
  });
};

export const useNewsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['news-by-category', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .eq('category', category)
        .order('published_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as NewsItem[];
    },
    enabled: !!category
  });
};
