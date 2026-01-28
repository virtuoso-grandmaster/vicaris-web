import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useNews, useFeaturedNews, useNewsByCategory, type NewsItem } from "@/hooks/useNews";


const categoryLabels: Record<string, string> = {
  "goc-chia-se": "Góc chia sẻ",
  "hoat-dong-xa-hoi": "Hoạt động xã hội",
  "du-an-xa-hoi": "Dự án xã hội",
  "giao-duc": "Giáo dục",
  "tin-tuc": "Tin tức",
  "bao-ve-moi-truong": "Bảo vệ môi trường",
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const NewsCard = ({
  item,
  index,
  featured = false,
}: {
  item: NewsItem;
  index: number;
  featured?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (featured) {
    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="group bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-500 border border-border/50"
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="h-64 md:h-auto overflow-hidden">
            <img
              src={item.image_url || '/placeholder.svg'}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-leaf/10 text-leaf text-xs font-medium rounded-full mb-4 w-fit">
              {item.category_label}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-4 leading-tight line-clamp-3">
              {item.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {item.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(item.published_at)}
              </span>
              {item.author && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {item.author}
                </span>
              )}
            </div>
            <Link to={`/news/${item.slug}`}>
              <Button variant="outline" className="gap-2 group/btn">
                Đọc thêm
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 border border-border/50"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={item.image_url || '/placeholder.svg'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block px-2 py-0.5 bg-leaf/10 text-leaf text-xs font-medium rounded-full mb-3">
          {item.category_label}
        </span>
        <h3 className="font-serif text-lg text-ink mb-3 line-clamp-2 leading-snug group-hover:text-leaf transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(item.published_at)}
          </span>
          <Link
            to={`/news/${item.slug}`}
            className="text-leaf hover:underline flex items-center gap-1"
          >
            Đọc thêm
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const NewsCategorySection = ({
  category,
  title,
}: {
  category: string;
  title: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { data: items = [] } = useNewsByCategory(category);

  if (items.length === 0) return null;

  return (
    <section ref={ref} className="py-12">
      <div className="container-vicaris">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-ink">{title}</h2>
          <Link
            to={`/news?category=${category}`}
            className="text-sm text-leaf hover:underline flex items-center gap-1"
          >
            Xem thêm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const News = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: allNews = [], isLoading } = useNews();
  const { data: featuredNews } = useFeaturedNews();
  
  const filteredNews = selectedCategory === "all" 
    ? allNews 
    : allNews.filter((item) => item.category === selectedCategory);

  const categories: { value: string; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "goc-chia-se", label: "Góc chia sẻ" },
    { value: "hoat-dong-xa-hoi", label: "Hoạt động xã hội" },
    { value: "du-an-xa-hoi", label: "Dự án xã hội" },
    { value: "giao-duc", label: "Giáo dục" },
    { value: "bao-ve-moi-truong", label: "Bảo vệ môi trường" },
  ];

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
              TIN TỨC
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-center text-muted-foreground max-w-2xl mx-auto"
            >
              Những câu chuyện từ hành trình gieo hạt hiểu thương
            </motion.p>
          </div>
        </section>

        {/* Facebook Share */}
        <section className="py-4 border-b border-border/30">
          <div className="container-vicaris">
            <a
              href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fvicaris.com.vn%2Fnews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#4267B2] text-white py-3 px-6 rounded-md hover:bg-[#365899] transition-colors w-full max-w-md mx-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 bg-background border-b border-border/30">
          <div className="container-vicaris">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? "bg-leaf text-white"
                      : "bg-muted text-muted-foreground hover:bg-leaf/10 hover:text-leaf"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews && selectedCategory === "all" && (
          <section className="py-8 md:py-12 bg-cream">
            <div className="container-vicaris">
              <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">
                Tin mới nhất
              </h2>
              <NewsCard item={featuredNews} index={0} featured />
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="py-12 bg-background">
          <div className="container-vicaris">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Đang tải...</p>
              </div>
            ) : selectedCategory === "all" ? (
              <>
                {/* Sectioned by category */}
                <NewsCategorySection category="hoat-dong-xa-hoi" title="HOẠT ĐỘNG XÃ HỘI" />
                <NewsCategorySection category="du-an-xa-hoi" title="DỰ ÁN XÃ HỘI" />
                <NewsCategorySection category="goc-chia-se" title="GÓC CHIA SẺ" />
              </>
            ) : (
              <>
                <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">
                  {categoryLabels[selectedCategory] || selectedCategory}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                  ))}
                </div>
                {filteredNews.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">
                    Chưa có bài viết trong danh mục này
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
