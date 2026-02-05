import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChildrenGrid from "@/components/ChildrenGrid";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Sponsorship = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const videoRef = useRef(null);
  const videoInView = useInView(videoRef, { once: true, margin: "-100px" });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Preconnect to YouTube for better performance
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://www.youtube.com';
    document.head.appendChild(link);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
          <div className="container-vicaris">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink text-center"
            >
              BẢO TRỢ TRẺ
            </motion.h1>
          </div>
        </section>

        {/* Facebook Share */}
        <section className="py-4 border-b border-border/30">
          <div className="container-vicaris">
            <a
              href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fvicaris.com.vn%2Fstories"
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

        {/* Video Section */}
        <section ref={videoRef} className="py-8 md:py-12 bg-background">
          <div className="container-vicaris">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={videoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/iKSY02Nb0ak"
                  title="Vicaris - Câu chuyện về những người trẻ gieo mầm sự tử tế"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                Vicaris - Câu chuyện về những người trẻ gieo mầm sự tử tế
              </p>
            </motion.div>
          </div>
        </section>

        {/* Children Grid */}
        <ChildrenGrid />

        {/* CTA */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-vicaris text-center">
            <Link to="/donate">
              <Button
                size="lg"
                className="gap-2 bg-leaf text-white hover:bg-leaf/90 px-10 py-6 text-base"
              >
                <Heart className="w-4 h-4" />
                Đăng ký bảo trợ
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sponsorship;
