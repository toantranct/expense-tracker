import { v4 as uuidv4 } from "uuid"

export const mockApiData = {
  expenses: [
    {
      id: uuidv4(),
      date: "2024-05-30",
      category: "Ăn uống",
      description: "Thuocla",
      amount: 38000,
      type: "expense",
    },
    {
      id: uuidv4(),
      date: "2024-05-30",
      category: "Ăn uống",
      description: "Circle K nước ngọt",
      amount: 38000,
      type: "expense",
    },
    {
      id: uuidv4(),
      date: "2024-05-29",
      category: "Ăn uống",
      description: "Phở sáng",
      amount: 35000,
      type: "expense",
    },
    {
      id: uuidv4(),
      date: "2024-05-29",
      category: "Ăn uống",
      description: "Cafe",
      amount: 19000,
      type: "expense",
    },
    {
      id: uuidv4(),
      date: "2024-05-28",
      category: "Đi lại",
      description: "Xăng xe",
      amount: 100000,
      type: "expense",
    },
    {
      id: uuidv4(),
      date: "2024-05-27",
      category: "Mua sắm",
      description: "Quần áo mới",
      amount: 500000,
      type: "expense",
    },
  ],

  income: [
    {
      id: uuidv4(),
      date: "2024-05-25",
      category: "Tiền lương",
      description: "Lương tháng 5",
      amount: 15000000,
      type: "income",
    },
    {
      id: uuidv4(),
      date: "2024-05-26",
      category: "Thu nhập phụ",
      description: "Bán đồ cũ",
      amount: 500000,
      type: "income",
    },
    {
      id: uuidv4(),
      date: "2024-05-27",
      category: "Tiền thưởng",
      description: "Thưởng dự án",
      amount: 2000000,
      type: "income",
    },
  ],

  expenseCategories: [
    { id: 1, name: "Ăn uống", icon: "Utensils", color: "text-orange-500" },
    { id: 2, name: "Chi tiêu hàng ngày", icon: "ShoppingCart", color: "text-green-500" },
    { id: 3, name: "Quần áo", icon: "Shirt", color: "text-blue-500" },
    { id: 4, name: "Phí giao lưu", icon: "Wine", color: "text-yellow-500" },
    { id: 5, name: "Y tế", icon: "Pills", color: "text-green-500" },
    { id: 6, name: "Tiền điện", icon: "Droplet", color: "text-cyan-500" },
    { id: 7, name: "Đi lại", icon: "Train", color: "text-gray-500" },
    { id: 8, name: "Phí liên lạc", icon: "Phone", color: "text-gray-500" },
    { id: 9, name: "Tiền nhà", icon: "Home", color: "text-yellow-500" },
    { id: 10, name: "Bí a", icon: "Star", color: "text-yellow-400" },
    { id: 11, name: "Trả nợ", icon: "Star", color: "text-red-500" },
    { id: 12, name: "Mua đồ online", icon: "ShoppingCart", color: "text-yellow-500" },
  ],

  incomeCategories: [
    { id: 1, name: "Tiền lương", icon: "Briefcase", color: "text-green-500" },
    { id: 2, name: "Tiền phụ cấp", icon: "PiggyBank", color: "text-orange-500" },
    { id: 3, name: "Tiền thưởng", icon: "Gift", color: "text-red-500" },
    { id: 4, name: "Thu nhập phụ", icon: "DollarSign", color: "text-blue-500" },
    { id: 5, name: "Đầu tư", icon: "TrendingUp", color: "text-teal-500" },
    { id: 6, name: "Thu nhập tạm thời", icon: "Handshake", color: "text-pink-500" },
    { id: 7, name: "Vay tiền", icon: "Gamepad2", color: "text-yellow-500" },
    { id: 8, name: "Chỉnh sửa", icon: "Settings", color: "text-gray-500" },
  ],

  monthlySummary: {
    year: 2024,
    month: 5,
    totalIncome: 17500000,
    totalExpenses: 730000,
    netAmount: 16770000,
    startBalance: 5000000,
    endBalance: 21770000,
    highestExpenseDay: {
      date: "2024-05-27",
      amount: 500000,
    },
    lowestExpenseDay: {
      date: "2024-05-29",
      amount: 19000,
    },
    daysInPeriod: 31,
    dailyData: [
      { date: "2024-05-01", income: 0, expense: 0 },
      { date: "2024-05-02", income: 0, expense: 50000 },
      // ... (more daily data)
      { date: "2024-05-30", income: 0, expense: 76000 },
      { date: "2024-05-31", income: 0, expense: 0 },
    ],
  },

  yearlySummary: {
    year: 2024,
    totalIncome: 210000000,
    totalExpenses: 150000000,
    netAmount: 60000000,
    startBalance: 20000000,
    endBalance: 80000000,
    highestExpenseMonth: {
      month: 12,
      amount: 20000000,
    },
    lowestExpenseMonth: {
      month: 2,
      amount: 8000000,
    },
    monthlyData: [
      { month: 1, income: 17500000, expense: 12000000 },
      { month: 2, income: 17500000, expense: 8000000 },
      // ... (more monthly data)
      { month: 12, income: 17500000, expense: 20000000 },
    ],
  },
  detailedReports: {
    categories: [
      { name: "Mạng sống", value: 765, description: "Chi tiêu cho các nhu cầu thiết yếu" },
      { name: "Ghi chú", value: 2, description: "Chi phí văn phòng phẩm" },
      { name: "Hóa đơn", value: 8, description: "Các khoản hóa đơn định kỳ" },
      { name: "Sự kiện", value: 50, description: "Chi phí tổ chức và tham gia sự kiện" },
      { name: "Đề làm", value: 1, description: "Chi phí công việc" },
      { name: "Công việc", value: 710, description: "Chi phí liên quan đến công việc" },
      { name: "Trò chơi", value: 230, description: "Giải trí và games" },
      { name: "Bài báo", value: 41, description: "Chi phí đọc báo và tạp chí" },
      { name: "Học tập", value: 560, description: "Chi phí học tập và đào tạo" },
      { name: "Kịch bản", value: 7, description: "Chi phí viết lách và sáng tạo" },
    ],
    yearlyData: [
      { year: 2025, value: 11 },
      { year: 2024, value: 12 },
      { year: 2023, value: 184 },
      { year: 2022, value: 669 },
      { year: 2021, value: 511 },
      { year: 2020, value: 507 },
      { year: 2019, value: 487 },
      { year: 2018, value: 28 },
      { year: 2017, value: 44 },
      { year: 2016, value: 15 },
    ],
  },
}

export const mockApiHandlers = {
  // GET /api/expenses
  getExpenses: (date?: string) => {
    if (date) {
      return mockApiData.expenses.filter((expense) => expense.date === date)
    }
    return mockApiData.expenses
  },

  // POST /api/expenses
  createExpense: (data: any) => {
    const newExpense = { ...data, id: uuidv4(), type: "expense" }
    mockApiData.expenses.push(newExpense)
    return newExpense
  },

  // PUT /api/expenses/:id
  updateExpense: (id: string, data: any) => {
    const index = mockApiData.expenses.findIndex((expense) => expense.id === id)
    if (index !== -1) {
      mockApiData.expenses[index] = { ...mockApiData.expenses[index], ...data }
      return mockApiData.expenses[index]
    }
    throw new Error("Expense not found")
  },

  // DELETE /api/expenses/:id
  deleteExpense: (id: string) => {
    const index = mockApiData.expenses.findIndex((expense) => expense.id === id)
    if (index !== -1) {
      mockApiData.expenses.splice(index, 1)
      return { success: true }
    }
    throw new Error("Expense not found")
  },

  // GET /api/income
  getIncome: (date?: string) => {
    if (date) {
      return mockApiData.income.filter((income) => income.date === date)
    }
    return mockApiData.income
  },

  // POST /api/income
  createIncome: (data: any) => {
    const newIncome = { ...data, id: uuidv4(), type: "income" }
    mockApiData.income.push(newIncome)
    return newIncome
  },

  // PUT /api/income/:id
  updateIncome: (id: string, data: any) => {
    const index = mockApiData.income.findIndex((income) => income.id === id)
    if (index !== -1) {
      mockApiData.income[index] = { ...mockApiData.income[index], ...data }
      return mockApiData.income[index]
    }
    throw new Error("Income not found")
  },

  // DELETE /api/income/:id
  deleteIncome: (id: string) => {
    const index = mockApiData.income.findIndex((income) => income.id === id)
    if (index !== -1) {
      mockApiData.income.splice(index, 1)
      return { success: true }
    }
    throw new Error("Income not found")
  },

  // GET /api/categories/expenses
  getExpenseCategories: () => {
    return mockApiData.expenseCategories
  },

  // GET /api/categories/income
  getIncomeCategories: () => {
    return mockApiData.incomeCategories
  },

  // GET /api/summary/monthly
  getMonthlySummary: (year: number, month: number) => {
    console.log(`Fetching monthly summary for ${year}-${month}`)
    // In a real scenario, we would filter the data based on year and month
    // For this mock, we're returning the same data regardless of the input
    return {
      ...mockApiData.monthlySummary,
      year,
      month,
      expenseCategories: mockApiData.expenseCategories.map((category) => ({
        ...category,
        amount: Math.floor(Math.random() * 1000000),
      })),
      incomeCategories: mockApiData.incomeCategories.map((category) => ({
        ...category,
        amount: Math.floor(Math.random() * 2000000),
      })),
    }
  },

  // GET /api/summary/yearly
  getYearlySummary: (year: number) => {
    console.log(`Fetching yearly summary for ${year}`)
    // In a real scenario, we would filter the data based on the year
    // For this mock, we're returning the same data regardless of the input
    return {
      ...mockApiData.yearlySummary,
      year,
      expenseCategories: mockApiData.expenseCategories.map((category) => ({
        ...category,
        amount: Math.floor(Math.random() * 10000000),
      })),
      incomeCategories: mockApiData.incomeCategories.map((category) => ({
        ...category,
        amount: Math.floor(Math.random() * 20000000),
      })),
    }
  },

  // POST /api/text-replacement
  replaceText: (text: string) => {
    // This is a simple mock that capitalizes the first letter of each word
    const replacedText = text.replace(/\b\w/g, (l) => l.toUpperCase())
    return { replacedText }
  },
  getDetailedReport: (year: number, month: number) => {
    console.log(`Fetching detailed report for ${year}-${month}`)
    return {
      categories: mockApiData.detailedReports.categories.map((category) => ({
        ...category,
        value: Math.floor(category.value * (0.8 + Math.random() * 0.4)), // Add some variation
      })),
      yearlyData: mockApiData.detailedReports.yearlyData,
    }
  },
}

