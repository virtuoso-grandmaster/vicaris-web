// Import shopee images
import tranhThuPhapImage from "/assets/shopee/tranh-thu-phap.jpg";
import vongDaImage from "/assets/shopee/vong-da.jpg";
import manhThuPhapImage from "/assets/shopee/manh-thu-phap.jpg";
import doLuuNiemImage from "/assets/shopee/do-luu-niem.jpg";
import nonLaBangImage from "/assets/shopee/non-la-bang.jpg";
import tranhGoImage from "/assets/shopee/tranh-go.jpg";
import tranhVeImage from "/assets/shopee/tranh-ve.jpg";
import daNgheThuat from "/assets/shopee/da-nghe-thuat.jpg";

export interface ShopeeProduct {
  id: number;
  slug: string;
  name: string;
  priceRange: string;
  excerpt: string;
  description: string;
  date: string;
  image: string;
  hotline: string;
  sizes?: { name: string; price: string }[];
  gallery?: { image: string; price: string; sold?: boolean }[];
}

export const shopeeProducts: ShopeeProduct[] = [
  {
    id: 1,
    slug: "tranh-thu-phap-thay-chan-troi-yen-tu",
    name: "Tranh Thư pháp (Thầy Chân Trời Yên Tử)",
    priceRange: "750.000đ - 1.050.000đ",
    excerpt: "Theo tinh thần thiền quán của Sư ông Nhất Hạnh, từng nét chữ trong bộ sưu tập được Thầy Chân Trời Yên Tử thể hiện một cách chân phương đầy thiền vị, mang theo hơi thở của chánh niệm...",
    description: `Theo tinh thần thiền quán của Sư ông Nhất Hạnh, từng nét chữ trong bộ sưu tập được Thầy Chân Trời Yên Tử thể hiện một cách chân phương đầy thiền vị, mang theo hơi thở của chánh niệm và an trú trong hiện tại.

Không chỉ là vật phẩm trang trí, mà đây là một lời nhắn nhủ, nhắc nhở nhẹ nhàng, một chốn trở về cho tâm hồn giữa cuộc sống bồn bề, hối hả.

🎀 Sản phẩm có 03 kích thước để bạn lựa chọn phù hợp với không gian sống và nhu cầu trưng bày:

🔸️ 20x30cm: nhỏ gọn, dễ trưng bày tại bàn làm việc hoặc góc học tập.
🔸️ 30x50cm: cân đối, vừa vặn cho phòng khách hay phòng đọc.
🔸️ 40x60cm: nổi bật, lý tưởng cho không gian thiền tập, phòng khách lớn.

🎀 Khung tranh có 02 loại: khung thẳng và khung nghệ thuật.

Cùng với nét chữ thanh thoát là chất liệu mộc mạc, màu sắc tối giản từ giấy vẽ và khung tranh; tất cả đã tạo nên tổng thể nhã nhặn, thanh lịch và trang nhã góp phần tạo điểm nhấn cho không gian.`,
    date: "22/01/2026",
    image: tranhThuPhapImage,
    hotline: "0363.816.213 (Ms. Hoài)",
    sizes: [
      { name: "Khung nghệ thuật 35×45cm", price: "850.000đ" },
      { name: "Khung nghệ thuật 35×55cm", price: "950.000đ" },
      { name: "Khung nghệ thuật 36×36cm", price: "750.000đ" },
      { name: "Khung nghệ thuật 40×40cm", price: "850.000đ" },
      { name: "Khung nghệ thuật 40×50cm", price: "850.000đ" },
      { name: "Khung nghệ thuật 40×60cm", price: "1.050.000đ" },
    ],
  },
  {
    id: 2,
    slug: "vong-tay-da-gui-tron-yeu-thuong-chan-thanh",
    name: "Vòng đá – Gửi trọn yêu thương chân thành",
    priceRange: "100.000đ - 580.000đ",
    excerpt: "🌏 Mỗi viên đá thuần khiết, mang trong mình năng lượng nguyên sơ từ lòng đất mẹ, cùng tạo nên chiếc vòng tay đá mang vẻ đẹp trầm tĩnh và khiêm nhường...",
    description: `🌏 Mỗi viên đá thuần khiết, mang trong mình năng lượng nguyên sơ từ lòng đất mẹ, cùng tạo nên chiếc vòng tay đá mang vẻ đẹp trầm tĩnh và khiêm nhường.

Vòng tay đá Vicaris phù hợp cho chính bạn và là món quà vô cùng ý nghĩa dành tặng người thương yêu.

Đây là những chiếc vòng do người thương tặng Quỹ bán gây quỹ.

💖 Thương mời bạn xem qua và ủng hộ các sản phẩm vòng tay đá tại Vicaris.

💝 Lợi nhuận từ sản phẩm sẽ được dùng để hỗ trợ học phí cho các em học sinh – sinh viên có hoàn cảnh khó khăn đang được Quỹ bảo trợ.`,
    date: "18/01/2026",
    image: vongDaImage,
    hotline: "0363816213 (Ms. Hoài) hoặc 0345 721 312 (Ms. Hồng)",
  },
  {
    id: 3,
    slug: "rem-thu-phap",
    name: "Mành chữ thư pháp Thầy Yên Tử",
    priceRange: "350.000đ - 650.000đ",
    excerpt: "Mành treo thư pháp là sự kết hợp hài hòa giữa nghệ thuật thư pháp và chất liệu mộc mạc của tre nứa. Trên nền mành tre tự nhiên, từng nét chữ thư pháp được...",
    description: `Mành chữ thư pháp là sự kết hợp hài hòa giữa nghệ thuật thư pháp và chất liệu mộc mạc của tre nứa.

Trên nền mành tre tự nhiên, từng nét chữ thư pháp được thể hiện đầy tinh tế, mang theo thông điệp sâu sắc về cuộc sống và tâm hồn.

Mành chữ phù hợp trang trí cho không gian thiền tập, phòng khách, quán trà hoặc những góc yên bình trong ngôi nhà.`,
    date: "02/08/2025",
    image: manhThuPhapImage,
    hotline: "0363.816.213 (Ms. Hoài)",
  },
  {
    id: 4,
    slug: "do-luu-niem-lang-mai",
    name: "Đồ lưu niệm Làng Mai",
    priceRange: "50.000đ - 350.000đ",
    excerpt: "Mang hơi thở chánh niệm vào từng món quà nhỏ. Tại Làng Mai, mỗi bước chân, mỗi hơi thở đều là sự trở về với giây phút hiện tại...",
    description: `Quà lưu niệm Làng Mai - Mang hơi thở chánh niệm vào từng món quà nhỏ

Tại Làng Mai, mỗi bước chân, mỗi hơi thở đều là sự trở về với giây phút hiện tại.

Từ tinh thần ấy, những món quà lưu niệm Làng Mai được tạo nên với tình yêu thương và sự chân thành.

Mỗi sản phẩm là một lời nhắc nhở về chánh niệm, về sự an lạc trong từng khoảnh khắc.`,
    date: "02/08/2025",
    image: doLuuNiemImage,
    hotline: "0363.816.213 (Ms. Hoài)",
  },
  {
    id: 5,
    slug: "non-la-bang-thu-phap-hue",
    name: "Nón lá bàng thư pháp Huế",
    priceRange: "250.000đ - 450.000đ",
    excerpt: "🌺 Cây cỏ bàng xứ Huế mang một dáng vẻ rất riêng: thân nhỏ, rỗng ruột, không có phần xốp bên trong như cỏ bàng miền Tây...",
    description: `🌺 Cây cỏ bàng xứ Huế mang một dáng vẻ rất riêng: thân nhỏ, rỗng ruột, không có phần xốp bên trong như cỏ bàng miền Tây.

Với đường kính chỉ khoảng 0,4 cm, cỏ bàng nơi đây tạo nên những chiếc nón lá thanh mảnh, nhẹ nhàng nhưng vô cùng tinh xảo.

Trên nền nón lá truyền thống, từng nét chữ thư pháp được thể hiện, mang theo thông điệp ý nghĩa về cuộc sống và tâm hồn.`,
    date: "02/08/2025",
    image: nonLaBangImage,
    hotline: "0363.816.213 (Ms. Hoài)",
  },
  {
    id: 6,
    slug: "tranh-go-thu-phap-ma-doc-hanh",
    name: "Tranh gỗ thư pháp – Mã Độc Hành",
    priceRange: "350.000đ - 1.200.000đ",
    excerpt: "Tranh gỗ thư pháp là sự kết hợp giữa chất liệu thiên nhiên và tinh thần nghệ thuật truyền thống...",
    description: `Tranh gỗ thư pháp là sự kết hợp giữa chất liệu thiên nhiên và tinh thần nghệ thuật truyền thống.

🧡 Mỗi tấm gỗ với mỗi hình dạng khác nhau, được chọn lựa kỹ lưỡng, giữ lại vân gỗ tự nhiên tạo nên vẻ đẹp mộc mạc nhưng đầy nghệ thuật.

Tranh gỗ thư pháp phù hợp làm quà tặng ý nghĩa hoặc trang trí cho không gian sống, văn phòng, quán trà.`,
    date: "07/06/2025",
    image: tranhGoImage,
    hotline: "0363.816.213 (Ms. Hoài)",
  },
  {
    id: 7,
    slug: "tranh-ve-nghe-thuat",
    name: "Tranh vẽ nghệ thuật",
    priceRange: "500.000đ - 2.500.000đ",
    excerpt: "🎨 Mỗi bức tranh là một khoảnh khắc được giữ lại – bằng màu sắc, cảm xúc và chiều sâu tâm hồn...",
    description: `TRANH VẼ NGHỆ THUẬT

🎨 Mỗi bức tranh là một khoảnh khắc được giữ lại – bằng màu sắc, cảm xúc và chiều sâu tâm hồn.

Tranh không chỉ để ngắm – mà để cảm, bạn có thể tạo điểm nhấn cho không gian sống với những bức tranh mang thông điệp ý nghĩa.

Các tác phẩm được vẽ bởi các họa sĩ tình nguyện, với tình yêu thương và sự sáng tạo.`,
    date: "02/08/2025",
    image: tranhVeImage,
    hotline: "0363.816.213 (Ms. Hoài)",
  },
  {
    id: 8,
    slug: "da-nghe-thuat-thu-phap",
    name: "Đá nghệ thuật thư pháp",
    priceRange: "200.000đ - 800.000đ",
    excerpt: "Đá nghệ thuật thư pháp là sự giao hòa giữa chất liệu tự nhiên và tinh thần phương Đông sâu sắc...",
    description: `Đá nghệ thuật thư pháp là sự giao hòa giữa chất liệu tự nhiên và tinh thần phương Đông sâu sắc.

Từ những viên đá bình dị, nghệ nhân đã thổi hồn vào đá bằng những nét thư pháp thanh thoát.

Mỗi viên đá là một tác phẩm độc nhất, mang theo thông điệp về sự kiên định, bền vững và an nhiên.`,
    date: "03/06/2025",
    image: daNgheThuat,
    hotline: "0363.816.213 (Ms. Hoài)",
  },
];

export const getShopeeProductBySlug = (slug: string): ShopeeProduct | undefined => {
  return shopeeProducts.find((product) => product.slug === slug);
};
