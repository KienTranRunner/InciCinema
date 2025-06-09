"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GioiThieuPage() {
  return (
    <div className="w-full mx-auto p-6 space-y-12 bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight"
      >
        Inci Cinema Gia Lai
      </motion.h1>


      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="prose prose-invert max-w-full"
      >
       
        <p>
        Hệ thống rạp TouchCinema tọa lạc tại trung tâm TP. Pleiku, được trang bị với tổng số 600 ghế ngồi, 4 màn hình cong kích thước lớn với chất lượng hình ảnh theo tiêu chuẩn quốc tế, Touch Cinema đem lại cho người yêu điện ảnh cảm giác thỏa mãn về thị giác khi thưởng thức những pha hành động gay cấn hay các khung hình đắt giá, tuyệt đẹp trong phim.
        </p>
        
        <p >
        Hệ thống âm thanh hiện đại DOLBY Digital – được các nhà sản xuất phim lớn trên thế giới công nhận, tại TouchCinema, bạn được chúng tôi truyền đạt cảm xúc âm thanh đích thực từ tác phẩm điện ảnh.        </p>
       

       
        <p>TouchCinema luôn hướng đến một môi trường giải trí thanh lịch và thân thiện, tạo cho bạn cảm giác thoải mái và gần gũi khi thưởng thức cà phê, ăn nhẹ, cùng xem một bộ phim với người yêu, bạn bè hay người thân trong gia đình.</p>
        <p>
          Bạn có thể dễ dàng kiểm tra điểm của mình trên Website Touch Cinema
          hoặc Ứng dụng Touch Cinema trên điện thoại (với điều kiện phải thực
          hiện kích hoạt thành viên online)
        </p>

       
        <p>
        Và đặc biệt hơn hết, chi phí thân thiện tại TouchCinema tạo điều kiện cho bạn thưởng thức nhiều tác phẩm điện ảnh lớn của Việt Nam và thế giới trên màn ảnh rộng mà không sợ tốn kém.


        </p>
  
        <div className="relative w-full  my-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://touchcinema.com/storage/01-2019/untitled-1558685148.png"
            alt="Quà tặng thành viên Touch Cinema"
            className="object-contain"
            priority
            width={1500}
            height={600}
          />
        </div>
        <div className="relative w-full  my-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://touchcinema.com/storage/01-2019/9331c0a02842cd1c9453.jpg"
            alt="Quà tặng thành viên Touch Cinema"
            
            className="object-contain"
            priority
            width={1500}
            height={600}
          />
        </div><div className="relative w-full my-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://touchcinema.com/storage/01-2019/57070963-10156973997839435-3193637286445056000-o.jpg"
            alt="Quà tặng thành viên Touch Cinema"
            className="object-contain"
            priority
            width={1500}
            height={600}
          
          />
        </div>
      </motion.section>
    </div>
  );
}
