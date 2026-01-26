import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ThankYouSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding-sm bg-leaf-light/30">
      <div className="container-narrow">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl text-ink mb-4"
          >
            Cảm ơn bạn đã đồng hành
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Mỗi hành động yêu thương của bạn đều góp phần tạo nên những câu chuyện kỳ diệu trong cuộc sống của các em nhỏ.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ThankYouSection;