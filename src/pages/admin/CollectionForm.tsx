import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CollectionForm as CollectionFormComponent, CollectionItem } from '@/components/ui/image-uploader';

const CollectionForm = () => {
  const { productId, collectionId } = useParams<{ productId: string; collectionId: string }>();
  const navigate = useNavigate();
  const isEditing = collectionId && collectionId !== 'new';
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    items: [] as CollectionItem[],
  });

  useEffect(() => {
    if (isEditing) {
      fetchCollection();
    }
  }, [collectionId]);

  const fetchCollection = async () => {
    try {
      const { data, error } = await supabase
        .from('shopee_collections')
        .select('*')
        .eq('id', collectionId!)
        .single();
      
      if (error) {
        console.error('Error fetching collection:', error);
        toast.error('Lỗi tải bộ sưu tập: ' + error.message);
        return;
      }
      
      if (data) {
        setForm({
          name: data.name || '',
          items: (data.items as unknown as CollectionItem[]) || [],
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Lỗi không xác định khi tải bộ sưu tập');
    }
  };

  const addCollectionItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: '', image_url: '', price: '', sold: false }]
    });
  };

  const updateCollectionItem = (index: number, field: keyof CollectionItem, value: string | boolean) => {
    const items = [...form.items];
    if (field === 'sold') {
      items[index][field] = value as boolean;
    } else {
      items[index][field] = value as string;
    }
    setForm({ ...form, items });
  };

  const removeCollectionItem = (index: number) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      product_id: productId!,
      name: form.name,
      items: form.items.length > 0 ? JSON.parse(JSON.stringify(form.items)) : null,
    };

    try {
      let error;
      if (isEditing) {
        ({ error } = await supabase.from('shopee_collections').update(payload).eq('id', collectionId));
      } else {
        ({ error } = await supabase.from('shopee_collections').insert(payload));
      }

      if (error) {
        throw error;
      }

      toast.success(isEditing ? 'Đã cập nhật bộ sưu tập' : 'Đã thêm bộ sưu tập mới');
      navigate(`/admin/products/${productId}`);
    } catch (error) {
      toast.error('Lỗi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(`/admin/products/${productId}`)} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-ink">
            {isEditing ? 'Chỉnh sửa bộ sưu tập' : 'Thêm bộ sưu tập mới'}
          </h1>
          <p className="text-muted-foreground mt-1">Quản lý bộ sưu tập sản phẩm</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-card rounded-xl p-6 border border-border/50 space-y-4">
          <h2 className="font-medium text-lg mb-4">Thông tin bộ sưu tập</h2>
          
          <div>
            <Label htmlFor="name">Tên bộ sưu tập</Label>
            <Input 
              id="name" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required 
              className="mt-1"
              placeholder="Nhập tên bộ sưu tập"
            />
          </div>
        </div>

        {/* Collection Items */}
        <CollectionFormComponent
          items={form.items}
          onAddItem={addCollectionItem}
          onUpdateItem={updateCollectionItem}
          onRemoveItem={removeCollectionItem}
          disabled={loading}
        />

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="gap-2" disabled={loading}>
            <Save className="w-4 h-4" />
            {loading ? 'Đang lưu...' : 'Lưu bộ sưu tập'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(`/admin/products/${productId}`)}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;