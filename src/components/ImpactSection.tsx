import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const impactStats = [
  {
    number: "127",
    label: "Em nhỏ được đồng hành",
    suffix: "+",
  },
  {
    number: "8",
    label: "Tỉnh thành trên cả nước",
    suffix: "",
  },
  {
    number: "3",
    label: "Năm hoạt động",
    suffix: "+",
  },
  {
    number: "100",
    label: "Tấm lòng nhà hảo tâm",
    suffix: "+",
  },
];

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-leaf-light/50">
      <div className="container-vicaris">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block text-xs md:text-sm tracking-[0.2em] text-muted-foreground mb-4 md:mb-6"
          >
            TÁC ĐỘNG CỦA CHÚNG TÔI
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight"
          >
            Mỗi con số là
            <br />
            <span className="italic">một câu chuyện</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.2 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center"
            >
              <div className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent mb-2 md:mb-4">
                {stat.number}
                <span className="text-accent/70">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
