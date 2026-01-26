import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts, type Product } from "@/hooks/useProducts";

// Map product slugs to their corresponding image files
const getProductImage = (productSlug: string): string => {
  const imageMap: Record<string, string> = {
    'tranh-thu-phap-thay-chan-troi-yen-tu': '/assets/shopee/tranh-thu-phap.jpg',
    'vong-tay-da-gui-tron-yeu-thuong-chan-thanh': '/assets/shopee/vong-da.jpg',
    'rem-thu-phap': '/assets/shopee/manh-thu-phap.jpg',
    'do-luu-niem-lang-mai': '/assets/shopee/do-luu-niem.jpg',
    'non-la-bang-thu-phap-hue': '/assets/shopee/non-la-bang.jpg',
    'tranh-go-thu-phap-ma-doc-hanh': '/assets/shopee/tranh-go.jpg',
    'tranh-ve-nghe-thuat': '/assets/shopee/tranh-ve.jpg',
    'da-nghe-thuat-thu-phap': '/assets/shopee/da-nghe-thuat.jpg',
  };
  
  return imageMap[productSlug] || '/placeholder.svg';
};

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const imageUrl = getProductImage(product.slug);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 border border-border/50"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block px-2 py-0.5 bg-leaf/10 text-leaf text-xs font-medium rounded-full mb-3">
          VICARIS SHOPEE
        </span>
        <h3 className="font-serif text-lg text-ink mb-2 line-clamp-2 leading-snug group-hover:text-leaf transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-leaf font-semibold">{product.price_range}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {new Date(product.created_at).toLocaleDateString('vi-VN')}
          </span>
        </div>
        <Link to={`/shopee/${product.slug}`} className="block mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 border-leaf/30 text-leaf hover:bg-leaf hover:text-white transition-all duration-300"
          >
            Xem chi tiết
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.article>
  );
};

const Shopee = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="pt-24 pb-12 md:pt-32 md:pb-16 bg-cream"
        >
          <div className="container-vicaris">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink text-center mb-4"
            >
              VICARIS SHOPEE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-center text-muted-foreground max-w-2xl mx-auto"
            >
              Gồm các sản phẩm đăng bán trên Vicaris Shopee. Link Shopee được đặt trong bài viết.
            </motion.p>
          </div>
        </section>

        {/* Description */}
        <section className="py-8 bg-background border-b border-border/30">
          <div className="container-vicaris">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed">
                Mỗi sản phẩm bạn mua không chỉ là một món quà cho chính mình hay người thân, 
                mà còn là một hạt giống yêu thương được gieo xuống. 
                <strong className="text-ink"> 100% lợi nhuận</strong> từ việc bán sản phẩm sẽ được 
                dùng để hỗ trợ học phí cho các em học sinh, sinh viên có hoàn cảnh khó khăn.
              </p>
            </div>
          </div>
        </section>

        {/* Hotline */}
        <section className="py-6 bg-leaf/5">
          <div className="container-vicaris">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-ink">
                <Phone className="w-5 h-5 text-leaf" />
                <span className="font-medium">Tư vấn mua hàng:</span>
              </div>
              <a
                href="tel:0363816213"
                className="text-leaf font-semibold hover:underline"
              >
                🌸 0363.816.213 (Ms. Hoài)
              </a>
              <a
                href="tel:0345721312"
                className="text-leaf font-semibold hover:underline"
              >
                🌸 0345.721.312 (Ms. Hồng)
              </a>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16 bg-cream">
          <div className="container-vicaris">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Đang tải...</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Shopee CTA */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-vicaris text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-4">
              Mua hàng trên Shopee
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Ghé thăm gian hàng Vicaris Shopee để xem thêm nhiều sản phẩm và đặt hàng trực tiếp
            </p>
            <a
              href="https://shopee.vn/vicaris_shop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#EE4D2D] text-white hover:bg-[#D73211] px-8 py-6 text-base"
              >
                <ExternalLink className="w-4 h-4" />
                Mở Shopee
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shopee;
