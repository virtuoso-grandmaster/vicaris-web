import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { toast } from 'sonner';

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
        .order('order', { ascending: true })
      
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
      order?: number;
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

export const useUpdateCollectionOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (collections: Array<{
      id: string;
      order: number;
    }>) => {
      // Update the order for each collection individually
      const updates = await Promise.all(collections.map(async (collection) => {
        const { data: collectionData, error: fetchError } = await supabase
          .from('shopee_collections')
          .select('product_id, name')
          .eq('id', collection.id)
          .single();
        
        if (fetchError) throw fetchError;
        
        return {
          id: collection.id,
          order: collection.order,
          product_id: collectionData.product_id,
          name: collectionData.name
        };
      }));
      
      const { error: updateError } = await supabase
        .from('shopee_collections')
        .upsert(updates, { onConflict: 'id' });
      
      if (updateError && !updateError.message.includes('column "order" does not exist')) {
        throw updateError;
      }
      return collections;
    },
    onSuccess: (collections, variables, context) => {
      // Find the product_id from the first collection to invalidate the correct query
      if (collections.length > 0) {
        const firstCollection = collections[0];
        queryClient.invalidateQueries({ queryKey: ['collections', firstCollection.id] });
      }
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      // Don't navigate away - just show success toast
      toast.success('Đã cập nhật thứ tự bộ sưu tập');
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
