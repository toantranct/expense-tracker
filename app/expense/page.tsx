"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ExpenseCategories from "../components/expense-categories"
import IncomeCategories from "../components/income-categories"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import { api } from "@/lib/api"
import cn from "classnames"

export default function ExpensePage() {
  const [activeTab, setActiveTab] = useState("expense")
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [replacedNote, setReplacedNote] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = {
        amount: Number.parseFloat(amount),
        note: replacedNote,
        date: selectedDate.toISOString().split("T")[0],
        category_id: 1, // Assume category_id is 1 for now, you'll need to implement category selection
      }
      if (activeTab === "expense") {
        await api.expenses.create(data)
      } else {
        await api.income.create(data)
      }
      setAmount("")
      setNote("")
      setReplacedNote("")
      // You might want to show a success message here
    } catch (err) {
      setError("Failed to submit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0",
        )}
      >
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">Nhập vào</h1>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-64">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="expense"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Tiền chi
                  </TabsTrigger>
                  <TabsTrigger
                    value="income"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Tiền thu
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {selectedDate.toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                <Button variant="outline" size="icon" onClick={handleNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Ghi chú</label>
                  <Input
                    placeholder="Chưa nhập vào"
                    className="w-full"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  {replacedNote && replacedNote !== note && (
                    <p className="text-sm text-gray-500">Đã thay thế: {replacedNote}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {activeTab === "expense" ? "Tiền chi" : "Tiền thu"}
                  </label>
                  <Input
                    placeholder="0"
                    className="w-full text-2xl font-semibold bg-gray-50"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Danh mục</h2>
              {activeTab === "expense" ? <ExpenseCategories /> : <IncomeCategories />}
            </div>

            {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

            <div className="mt-6">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-semibold rounded-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : activeTab === "expense" ? "Nhập khoản chi" : "Nhập khoản thu"}
              </Button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}

