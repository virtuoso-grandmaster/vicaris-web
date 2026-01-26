import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import storySeedling from "/assets/story-seedling.jpg";
import ensoCircle from "/assets/enso-circle.png";

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-cream">
      <div className="container-vicaris">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={storySeedling}
                alt="Em bé cầm cây non - biểu tượng của hy vọng"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.85) contrast(0.95)" }}
              />
              {/* Film grain overlay */}
              <div className="absolute inset-0 film-grain pointer-events-none" />
            </div>
            {/* Enso decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32">
              <img
                src={ensoCircle}
                alt=""
                className="w-full h-full opacity-20"
              />
            </div>
          </motion.div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            {/* Section label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-block text-xs md:text-sm tracking-[0.2em] text-muted-foreground mb-6 md:mb-8"
            >
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </motion.span>

            {/* Main title */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight mb-8 md:mb-10"
            >
              Vicaris bắt đầu từ
              <br />
              <span className="italic">một hạt giống nhỏ</span>
            </motion.h2>

            {/* Story content */}
            <div className="space-y-5 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Một lần gặp gỡ tình cờ. Một ánh mắt trẻ thơ trong veo, ẩn chứa
                niềm hy vọng mong manh.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-ink font-serif italic text-xl md:text-2xl py-2"
              >
                "Nếu mình không gieo hôm nay,
                <br />
                ngày mai sẽ thế nào?"
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              >
                Và từ câu hỏi ấy, Vicaris ra đời — để mỗi hạt giống nhỏ được
                chăm sóc, được nâng niu, và được lớn lên trong yêu thương.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
