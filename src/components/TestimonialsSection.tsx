import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Vicaris đã mang đến cho con cơ hội được đi học và nuôi dưỡng ước mơ. Con rất biết ơn các cô chú đã luôn đồng hành.",
    name: "Thanh Thủy",
    role: "Em nhỏ được bảo trợ",
  },
  {
    quote: "Được đồng hành cùng Vicaris là một trải nghiệm ý nghĩa. Tôi thấy mình được góp phần nhỏ vào hành trình lớn của các em.",
    name: "Anh Minh",
    role: "Nhà hảo tâm",
  },
  {
    quote: "Từ khi được Vicaris hỗ trợ, em đã tự tin hơn rất nhiều trong học tập.",
    name: "Ngọc Anh",
    role: "Em nhỏ được bảo trợ",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={isInView ? { opacity: 1 } : {}} 
            className="badge-minimal mb-4"
          >
            Chia sẻ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.1 }} 
            className="font-serif text-3xl md:text-4xl text-ink"
          >
            Câu chuyện từ trái tim
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.2 }} 
          className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 text-center"
        >
          <blockquote className="font-serif text-xl md:text-2xl text-ink leading-relaxed mb-6 italic">
            "{testimonials[current].quote}"
          </blockquote>
          <p className="font-medium text-ink">{testimonials[current].name}</p>
          <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button 
            onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)} 
                className={`h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border w-2"}`} 
              />
            ))}
          </div>
          <button 
            onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;