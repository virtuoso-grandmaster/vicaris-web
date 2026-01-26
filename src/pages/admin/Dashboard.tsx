import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, Newspaper, ShoppingBag, Eye } from 'lucide-react';

interface Stats {
  children: number;
  news: number;
  products: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ children: 0, news: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [childrenRes, newsRes, productsRes] = await Promise.all([
        supabase.from('children').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        children: childrenRes.count || 0,
        news: newsRes.count || 0,
        products: productsRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Trẻ em', value: stats.children, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Tin tức', value: stats.news, icon: Newspaper, color: 'bg-accent/10 text-accent' },
    { label: 'Sản phẩm', value: stats.products, icon: ShoppingBag, color: 'bg-leaf/10 text-leaf' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Tổng quan nội dung website</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 border border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="font-serif text-3xl text-ink mb-1">
              {loading ? '...' : stat.value}
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h2 className="font-serif text-xl text-ink mb-4">Hướng dẫn</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• Sử dụng menu bên trái để quản lý nội dung</p>
          <p>• <strong>Trẻ em:</strong> Thêm/sửa thông tin trẻ được bảo trợ</p>
          <p>• <strong>Tin tức:</strong> Quản lý bài viết và hoạt động</p>
          <p>• <strong>Sản phẩm:</strong> Quản lý sản phẩm Shopee</p>
          <p>• <strong>Cài đặt:</strong> Cấu hình chung của website</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
