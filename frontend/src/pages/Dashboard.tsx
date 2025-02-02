import { useState } from "react";
import { useExpensesStore } from "../store/useExpensesStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Line } from "react-chartjs-2";

// ✅ Import and register necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { expenses, addExpense, editExpense, deleteExpense } = useExpensesStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", amount: "" });
  const [filter, setFilter] = useState("");

  const filteredExpenses = expenses.filter((exp) =>
    exp.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = () => {
    if (formData.id) editExpense({ ...formData, amount: Number(formData.amount) });
    else addExpense({ name: formData.name, amount: Number(formData.amount) });

    setOpen(false);
    setFormData({ id: "", name: "", amount: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spending Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={{
              labels: expenses.map((e) => e.name),
              datasets: [
                {
                  label: "Amount Spent",
                  data: expenses.map((e) => e.amount),
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.5)",
                },
              ],
            }}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Filter expenses..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Expense</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{formData.id ? "Edit Expense" : "Add Expense"}</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Expense Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <Button onClick={handleSubmit}>{formData.id ? "Update" : "Save"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{exp.name}</TableCell>
              <TableCell>${exp.amount}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => { setFormData(exp); setOpen(true); }}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteExpense(exp.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
