import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "20,000+", label: "Trẻ em được giúp đỡ" },
  { number: "2,000+", label: "Cây xanh được trồng" },
  { number: "36+", label: "Trẻ được bảo trợ" },
  { number: "20+", label: "Tỉnh thành" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-cream">
      <div className="container-vicaris">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="badge-minimal mb-4"
          >
            Tác động
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl text-ink"
          >
            Những con số biết nói
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;