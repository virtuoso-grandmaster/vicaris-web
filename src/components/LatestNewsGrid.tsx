import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { getLatestNews, NewsItem } from "@/data/newsData";

const NewsCard = ({ item, index, isInView, featured = false }: { 
  item: NewsItem; 
  index: number; 
  isInView: boolean;
  featured?: boolean;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className={`group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <Link
        to={`/news`}
        className="block h-full bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 border border-border/50 hover:border-leaf/30"
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9] md:aspect-[16/10]' : 'aspect-[16/10]'}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3 h-3" />
            <span>{item.date}</span>
          </div>
          <h3 className={`font-serif text-ink line-clamp-2 group-hover:text-leaf transition-colors duration-300 ${featured ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
            {item.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
};

const LatestNewsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const latestNews = getLatestNews(6);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container-vicaris">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-block text-xs md:text-sm tracking-[0.2em] text-muted-foreground mb-3">
            NEWS UPDATE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink">
            TIN MỚI CẬP NHẬT
          </h2>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestNews.map((item, index) => (
            <NewsCard 
              key={item.id} 
              item={item} 
              index={index} 
              isInView={isInView}
              featured={index === 0}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-ink hover:text-leaf transition-colors duration-300 font-medium"
          >
            Xem thêm
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNewsGrid;
