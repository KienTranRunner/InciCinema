"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ThanhVienPage() {
  return (
    <div className="w-full mx-auto p-6 space-y-12 bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight"
      >
        🎫 Chương Trình Thành Viên Inci Cinema Membership
      </motion.h1>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative w-full rounded-xl overflow-hidden shadow-lg"
      >
        <Image
          src="https://touchcinema.com/storage/tichdiem-3112-02-1.png"
          alt="Touch Cinema Membership"
          
          className="object-contain"
          priority
          width={1500}
          height={900}
        />        
      </motion.div>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="prose prose-invert max-w-full"
      >
        <h2 className="text-2xl font-bold mb-4">
          Thể lệ và quy định về chương trình thành viên Touch Cinema
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          1. Cách đăng ký để trở thành khách hàng thành viên Touch Cinema
        </h3>
        <p>
          Nơi đăng ký bắt buộc: Quầy vé Touch Cinema (LÀM THẺ HOÀN TOÀN MIỄN
          PHÍ)
          <br />
          Thông tin đăng ký cần có: Họ và tên, Số điện thoại, Số CMND, Ngày sinh
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            1 SĐT/CMND chỉ đăng ký được duy nhất 1 tài khoản/1 thẻ thành viên
            với 1 mã số duy nhất
          </li>
          <li>Tài khoản được quyền sử dụng ngay</li>
          <li>
            Trong trường hợp mất thẻ thành viên cần mang CMND đến quầy để làm
            lại thẻ
          </li>
        </ul>
        <p className="mt-2 font-semibold">
          Để kích hoạt thành viên online và mua vé với giá ưu đãi:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Tài khoản online đăng ký số điện thoại trùng với số điện thoại mà
            bạn đã đăng ký thẻ thành viên (trùng cả về đầu số).
          </li>
          <li>
            Số điện thoại của tài khoản online phải được xác thực trong mục Tài
            khoản online.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          2. Hướng dẫn thể lệ tích điểm
        </h3>
        <p>1.000 đồng = 1 điểm</p>
        <p>
          Bạn có thể dễ dàng kiểm tra điểm của mình trên Website Touch Cinema
          hoặc Ứng dụng Touch Cinema trên điện thoại (với điều kiện phải thực
          hiện kích hoạt thành viên online)
        </p>

        <h4 className="font-semibold mt-4">Các hạng thẻ và quyền lợi:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Touch Member (0 – 3,499 điểm):</strong> Đăng kí mới được
            cộng ngay 100 điểm, cộng thêm 3% bắp nước và 5% vé.
          </li>
          <li>
            <strong>Touch VIP (3,500 – 7,999 điểm):</strong> Tặng 1 combo (1
            nước + 1 bắp), 3 vé 2D, cộng 3% bắp nước và 7% vé.
          </li>
          <li>
            <strong>Touch Diamond (8,000+ điểm):</strong> Tặng 2 combo (2 nước +
            2 bắp), 5 vé 2D, cộng 5% bắp nước và 10% vé.
          </li>
        </ul>
        <p>
          Khách hàng được nâng hạng tự động khi đủ điểm, cần đến quầy đổi thẻ và
          nhận quà trước khi điểm reset cuối năm.
        </p>
        <p>
          Hạng thẻ năm tiếp theo được tính dựa trên điểm tích lũy tại 31/12 hàng
          năm.
        </p>

        {/* Ảnh 2 */}
        <div className="relative w-full my-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://touchcinema.com/storage/tichdiem-3112-01.png"
            alt="Quà tặng thành viên Touch Cinema"
            width={1500}
          height={900}
            className="object-contain"
            priority
          />
        </div>

        <h3 className="text-xl font-semibold mt-6">
          3. Quà sinh nhật thành viên
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Touch Member:</strong> 1 combo (1 nước + 1 bắp)
          </li>
          <li>
            <strong>Touch VIP:</strong> 1 combo (2 nước + 1 bắp) + 1 vé 2D
          </li>
          <li>
            <strong>Touch Diamond:</strong> 1 combo (2 nước + 1 bắp) + 2 vé 2D
          </li>
        </ul>
        <p>
          Thời gian nhận quà trong vòng 10 ngày kể từ ngày sinh nhật, nhận trực
          tiếp tại rạp, phải có ít nhất 1 giao dịch trong năm và xuất trình
          CMND/thẻ thành viên. Quà có giá trị 1 tháng, không quy đổi thành tiền
          mặt.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          4. Điều kiện sử dụng điểm
        </h3>
        <p>Điểm tích lũy dùng để xét cấp hạng, điểm thưởng dùng để đổi quà.</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Khi đổi thưởng, điểm tích lũy giữ nguyên, chỉ trừ điểm thưởng.
          </li>
          <li>
            Điểm và quà chỉ có giá trị sử dụng trong năm, reset về 0 ngày 31/12.
          </li>
          <li>
            Quà đổi thưởng có giá trị trong ngày đổi, đổi tại quầy hoặc online.
          </li>
          <li>Không quy đổi thành tiền mặt hay chuyển nhượng.</li>
          <li>Phải cung cấp CMND hoặc thẻ thành viên khi nhận quà.</li>
          <li>Thông tin chương trình có thể thay đổi mà không báo trước.</li>
        </ul>

        <h4 className="font-semibold mt-4">Bảng quy đổi điểm thưởng:</h4>
        <table className="table-auto border-collapse border border-gray-600 w-full text-gray-300">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-3 py-1 text-left">
                Điểm
              </th>
              <th className="border border-gray-600 px-3 py-1 text-left">
                Phần quà
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["450 điểm", "1 nước Aquafina"],
              ["500 điểm", "1 nước ngọt"],
              ["550 điểm", "1 nước ngọt lớn"],
              ["700 điểm", "1 bắp ngọt"],
              ["800 điểm", "1 bắp phô mai/ caramel"],
              ["1100 điểm", "1 nước ngọt + 1 bắp ngọt"],
              ["1150 điểm", "1 nước ngọt lớn + 1 bắp ngọt"],
              ["1200 điểm", "1 nước ngọt + 1 bắp phô mai/ caramel"],
              ["1250 điểm", "1 nước ngọt lớn + 1 bắp phô mai/ caramel"],
              ["1500 điểm", "2 nước ngọt + 1 bắp ngọt"],
              [
                "1600 điểm",
                "2 nước ngọt + 1 bắp phô mai/ caramel HOẶC 2 nước ngọt lớn + 1 bắp ngọt",
              ],
              ["1700 điểm", "2 nước ngọt lớn + 1 bắp phô mai/ caramel"],
              ["1000 điểm", "1 vé 2D"],
              ["1200 điểm", "1 vé 3D"], 
            ].map(([point, reward], idx) => (
              <tr
                key={`${point}-${idx}`}
                className="odd:bg-gray-900 even:bg-gray-800"
              >
                <td className="border border-gray-600 px-3 py-1">{point}</td>
                <td className="border border-gray-600 px-3 py-1">{reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>
    </div>
  );
}
