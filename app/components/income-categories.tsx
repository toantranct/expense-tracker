import { Button } from "@/components/ui/button"
import { Briefcase, Gift, PiggyBank, DollarSign, TrendingUp, Handshake, Gamepad2, Settings, Star } from "lucide-react"

// Default icons mapping for categories
const iconMapping: { [key: string]: any } = {
  "Tiền lương": { icon: Briefcase, color: "text-green-500" },
  "Tiền phụ cấp": { icon: PiggyBank, color: "text-orange-500" },
  "Tiền thưởng": { icon: Gift, color: "text-red-500" },
  "Thu nhập phụ": { icon: DollarSign, color: "text-blue-500" },
  "Đầu tư": { icon: TrendingUp, color: "text-teal-500" },
  "Thu nhập tạm...": { icon: Handshake, color: "text-pink-500" },
  "Vay tiền": { icon: Gamepad2, color: "text-yellow-500" },
  "Chỉnh sửa": { icon: Settings, color: "text-gray-500" },
}

// Fallback categories when API fails
const defaultCategories = [
  { id: 1, name: "Tiền lương", icon: Briefcase, color: "text-green-500" },
  { id: 2, name: "Tiền phụ cấp", icon: PiggyBank, color: "text-orange-500" },
  { id: 3, name: "Tiền thưởng", icon: Gift, color: "text-red-500" },
  { id: 4, name: "Thu nhập phụ", icon: DollarSign, color: "text-blue-500" },
  { id: 5, name: "Đầu tư", icon: TrendingUp, color: "text-teal-500" },
  { id: 6, name: "Thu nhập tạm...", icon: Handshake, color: "text-pink-500" },
  { id: 7, name: "Vay tiền", icon: Gamepad2, color: "text-yellow-500" },
  { id: 8, name: "Chỉnh sửa", icon: Settings, color: "text-gray-500" },
]

interface IncomeCategoriesProps {
  onSelectCategory?: (category: {id: number, name: string}) => void;
  selectedCategoryId?: number;
  categories?: any[];
}

export default function IncomeCategories({ 
  onSelectCategory, 
  selectedCategoryId,
  categories: apiCategories 
}: IncomeCategoriesProps = {}) {
  
  // Use API categories if provided, otherwise use default
  const categories = apiCategories?.length ? 
    apiCategories.map(cat => {
      const iconData = iconMapping[cat.name] || { icon: Star, color: "text-gray-500" };
      return { ...cat, ...iconData };
    }) : 
    defaultCategories;
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

