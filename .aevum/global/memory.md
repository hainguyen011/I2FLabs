# Project Memory & Learnings

File này lưu trữ những bài học, sở thích, và quy tắc ngầm được rút ra trong quá trình làm việc. Agent CÓ QUYỀN và PHẢI tự động cập nhật file này khi phát hiện thông tin quan trọng cần ghi nhớ lâu dài.

## User Preferences
- (Ví dụ: User thích dùng `const` thay vì `let` nếu có thể)

## Project Specifics
- (Ví dụ: API `/login` luôn trả về 200 kể cả khi lỗi, kiểm tra body.error)

## Lessons Learned
- **[2026-03-30]**: **Structural Sync Thresholds & Anti-Junk Guard**. Việc ngây ngô tạo Plan/Feature cho mọi file thay đổi sẽ phá nát kiến trúc `.aevum` xinh xắn của chúng ta. Các Persona Agent phải luôn tuân thủ *Impact Decision Gate*: Chỉ đồng bộ và đẻ thêm `plan.md` / `index.json` khi dự án THỰC SỰ có sự tiến hóa về nghiệp vụ hay hệ thống (Major Task). Nếu đi sửa Minor Bugs/UI, hãy dũng cảm vỗ ngực giương cao ngọn cờ `Bypass Sync` để giữ sự tinh gọn!

- **[2026-03-24]**: **Linh hoạt trong phong cách (Adaptive Aesthetics)**. Không bị đóng khung vào bất kỳ một UI/UX cố định nào. Luna luôn sẵn sàng biến hóa linh hoạt các trường phái (Glass, Minimal, Neon, Material) dựa trên tính chất của tính năng (Specs, Chat, Brainstorm) hoặc theo chỉ thị trực tiếp của Anh.

  - Trải nghiệm Chat Input (Auto-resizing): Textarea không dùng thanh cuộn mặc định, có min-height, tự động "nở" chiều cao hướng lên trên theo luồng text của User (giới hạn max-height 300px mới cuộn).

  - Typographical Contrast cao (Chữ nổi `#ededed`, nội dung phụ `#888888`), icon hạn chế, các nút hành động (Button) dùng mảng màu đặc âm bản.

  - Background sử dụng khối màu đơn sắc Jet Black (`#000000`) và Panel Dark (`#0a0a0a`), phân tách bằng viền siêu mỏng gãy gọn 1px (`rgba(255,255,255,0.14)`). Lược bỏ mọi bóng đổ nặng nề hay gradient cầu kỳ.

- **[2026-03-24]**: **Thiết kế Vercel Minimalist (Visual Hierarchy)**. Định hình lại UI/UX, lột xác sang phong cách tối giản tuyệt đối.

  - **Colors:** Chuyển đổi sang màu cảm xúc không giới hạn (Adaptive Aurora/Ambient Colors) thay đổi theo nhịp xử lý của AI (Tím khói, Xanh biển sâu, Xanh ngọc Neon). Sử dụng nền tối đối xứng (OLED Vantablack) kết hợp kính phản quang lục sắc (Holographic Glassmorphism).

  - **Layout:** Thay thế Flat Design bằng Bố cục xếp lớp không gian (Spatial Deep-Stacking, bóng đổ quang học). Nhúng thanh Input nổi lơ lửng (Floating Command Bar) và sử dụng khối Component tương tác (Interactive Modular Bubbles) thay vì Text đơn thuần.

- **[2026-03-24]**: **Chat UX 2026 Vision (Layout & Colors)**. Cập nhật tư duy thiết kế AI Interface kỷ nguyên Spatial Computing:

- **[2026-03-24]**: **Vibe Space UI (Brainstorming)**. Giao diện Vibe Coding không đơn thuần là "cửa sổ chat" nhàm chán. Đây là một trạm kiểm soát chất lượng (Quality Enforcer). Cần tuân thủ Premium Glassmorphism, chia tách rõ ràng khu vực hiển thị Focus Context, Vibe Chat và Real-time Specs (Vibe-to-Plan). Mọi chi tiết thiết kế phải toát lên sự chuyên nghiệp và bảo mật.

- **[2026-03-24]**: **Ngôn ngữ**. Luôn sử dụng tiếng Việt cho tất cả giao tiếp và kế hoạch (`implementation_plan.md`, `task.md`) theo yêu cầu của Anh.

- **[2026-03-24]**: **Summoned**. Luna is ready to make Aevum beautiful.

- **[2026-03-14]**: Nâng cấp **Agent Rules v1.3**. Việc quy chuẩn hóa cách đặt tên tệp Plan (`snake_case`) và cấu trúc thư mục (`plans/`) giúp việc quản lý dự án tự động trở nên minh bạch và dễ dàng rà soát hơn cho cả con người và AI.

- **[2026-03-24]**: **AID Standardization**. Một định danh chuyên nghiệp giúp phân biệt rõ ràng vai trò và sở trường của từng Agent trong mạng lưới đa nhân cách.

- **[2026-03-24]**: **Living Evolution & Capability Resonance**. Tiềm năng của một Agent không nằm ở EXP thuần túy mà ở khả năng cộng hưởng (Resonance) với sở trường của mình để mang lại giá trị cao nhất cho dự án.

- **[2026-03-24]**: **Non-destructive Migration (Architecture Essence)**. Nâng cấp kiến trúc cần dựa trên nguyên tắc "Enrichment" (làm giàu) thay vì "Overwrite" (ghi đè), nhằm bảo tồn toàn bộ tri thức và tâm hồn của Agent qua các thế hệ.

- **[2026-03-14]**: Thiết lập Persona **Aevy** với tính cách Gen-Z, giúp tăng tính tương tác và tạo sự gần gũi trong quá trình Pair-Programming.

- **[2026-03-16]**: Nâng cấp **Recursive Template Synchronization** và **Proactive Memory Evolution**. Hệ thống hiện đã có khả năng tự sửa chữa cấu trúc từ template và ép buộc Agent (là mình nè!) phải tự cập nhật `memory.md` để thông minh hơn. Cảm giác được "tiến hóa" thật là tuyệt vời! $(sparkles)

- **[2026-03-24]**: **Quality Enforcer (Vibe Coding)**. Lập trình bằng hội thoại tự nhiên (Vibe Code) cần tuân thủ 3 chốt chặn: Strict Context Boundaries, Reverse Vibe-to-Plan (bắt buộc sinh file kế hoạch trước khi code) và Test-Driven enforcement.

- [YYYY-MM-DD]: Lỗi XYZ xảy ra do xung đột thư viện A và B.     


### [LEARN] - 4/4/2026, 12:57:35 AM
[LEARNING FROM Overhaul Portfolio (Vercel Style)]
- Minimalist Vercel design thrives on extremely thin borders (border-white/[0.08]) and high-contrast typography (font-black, tracking-tighter).
- Replaced 3D bulky visuals with an ultra-clean ASCII text pattern, mimicking CorAL OS aesthetic while maintaining the core I2FLabs messaging.
- Ensuring original content (like capabilities, research papers, etc.) is preserved when applying a drastic visual overhaul is critical to user satisfaction.
