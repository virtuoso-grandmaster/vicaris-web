import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const Settings = () => {
  const [saving, setSaving] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">Cấu hình chung website</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h2 className="font-serif text-xl text-ink mb-4">Thông tin liên hệ</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Cấu hình này đang được phát triển. Vui lòng quay lại sau.
          </p>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Mẹo:</strong> Bạn có thể chỉnh sửa nội dung trực tiếp trong các mục 
              Trẻ em, Tin tức và Sản phẩm từ menu bên trái.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
