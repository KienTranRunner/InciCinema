"use client"

import { Facebook, Youtube, Smartphone, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 dark:bg-gray-950 dark:text-white pt-12 pb-8 border-t border-gray-200 dark:border-gray-800 dark:hover:text-white ">
        
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🎧 Chăm sóc khách hàng
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>
                Hotline: <a href="tel:02693838999" className="text-yellow-500 font-semibold hover:underline">0869 131 821</a>
              </li>
              <li>Giờ làm việc: 8h00–22h00 (Tất cả các ngày)</li>
              <li>
                Email: <a href="mailto:tmkien328@gmail.com" className="text-blue-600 hover:underline">tmkien328@touchcinema.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🌐 Kết nối với chúng tôi
            </h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook size={20} /> Facebook
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                <Youtube size={20} /> Youtube
              </a>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 ">
                <Smartphone size={16} /> Ứng dụng
              </span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm hover:underline dark:hover:text-white ">App Store</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm hover:underline dark:hover:text-white ">Google Play</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📜 Chính sách & Thông tin
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Phiên bản Mobile</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Điều khoản chung</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Điều khoản giao dịch</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Chính sách thanh toán</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Chính sách bảo mật</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📩 Hỗ trợ
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm mb-6">
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Hướng dẫn đặt vé</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Liên hệ</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors dark:hover:text-white ">Tuyển dụng</a></li>
            </ul>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Đăng ký nhận tin
              </label>
              <div className="flex">
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="rounded-r-none bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-400"
                />
                <Button className="rounded-l-none bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Send size={16} className="mr-2" /> Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} TouchCinema. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
