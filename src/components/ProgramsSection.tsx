import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import programLearning from "/assets/program-learning.jpg";
import programNutrition from "/assets/program-nutrition.jpg";
import programHealing from "/assets/program-healing.jpg";
import programCompanion from "/assets/program-companion.jpg";

const programs = [
  {
    image: programLearning,
    title: "Học tập và sức khỏe",
    description: "Mở cánh cửa tri thức cho các em qua sách vở và học phí.",
  },
  {
    image: programNutrition,
    title: "Giữ gìn đất Mẹ",
    description: "Những bữa cơm đủ đầy cho các em.",
  },
  {
    image: programHealing,
    title: "Lắng nghe và nuôi dưỡng",
    description: "Hỗ trợ tâm lý giúp các em vượt qua tổn thương.",
  },
  {
    image: programCompanion,
    title: "Cùng đi với nhau",
    description: "Sự đồng hành bền bỉ suốt hành trình.",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-vicaris">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="badge-minimal mb-4"
            >
              Chương trình
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl text-ink"
            >
              Mỗi chương trình, một cách yêu thương
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Programs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((program, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl">
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-lg text-white mb-1">
                    {program.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;