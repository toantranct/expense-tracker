"use client"

import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import { useState } from "react"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: 1,
    name: "Tiền lương",
    icon: "💼",
    color: "text-green-500 border-green-200",
    borderColor: "border-green-200",
  },
  {
    id: 2,
    name: "Tiền phụ cấp",
    icon: "🐷",
    color: "text-orange-500",
    borderColor: "border-orange-200",
  },
  {
    id: 3,
    name: "Tiền thưởng",
    icon: "🎁",
    color: "text-red-500",
    borderColor: "border-red-200",
  },
  {
    id: 4,
    name: "Thu nhập phụ",
    icon: "💰",
    color: "text-blue-500",
    borderColor: "border-blue-200",
  },
  {
    id: 5,
    name: "Đầu tư",
    icon: "💵",
    color: "text-teal-500",
    borderColor: "border-teal-200",
  },
  {
    id: 6,
    name: "Thu nhập tạm...",
    icon: "🤲",
    color: "text-pink-500",
    borderColor: "border-pink-200",
  },
  {
    id: 7,
    name: "Vay tiền",
    icon: "🎮",
    color: "text-yellow-500",
    borderColor: "border-yellow-200",
  },
  {
    id: 8,
    name: "Chỉnh sửa",
    icon: "⚙️",
    color: "text-gray-500",
    borderColor: "border-gray-200",
  },
]

export default function IncomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0",
        )}
      >
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto container mx-auto max-w-4xl">
          <div className="lg:p-6">
            {/* Tabs */}
            <Tabs defaultValue="income" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="expense" className="text-green-500" onClick={() => router.push("/expense")}>
                  Tiền chi
                </TabsTrigger>
                <TabsTrigger
                  value="income"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  onClick={() => router.push("/income")}
                >
                  Tiền thu
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Date Navigation */}
            <div className="bg-green-50 p-4 flex items-center justify-between mt-4">
              <span className="text-gray-600">Ngày</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Button>
                <span className="text-lg">09/02/2025 (CN)</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-gray-600">Ghi chú</label>
                <Input placeholder="Chưa nhập vào" />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">Tiền thu</label>
                <Input placeholder="0" className="bg-green-50 text-2xl" />
              </div>
            </div>

            {/* Categories */}
            <div className="p-4">
              <h2 className="text-gray-600 mb-4">Danh mục</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-lg border",
                      "hover:border-green-500 transition-colors",
                      category.name === "Chỉnh sửa" ? "flex-row justify-between w-full" : "",
                      category.borderColor,
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">{category.icon}</span>
                      <span className={cn("text-sm", category.color)}>{category.name}</span>
                    </div>
                    {category.name === "Chỉnh sửa" && <ChevronRightIcon className="w-4 h-4 text-gray-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Income Button */}
            <div className="p-4">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6">Nhập khoản thu</Button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}

