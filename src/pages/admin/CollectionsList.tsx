import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface Collection {
  id: string;
  name: string;
  items: any[] | null;
  created_at: string;
  updated_at: string;
  product_id: string;
}

const CollectionsList = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('shopee_collections')
        .select('*')
        .eq('product_id', productId!)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching collections:', error);
        toast.error('Lỗi tải bộ sưu tập: ' + error.message);
        return;
      }
      
      if (data) {
        setCollections(data as Collection[]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Lỗi không xác định khi tải bộ sưu tập');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [productId]);

  const deleteCollection = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bộ sưu tập này?')) {
      const { error } = await supabase.from('shopee_collections').delete().eq('id', id);
      if (error) {
        toast.error('Lỗi: ' + error.message);
      } else {
        toast.success('Đã xóa bộ sưu tập');
        fetchCollections();
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-ink">Quản lý bộ sưu tập</h1>
          <p className="text-muted-foreground mt-1">Bộ sưu tập sản phẩm cho sản phẩm này</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/admin/products/${productId}`)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Quay lại sản phẩm
          </Button>
          <Button 
            onClick={() => navigate(`/admin/products/${productId}/collections/new`)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm bộ sưu tập
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Tên bộ sưu tập</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Số lượng sản phẩm</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Ngày tạo</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Đang tải...
                </td>
              </tr>
            ) : collections.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Chưa có bộ sưu tập nào. Bấm "Thêm bộ sưu tập" để bắt đầu.
                </td>
              </tr>
            ) : (
              collections.map((collection) => (
                <tr key={collection.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm text-ink">{collection.name}</td>
                  <td className="px-4 py-3 text-sm text-primary font-medium">
                    {collection.items ? collection.items.length : 0}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(collection.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/${productId}/collections/${collection.id}`)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => deleteCollection(collection.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionsList;