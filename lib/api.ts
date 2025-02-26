import { mockApiHandlers } from "./mock-api-data"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  try {
    const mockResponse = await handleMockRequest(endpoint, options)
    if (!mockResponse.ok) {
      throw new Error(`API request failed: ${mockResponse.statusText}`)
    }
    const data = await mockResponse.json()
    console.log("API Response:", data)
    return data
  } catch (error) {
    console.error("Error in fetchApi:", error)
    throw error
  }
}

async function handleMockRequest(endpoint: string, options: RequestInit): Promise<Response> {
  const url = new URL(endpoint, API_BASE_URL)
  const path = url.pathname.replace("/api/", "")
  const method = options.method || "GET"

  console.log(`Mock API Request: ${method} ${path}`)

  let result
  try {
    const route = `${method} ${path}`
    console.log("Matching route:", route)

    switch (route) {
      case "GET /summary/monthly": {
        const year = Number.parseInt(url.searchParams.get("year") || "2024")
        const month = Number.parseInt(url.searchParams.get("month") || "5")
        result = mockApiHandlers.getMonthlySummary(year, month)
        break
      }
      case "GET /summary/yearly": {
        const year = Number.parseInt(url.searchParams.get("year") || "2024")
        result = mockApiHandlers.getYearlySummary(year)
        break
      }
      case "GET expenses":
        result = mockApiHandlers.getExpenses(url.searchParams.get("date") || undefined)
        break
      case "POST expenses":
        result = mockApiHandlers.createExpense(JSON.parse(options.body as string))
        break
      case "PUT expenses":
        const expenseId = path.split("/")[1]
        result = mockApiHandlers.updateExpense(expenseId, JSON.parse(options.body as string))
        break
      case "DELETE expenses":
        result = mockApiHandlers.deleteExpense(path.split("/")[1])
        break
      case "GET income":
        result = mockApiHandlers.getIncome(url.searchParams.get("date") || undefined)
        break
      case "POST income":
        result = mockApiHandlers.createIncome(JSON.parse(options.body as string))
        break
      case "PUT income":
        const incomeId = path.split("/")[1]
        result = mockApiHandlers.updateIncome(incomeId, JSON.parse(options.body as string))
        break
      case "DELETE income":
        result = mockApiHandlers.deleteIncome(path.split("/")[1])
        break
      case "GET categories/expenses":
        result = mockApiHandlers.getExpenseCategories()
        break
      case "GET categories/income":
        result = mockApiHandlers.getIncomeCategories()
        break
      case "POST text-replacement":
        result = mockApiHandlers.replaceText(JSON.parse(options.body as string).text)
        break
      case "GET /detailed-reports":
        const year = Number.parseInt(url.searchParams.get("year") || "2024")
        const month = Number.parseInt(url.searchParams.get("month") || "5")
        result = mockApiHandlers.getDetailedReport(year, month)
        break
      default:
        console.error(`Unhandled mock API request: ${method} ${path}`)
        return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 })
    }

    if (!result) {
      throw new Error("No result from mock handler")
    }

    console.log("Mock API Response:", result)
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    console.error("Error in mock API handler:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 })
  }
}

export const api = {
  expenses: {
    getAll: (date?: string) => fetchApi(`/expenses${date ? `?date=${date}` : ""}`),
    create: (data: any) => fetchApi("/expenses", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchApi(`/expenses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => fetchApi(`/expenses/${id}`, { method: "DELETE" }),
  },
  income: {
    getAll: (date?: string) => fetchApi(`/income${date ? `?date=${date}` : ""}`),
    create: (data: any) => fetchApi("/income", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchApi(`/income/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => fetchApi(`/income/${id}`, { method: "DELETE" }),
  },
  categories: {
    getExpenseCategories: () => fetchApi("/categories/expenses"),
    getIncomeCategories: () => fetchApi("/categories/income"),
  },
  summary: {
    monthly: (year: number, month: number) => fetchApi(`/summary/monthly?year=${year}&month=${month}`),
    yearly: (year: number) => fetchApi(`/summary/yearly?year=${year}`),
  },
  textReplacement: {
    replace: (text: string) => fetchApi("/text-replacement", { method: "POST", body: JSON.stringify({ text }) }),
  },
  detailedReports: {
    get: (year: number, month: number) => fetchApi(`/detailed-reports?year=${year}&month=${month}`),
  },
}

export default api

