import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { useChildren, getProvinces, type Child } from "@/hooks/useChildren";

// Map child codes to their corresponding image files
const getChildImage = (childCode: string): string => {
  const imageMap: Record<string, string> = {
    'BT01': '/assets/children/bt01-the-chung.jpg',
    'BT04': '/assets/children/bt04-hong-anh.jpg',
    'BT10': '/assets/children/bt10-thanh-thien.jpg',
    'BT15': '/assets/children/bt15-ngoc-anh.jpg',
    'BT16': '/assets/children/bt16-thanh-xuan.jpg',
    'BT17': '/assets/children/bt17-ho-van-noi.jpg',
    'BT18': '/assets/children/bt18-tieu-ngoc.jpg',
    'BT19': '/assets/children/bt19-thanh-an.jpg',
    'BT20': '/assets/children/bt20-thanh-thuy.jpg',
    'BT21': '/assets/children/bt21-diem-my.jpg',
    'BT23': '/assets/children/bt23-ngoc-thuy.jpg',
    'BT25': '/assets/children/bt25-hong-hanh.jpg',
    'BT26': '/assets/children/bt26-ngan-ha.jpg',
    'BT27': '/assets/children/bt27-trong-nghia.jpg',
    'BT32': '/assets/children/bt32-nhu-y.jpg',
    'BT33': '/assets/children/bt33-van-vi.jpg',
    'BT36': '/assets/children/bt36-trong-phuc.jpg',
    'BT37': '/assets/children/bt37-bao-tran.jpg',
    'BT38': '/assets/children/bt38-gia-han.jpg',
    'BT39': '/assets/children/bt39-thuy-linh.jpg',
    'BT40': '/assets/children/bt40-thanh-truc.jpg',
    'BT41': '/assets/children/bt41-ngoc-nhi-ngoc-diep.jpg',
    'BT42': '/assets/children/bt42-hanh-nguyen-tuyet-ngan.jpg',
  };
  
  return imageMap[childCode] || '/placeholder.svg';
};

const ChildCard = ({
  child,
  index,
}: {
  child: Child;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Use local image from assets folder based on child code
  const imageUrl = getChildImage(child.code);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-500 border border-border/50 group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={child.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-ink/80 text-white px-3 py-1 rounded-full text-xs font-medium">
          {child.code}
        </div>
        {child.is_new && (
          <div className="absolute top-3 right-3 bg-leaf text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Mới
          </div>
        )}
        {child.sponsor_end && (
          <div className="absolute bottom-3 left-3 bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
            Hoàn thành: {child.sponsor_end}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg text-ink mb-3 leading-snug line-clamp-2">
          {child.name}
        </h3>

        <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
          <p>
            <span className="font-medium">Giới tính:</span> {child.gender}
          </p>
          <p>
            <span className="font-medium">Địa chỉ:</span> {child.location}
          </p>
          <p>
            <span className="font-medium">Sinh năm:</span> {child.birth_year}
          </p>
          {child.situation && (
            <p className="line-clamp-1">
              <span className="font-medium">Hoàn cảnh:</span> {child.situation}
            </p>
          )}
          {child.sponsor_start && (
            <p>
              <span className="font-medium">Tiếp nhận bảo trợ:</span>{" "}
              {child.sponsor_start}
            </p>
          )}
        </div>

        <Link to={`/sponsorship/${child.slug}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 border-leaf/30 text-leaf hover:bg-leaf hover:text-white transition-all duration-300"
          >
            <Heart className="w-4 h-4" />
            Xem thêm
          </Button>
        </Link>
      </div>
    </motion.article>
  );
};

const ChildrenGrid = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [showNewOnly, setShowNewOnly] = useState(false);

  const { data: children = [], isLoading } = useChildren();
  const provinces = getProvinces(children);

  const filteredChildren = children.filter((child) => {
    if (selectedProvince && child.location !== selectedProvince) return false;
    if (showNewOnly && !child.is_new) return false;
    return true;
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-vicaris text-center">
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-vicaris">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            DANH SÁCH BẢO TRỢ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những em nhỏ đang được Quỹ Bảo trợ giáo dục Vicaris hỗ trợ học tập
            và phát triển
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {/* Province filter */}
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-leaf/50"
          >
            <option value="">-- Lọc theo tỉnh --</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province} ({children.filter((c) => c.location === province).length})
              </option>
            ))}
          </select>

          {/* New profiles filter */}
          <button
            onClick={() => setShowNewOnly(!showNewOnly)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
              showNewOnly
                ? "bg-leaf text-white border-leaf"
                : "border-border bg-background text-foreground hover:border-leaf/50"
            }`}
          >
            Hồ sơ mới ({children.filter((c) => c.is_new).length})
          </button>
        </div>

        {/* Results count */}
        <div className="mb-6 text-center text-sm text-muted-foreground">
          Đang hiển thị {filteredChildren.length} / {children.length} trẻ em
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredChildren.map((child, index) => (
            <ChildCard key={child.id} child={child} index={index} />
          ))}
        </div>

        {filteredChildren.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy kết quả phù hợp</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedProvince("");
                setShowNewOnly(false);
              }}
              className="mt-2 text-leaf"
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChildrenGrid;
