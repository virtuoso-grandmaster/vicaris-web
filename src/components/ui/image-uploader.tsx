import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Plus, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUploader({ value, onChange, onRemove, disabled = false, className = '' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `shopee-collections/${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('site-images').getPublicUrl(fileName);
      onChange(data.publicUrl);
      toast.success('Upload ảnh thành công');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Lỗi upload ảnh: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-base font-medium">Hình ảnh</Label>
      
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Collection item" 
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <button
            onClick={onRemove}
            disabled={disabled}
            className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full hover:bg-destructive/90 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="w-full h-48 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">
            {uploading ? 'Đang tải...' : 'Kéo thả hoặc click để tải ảnh lên'}
          </span>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden" 
            disabled={disabled || uploading}
          />
        </label>
      )}
    </div>
  );
}

export interface CollectionItem {
  id?: string;
  name: string;
  image_url: string;
  price?: string;
  sold?: boolean;
}

interface CollectionFormProps {
  items: CollectionItem[];
  onAddItem: () => void;
  onUpdateItem: (index: number, field: keyof CollectionItem, value: string | boolean) => void;
  onRemoveItem: (index: number) => void;
  disabled?: boolean;
}

export function CollectionForm({ items, onAddItem, onUpdateItem, onRemoveItem, disabled = false }: CollectionFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Danh sách sản phẩm</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddItem} 
          disabled={disabled}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </Button>
      </div>
      
      <div className="grid gap-6">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <p>Chưa có sản phẩm nào. Bấm "Thêm sản phẩm" để bắt đầu.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={item.id || index} className="grid md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
              <div className="md:col-span-1">
                <ImageUploader
                  value={item.image_url}
                  onChange={(url) => onUpdateItem(index, 'image_url', url)}
                  onRemove={() => onUpdateItem(index, 'image_url', '')}
                  disabled={disabled}
                />
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor={`name-${index}`}>Tên sản phẩm</Label>
                  <Input
                    id={`name-${index}`}
                    value={item.name}
                    onChange={(e) => onUpdateItem(index, 'name', e.target.value)}
                    placeholder="Nhập tên sản phẩm"
                    disabled={disabled}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`price-${index}`}>Giá</Label>
                    <Input
                      id={`price-${index}`}
                      value={item.price || ''}
                      onChange={(e) => onUpdateItem(index, 'price', e.target.value)}
                      placeholder="Nhập giá sản phẩm"
                      disabled={disabled}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.sold || false}
                        onChange={(e) => onUpdateItem(index, 'sold', e.target.checked)}
                        disabled={disabled}
                        className="form-checkbox h-4 w-4 text-primary"
                      />
                      <span className="text-sm text-muted-foreground">Đã bán</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    disabled={disabled}
                    className="p-2 hover:bg-destructive/10 rounded-lg disabled:opacity-50"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}