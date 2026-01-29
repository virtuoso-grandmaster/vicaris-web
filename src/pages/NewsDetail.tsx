import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useNewsItem } from "@/hooks/useNews";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Image optimization helper
const getOptimizedImageSrc = (src: string, width: number = 800) => {
  if (!src || src === '/placeholder.svg') return src;
  
  // For Supabase images, add optimization parameters
  if (src.includes('supabase.co')) {
    return `${src}?width=${width}&quality=80&format=webp`;
  }
  
  return src;
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const NewsDetail = () => {
  const { slug } = useParams();
  const { data: newsItem, isLoading } = useNewsItem(slug || '');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/news/${slug}` : '';
  const shareText = newsItem?.title || 'Xem tin tức';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-16">
          <div className="container-vicaris">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Đang tải...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-16">
          <div className="container-vicaris">
            <div className="text-center py-12">
              <h2 className="font-serif text-2xl md:text-3xl text-ink mb-4">Bài viết không tồn tại</h2>
              <p className="text-muted-foreground">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              <Link to="/news">
                <Button variant="outline" className="mt-4">Quay lại trang tin tức</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-cream">
          <div className="container-vicaris">
            <div className="max-w-4xl mx-auto">
              {/* Return Button */}
              <div className="mb-8">
                <Link to="/news">
                  <Button variant="outline" className="gap-2 text-leaf hover:bg-leaf/5 border-leaf/30">
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại tin tức
                  </Button>
                </Link>
              </div>

              <h1 className="font-serif text-center text-3xl md:text-4xl lg:text-5xl text-ink mb-6 leading-tight">
                {newsItem.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(newsItem.published_at)}
                </span>
                {newsItem.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {newsItem.author}
                  </span>
                )}
                <span className="px-3 py-1 bg-leaf/10 text-leaf text-xs font-medium rounded-full">
                  {newsItem.category_label}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16">
          <div className="container-vicaris">
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <img
                    src={getOptimizedImageSrc(newsItem.image_url || '/placeholder.svg', 800)}
                    alt={newsItem.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-soft"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                    width="800"
                    height="600"
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6 md:p-8">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                          {newsItem.excerpt}
                        </p>
                        
                        {/* Main content */}
                        {newsItem.content && (
                          <div className="text-ink leading-relaxed space-y-6">
                            {newsItem.content.split('\n').map((paragraph, index) => (
                              <p key={index} className="mb-4 last:mb-0 text-base leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Share Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-12 flex items-center justify-between border-t border-border/50 pt-8"
                >
                  <Link to="/news" className="flex items-center gap-2 text-leaf hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại tin tức
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsShareOpen(!isShareOpen)}
                      className="gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Chia sẻ
                    </Button>
                    
                    {isShareOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute mt-2 right-0 bg-card border border-border/50 rounded-lg p-2 shadow-lg"
                      >
                        <div className="flex gap-1">
                          <a
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-muted rounded transition-colors"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                          <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-muted rounded transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                          <a
                            href={shareLinks.email}
                            className="p-2 hover:bg-muted rounded transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-6"
                >
                  {/* Article Info */}
                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg text-ink mb-4">Thông tin bài viết</h3>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-leaf" />
                          <span>Ngày đăng: {formatDate(newsItem.published_at)}</span>
                        </div>
                        {newsItem.author && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-leaf" />
                            <span>Tác giả: {newsItem.author}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-leaf" />
                          <span>Chuyên mục: {newsItem.category_label}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Share Actions */}
                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg text-ink mb-4">Chia sẻ bài viết</h3>
                      <div className="space-y-3">
                        <a
                          href={shareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-[#f7f7f7] hover:bg-[#e8f5e9] rounded-lg transition-colors"
                        >
                          <Facebook className="w-5 h-5 text-[#4267B2]" />
                          <span className="text-sm font-medium">Chia sẻ lên Facebook</span>
                        </a>
                        <a
                          href={shareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-[#f7f7f7] hover:bg-[#e8f5e9] rounded-lg transition-colors"
                        >
                          <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                          <span className="text-sm font-medium">Chia sẻ lên Twitter</span>
                        </a>
                        <a
                          href={shareLinks.email}
                          className="flex items-center gap-3 p-3 bg-[#f7f7f7] hover:bg-[#e8f5e9] rounded-lg transition-colors"
                        >
                          <Mail className="w-5 h-5 text-leaf" />
                          <span className="text-sm font-medium">Gửi qua Email</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;