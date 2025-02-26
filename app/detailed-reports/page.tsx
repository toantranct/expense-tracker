"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Download, ArrowUpDown } from "lucide-react"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Sector,
} from "recharts"
import { api } from "@/lib/api"

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
  "#FFE082",
  "#A5D6A7",
  "#EF9A9A",
]

// Custom active shape for pie chart with hover effect
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill}>
        {`${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

// Định nghĩa kiểu dữ liệu cho response từ API
interface CategoryData {
  name: string
  value: string
  transaction_count: number
  max_transaction: string
  min_transaction: string
  avg_transaction: string
  icon: string
  color: string
  description: string
}

interface YearlyData {
  year: number
  value: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    categories: CategoryData[]
    yearlyData: YearlyData[]
  }
}

export default function DetailedReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reportData, setReportData] = useState<{
    categories: CategoryData[],
    yearlyData: YearlyData[]
  }>({
    categories: [],
    yearlyData: []
  })

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.detailedReports.get(selectedYear, selectedMonth) as ApiResponse
        
        // Kiểm tra success và lấy data từ response
        if (response.success && response.data) {
          setReportData(response.data)
        } else {
          throw new Error(response.message || "Failed to load data")
        }
      } catch (err) {
        console.error("Error fetching detailed report:", err)
        setError("Failed to load report data")
        setReportData({
          categories: [],
          yearlyData: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear, selectedMonth])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(-1)
  }

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
  }

  // Chuyển đổi giá trị sang số để sử dụng trong biểu đồ
  const processedCategories = reportData.categories.map(category => ({
    ...category,
    value: parseFloat(category.value)
  }))

  const processedYearlyData = reportData.yearlyData.map(item => ({
    ...item,
    value: parseFloat(item.value)
  }))

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0",
        )}
      >
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Báo cáo chi tiết</h1>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn năm" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        Năm {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn tháng" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month.toString()}>
                        Tháng {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (selectedMonth === 1) {
                        setSelectedMonth(12)
                        setSelectedYear(selectedYear - 1)
                      } else {
                        setSelectedMonth(selectedMonth - 1)
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (selectedMonth === 12) {
                        setSelectedMonth(1)
                        setSelectedYear(selectedYear + 1)
                      } else {
                        setSelectedMonth(selectedMonth + 1)
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Phân tích theo danh mục</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          activeIndex={activeIndex}
                          activeShape={renderActiveShape}
                          data={processedCategories}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          onMouseEnter={onPieEnter}
                          onMouseLeave={onPieLeave}
                        >
                          {processedCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => value.toLocaleString()}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Phân tích theo năm</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={processedYearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 12 }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value: number) => value.toLocaleString()}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        />
                        <Bar dataKey="value" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Chi tiết theo danh mục</h3>
                <Button variant="outline" size="sm" onClick={toggleSortOrder}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
                </Button>
              </div>
              <div className="grid gap-4">
                {[...reportData.categories]
                  .sort((a, b) => {
                    const aValue = parseFloat(a.value);
                    const bValue = parseFloat(b.value);
                    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
                  })
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                        />
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                        </div>
                      </div>
                      <span className="font-semibold">{parseFloat(item.value).toLocaleString()}</span>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}