import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ensoCircle from "/assets/enso-circle.png";

const values = [
  {
    title: "Minh bạch",
    description:
      "Mọi đóng góp được theo dõi và báo cáo rõ ràng. Chúng tôi tin rằng sự tin tưởng được xây dựng từ sự minh bạch.",
  },
  {
    title: "Nhân văn",
    description:
      "Trẻ em không phải là đối tượng được giúp đỡ, mà là những con người được yêu thương và tôn trọng.",
  },
  {
    title: "Bền vững",
    description:
      "Không phải những món quà nhất thời, mà là sự đồng hành lâu dài. Mỗi hạt giống cần thời gian để lớn lên.",
  },
];

const About = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="pt-32 pb-20 md:pt-40 md:pb-32 bg-cream"
        >
          <div className="container-vicaris">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="inline-block text-sm tracking-[0.2em] text-muted-foreground mb-6"
              >
                VỀ VICARIS
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.1] mb-8"
              >
                Câu chuyện của
                <br />
                <span className="italic">một hạt giống</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-xl"
              >
                Vicaris ra đời từ niềm tin rằng mỗi em nhỏ đều xứng đáng được
                yêu thương, được học hành và được phát triển trọn vẹn.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Logo meaning */}
        <section ref={storyRef} className="section-padding">
          <div className="container-vicaris">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block text-sm tracking-[0.2em] text-muted-foreground mb-6">
                  Ý NGHĨA LOGO
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-ink leading-tight mb-10">
                  Gieo hạt
                  <br />
                  <span className="italic">Hiểu Thương</span>
                </h2>

                <div className="space-y-8 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-2">
                      Gieo hạt
                    </h3>
                    <p>
                      Mỗi hành động tử tế là một hạt giống được gieo trồng.
                      Chúng ta không biết trước nó sẽ lớn lên như thế nào, nhưng
                      chúng ta tin vào sức mạnh của sự bắt đầu.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-2">Hiểu</h3>
                    <p>
                      Sự thấu hiểu là nền tảng của mọi mối quan hệ. Chúng tôi
                      lắng nghe, quan sát và đồng hành cùng các em nhỏ, không
                      phán xét.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-2">Thương</h3>
                    <p>
                      Tình thương chân thành, không điều kiện. Đó là nguồn năng
                      lượng giúp các em nhỏ vượt qua khó khăn và tin vào bản
                      thân.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative w-80 h-80 flex items-center justify-center">
                  {/* Enso circle */}
                  <img 
                    src={ensoCircle} 
                    alt="Enso circle" 
                    className="absolute inset-0 w-full h-full opacity-15 animate-pulse-soft"
                  />
                  <img 
                    src={ensoCircle} 
                    alt="Enso circle" 
                    className="absolute inset-0 w-3/4 h-3/4 m-auto opacity-10"
                    style={{ animationDelay: "1s" }}
                  />
                  <span className="text-8xl relative z-10">🌱</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="section-padding bg-sand/30">
          <div className="container-vicaris">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-16"
            >
              <span className="inline-block text-sm tracking-[0.2em] text-muted-foreground mb-6">
                GIÁ TRỊ CỐT LÕI
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-ink leading-tight">
                Ba điều chúng tôi
                <br />
                <span className="italic">luôn gìn giữ</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-2xl p-8 border border-border/50"
                >
                  <span className="font-serif text-5xl text-sand/80 mb-4 block">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif text-2xl text-ink mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-vicaris text-center">
            <h2 className="font-serif text-4xl sm:text-5xl text-ink mb-6">
              Hãy cùng chúng tôi
              <br />
              <span className="italic">gieo hạt yêu thương</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Mỗi đóng góp của bạn là một hạt giống được gieo trồng, chăm sóc và
              phát triển cùng các em nhỏ.
            </p>
            <Link to="/donate">
              <Button
                size="lg"
                className="gap-2 bg-ink text-primary-foreground hover:bg-ink/90 px-10 py-6 text-base"
              >
                <Heart className="w-4 h-4" />
                Quyên góp ngay
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
