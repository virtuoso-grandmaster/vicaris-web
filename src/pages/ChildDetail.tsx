import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MapPin, Calendar, User, Clock, ExternalLink } from "lucide-react";
import { useChild, useRelatedChildren } from "@/hooks/useChildren";

interface SponsorshipItem {
  label: string;
  amount: string;
}

const ChildDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: child, isLoading, error } = useChild(slug || '');
  const { data: relatedChildren = [] } = useRelatedChildren(
    child?.location || '', 
    child?.id || ''
  );

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

  if (error || !child) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-24">
          <div className="container-vicaris text-center">
            <h1 className="font-serif text-4xl text-ink mb-4">Không tìm thấy</h1>
            <p className="text-muted-foreground mb-8">
              Không tìm thấy thông tin trẻ em với mã này.
            </p>
            <Link to="/sponsorship">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại danh sách
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = child.image_url || '/placeholder.svg';
  const sponsorshipItems = (child.sponsorship_items as unknown as SponsorshipItem[]) || [];

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
              <Link to="/sponsorship" className="hover:text-leaf transition-colors">
                Bảo trợ trẻ
              </Link>
              <span>/</span>
              <span className="text-ink">{child.code}</span>
            </nav>
          </div>
        </section>

        {/* Hero */}
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
                    alt={child.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-ink/80 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {child.code}
                  </div>
                  {child.is_new && (
                    <div className="absolute top-4 right-4 bg-leaf text-white px-4 py-2 rounded-full text-sm font-medium">
                      Hồ sơ mới
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://forms.gle/oJDha8ijj12qX5HS9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full gap-2 bg-leaf text-white hover:bg-leaf/90">
                      <Heart className="w-4 h-4" />
                      Ủng hộ trẻ
                    </Button>
                  </a>
                  <a
                    href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Chia sẻ lên Facebook
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
                <h1 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                  {child.code} – {child.name}
                </h1>

                {/* Basic info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-foreground">
                    <User className="w-5 h-5 text-leaf" />
                    <span>Giới tính: <strong>{child.gender}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="w-5 h-5 text-leaf" />
                    <span>Địa chỉ: <strong>{child.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-leaf" />
                    <span>Sinh năm: <strong>{child.birth_year}</strong></span>
                  </div>
                  {child.situation && (
                    <div className="flex items-start gap-3 text-foreground">
                      <Heart className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                      <span>Hoàn cảnh: <strong>{child.situation}</strong></span>
                    </div>
                  )}
                  {child.sponsor_start && (
                    <div className="flex items-center gap-3 text-foreground">
                      <Clock className="w-5 h-5 text-leaf" />
                      <span>
                        Tiếp nhận bảo trợ: <strong>{child.sponsor_start}</strong>
                        {child.sponsor_end && (
                          <span className="ml-2 text-amber-600">
                            (Hoàn thành: {child.sponsor_end})
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Story */}
                {child.story && (
                  <div className="mb-8">
                    <h2 className="font-serif text-xl text-ink mb-4">
                      HOÀN CẢNH GIA ĐÌNH
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {child.story}
                    </p>
                  </div>
                )}

                {/* Sponsorship details */}
                {sponsorshipItems.length > 0 && (
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h2 className="font-serif text-xl text-ink mb-4">
                      Mức bảo trợ (dự kiến) từ {child.sponsorship_period}
                    </h2>
                    <div className="space-y-3">
                      {sponsorshipItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start gap-4 text-sm"
                        >
                          <span className="text-muted-foreground">
                            + {item.label}
                          </span>
                          <span className="font-medium text-ink whitespace-nowrap">
                            {item.amount}
                          </span>
                        </div>
                      ))}
                      <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
                        <span className="font-medium text-ink">TỔNG:</span>
                        <span className="font-bold text-lg text-leaf">
                          {child.sponsorship_total}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Note */}
                {child.note && (
                  <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Ghi chú:</strong> {child.note}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Policy note */}
        <section className="py-8 bg-background">
          <div className="container-vicaris">
            <div className="max-w-3xl mx-auto p-6 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Ghi chú:</strong> Quyết định bảo trợ được kí theo từng năm học, 
                được đánh giá và báo cáo vào cuối mỗi học kì. Đề xuất mức bảo trợ cho năm 
                tiếp theo dựa vào thành tích học tập và sự tương tác, kết nối với gia đình Vicaris, 
                cũng như thái độ tham gia các hoạt hướng dẫn vun bồi đạo đức và kỹ năng sống từ Ban Giáo dục.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Nhà hảo tâm tiếp nhận bảo trợ có thế đóng góp trọn năm hoặc mỗi tháng vào quỹ 
                Bảo trợ giáo dục Vicaris. Báo cáo chi (kèm giấy xác nhận chi – nhận) sẽ được 
                gửi về mail vào cuối mỗi học kì để nhà bảo trợ theo dõi.
              </p>
            </div>
          </div>
        </section>

        {/* Related children */}
        {relatedChildren.length > 0 && (
          <section className="py-12 bg-cream">
            <div className="container-vicaris">
              <h2 className="font-serif text-2xl text-ink mb-8 text-center">
                Các em khác tại {child.location}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedChildren.map((relatedChild) => (
                  <Link
                    key={relatedChild.id}
                    to={`/sponsorship/${relatedChild.slug}`}
                    className="block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 border border-border/50 group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={relatedChild.image_url || '/placeholder.svg'}
                        alt={relatedChild.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-ink/80 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedChild.code}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg text-ink line-clamp-1">
                        {relatedChild.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sinh năm: {relatedChild.birth_year}
                      </p>
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
            <Link to="/sponsorship">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại danh sách bảo trợ
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChildDetail;
