export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"
const TEMP_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTc0MDU3NzA3MCwiZXhwIjoxNzQwNjYzNDcwfQ.-jfyXjN9APqbbk_VN2ZomwMg6ZgNDxgsUiaJBCOMEdo"

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TEMP_BEARER_TOKEN}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error("API request failed")
  }

  console.log(response.json)
  return response.json()
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

