import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Child {
  id: string;
  code: string;
  name: string;
  location: string | null;
  is_new: boolean | null;
  is_published: boolean | null;
}

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChildren = async () => {
    const { data, error } = await supabase
      .from('children')
      .select('id, code, name, location, is_new, is_published')
      .order('code');
    
    if (!error && data) {
      setChildren(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const togglePublished = async (id: string, currentState: boolean | null) => {
    await supabase
      .from('children')
      .update({ is_published: !currentState })
      .eq('id', id);
    fetchChildren();
  };

  const deleteChild = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      await supabase.from('children').delete().eq('id', id);
      fetchChildren();
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-ink">Quản lý trẻ em</h1>
          <p className="text-muted-foreground mt-1">Danh sách trẻ được bảo trợ</p>
        </div>
        <Link to="/admin/children/new">
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
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Mã</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Tên</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Địa điểm</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Trạng thái</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Đang tải...
                </td>
              </tr>
            ) : children.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              children.map((child) => (
                <tr key={child.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium text-ink">{child.code}</td>
                  <td className="px-4 py-3 text-sm text-ink">{child.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{child.location || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      child.is_published 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {child.is_published ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublished(child.id, child.is_published)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title={child.is_published ? 'Ẩn' : 'Hiển thị'}
                      >
                        {child.is_published ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <Link
                        to={`/admin/children/${child.id}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <button
                        onClick={() => deleteChild(child.id)}
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

export default ChildrenList;
