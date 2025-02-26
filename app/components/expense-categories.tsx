import { Button } from "@/components/ui/button"
import { Utensils, Shirt, Wine, PillIcon as Pills, Droplet, Train, Phone, Home, Star, ShoppingCart } from "lucide-react"

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

interface ExpenseCategoriesProps {
  onSelectCategory?: (category: {id: number, name: string}) => void;
  selectedCategoryId?: number;
}

export default function ExpenseCategories({ onSelectCategory, selectedCategoryId }: ExpenseCategoriesProps = {}) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        const isSelected = selectedCategoryId === category.id
        
        return (
          <Button
            key={category.id}
            variant="outline"
            className={`flex flex-col h-24 items-center justify-center p-2 transition-colors ${
              isSelected 
                ? "border-green-500 bg-green-50" 
                : "hover:border-green-500"
            }`}
            onClick={() => onSelectCategory && onSelectCategory(category)}
          >
            <Icon className={`w-8 h-8 ${category.color} mb-2`} />
            <span className="text-xs text-center text-gray-600">{category.name}</span>
          </Button>
        )
      })}
    </div>
  )
}

