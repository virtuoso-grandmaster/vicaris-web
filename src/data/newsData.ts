// Import news images
import tinhThuongAmLaiImage from "/assets/news/tinh-thuong-am-lai.jpg";
import hongHanhSuMenhImage from "/assets/news/hong-hanh-su-menh.jpg";
import thanhXuanThoiQuenImage from "/assets/news/thanh-xuan-thoi-quen.jpg";
import thanhThuyHoanHaoImage from "/assets/news/thanh-thuy-hoan-hao.jpg";
import hocTroNgheoLichSuImage from "/assets/news/hoc-tro-ngheo-lich-su.jpg";
import caSiGayQuyImage from "/assets/news/ca-si-gay-quy.jpg";
import baoTroDongThapImage from "/assets/news/bao-tro-dong-thap.jpg";
import banhTrungThuImage from "/assets/news/banh-trung-thu.jpg";
import gieoHatAnGiangImage from "/assets/news/gieo-hat-an-giang.jpg";
import vesak2025Image from "/assets/news/vesak-2025.jpg";
import toaDamYeuThuongImage from "/assets/news/toa-dam-yeu-thuong.jpg";
import thuKhoaDaiHocImage from "/assets/news/thu-khoa-dai-hoc.jpg";

export type NewsCategory = 
  | "goc-chia-se" 
  | "hoat-dong-xa-hoi" 
  | "du-an-xa-hoi" 
  | "giao-duc" 
  | "tin-tuc"
  | "bao-ve-moi-truong";

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  categoryLabel: string;
  image: string;
  author?: string;
  featured?: boolean;
}

export const categoryLabels: Record<NewsCategory, string> = {
  "goc-chia-se": "Góc chia sẻ",
  "hoat-dong-xa-hoi": "Hoạt động xã hội",
  "du-an-xa-hoi": "Dự án xã hội",
  "giao-duc": "Giáo dục",
  "tin-tuc": "Tin tức",
  "bao-ve-moi-truong": "Bảo vệ môi trường",
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: "tinh-thuong-am-lai-thay-tue-dat-chia-se",
    title: "Tình thương ấm lại – Thầy Tuệ Đạt chia sẻ trang lòng về buổi gặp mặt mạnh thường quân bảo trợ cho BT26 Ngân Hà",
    excerpt: "Cơn bão đi qua để lại cho mỗi tâm hồn một chút đau đáu, ngậm ngùi, bởi câu chuyện nào cũng nức nở những bề bộn. Đã trải qua rồi mới tỏ được ngồi yên là một phép mầu, một phép mầu bình lặng trong cuộc lữ vốn \"chuộng\" lao xao...",
    date: "21/01/2026",
    category: "goc-chia-se",
    categoryLabel: "Góc chia sẻ",
    image: tinhThuongAmLaiImage,
    author: "vicaris",
    featured: true,
  },
  {
    id: 2,
    slug: "hoat-dong-trong-mot-nu-cuoi-hong-hanh",
    title: "Hoạt động \"Trồng một nụ cười\" | Bài cảm nhận của em Hồng Hạnh (Đắk Lắk) về chủ đề \"Làm thế nào để tìm ra sứ mệnh của mình\"",
    excerpt: "Trong hành trình trưởng thành, có lẽ ai cũng từng trăn trở về sứ mệnh của đời mình. Bài đọc đã mở ra cho em nhiều suy ngẫm về việc tìm kiếm mục đích sống...",
    date: "30/12/2025",
    category: "goc-chia-se",
    categoryLabel: "Góc chia sẻ",
    image: hongHanhSuMenhImage,
    author: "vicaris",
  },
  {
    id: 3,
    slug: "hoat-dong-trong-mot-nu-cuoi-thanh-thien",
    title: "Hoạt động \"Trồng một nụ cười\" | Bài cảm nhận của Thanh Thiên (Bắc Ninh) về chủ đề \"Chấp nhận mình chưa hoàn hảo chính là khởi đầu cho sự an lành\"",
    excerpt: "Là một sinh viên năm hai nhóm ngành Kinh tế, em hay được dạy về những mô hình tối ưu. Nhưng cuộc sống không phải bài toán có đáp số hoàn hảo...",
    date: "30/12/2025",
    category: "goc-chia-se",
    categoryLabel: "Góc chia sẻ",
    image: thanhThuyHoanHaoImage,
    author: "vicaris",
  },
  {
    id: 4,
    slug: "hoat-dong-trong-mot-nu-cuoi-thanh-xuan",
    title: "Hoạt động \"Trồng một nụ cười\" | Bài cảm nhận của em Thanh Xuân (Bắc Ninh) về chủ đề \"4 bước loại bỏ thói quen xấu\"",
    excerpt: "Sau khi xem video \"4 bước loại bỏ thói quen xấu\", con hiểu thêm nhiều điều về bản thân. Trước đây con hay trì hoãn và không biết cách thay đổi...",
    date: "29/12/2025",
    category: "goc-chia-se",
    categoryLabel: "Góc chia sẻ",
    image: thanhXuanThoiQuenImage,
    author: "vicaris",
  },
  {
    id: 5,
    slug: "co-hoc-tro-ngheo-doi-tuyen-lich-su",
    title: "Cô học trò nghèo từ tình yêu sử Việt đến đội tuyển học sinh giỏi quốc gia môn Lịch sử",
    excerpt: "Từ căn nhà thuê nhỏ bé, cô học trò nghèo đã vươn lên bằng niềm đam mê với môn Lịch sử và sự hỗ trợ của Quỹ Vicaris...",
    date: "03/11/2025",
    category: "hoat-dong-xa-hoi",
    categoryLabel: "Hoạt động xã hội",
    image: hocTroNgheoLichSuImage,
    author: "vicaris",
  },
  {
    id: 6,
    slug: "ca-si-sa-huynh-gay-quy",
    title: "Ca sĩ Sa Huỳnh và Hoàng Sanh chung tay gây quỹ giúp học sinh, sinh viên đến trường",
    excerpt: "Chương trình livestream gây quỹ đặc biệt với sự tham gia của ca sĩ Sa Huỳnh và Hoàng Sanh đã mang lại nguồn hỗ trợ quý giá...",
    date: "06/10/2025",
    category: "hoat-dong-xa-hoi",
    categoryLabel: "Hoạt động xã hội",
    image: caSiGayQuyImage,
    author: "vicaris",
  },
  {
    id: 7,
    slug: "bao-tro-hcm-dong-thap",
    title: "Quỹ Vicaris bảo trợ giáo dục đến 4 học sinh, sinh viên khó khăn tại TP.HCM và Đồng Tháp",
    excerpt: "Tiếp nối hành trình gieo hạt hiểu thương, Quỹ Vicaris đã thực hiện bảo trợ cho 4 em học sinh, sinh viên tại TP.HCM và Đồng Tháp...",
    date: "03/11/2025",
    category: "hoat-dong-xa-hoi",
    categoryLabel: "Hoạt động xã hội",
    image: baoTroDongThapImage,
    author: "vicaris",
  },
  {
    id: 8,
    slug: "ban-banh-trung-thu-gay-quy",
    title: "Vị thầy trẻ tổ chức bán bánh trung thu gây quỹ học bổng",
    excerpt: "Chương trình bán bánh trung thu gây quỹ của Quỹ Bảo trợ giáo dục Vicaris nhằm giúp trẻ nghèo đến trường năm 2025...",
    date: "25/09/2025",
    category: "hoat-dong-xa-hoi",
    categoryLabel: "Hoạt động xã hội",
    image: banhTrungThuImage,
    author: "vicaris",
  },
  {
    id: 9,
    slug: "gian-hang-vesak-2025",
    title: "🌿 GIAN HÀNG GÂY QUỸ CỦA QUỸ BẢO TRỢ GIÁO DỤC VICARIS TẠI LỄ HỘI VĂN HOÁ PHẬT GIÁO CHÀO MỪNG ĐẠI LỄ VESAK 2025 🌸",
    excerpt: "Gian hàng gây quỹ của Vicaris đã chính thức có mặt tại Lễ hội văn hóa Phật giáo Vesak 2025...",
    date: "27/05/2025",
    category: "du-an-xa-hoi",
    categoryLabel: "Dự án xã hội",
    image: vesak2025Image,
    author: "vicaris",
  },
  {
    id: 10,
    slug: "toa-dam-ket-yeu-thuong",
    title: "TỌA ĐÀM KẾT YÊU THƯƠNG TẠO THAY ĐỔI",
    excerpt: "Nhân ngày Doanh nhân VN 13.10, trong khuôn khổ cuộc thi Sống đẹp lần 3 Báo Thanh Niên tổ chức...",
    date: "06/10/2023",
    category: "du-an-xa-hoi",
    categoryLabel: "Dự án xã hội",
    image: toaDamYeuThuongImage,
    author: "vicaris",
  },
  {
    id: 11,
    slug: "gieo-hat-an-giang",
    title: "Gieo hạt hiểu thương ở mảnh đất bình dị An Giang",
    excerpt: "Có những hành trình đưa ta đến vùng đất mới, gặp gỡ con người mới và từ đó cho ta những trải nghiệm đáng nhớ...",
    date: "16/09/2023",
    category: "du-an-xa-hoi",
    categoryLabel: "Dự án xã hội",
    image: gieoHatAnGiangImage,
    author: "vicaris",
  },
  {
    id: 12,
    slug: "thu-khoa-7-nam-gieo-hat",
    title: "Thủ khoa kỳ thi Đại học và 7 năm hành trình gieo hạt hiểu thương",
    excerpt: "\"Thầy ơi con chia sẻ với thầy ạ. Con được thủ khoa khối C00 của tỉnh Bà Rịa Vũng Tàu...\"",
    date: "21/07/2025",
    category: "goc-chia-se",
    categoryLabel: "Góc chia sẻ",
    image: thuKhoaDaiHocImage,
    author: "vicaris",
  },
];

export const getNewsByCategory = (category: NewsCategory): NewsItem[] => {
  return newsItems.filter((item) => item.category === category);
};

export const getFeaturedNews = (): NewsItem | undefined => {
  return newsItems.find((item) => item.featured);
};

export const getLatestNews = (limit: number = 5): NewsItem[] => {
  return [...newsItems]
    .sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('-');
      const dateB = b.date.split('/').reverse().join('-');
      return dateB.localeCompare(dateA);
    })
    .slice(0, limit);
};

export const getNewsBySlug = (slug: string): NewsItem | undefined => {
  return newsItems.find((item) => item.slug === slug);
};
