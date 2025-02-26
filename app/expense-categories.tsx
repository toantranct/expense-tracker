import { Utensils, Shirt, Wine, PillIcon as Pills, Droplet, Train, Phone, Home, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: 1, name: "Ăn uống", icon: Utensils, color: "text-orange-500" },
  { id: 2, name: "Chi tiêu hàng...", icon: ShoppingCart, color: "text-green-500" },
  { id: 3, name: "Quần áo", icon: Shirt, color: "text-blue-500" },
  { id: 4, name: "Phí giao lưu", icon: Wine, color: "text-yellow-500" },
  { id: 5, name: "Y tế", icon: Pills, color: "text-green-500" },
  { id: 6, name: "Tiền điện", icon: Droplet, color: "text-cyan-500" },
  { id: 7, name: "Đi lại", icon: Train, color: "text-gray-500" },
  { id: 8, name: "Phí liên lạc", icon: Phone, color: "text-gray-500" },
  { id: 9, name: "Tiền nhà", icon: Home, color: "text-yellow-500" },
  { id: 10, name: "Bí a", icon: Star, color: "text-yellow-400" },
  { id: 11, name: "Trả nợ", icon: Star, color: "text-red-500" },
  { id: 12, name: "Mua đồ online", icon: ShoppingCart, color: "text-yellow-500" },
]

export default function ExpenseCategories() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Button
            key={category.id}
            variant="outline"
            className="flex flex-col h-auto items-center p-4 hover:border-green-500 transition-colors"
          >
            <Icon className={`w-6 h-6 ${category.color}`} />
            <span className="text-xs md:text-sm mt-2 text-gray-600 text-center">{category.name}</span>
          </Button>
        )
      })}
    </div>
  )
}

