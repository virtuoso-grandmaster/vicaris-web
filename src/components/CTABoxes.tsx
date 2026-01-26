import React from 'react';
import { Button } from './ui/button';
import { Heart, Handshake, ShoppingBag } from 'lucide-react';

const CTABoxes = () => {
  const boxes = [
    {
      icon: Heart,
      title: "Ủng hộ",
      description: "Đóng góp để giúp đỡ trẻ em có hoàn cảnh khó khăn",
      action: "Ủng hộ ngay"
    },
    {
      icon: Handshake,
      title: "Tài trợ",
      description: "Trở thành nhà tài trợ cho các chương trình của chúng tôi",
      action: "Liên hệ tài trợ"
    },
    {
      icon: ShoppingBag,
      title: "Mua sắm",
      description: "Mua sản phẩm để ủng hộ các dự án xã hội",
      action: "Xem sản phẩm"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-vicaris">
        <div className="grid md:grid-cols-3 gap-8">
          {boxes.map((box, index) => (
            <div key={index} className="text-center p-8 bg-cream rounded-xl hover:shadow-lg transition-shadow">
              <box.icon className="w-12 h-12 text-leaf mx-auto mb-4" />
              <h3 className="font-serif text-xl text-ink mb-4">{box.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{box.description}</p>
              <Button variant="outline" className="border-leaf text-leaf hover:bg-leaf hover:text-white">
                {box.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTABoxes;