import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestNews } from "@/data/newsData";

const NewsSlider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get latest 5 news items for slider
  const newsItems = getLatestNews(5).map((item) => ({
    id: item.id,
    category: item.categoryLabel,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    slug: "/news",
    image: item.image,
  }));

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

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
            NOTIFICATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink">
            THÔNG BÁO QUAN TRỌNG
          </h2>
        </motion.div>

        {/* Slider with Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Link
                    to={item.slug}
                    className="block bg-cream rounded-xl overflow-hidden hover:bg-cream/80 transition-colors duration-300"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                        <span className="inline-block w-fit text-xs tracking-wider text-leaf bg-leaf/10 px-3 py-1 rounded-full mb-4">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-ink mb-4 line-clamp-3">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="mt-6">
                          <span className="text-sm font-medium text-leaf hover:text-leaf/80 transition-colors">
                            Đọc thêm →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                {currentIndex + 1} of {newsItems.length}
              </span>
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-ink w-6" : "bg-ink/20"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-ink/20 hover:bg-ink hover:text-primary-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-ink/20 hover:bg-ink hover:text-primary-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSlider;
