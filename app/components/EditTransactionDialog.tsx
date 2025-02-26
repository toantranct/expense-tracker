import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Transaction = {
  id: string
  date: string
  type: "income" | "expense"
  category: string
  description: string
  amount: number
}

type EditTransactionDialogProps = {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  onSave: (updatedTransaction: Transaction) => void
}

export function EditTransactionDialog({ isOpen, onClose, transaction, onSave }: EditTransactionDialogProps) {
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(transaction)

  if (!transaction) return null

  const handleSave = () => {
    if (editedTransaction) {
      onSave(editedTransaction)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa giao dịch</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Ngày
            </Label>
            <Input
              id="date"
              type="date"
              value={editedTransaction?.date}
              onChange={(e) => setEditedTransaction({ ...editedTransaction!, date: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Loại
            </Label>
            <Select
              value={editedTransaction?.type}
              onValueChange={(value) =>
                setEditedTransaction({ ...editedTransaction!, type: value as "income" | "expense" })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Thu nhập</SelectItem>
                <SelectItem value="expense">Chi tiêu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Danh mục
            </Label>
            <Input
              id="category"
              value={editedTransaction?.category}
              onChange={(e) => setEditedTransaction({ ...editedTransaction!, category: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Input
              id="description"
              value={editedTransaction?.description}
              onChange={(e) => setEditedTransaction({ ...editedTransaction!, description: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Số tiền
            </Label>
            <Input
              id="amount"
              type="number"
              value={editedTransaction?.amount}
              onChange={(e) =>
                setEditedTransaction({ ...editedTransaction!, amount: Number.parseFloat(e.target.value) })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

