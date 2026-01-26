import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  { value: 'goc-chia-se', label: 'Góc chia sẻ' },
  { value: 'hoat-dong-xa-hoi', label: 'Hoạt động xã hội' },
  { value: 'du-an-xa-hoi', label: 'Dự án xã hội' },
  { value: 'giao-duc', label: 'Giáo dục' },
  { value: 'tin-tuc', label: 'Tin tức' },
  { value: 'bao-ve-moi-truong', label: 'Bảo vệ môi trường' },
];

const NewsForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'tin-tuc',
    category_label: 'Tin tức',
    author: 'vicaris',
    image_url: '',
    is_featured: false,
    is_published: true,
    published_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEditing) {
      fetchNews();
    }
  }, [id]);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (!error && data) {
      setForm({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || 'tin-tuc',
        category_label: data.category_label || 'Tin tức',
        author: data.author || 'vicaris',
        image_url: data.image_url || '',
        is_featured: data.is_featured || false,
        is_published: data.is_published ?? true,
        published_at: data.published_at ? data.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `news/${Date.now()}.${fileExt}`;

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleCategoryChange = (value: string) => {
    const cat = categories.find(c => c.value === value);
    setForm({
      ...form,
      category: value,
      category_label: cat?.label || value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt || null,
      content: form.content || null,
      category: form.category,
      category_label: form.category_label,
      author: form.author || null,
      image_url: form.image_url || null,
      is_featured: form.is_featured,
      is_published: form.is_published,
      published_at: form.published_at,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('news').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('news').insert(payload));
    }

    setLoading(false);

    if (error) {
      toast.error('Lỗi: ' + error.message);
    } else {
      toast.success(isEditing ? 'Đã cập nhật' : 'Đã thêm mới');
      navigate('/admin/news');
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/news')} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-ink">
            {isEditing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          </h1>
          <p className="text-muted-foreground mt-1">Quản lý tin tức và hoạt động</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <Label className="text-base font-medium mb-4 block">Ảnh bài viết</Label>
          <div className="flex items-start gap-4">
            {form.image_url ? (
              <div className="relative">
                <img src={form.image_url} alt="Preview" className="w-48 h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image_url: '' })}
                  className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="w-48 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
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
          <h2 className="font-medium text-lg mb-4">Thông tin bài viết</h2>
          
          <div>
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-1" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Danh mục</Label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="author">Tác giả</Label>
              <Input id="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="published_at">Ngày đăng</Label>
            <Input id="published_at" type="date" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="excerpt">Tóm tắt</Label>
            <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="content">Nội dung bài viết</Label>
            <Textarea id="content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="mt-1" />
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h2 className="font-medium text-lg mb-4">Cài đặt</h2>
          <div className="flex items-center justify-between py-2">
            <div>
              <Label>Tin nổi bật</Label>
              <p className="text-sm text-muted-foreground">Hiển thị ở đầu trang tin tức</p>
            </div>
            <Switch checked={form.is_featured} onCheckedChange={(checked) => setForm({ ...form, is_featured: checked })} />
          </div>
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
            {loading ? 'Đang lưu...' : 'Lưu bài viết'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/news')}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
