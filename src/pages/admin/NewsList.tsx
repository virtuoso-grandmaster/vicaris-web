import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  category_label: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  published_at: string | null;
}

const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('id, title, category_label, is_featured, is_published, published_at')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const togglePublished = async (id: string, currentState: boolean | null) => {
    await supabase
      .from('news')
      .update({ is_published: !currentState })
      .eq('id', id);
    fetchNews();
  };

  const deleteNews = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      await supabase.from('news').delete().eq('id', id);
      fetchNews();
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-ink">Quản lý tin tức</h1>
          <p className="text-muted-foreground mt-1">Bài viết và hoạt động</p>
        </div>
        <Link to="/admin/news/new">
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
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Tiêu đề</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Danh mục</th>
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
            ) : news.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.is_featured && <Star className="w-4 h-4 text-accent fill-accent" />}
                      <span className="text-sm text-ink line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {item.category_label || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      item.is_published 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.is_published ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublished(item.id, item.is_published)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        {item.is_published ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <Link
                        to={`/admin/news/${item.id}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <button
                        onClick={() => deleteNews(item.id)}
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

export default NewsList;
