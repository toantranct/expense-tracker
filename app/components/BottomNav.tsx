import { Pencil, Calendar, PieChart, MoreHorizontal } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { name: "Nhập vào", icon: Pencil, path: "/expense" },
    { name: "Lịch", icon: Calendar, path: "/calendar" },
    { name: "Báo cáo", icon: PieChart, path: "/reports" },
    { name: "Khác", icon: MoreHorizontal, path: "/more" },
  ]

  return (
    <div className="grid grid-cols-4 p-4 bg-white border-t lg:hidden">
      {navItems.map((item) => (
        <button key={item.name} className="flex flex-col items-center gap-1" onClick={() => router.push(item.path)}>
          <item.icon className={cn("w-5 h-5", pathname === item.path ? "text-green-500" : "text-gray-600")} />
          <span className={cn("text-xs", pathname === item.path ? "text-green-500" : "text-gray-600")}>
            {item.name}
          </span>
        </button>
      ))}
    </div>
  )
}

