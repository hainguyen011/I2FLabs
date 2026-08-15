/** Thay `src` bằng logo thật trong `public/partners/` khi có tài sản chính thức. */
export type PartnerLogo = {
  id: string;
  /** Nhãn truy cập / SEO */
  alt: string;
  src: string;
  url: string;
};

export const partnerLogos: PartnerLogo[] = [
  { id: 'p1', alt: 'Partner Unikorn', src: '/partners/p1.png', url: 'https://unikorn.vn/' },
  { id: 'p3', alt: 'Partner', src: '/partners/p3.png', url: '' },
  { id: 'p2', alt: 'Partner PiperFlow', src: '/partners/p2.png', url: 'https://piperflow.io.vn/' },

];
