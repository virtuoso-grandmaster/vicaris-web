import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, ExternalLink, Share2 } from "lucide-react";
import { useProduct, useRelatedProducts } from "@/hooks/useProducts";

interface ProductSize {
  name: string;
  price: string;
}

const ShopeeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug || '');
  const { data: relatedProducts = [] } = useRelatedProducts(product?.id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-24">
          <div className="container-vicaris text-center">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-24">
          <div className="container-vicaris text-center">
            <h1 className="font-serif text-4xl text-ink mb-4">Không tìm thấy</h1>
            <p className="text-muted-foreground mb-8">
              Không tìm thấy sản phẩm với mã này.
            </p>
            <Link to="/shopee">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại Vicaris Shopee
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = product.image_url || '/placeholder.svg';
  const sizes = (product.sizes as unknown as ProductSize[]) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <section className="pt-24 pb-4 bg-cream">
          <div className="container-vicaris">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-leaf transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link to="/shopee" className="hover:text-leaf transition-colors">
                Vicaris Shopee
              </Link>
              <span>/</span>
              <span className="text-ink line-clamp-1">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-8 md:py-12 bg-cream">
          <div className="container-vicaris">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-leaf text-white px-4 py-2 rounded-full text-sm font-medium">
                    VICARIS SHOPEE
                  </span>
                </div>

                {/* Share */}
                <div className="mt-6 flex gap-4">
                  <a
                    href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      <Share2 className="w-4 h-4" />
                      Chia sẻ Facebook
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(product.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="text-2xl font-bold text-leaf mb-6">
                  {product.price_range}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="prose prose-sm max-w-none mb-8">
                    {product.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Sizes/Variants */}
                {sizes.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-serif text-lg text-ink mb-4">Kích thước & Giá</h3>
                    <div className="space-y-2">
                      {sizes.map((size, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-card rounded-lg border border-border/50"
                        >
                          <span className="text-sm text-foreground">{size.name}</span>
                          <span className="font-medium text-leaf">{size.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotline */}
                <div className="bg-leaf/10 rounded-xl p-6 mb-6">
                  <h3 className="font-serif text-lg text-ink mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-leaf" />
                    Tư vấn mua hàng
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Quý khách vui lòng liên hệ hotline để được tư vấn chi tiết:
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:0363816213"
                      className="block text-leaf font-semibold text-lg hover:underline"
                    >
                      🌸 0363.816.213 (Ms. Hoài)
                    </a>
                    <a
                      href="tel:0345721312"
                      className="block text-leaf font-semibold text-lg hover:underline"
                    >
                      🌸 0345.721.312 (Ms. Hồng)
                    </a>
                  </div>
                </div>

                {/* Shopee link */}
                <a
                  href={product.shopee_link || "https://shopee.vn/vicaris_shop"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-[#EE4D2D] text-white hover:bg-[#D73211]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Mua trên Shopee
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-8 bg-background">
          <div className="container-vicaris">
            <div className="max-w-3xl mx-auto p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                💝 <strong>Lợi nhuận từ sản phẩm</strong> sẽ được dùng để hỗ trợ học phí cho các em 
                học sinh – sinh viên có hoàn cảnh khó khăn đang được Quỹ bảo trợ giáo dục Vicaris hỗ trợ.
              </p>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-cream">
            <div className="container-vicaris">
              <h2 className="font-serif text-2xl text-ink mb-8 text-center">
                Sản phẩm khác
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/shopee/${relatedProduct.slug}`}
                    className="block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 border border-border/50 group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image_url || '/placeholder.svg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg text-ink line-clamp-1 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-leaf font-semibold">
                        {relatedProduct.price_range}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to list */}
        <section className="py-8 bg-background">
          <div className="container-vicaris text-center">
            <Link to="/shopee">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại Vicaris Shopee
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopeeDetail;
