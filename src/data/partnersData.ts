/** Thay `src` bằng logo thật trong `public/partners/` khi có tài sản chính thức. */
export type PartnerLogo = {
  id: string;
  /** Nhãn truy cập / SEO */
  alt: string;
  src: string;
};

export const partnerLogos: PartnerLogo[] = [
  { id: 'p1', alt: 'Partner Unikorn', src: '/partners/p1.png' },
  { id: 'p2', alt: 'Partner PiperFlow', src: '/partners/p2.png' },  
  { id: 'p3', alt: 'Partner', src: '/partners/p3.png' },
];
