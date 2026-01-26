import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import type { Tables } from '../integrations/supabase/types';

export type Child = Tables<'children'>;

export const useChildren = () => {
  return useQuery({
    queryKey: ['children'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('is_published', true)
        .order('code');
      
      if (error) throw error;
      return data as Child[];
    }
  });
};

export const useChild = (slug: string) => {
  return useQuery({
    queryKey: ['child', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as Child;
    },
    enabled: !!slug
  });
};

export const useRelatedChildren = (location: string, excludeId: string) => {
  return useQuery({
    queryKey: ['related-children', location, excludeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('location', location)
        .eq('is_published', true)
        .neq('id', excludeId)
        .limit(3);
      
      if (error) throw error;
      return data as Child[];
    },
    enabled: !!location && !!excludeId
  });
};

export const getProvinces = (children: Child[]): string[] => {
  const provinces = [...new Set(children.map((child) => child.location).filter(Boolean))] as string[];
  return provinces.sort();
};
