import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ensoCircle from "/assets/enso-circle.png";

const donationAmounts = [
  { amount: "100.000", label: "Một bộ sách giáo khoa" },
  { amount: "200.000", label: "Bữa ăn một tháng" },
  { amount: "500.000", label: "Học phí một tháng" },
  { amount: "1.000.000", label: "Đồng hành hai tháng" },
];

const bankInfo = {
  bank: "Vietcombank",
  account: "1234567890",
  name: "QUỸ TỪ THIỆN VICARIS",
  content: "QUYENGOP [Họ tên]",
};

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <div className="max-w-3xl mx-auto text-center">
              {/* Enso decoration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <img 
                    src={ensoCircle} 
                    alt="Enso circle" 
                    className="absolute inset-0 w-full h-full opacity-20"
                  />
                  <Heart className="w-8 h-8 text-accent relative z-10" />
                </div>
              </motion.div>

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
                Quyên góp
                <br />
                <span className="italic">yêu thương</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto"
              >
                Mỗi đóng góp của bạn, dù lớn hay nhỏ, đều là một hạt giống được
                gieo trồng vào tương lai của một em nhỏ.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Donation form */}
        <section className="section-padding">
          <div className="container-vicaris">
            <div className="max-w-2xl mx-auto">
              {/* Amount selection */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 mb-8"
              >
                <h2 className="font-serif text-2xl text-ink mb-2">
                  Chọn mức đóng góp
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Mỗi con số là một cách bạn có thể đồng hành cùng các em
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {donationAmounts.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAmount(item.amount)}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedAmount === item.amount
                          ? "border-accent bg-leaf-light/50"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <p className="font-serif text-xl text-ink">
                        {item.amount}đ
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.label}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Hoặc nhập số tiền khác..."
                    className="w-full px-5 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300"
                    onChange={(e) => setSelectedAmount(e.target.value)}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    VNĐ
                  </span>
                </div>
              </motion.div>

              {/* Bank transfer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 mb-8"
              >
                <h2 className="font-serif text-2xl text-ink mb-8">
                  Chuyển khoản ngân hàng
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-sand/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Ngân hàng
                    </p>
                    <p className="text-ink">{bankInfo.bank}</p>
                  </div>

                  <div className="p-4 bg-sand/30 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Số tài khoản
                      </p>
                      <p className="text-ink font-mono">{bankInfo.account}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankInfo.account)}
                      className="p-2 hover:bg-background rounded-lg transition-colors duration-300"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-accent" />
                      ) : (
                        <Copy className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-sand/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Tên tài khoản
                    </p>
                    <p className="text-ink">{bankInfo.name}</p>
                  </div>

                  <div className="p-4 bg-sand/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Nội dung chuyển khoản
                    </p>
                    <p className="text-ink">{bankInfo.content}</p>
                  </div>
                </div>
              </motion.div>

              {/* Other methods */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-card rounded-2xl p-8 md:p-10 border border-border/50"
              >
                <h2 className="font-serif text-2xl text-ink mb-8">
                  Phương thức khác
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <button className="p-5 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 text-center">
                    <p className="text-ink font-medium">MoMo</p>
                    <p className="text-sm text-muted-foreground">Ví điện tử</p>
                  </button>
                  <button className="p-5 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 text-center">
                    <p className="text-ink font-medium">ZaloPay</p>
                    <p className="text-sm text-muted-foreground">Ví điện tử</p>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="section-padding-sm bg-cream">
          <div className="container-vicaris">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl text-ink mb-4">
                Cam kết minh bạch
              </h2>
              <p className="text-muted-foreground mb-10">
                Chúng tôi tin rằng sự minh bạch là nền tảng của niềm tin. Mọi
                đóng góp đều được sử dụng hiệu quả và báo cáo rõ ràng.
              </p>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { number: "100%", label: "Dành cho trẻ em" },
                  { number: "Hàng quý", label: "Báo cáo tài chính" },
                  { number: "24h", label: "Phản hồi thắc mắc" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="font-serif text-3xl text-ink mb-1">
                      {stat.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
