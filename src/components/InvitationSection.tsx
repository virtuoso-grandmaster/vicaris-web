import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import invitationBg from "/assets/invitation-bg.jpg";

const InvitationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={invitationBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.85) contrast(0.9)" }}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      </div>

      <div className="container-vicaris relative z-10">
        <div className="max-w-2xl lg:max-w-3xl mx-auto text-center">
          {/* Quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="mb-6 md:mb-8"
          >
            <span className="quote-mark text-4xl md:text-6xl">❝</span>
          </motion.div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-12"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-ink leading-relaxed mb-2 md:mb-4">
              Bạn không cần thay đổi cả thế giới.
            </p>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-ink leading-relaxed italic">
              Chỉ cần cùng chúng tôi gieo một hạt hôm nay.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="/sponsorship" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-ink text-primary-foreground hover:bg-ink/90 px-6 md:px-8 py-5 md:py-6 text-sm md:text-base"
              >
                Gieo hạt cùng em
              </Button>
            </Link>
            <Link to="/donate" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 border-ink/30 hover:bg-ink/5 px-6 md:px-8 py-5 md:py-6 text-sm md:text-base bg-background/50 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4" />
                Quyên góp
              </Button>
            </Link>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 md:mt-12 text-xs md:text-sm text-muted-foreground"
          >
            100% đóng góp được sử dụng minh bạch cho trẻ em
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
