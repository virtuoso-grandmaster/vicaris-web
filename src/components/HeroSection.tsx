import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGieoHat from "/assets/hero-gieo-hat.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-background">
      <div className="container-vicaris relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="badge-minimal mb-8">
                Quỹ Bảo trợ Giáo dục Vicaris
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink leading-none mb-8"
            >
              <span className="block text-primary">Hiểu</span>
              <span className="block text-primary mt-1">Thương</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md"
            >
              "Hạnh phúc của các con là phẩm vật quý giá nhất Vicaris hiến tặng cho đời."            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/donate">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 h-12 text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Quyên góp
                </Button>
              </Link>
              <Link to="/sponsorship">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full px-8 h-12 text-sm font-medium border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  <Users className="w-4 h-4" />
                  Bảo trợ trẻ em
                </Button>
              </Link>
            </motion.div>

            {/* Stats - minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-12 mt-16 pt-8 border-t border-border/50"
            >
              {[
                { number: "20,000+", label: "Trẻ em" },
                { number: "36+", label: "Bảo trợ" },
                { number: "20+", label: "Tỉnh thành" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-serif text-ink">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden aspect-square">
              <img
                src={heroGieoHat}
                alt="Gieo hạt Hiểu Thương - Vicaris"
                className="w-full h-full"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
              
              {/* Quote card
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-5">
                  <p className="font-serif text-base md:text-lg text-ink leading-relaxed">
                    ""
                  </p>
                </div>
              </div>*/}
            </div> 
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;