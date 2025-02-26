"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Search, Utensils, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import { EditTransactionDialog } from "../components/EditTransactionDialog"
import { mockMonthData, mockTransactions } from "@/lib/mock-data"

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 4, 30)) // May 30, 2024
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const transactionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Adjust for Monday start
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const calendarDays = []

  // Previous month days
  for (let i = daysInPrevMonth - firstDayOfMonth + 1; i <= daysInPrevMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true })
  }

  // Calculate remaining days needed to complete the grid
  const remainingDays = 42 - calendarDays.length // 6 rows * 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false })
  }

  const getDayData = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day)
    const dateKey = formatDateKey(date)
    return mockMonthData.days[dateKey] || { income: 0, expense: 0 }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  const getTransactionsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return mockTransactions.filter((t) => t.date === dateKey)
  }

  // Group transactions by date
  const groupedTransactions = mockTransactions.reduce(
    (acc, transaction) => {
      if (!acc[transaction.date]) {
        acc[transaction.date] = []
      }
      acc[transaction.date].push(transaction)
      return acc
    },
    {} as { [key: string]: typeof mockTransactions },
  )

  // Sort dates in reverse chronological order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a))

  const handleDateClick = (year: number, month: number, day: number) => {
    const newDate = new Date(year, month, day)
    setSelectedDate(newDate)
    const dateKey = formatDateKey(newDate)
    const element = transactionRefs.current[dateKey]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  }

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsEditDialogOpen(true)
  }

  const handleSaveTransaction = (updatedTransaction: any) => {
    // Here you would typically update the transaction in your data store or API
    console.log("Updated transaction:", updatedTransaction)
    // For now, we'll just close the dialog
    setIsEditDialogOpen(false)
  }

  const handlePrevious = () => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setSelectedDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setSelectedDate(newDate)
  }

  useEffect(() => {
    // Fetch data for the selected month
    // For now, we'll just log the selected date
    console.log("Fetching data for:", selectedDate.toISOString().split("T")[0])
    // TODO: Implement actual data fetching logic here
  }, [selectedDate])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0",
        )}
      >
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Lịch</h1>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4">
            <Card className="mb-6">
              <div className="bg-green-50 p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{`${month + 1}/2024`}</h2>
                  <p className="text-sm text-gray-500">{`(01/${month + 1}—${daysInMonth}/${month + 1})`}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleNext}>
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 mb-2">
                  {weekDays.map((day, index) => (
                    <div
                      key={day}
                      className={cn(
                        "text-center p-2 text-sm font-medium",
                        index === 5 && "text-blue-500",
                        index === 6 && "text-red-500",
                      )}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {calendarDays.map((date, index) => {
                    const dayData = date.isCurrentMonth ? getDayData(year, month, date.day) : { income: 0, expense: 0 }

                    const isSelected =
                      date.isCurrentMonth &&
                      selectedDate.getDate() === date.day &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getFullYear() === year

                    return (
                      <div
                        key={index}
                        className={cn(
                          "border p-1 min-h-[80px] cursor-pointer transition-all duration-200",
                          !date.isCurrentMonth && "bg-gray-50",
                          isSelected && "ring-2 ring-green-500 ring-offset-2",
                          date.isCurrentMonth && "hover:bg-green-50",
                        )}
                        onClick={() => date.isCurrentMonth && handleDateClick(year, month, date.day)}
                      >
                        <div
                          className={cn(
                            "text-right text-sm mb-1",
                            !date.isCurrentMonth && "text-gray-400",
                            (index + firstDayOfMonth) % 7 === 6 && "text-red-500",
                            (index + firstDayOfMonth) % 7 === 5 && "text-blue-500",
                            isSelected && "font-bold",
                          )}
                        >
                          {date.day}
                        </div>
                        {date.isCurrentMonth && (
                          <div className="space-y-1 text-xs">
                            {dayData.income > 0 && (
                              <div className="text-blue-500">{formatCurrency(dayData.income)}</div>
                            )}
                            {dayData.expense > 0 && (
                              <div className="text-red-500">{formatCurrency(dayData.expense)}</div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            <Card className="mb-6">
              <div className="p-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-500">Thu nhập</div>
                  <div className="text-blue-500 font-semibold">{formatCurrency(mockMonthData.totalIncome)}đ</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Chi tiêu</div>
                  <div className="text-red-500 font-semibold">{formatCurrency(mockMonthData.totalExpense)}đ</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tổng</div>
                  <div className="text-blue-500 font-semibold">+{formatCurrency(mockMonthData.netAmount)}đ</div>
                </div>
              </div>
            </Card>

            <Card className="mb-6">
              <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Số dư đầu kì</div>
                  <div className="font-semibold">+{formatCurrency(mockMonthData.startBalance)}đ</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Số dư</div>
                  <div className="font-semibold">+{formatCurrency(mockMonthData.endBalance)}đ</div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              {sortedDates.map((date) => (
                <div
                  key={date}
                  ref={(el) => (transactionRefs.current[date] = el)}
                  className={cn("space-y-2", formatDateKey(selectedDate) === date && "scroll-mt-4")}
                >
                  <div className="text-sm text-gray-500 font-medium">
                    {formatDisplayDate(date)}
                    {formatDateKey(selectedDate) === date && (
                      <span className="ml-2 text-red-500">
                        {groupedTransactions[date].reduce((sum, t) => sum + (t.type === "expense" ? t.amount : 0), 0)}đ
                      </span>
                    )}
                  </div>
                  {groupedTransactions[date].map((transaction, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Utensils className="w-6 h-6 text-orange-500" />
                            <div>
                              <div className="font-medium">{transaction.category}</div>
                              <div className="text-sm text-gray-500">({transaction.description})</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">{formatCurrency(transaction.amount)}đ</span>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>

        <BottomNav />
      </div>

      <EditTransactionDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        transaction={selectedTransaction}
        onSave={handleSaveTransaction}
      />
    </div>
  )
}

