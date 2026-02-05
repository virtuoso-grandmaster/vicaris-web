import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, PlusCircle, Edit, Eye, EyeOff, StarIcon, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { CollectionForm } from '@/components/ui/image-uploader';
import { useCollections } from '@/hooks/useCollections';
import { useCreateCollection, useUpdateCollection, useDeleteCollection, useUpdateCollectionOrder } from '@/hooks/useCollections';
import { CollectionOrderTest } from '@/components/CollectionOrderTest';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProductSize {
  name: string;
  price: string;
}

interface CollectionItem {
  id?: string;
  name: string;
  image_url: string;
  price?: string;
  sold?: boolean;
}

const SortableCollectionItem = ({ collection, index }: { collection: any; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: collection.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-gradient-to-r from-leaf/5 to-transparent border border-leaf/20 rounded-xl hover:shadow-md transition-all duration-200 ${
        isDragging ? 'ring-2 ring-leaf/50' : ''
      }`}
      {...attributes}
    >
      <div className="flex items-center gap-4">
        <button
          {...listeners}
          className="p-2 hover:bg-leaf/20 rounded-full cursor-grab active:cursor-grabbing"
          aria-label="Kéo để sắp xếp"
        >
          <GripVertical className="w-4 h-4 text-leaf" />
        </button>
        <div className="w-12 h-12 bg-leaf/20 rounded-full flex items-center justify-center">
          <span className="text-leaf font-semibold text-sm">S</span>
        </div>
        <div>
          <h3 className="font-medium text-ink text-lg">{collection.name}</h3>
          <p className="text-sm text-muted-foreground">
            {collection.items && Array.isArray(collection.items) 
              ? `${collection.items.length} sản phẩm`
              : 'Chưa có sản phẩm nào'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-leaf font-medium bg-leaf/10 px-2 py-1 rounded-full">
          {collection.items && Array.isArray(collection.items) ? collection.items.length : 0}
        </span>
      </div>
    </div>
  );
};

const ProductCollectionsList = ({ productId }: { productId: string }) => {
  const { data: collections = [], isLoading, error } = useCollections(productId);
  const updateCollectionOrder = useUpdateCollectionOrder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = collections.findIndex((col) => col.id === active.id);
      const newIndex = collections.findIndex((col) => col.id === over?.id);

      const newCollections = arrayMove(collections, oldIndex, newIndex);
      
      // Update order in database
      const updatedCollections = newCollections.map((collection, index) => ({
        id: collection.id,
        order: index,
      }));

      updateCollectionOrder.mutate(updatedCollections);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Đang tải bộ sưu tập...</p>;
  }

  if (error) {
    return <p className="text-sm text-destructive">Lỗi tải bộ sưu tập: {error.message}</p>;
  }

  if (collections.length === 0) {
    return <p className="text-sm text-muted-foreground">Chưa có bộ sưu tập nào cho sản phẩm này.</p>;
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={collections.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {collections.map((collection, index) => (
            <SortableCollectionItem key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    excerpt: '',
    description: '',
    price_range: '',
    shopee_link: 'https://shopee.vn/vicaris_shop',
    sizes: [] as ProductSize[],
    image_url: '',
    is_published: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id!)
      .single();
    
    if (!error && data) {
      setForm({
        name: data.name || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        description: data.description || '',
        price_range: data.price_range || '',
        shopee_link: data.shopee_link || 'https://shopee.vn/vicaris_shop',
        sizes: (data.sizes as unknown as ProductSize[]) || [],
        image_url: data.image_url || '',
        is_published: data.is_published ?? true,
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `products/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(fileName, file);

    if (uploadError) {
      toast.error('Lỗi upload ảnh');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('site-images').getPublicUrl(fileName);
    setForm({ ...form, image_url: data.publicUrl });
    setUploading(false);
    toast.success('Upload ảnh thành công');
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const addSize = () => {
    setForm({
      ...form,
      sizes: [...form.sizes, { name: '', price: '' }]
    });
  };

  const updateSize = (index: number, field: 'name' | 'price', value: string) => {
    const sizes = [...form.sizes];
    sizes[index][field] = value;
    setForm({ ...form, sizes });
  };

  const removeSize = (index: number) => {
    setForm({
      ...form,
      sizes: form.sizes.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      excerpt: form.excerpt || null,
      description: form.description || null,
      price_range: form.price_range || null,
      shopee_link: form.shopee_link || null,
      sizes: form.sizes.length > 0 ? JSON.parse(JSON.stringify(form.sizes)) : null,
      image_url: form.image_url || null,
      is_published: form.is_published,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('products').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('products').insert(payload));
    }

    setLoading(false);

    if (error) {
      toast.error('Lỗi: ' + error.message);
    } else {
      toast.success(isEditing ? 'Đã cập nhật' : 'Đã thêm mới');
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-ink">
            {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h1>
          <p className="text-muted-foreground mt-1">Quản lý sản phẩm Vicaris Shopee</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <Label className="text-base font-medium mb-4 block">Ảnh sản phẩm</Label>
          <div className="flex items-start gap-4">
            {form.image_url ? (
              <div className="relative">
                <img src={form.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image_url: '' })}
                  className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">
                  {uploading ? 'Đang tải...' : 'Tải ảnh lên'}
                </span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-card rounded-xl p-6 border border-border/50 space-y-4">
          <h2 className="font-medium text-lg mb-4">Thông tin sản phẩm</h2>
          
          <div>
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price_range">Giá</Label>
              <Input id="price_range" value={form.price_range} onChange={(e) => setForm({ ...form, price_range: e.target.value })} placeholder="100.000đ - 500.000đ" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="shopee_link">Link Shopee</Label>
              <Input id="shopee_link" value={form.shopee_link} onChange={(e) => setForm({ ...form, shopee_link: e.target.value })} className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Mô tả ngắn</Label>
            <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="description">Mô tả chi tiết</Label>
            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} className="mt-1" />
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-card rounded-xl p-6 border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-lg">Kích thước & Giá</h2>
            <Button type="button" variant="outline" size="sm" onClick={addSize} className="gap-1">
              <Plus className="w-3 h-3" /> Thêm
            </Button>
          </div>
          <div className="space-y-2">
            {form.sizes.map((size, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={size.name}
                  onChange={(e) => updateSize(index, 'name', e.target.value)}
                  placeholder="Kích thước"
                  className="flex-1"
                />
                <Input
                  value={size.price}
                  onChange={(e) => updateSize(index, 'price', e.target.value)}
                  placeholder="Giá"
                  className="w-40"
                />
                <button type="button" onClick={() => removeSize(index)} className="p-2 hover:bg-destructive/10 rounded-lg">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
            {form.sizes.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Chưa có kích thước nào. Bấm "Thêm" để thêm kích thước.
              </p>
            )}
          </div>
        </div>

        {/* Collections */}
        <div className="bg-card rounded-xl p-6 border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-lg">Bộ sưu tập sản phẩm</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => {
              // Navigate to collections management page
              if (isEditing) {
                navigate(`/admin/products/${id}/collections`);
              } else {
                toast.info('Vui lòng lưu sản phẩm trước khi thêm bộ sưu tập');
              }
            }} className="gap-2">
              <StarIcon className="w-4 h-4" />
              Quản lý bộ sưu tập
            </Button>
          </div>
          
          {isEditing ? (
            <div 
              className="space-y-4"
              // Prevent form submission events but allow drag operations
              onMouseDown={(e) => {
                // Only prevent form submission, not drag operations
                e.stopPropagation();
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              // Don't prevent pointer events - they're needed for drag & drop
            >
              <ProductCollectionsList productId={id!} />
              
              {/* Diagnostic component to test ordering */}
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium text-lg mb-4">Kiểm tra thứ tự bộ sưu tập</h3>
                <CollectionOrderTest productId={id!} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Bộ sưu tập giúp quản lý các sản phẩm riêng lẻ thuộc cùng một loại sản phẩm chính.
              Vui lòng lưu sản phẩm trước khi quản lý bộ sưu tập.
            </p>
          )}
        </div>

        {/* Settings */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h2 className="font-medium text-lg mb-4">Cài đặt</h2>
          <div className="flex items-center justify-between py-2">
            <div>
              <Label>Hiển thị công khai</Label>
              <p className="text-sm text-muted-foreground">Cho phép hiển thị trên website</p>
            </div>
            <Switch checked={form.is_published} onCheckedChange={(checked) => setForm({ ...form, is_published: checked })} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="gap-2" disabled={loading}>
            <Save className="w-4 h-4" />
            {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
