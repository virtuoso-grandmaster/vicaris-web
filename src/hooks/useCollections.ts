import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type CollectionItem = {
  id?: string;
  name: string;
  image_url: string;
  price?: string;
  sold?: boolean;
};

export type ShopeeCollection = Tables<'shopee_collections'>;

export const useCollections = (productId: string) => {
  return useQuery({
    queryKey: ['collections', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shopee_collections')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ShopeeCollection[];
    },
    enabled: !!productId
  });
};

export const useCollection = (collectionId: string) => {
  return useQuery({
    queryKey: ['collection', collectionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shopee_collections')
        .select('*')
        .eq('id', collectionId)
        .single();
      
      if (error) throw error;
      return data as ShopeeCollection;
    },
    enabled: !!collectionId
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (collection: {
      product_id: string;
      name: string;
      items?: CollectionItem[];
    }) => {
      const { data, error } = await supabase
        .from('shopee_collections')
        .insert(collection)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections', data.product_id] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    }
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (collection: {
      id: string;
      name: string;
      items?: CollectionItem[];
    }) => {
      const { data, error } = await supabase
        .from('shopee_collections')
        .update(collection)
        .eq('id', collection.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['collections', data?.product_id] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection', data?.id] });
    }
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (collectionId: string) => {
      const { error } = await supabase
        .from('shopee_collections')
        .delete()
        .eq('id', collectionId);
      
      if (error) throw error;
    },
    onSuccess: (_, collectionId) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collection', collectionId] });
    }
  });
};
