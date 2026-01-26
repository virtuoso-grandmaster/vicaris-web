import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnnualReportSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-cream">
      <div className="container-vicaris">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6 md:p-8 bg-background rounded-xl shadow-soft border border-border/50"
        >
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-xs tracking-[0.15em] text-muted-foreground mb-2">
              NOTIFICATION
            </span>
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-ink mb-3">
              Doanh nghiệp xã hội Vicaris Annual Report 2020
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Xem báo cáo minh bạch hoạt động của Quỹ Vicaris trong năm 2020.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <a
              href="https://drive.google.com/file/d/1cx6hNrL8hCbErJEAK4vjp-G7Bg8poO1h/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="zen" className="gap-2">
                <span>Xem thêm</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnnualReportSection;
