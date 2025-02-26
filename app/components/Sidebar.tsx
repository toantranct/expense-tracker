"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Calendar, PieChart, MoreHorizontal, Menu, ChevronRight, ChevronLeft, BarChart } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  const navItems = [
    { name: "Nhập vào", icon: Pencil, path: "/expense" },
    { name: "Lịch", icon: Calendar, path: "/calendar" },
    { name: "Báo cáo", icon: PieChart, path: "/reports" },
    { name: "Báo cáo chi tiết", icon: BarChart, path: "/detailed-reports" },
    { name: "Khác", icon: MoreHorizontal, path: "/more" },
  ]

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setIsOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [setIsOpen])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>
      <aside
        className={cn(
          "bg-white h-screen flex flex-col border-r fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0",
          isMobile && !isOpen && "translate-x-[-100%]",
        )}
      >
        <div className="p-6 flex justify-between items-center h-[72px]">
          <h1
            className={cn(
              "text-2xl font-bold text-gray-800 transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0 lg:hidden",
            )}
          >
            Expense Tracker
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "transition-all duration-300",
              isOpen ? "opacity-100" : "opacity-100 fixed left-4 top-4 z-50 bg-white rounded-full shadow-md",
            )}
          >
            {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </Button>
        </div>
        <nav className={cn("flex-1 px-4 overflow-y-auto transition-all duration-300", !isOpen && "invisible w-0 px-0")}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start mb-2 py-3 transition-all duration-300",
                pathname === item.path ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-100",
                !isOpen && "w-0 p-0 overflow-hidden",
              )}
              onClick={() => {
                router.push(item.path)
                if (isMobile) {
                  setIsOpen(false)
                }
              }}
            >
              <item.icon className={cn("w-5 h-5 mr-3", !isOpen && "w-0")} />
              <span className={cn("transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 w-0")}>
                {item.name}
              </span>
            </Button>
          ))}
        </nav>
      </aside>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

