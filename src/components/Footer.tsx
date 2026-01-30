import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Facebook, Youtube, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoVicaris from "/assets/logo-vicaris.jpg";

const Footer = () => {
  
  const currentYear = new Date().getFullYear();
  const establishedYear = 2020;

  return (
    <footer className="bg-ink text-white/90">
      {/* CTA Banner - Simplified */}
      <div className="container-vicaris py-16">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl mb-4 text-white">
            Cùng Vicaris gieo hạt yêu thương
          </h3>
          <p className="text-white/60 mb-8 text-sm leading-relaxed">
            Mỗi đóng góp của bạn là một hạt giống được gieo trồng, 
            mang đến cơ hội học tập cho các em nhỏ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/donate">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 h-11 text-sm">
                <Heart className="w-4 h-4" />
                Quyên góp
              </Button>
            </Link>
            <Link to="/sponsorship">
              <Button size="lg" variant="ghost" className="gap-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full px-6 h-11 text-sm">
                Bảo trợ trẻ em
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-vicaris">
        <div className="h-px bg-white/10" />
      </div>

      {/* Main Footer */}
      <div className="container-vicaris py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img
                src={logoVicaris}
                alt="Vicaris"
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="font-serif text-xl text-white">Vicaris</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Nuôi dưỡng tương lai trẻ thơ Việt Nam thông qua giáo dục và sự thấu hiểu.
            </p>
              {/* Admin Link */}
            <div className="mt-10">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                Quản trị nội dung
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/70 uppercase tracking-wide">Khám phá</h4>
            <ul className="space-y-2">
              {[
                { name: "Trang chủ", path: "/" },
                { name: "Về Vicaris", path: "/about" },
                { name: "Bảo trợ", path: "/sponsorship" },
                { name: "Tin tức", path: "/news" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/70 uppercase tracking-wide">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:vicarismiennam@gmail.com" className="hover:text-white transition-colors">
                  vicarismiennam@gmail.com
                </a>
              </li>
            </ul>
            
            {/* Social */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href="https://www.facebook.com/vicarisvietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCgQVIbKXuGcmLIdrVRrwNlA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-vicaris py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {establishedYear} Vicaris</p>
          <p className="flex items-center gap-1">
            Được tạo với <Heart className="w-3 h-3 text-accent" /> tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;