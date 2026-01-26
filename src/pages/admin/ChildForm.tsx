import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface SponsorshipItem {
  label: string;
  amount: string;
}

const ChildForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    code: '',
    name: '',
    slug: '',
    gender: '',
    location: '',
    birth_year: '',
    situation: '',
    sponsor_start: '',
    sponsor_end: '',
    story: '',
    note: '',
    sponsorship_period: '',
    sponsorship_total: '',
    sponsorship_items: [] as SponsorshipItem[],
    image_url: '',
    is_new: false,
    is_published: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchChild();
    }
  }, [id]);

  const fetchChild = async () => {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('id', id)
      .single();
    
    if (!error && data) {
      setForm({
        code: data.code || '',
        name: data.name || '',
        slug: data.slug || '',
        gender: data.gender || '',
        location: data.location || '',
        birth_year: data.birth_year?.toString() || '',
        situation: data.situation || '',
        sponsor_start: data.sponsor_start || '',
        sponsor_end: data.sponsor_end || '',
        story: data.story || '',
        note: data.note || '',
        sponsorship_period: data.sponsorship_period || '',
        sponsorship_total: data.sponsorship_total || '',
        sponsorship_items: (data.sponsorship_items as unknown as SponsorshipItem[]) || [],
        image_url: data.image_url || '',
        is_new: data.is_new || false,
        is_published: data.is_published ?? true,
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `children/${Date.now()}.${fileExt}`;

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

  const addSponsorshipItem = () => {
    setForm({
      ...form,
      sponsorship_items: [...form.sponsorship_items, { label: '', amount: '' }]
    });
  };

  const updateSponsorshipItem = (index: number, field: 'label' | 'amount', value: string) => {
    const items = [...form.sponsorship_items];
    items[index][field] = value;
    setForm({ ...form, sponsorship_items: items });
  };

  const removeSponsorshipItem = (index: number) => {
    setForm({
      ...form,
      sponsorship_items: form.sponsorship_items.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      code: form.code,
      name: form.name,
      slug: form.slug || generateSlug(`${form.code}-${form.name}`),
      gender: form.gender || null,
      location: form.location || null,
      birth_year: form.birth_year ? parseInt(form.birth_year) : null,
      situation: form.situation || null,
      sponsor_start: form.sponsor_start || null,
      sponsor_end: form.sponsor_end || null,
      story: form.story || null,
      note: form.note || null,
      sponsorship_period: form.sponsorship_period || null,
      sponsorship_total: form.sponsorship_total || null,
      sponsorship_items: form.sponsorship_items.length > 0 ? JSON.parse(JSON.stringify(form.sponsorship_items)) : null,
      image_url: form.image_url || null,
      is_new: form.is_new,
      is_published: form.is_published,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('children').update(payload).eq('id', id));
    } else {
      ({ error } = await supabase.from('children').insert(payload));
    }

    setLoading(false);

    if (error) {
      toast.error('Lỗi: ' + error.message);
    } else {
      toast.success(isEditing ? 'Đã cập nhật' : 'Đã thêm mới');
      navigate('/admin/children');
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin/children')} className="p-2 hover:bg-muted rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-ink">
            {isEditing ? 'Chỉnh sửa trẻ em' : 'Thêm trẻ em mới'}
          </h1>
          <p className="text-muted-foreground mt-1">Quản lý thông tin bảo trợ</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <Label className="text-base font-medium mb-4 block">Ảnh đại diện</Label>
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
          <h2 className="font-medium text-lg mb-4">Thông tin cơ bản</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Mã (BT01, BT02...)</Label>
              <Input id="code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="name">Họ tên</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="gender">Giới tính</Label>
              <Input id="gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} placeholder="Nam/Nữ" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="location">Địa điểm</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Tỉnh/Thành phố" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="birth_year">Năm sinh</Label>
              <Input id="birth_year" type="number" value={form.birth_year} onChange={(e) => setForm({ ...form, birth_year: e.target.value })} className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="situation">Hoàn cảnh</Label>
            <Input id="situation" value={form.situation} onChange={(e) => setForm({ ...form, situation: e.target.value })} className="mt-1" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sponsor_start">Ngày bắt đầu bảo trợ</Label>
              <Input id="sponsor_start" value={form.sponsor_start} onChange={(e) => setForm({ ...form, sponsor_start: e.target.value })} placeholder="MM/YYYY" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="sponsor_end">Ngày kết thúc (nếu có)</Label>
              <Input id="sponsor_end" value={form.sponsor_end} onChange={(e) => setForm({ ...form, sponsor_end: e.target.value })} placeholder="MM/YYYY" className="mt-1" />
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-card rounded-xl p-6 border border-border/50 space-y-4">
          <h2 className="font-medium text-lg mb-4">Câu chuyện</h2>
          <div>
            <Label htmlFor="story">Hoàn cảnh gia đình</Label>
            <Textarea id="story" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} rows={5} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea id="note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} className="mt-1" />
          </div>
        </div>

        {/* Sponsorship Details */}
        <div className="bg-card rounded-xl p-6 border border-border/50 space-y-4">
          <h2 className="font-medium text-lg mb-4">Chi tiết bảo trợ</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sponsorship_period">Thời gian bảo trợ</Label>
              <Input id="sponsorship_period" value={form.sponsorship_period} onChange={(e) => setForm({ ...form, sponsorship_period: e.target.value })} placeholder="10/2022 – 09/2023" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="sponsorship_total">Tổng chi phí</Label>
              <Input id="sponsorship_total" value={form.sponsorship_total} onChange={(e) => setForm({ ...form, sponsorship_total: e.target.value })} placeholder="11.000.000₫" className="mt-1" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Các khoản chi</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSponsorshipItem} className="gap-1">
                <Plus className="w-3 h-3" /> Thêm
              </Button>
            </div>
            <div className="space-y-2">
              {form.sponsorship_items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item.label}
                    onChange={(e) => updateSponsorshipItem(index, 'label', e.target.value)}
                    placeholder="Mô tả"
                    className="flex-1"
                  />
                  <Input
                    value={item.amount}
                    onChange={(e) => updateSponsorshipItem(index, 'amount', e.target.value)}
                    placeholder="Số tiền"
                    className="w-40"
                  />
                  <button type="button" onClick={() => removeSponsorshipItem(index)} className="p-2 hover:bg-destructive/10 rounded-lg">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h2 className="font-medium text-lg mb-4">Cài đặt</h2>
          <div className="flex items-center justify-between py-2">
            <div>
              <Label>Hồ sơ mới</Label>
              <p className="text-sm text-muted-foreground">Hiển thị badge "Mới"</p>
            </div>
            <Switch checked={form.is_new} onCheckedChange={(checked) => setForm({ ...form, is_new: checked })} />
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
            {loading ? 'Đang lưu...' : 'Lưu thông tin'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/children')}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChildForm;
