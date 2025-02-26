"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Search, Camera, ArrowUpDown } from "lucide-react"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import PieChartComponent from "./components/PieChartComponent"
import BarChartComponent from "./components/BarChartComponent"
import LineChartComponent from "./components/LineChartComponent"
import ComboChartComponent from "./components/ComboChartComponent"
import { api } from "@/lib/api"
import cn from "classnames"

export default function ReportsPage() {
  const [chartType, setChartType] = useState("pie")
  const [activeTab, setActiveTab] = useState("expenses")
  const [viewType, setViewType] = useState("monthly")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true)
      setError(null)
      try {
        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth() + 1
        console.log("Fetching data for:", { year, month, viewType })

        let response;
        if (viewType === "monthly") {
          response = await api.summary.monthly(year, month)
        } else {
          response = await api.summary.yearly(year)
        }
        
        console.log("Fetched report data:", response)
        if (!response || typeof response !== "object") {
          throw new Error("Invalid response from API")
        }
        
        // Extract the actual data from the response
        const data = response.data || response;
        
        // Ensure we have all the required properties
        if (!data.expenseCategories) {
          data.expenseCategories = []
        }
        
        if (!data.incomeCategories) {
          data.incomeCategories = []
        }

        // Convert the daily data to monthly data format if needed
        if (data.dailyData && !data.monthlyData) {
          data.monthlyData = data.dailyData.map((item: any) => {
            const date = new Date(item.date);
            return {
              date: date.getDate().toString(), // Use day of month as date
              month: date.getMonth() + 1,
              expense: parseFloat(item.expense) || 0,
              income: parseFloat(item.income) || 0
            };
          });
        }
        
        setReportData(data)
      } catch (err) {
        console.error("Error fetching report data:", err)
        setError(err.message || "Failed to fetch report data")
      } finally {
        setLoading(false)
      }
    }

    fetchReportData()
  }, [selectedDate, viewType])

  const handlePrevious = () => {
    const newDate = new Date(selectedDate)
    if (viewType === "monthly") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() - 1)
    }
    setSelectedDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(selectedDate)
    if (viewType === "monthly") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setSelectedDate(newDate)
  }

  const getDateDisplay = () => {
    if (viewType === "monthly") {
      return {
        main: selectedDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
        sub: `(01/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}—${new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()})`,
      }
    } else {
      return {
        main: selectedDate.getFullYear().toString(),
        sub: "(01/01—31/12)",
      }
    }
  }

  const dateDisplay = getDateDisplay()

  const getChartTitle = () => {
    if (viewType === "monthly") {
      return `Báo cáo tháng ${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`
    } else {
      return `Báo cáo năm ${selectedDate.getFullYear()}`
    }
  }

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
  }

  // Ensure numerical values for calculations
  const safeNumber = (value: any) => {
    if (value === undefined || value === null) return 0;
    return typeof value === 'string' ? parseFloat(value) : Number(value);
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0",
        )}
      >
        <header className="p-4 flex items-center justify-between bg-white border-b">
          <h1 className="text-xl font-semibold">Báo cáo</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Camera className="w-5 h-5 text-green-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5 text-green-500" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto max-w-7xl p-4 lg:p-6">
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <Card>
                  <div className="p-4">
                    <Tabs value={viewType} onValueChange={setViewType} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="monthly">Hàng Tháng</TabsTrigger>
                        <TabsTrigger value="yearly">Hàng Năm</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="bg-green-50 p-4 flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={handlePrevious}>
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </Button>
                    <div>
                      <div className="text-lg font-medium text-center">{dateDisplay.main}</div>
                      <div className="text-sm text-gray-500 text-center">{dateDisplay.sub}</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleNext}>
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="expenses">Chi tiêu</TabsTrigger>
                        <TabsTrigger value="income">Thu nhập</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger className="w-[180px] ml-4">
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="combo">Column-Line Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-[400px] w-full">
                    {loading ? (
                      <p>Đang tải...</p>
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <>
                        {chartType === "pie" && (
                          <PieChartComponent
                            data={
                              activeTab === "expenses"
                                ? reportData?.expenseCategories.map(cat => ({
                                    name: cat.name,
                                    value: safeNumber(cat.amount),
                                    color: cat.color
                                  })) || []
                                : reportData?.incomeCategories.map(cat => ({
                                    name: cat.name,
                                    value: safeNumber(cat.amount),
                                    color: cat.color
                                  })) || []
                            }
                            title={`${getChartTitle()} - ${activeTab === "expenses" ? "Chi tiêu" : "Thu nhập"}`}
                          />
                        )}
                        {chartType === "bar" && (
                          <BarChartComponent
                            data={reportData?.monthlyData?.map(item => ({
                              date: item.month ? `Tháng ${item.month}` : item.date,
                              expense: safeNumber(item.expense),
                              income: safeNumber(item.income)
                            })) || []}
                            title={`${getChartTitle()} - Biểu đồ cột`}
                          />
                        )}
                        {chartType === "line" && (
                          <LineChartComponent
                            data={reportData?.monthlyData?.map(item => ({
                              date: item.month ? `Tháng ${item.month}` : item.date,
                              expense: safeNumber(item.expense),
                              income: safeNumber(item.income)
                            })) || []}
                            title={`${getChartTitle()} - Biểu đồ đường`}
                          />
                        )}
                        {chartType === "combo" && (
                          <ComboChartComponent
                            data={reportData?.monthlyData?.map(item => ({
                              date: item.month ? `Tháng ${item.month}` : item.date,
                              expense: safeNumber(item.expense),
                              income: safeNumber(item.income)
                            })) || []}
                            title={`${getChartTitle()} - Biểu đồ kết hợp`}
                          />
                        )}
                      </>
                    )}
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Chi tiết</h3>
                      <Button variant="outline" size="sm" onClick={toggleSortOrder}>
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
                      </Button>
                    </div>
                    {loading ? (
                      <p>Đang tải...</p>
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <div className="space-y-4">
                        {[...(reportData?.[activeTab === "expenses" ? "expenseCategories" : "incomeCategories"] || [])]
                          .sort((a, b) => {
                            const aAmount = safeNumber(a.amount);
                            const bAmount = safeNumber(b.amount);
                            return sortOrder === "asc" ? aAmount - bAmount : bAmount - aAmount;
                          })
                          .map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-4 h-4 rounded-full mr-3"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-medium">{safeNumber(item.amount).toLocaleString()}₫</span>
                                <span className="text-gray-500 text-sm w-16 text-right">
                                  {(
                                    (safeNumber(item.amount) /
                                      safeNumber(reportData[`total${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`])) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <Card className="p-6">
                    <div className="text-sm text-gray-600 mb-1">Chi tiêu</div>
                    <div className="text-2xl font-bold text-red-500">
                      {loading ? "Đang tải..." : error ? "Lỗi" : `-${safeNumber(reportData?.totalExpenses).toLocaleString()}₫`}
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-sm text-gray-600 mb-1">Thu nhập</div>
                    <div className="text-2xl font-bold text-blue-500">
                      {loading ? "Đang tải..." : error ? "Lỗi" : `+${safeNumber(reportData?.totalIncome).toLocaleString()}₫`}
                    </div>
                  </Card>
                  <Card className="p-6 lg:col-span-1">
                    <div className="text-sm text-gray-600 mb-1">Thu chi</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {loading
                        ? "Đang tải..."
                        : error
                          ? "Lỗi"
                          : `${(safeNumber(reportData?.totalIncome) - safeNumber(reportData?.totalExpenses)).toLocaleString()}₫`}
                    </div>
                  </Card>
                </div>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Thống kê</h3>
                  {loading ? (
                    <p>Đang tải...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Trung bình mỗi ngày</span>
                        <span className="font-medium">
                          {(safeNumber(reportData?.totalExpenses) / safeNumber(reportData?.daysInPeriod)).toLocaleString()}₫
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ngày cao nhất</span>
                        <span className="font-medium">{safeNumber(reportData?.highestExpenseDay?.amount).toLocaleString()}₫</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ngày thấp nhất</span>
                        <span className="font-medium">{safeNumber(reportData?.lowestExpenseDay?.amount).toLocaleString()}₫</span>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}