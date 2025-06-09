'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function GiaVePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full  mx-auto p-6 space-y-12 bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight"
      >
        🎟️ Giá Vé & Khuyến Mãi
      </motion.h1>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center bg-gray-800/50 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="relative w-full md:w-1/2 h-96 md:min-h-[380px]">
          <Image
            src="https://touchcinema.com/storage/slider-tv/z4045880677164-1ba77b4619d45e773581092b6319ac62.jpg"
            alt="Giá vé 2D"
            fill
            className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Giá Vé 2D
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Trải nghiệm phim 2D với giá vé hợp lý, phù hợp cho những bạn yêu thích chất lượng hình ảnh chuẩn và tiết kiệm.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row-reverse items-center bg-gray-800/50 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="relative w-full md:w-1/2 h-96 md:min-h-[380px]">
          <Image
            src="https://touchcinema.com/storage/slider-app/z4986572984860-008d90891c78bc2a0b13b8acd84f9e88.jpg"
            alt="Giá vé 3D"
            fill
            className="object-cover rounded-t-2xl md:rounded-r-2xl md:rounded-t-none"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Giá Vé 3D
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Đắm chìm trong thế giới 3D sống động với giá vé hợp lý cho những ai muốn trải nghiệm điện ảnh hấp dẫn hơn.
          </p>
        </div>
      </motion.section>

      {/* Ngày lễ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-center bg-gray-800/50 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="relative w-full md:w-1/2 h-96 md:min-h-[380px]">
          <Image
            src="https://touchcinema.com/storage/slider-tv/z4103264955341-3bb1395fb3108359cda4af45aee336f4-1724913363.jpg"
            alt="Ngày lễ"
            fill
            className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
            Ưu Đãi Ngày Lễ
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Đặc biệt vào ngày lễ, tận hưởng nhiều ưu đãi hấp dẫn từ InciCinema. Đừng bỏ lỡ cơ hội xem phim giá tốt!
          </p>
        </div>
      </motion.section>
    </div>
  )
}
