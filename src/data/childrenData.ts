// Import child images
import bt01Image from "/assets/children/bt01-the-chung.jpg";
import bt04Image from "/assets/children/bt04-hong-anh.jpg";
import bt10Image from "/assets/children/bt10-thanh-thien.jpg";
import bt15Image from "/assets/children/bt15-ngoc-anh.jpg";
import bt16Image from "/assets/children/bt16-thanh-xuan.jpg";
import bt17Image from "/assets/children/bt17-ho-van-noi.jpg";
import bt18Image from "/assets/children/bt18-tieu-ngoc.jpg";
import bt19Image from "/assets/children/bt19-thanh-an.jpg";
import bt20Image from "/assets/children/bt20-thanh-thuy.jpg";
import bt21Image from "/assets/children/bt21-diem-my.jpg";
import bt23Image from "/assets/children/bt23-ngoc-thuy.jpg";
import bt25Image from "/assets/children/bt25-hong-hanh.jpg";
import bt26Image from "/assets/children/bt26-ngan-ha.jpg";
import bt27Image from "/assets/children/bt27-trong-nghia.jpg";
import bt32Image from "/assets/children/bt32-nhu-y.jpg";
import bt33Image from "/assets/children/bt33-van-vi.jpg";
import bt36Image from "/assets/children/bt36-trong-phuc.jpg";
import bt37Image from "/assets/children/bt37-bao-tran.jpg";
import bt38Image from "/assets/children/bt38-gia-han.jpg";
import bt39Image from "/assets/children/bt39-thuy-linh.jpg";
import bt40Image from "/assets/children/bt40-thanh-truc.jpg";
import bt41Image from "/assets/children/bt41-ngoc-nhi-ngoc-diep.jpg";
import bt42Image from "/assets/children/bt42-hanh-nguyen-tuyet-ngan.jpg";

export interface Child {
  id: string;
  slug: string;
  name: string;
  gender: string;
  location: string;
  birthYear: string | number;
  situation?: string;
  sponsorStart?: string;
  sponsorEnd?: string;
  image: string;
  story?: string;
  sponsorshipDetails?: {
    period: string;
    items: { label: string; amount: string }[];
    total: string;
  };
  note?: string;
  isNew?: boolean;
}

export const children: Child[] = [
  {
    id: "BT01",
    slug: "bt01-trinh-the-chung",
    name: "TRỊNH THẾ CHUNG",
    gender: "Nam",
    location: "Bắc Ninh",
    birthYear: 2005,
    situation: "Mồ côi cả cha và mẹ",
    sponsorStart: "06/2018",
    sponsorEnd: "4/2025",
    image: bt01Image,
    sponsorshipDetails: {
      period: "10/2022 – 09/2023",
      items: [
        { label: "Chi phí học lớp 12 năm học 2022-2023", amount: "4.500.000₫" },
        { label: "Chi phí học thêm, sinh hoạt (9 tháng)", amount: "4.500.000₫" },
        { label: "Chi phí mua sách, đồ dùng học tập và thưởng", amount: "2.000.000₫" },
      ],
      total: "11.000.000₫",
    },
    note: "06/2024: Quỹ Vicaris thưởng cuối năm học 2023-2024: 500.000₫. Thế Chung cúng dường trồng 5 cây chiên đàn: 275.000₫",
  },
  {
    id: "BT04",
    slug: "bt04-phan-thi-hong-phan-thi-anh",
    name: "PHAN THỊ HỒNG – PHAN THỊ ÁNH",
    gender: "Nữ",
    location: "Nghệ An",
    birthYear: "Ánh (2007), Hồng (2003)",
    image: bt04Image,
  },
  {
    id: "BT10",
    slug: "bt10-tran-thanh-thien",
    name: "TRẦN THANH THIÊN",
    gender: "Nữ",
    location: "Bắc Ninh",
    birthYear: 2006,
    situation: "Hoàn cảnh gia đình khó khăn",
    sponsorStart: "9/2019",
    image: bt10Image,
  },
  {
    id: "BT15",
    slug: "bt15-nguyen-thi-ngoc-anh",
    name: "NGUYỄN THỊ NGỌC ANH",
    gender: "Nữ",
    location: "Bắc Ninh",
    birthYear: 2006,
    sponsorStart: "9/2020",
    image: bt15Image,
  },
  {
    id: "BT16",
    slug: "bt16-nguyen-thi-thanh-xuan",
    name: "NGUYỄN THỊ THANH XUÂN",
    gender: "Nữ",
    location: "Bắc Ninh",
    birthYear: 2010,
    sponsorStart: "9/2020",
    image: bt16Image,
  },
  {
    id: "BT17",
    slug: "bt17-ho-van-noi-ho-thi-ha-ho-van-nam-ho-tra-my",
    name: "HỒ VĂN NỘI – HỒ THỊ HÀ – HỒ VĂN NAM – HỒ TRÀ MY",
    gender: "Nam/Nữ",
    location: "Quảng Trị",
    birthYear: 2010,
    sponsorStart: "2019",
    image: bt17Image,
  },
  {
    id: "BT18",
    slug: "bt18-le-tieu-ngoc",
    name: "LÊ TIỂU NGỌC",
    gender: "Nữ",
    location: "Đắk Lắk",
    birthYear: 1997,
    sponsorStart: "2020",
    sponsorEnd: "2023",
    image: bt18Image,
  },
  {
    id: "BT19",
    slug: "bt19-phan-thanh-thanh-an",
    name: "PHAN THANH THANH AN",
    gender: "Nữ",
    location: "Bến Tre",
    birthYear: 2007,
    sponsorStart: "2021",
    sponsorEnd: "6/2024",
    image: bt19Image,
  },
  {
    id: "BT20",
    slug: "bt20-tran-ngo-thanh-thuy",
    name: "TRẦN NGÔ THANH THÚY",
    gender: "Nữ",
    location: "Tiền Giang",
    birthYear: 2008,
    sponsorStart: "05/2022",
    image: bt20Image,
  },
  {
    id: "BT21",
    slug: "bt21-le-thi-diem-my",
    name: "LÊ THỊ DIỄM MY",
    gender: "Nữ",
    location: "Tiền Giang",
    birthYear: 2008,
    sponsorStart: "2022",
    image: bt21Image,
  },
  {
    id: "BT23",
    slug: "bt23-diep-ngoc-thuy",
    name: "DIỆP NGỌC THỦY",
    gender: "Nữ",
    location: "Tiền Giang",
    birthYear: 2006,
    sponsorStart: "05/2022",
    image: bt23Image,
  },
  {
    id: "BT25",
    slug: "bt25-nguyen-thi-hong-hanh",
    name: "NGUYỄN THỊ HỒNG HẠNH",
    gender: "Nữ",
    location: "Đắk Lắk",
    birthYear: 2008,
    sponsorStart: "05/2022",
    image: bt25Image,
  },
  {
    id: "BT26",
    slug: "bt26-huynh-pham-ngan-ha",
    name: "HUỲNH PHẠM NGÂN HÀ",
    gender: "Nữ",
    location: "Khánh Hòa",
    birthYear: 2007,
    sponsorStart: "07/2022",
    image: bt26Image,
    story: "Em mất mẹ năm học lớp 2, mất cha năm lớp 5, ở với bà nội tại căn nhà của cha mẹ để lại. Cuối năm 2022 bà em bị ung thư qua đời. Em ở một mình, có ngoại và cậu thường tới lui chăm sóc. Em luôn đạt thành tích học sinh giỏi những năm cấp 2, lên lớp 10 sức khỏe em có phần suy yếu, dù cố gắng học nhưng chỉ đạt thành tích học sinh khá. Em ngoan và chăm chỉ, em vẽ rất đẹp. Mùa hè năm 2023, em vào tu viện Khánh An 1 tháng để tu tập và tham gia hoạt động trồng cây xanh.",
    sponsorshipDetails: {
      period: "10/2025 – 09/2026",
      items: [
        { label: "Chi phí học Đại học", amount: "13.200.000₫" },
        { label: "Chi phí thuê trọ (11 tháng)", amount: "11.700.000₫" },
        { label: "Chi phí các hoạt động tại trường", amount: "1.000.000₫" },
        { label: "Chi phí khi đau ốm, sách, thưởng, Tết", amount: "2.000.000₫" },
      ],
      total: "27.900.000₫",
    },
  },
  {
    id: "BT27",
    slug: "bt27-phan-huynh-trong-nghia",
    name: "PHAN HUỲNH TRỌNG NGHĨA",
    gender: "Nam",
    location: "Sóc Trăng",
    birthYear: 2007,
    sponsorStart: "09/2022",
    image: bt27Image,
  },
  {
    id: "BT32",
    slug: "bt32-nguyen-ngoc-nhu-y",
    name: "NGUYỄN NGỌC NHƯ Ý",
    gender: "Nữ",
    location: "An Giang",
    birthYear: 2006,
    sponsorStart: "09/2023",
    image: bt32Image,
  },
  {
    id: "BT33",
    slug: "bt33-huynh-van-vi",
    name: "HUỲNH VĂN VĨ",
    gender: "Nam",
    location: "An Giang",
    birthYear: 2006,
    sponsorStart: "09/2023",
    image: bt33Image,
  },
  {
    id: "BT36",
    slug: "bt36-vo-trong-phuc",
    name: "VÕ TRỌNG PHÚC",
    gender: "Nam",
    location: "Bến Tre",
    birthYear: 2009,
    sponsorStart: "09/2024",
    image: bt36Image,
    isNew: true,
  },
  {
    id: "BT37",
    slug: "bt37-nguyen-thi-bao-tran",
    name: "NGUYỄN THỊ BẢO TRÂN",
    gender: "Nữ",
    location: "Kiên Giang",
    birthYear: 2012,
    sponsorStart: "11/2024",
    image: bt37Image,
    isNew: true,
  },
  {
    id: "BT38",
    slug: "bt38-vo-duong-ngoc-gia-han",
    name: "VÕ DƯƠNG NGỌC GIA HÂN",
    gender: "Nữ",
    location: "Kiên Giang",
    birthYear: 2011,
    sponsorStart: "11/2024",
    image: bt38Image,
    isNew: true,
  },
  {
    id: "BT39",
    slug: "bt39-hoang-ngoc-thuy-linh",
    name: "HOÀNG NGỌC THÙY LINH",
    gender: "Nữ",
    location: "Đồng Nai",
    birthYear: 2012,
    sponsorStart: "3/2025",
    image: bt39Image,
  },
  {
    id: "BT40",
    slug: "bt40-pham-thanh-truc",
    name: "PHẠM THANH TRÚC",
    gender: "Nữ",
    location: "Đồng Nai",
    birthYear: 2011,
    sponsorStart: "3/2025",
    image: bt40Image,
  },
  {
    id: "BT41",
    slug: "bt41-phung-ngoc-nhi-phung-ngoc-diep",
    name: "PHÙNG NGỌC NHI – PHÙNG NGỌC DIỆP",
    gender: "Nữ",
    location: "TP.HCM",
    birthYear: "Nhi (2009), Diệp (2013)",
    sponsorStart: "9/2025",
    image: bt41Image,
  },
  {
    id: "BT42",
    slug: "bt42-nguyen-hanh-nguyen-nguyen-huynh-tuyet-ngan",
    name: "NGUYỄN HẠNH NGUYÊN – NGUYỄN HUỲNH TUYẾT NGÂN",
    gender: "Nữ",
    location: "Đồng Tháp",
    birthYear: "Hạnh Nguyên (2007), Tuyết Ngân (2009)",
    sponsorStart: "9/2025",
    image: bt42Image,
  },
];

export const getChildBySlug = (slug: string): Child | undefined => {
  return children.find((child) => child.slug === slug);
};

export const getProvinces = (): string[] => {
  const provinces = [...new Set(children.map((child) => child.location))];
  return provinces.sort();
};
