"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import IncomeCategories from "../components/income-categories"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

export default function IncomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<{id: number, name: string} | null>(null)
  const [replacedNote, setReplacedNote] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const [categoryLoading, setCategoryLoading] = useState(false)

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  // Fetch income categories on component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        const data = await api.categories.getIncomeCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch income categories:", err);
        setError("Failed to load income categories. Please try again.");
      } finally {
        setCategoryLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const replaceText = async () => {
      if (note) {
        try {
          const result = await api.textReplacement.replace(note)
          setReplacedNote(result.replacedText)
        } catch (err) {
          console.error("Failed to replace text:", err)
        }
      } else {
        setReplacedNote("")
      }
    }
    replaceText()
  }, [note])
  
  const handleCategorySelect = (category: {id: number, name: string}) => {
    setSelectedCategory(category)
  }

  const handleSubmit = async () => {
    if (!amount || Number.isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ")
      return
    }

    if (!note) {
      setError("Vui lòng nhập ghi chú")
      return
    }

    if (!selectedCategory) {
      setError("Vui lòng chọn danh mục")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const data = {
        amount: Number.parseFloat(amount),
        description: replacedNote || note,
        date: selectedDate.toISOString().split("T")[0],
        category: selectedCategory.name,
      }
      
      await api.income.create(data)
      
      setAmount("")
      setNote("")
      setReplacedNote("")
      setSelectedCategory(null)
      setSuccess("Đã lưu thành công!")
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (err) {
      console.error("Error submitting transaction:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
                <Button variant="ghost" size="icon" onClick={handlePreviousDay}>
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Button>
                <span className="text-lg">
                  {selectedDate.toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Button variant="ghost" size="icon" onClick={handleNextDay}>
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-gray-600">Ghi chú</label>
                <Input 
                  placeholder="Chưa nhập vào" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                {replacedNote && replacedNote !== note && (
                  <p className="text-sm text-gray-500">Đã thay thế: {replacedNote}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">Tiền thu</label>
                <Input 
                  placeholder="0" 
                  className="bg-green-50 text-2xl" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="p-4">
              <h2 className="text-gray-600 mb-4">Danh mục</h2>
              {categoryLoading ? (
                <div className="text-center py-4">Loading categories...</div>
              ) : (
                <IncomeCategories 
                  onSelectCategory={handleCategorySelect}
                  selectedCategoryId={selectedCategory?.id}
                  categories={categories}
                />
              )}
              {selectedCategory && (
                <div className="mt-4 text-sm text-green-600">
                  Đã chọn: {selectedCategory.name}
                </div>
              )}
            </div>

            {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
            {success && <div className="p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}

            {/* Add Income Button */}
            <div className="p-4">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Nhập khoản thu"}
              </Button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}

