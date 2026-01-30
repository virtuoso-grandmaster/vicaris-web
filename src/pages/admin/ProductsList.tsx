import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff, PlusCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price_range: string | null;
  is_published: boolean | null;
  image_url: string | null;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price_range, is_published, image_url')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const togglePublished = async (id: string, currentState: boolean | null) => {
    await supabase
      .from('products')
      .update({ is_published: !currentState })
      .eq('id', id);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-ink">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground mt-1">Sản phẩm Vicaris Shopee</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="gap-2 rounded-full">
            <Plus className="w-4 h-4" />
            Thêm mới
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Ảnh</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Tên sản phẩm</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Giá</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Trạng thái</th>
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
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-ink">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-primary font-medium">
                    {product.price_range || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      product.is_published 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {product.is_published ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublished(product.id, product.is_published)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        {product.is_published ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <Link
                        to={`/admin/products/${product.id}/collections`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
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

export default ProductsList;
