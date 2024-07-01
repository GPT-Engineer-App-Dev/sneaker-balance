import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { date: "2023-10-01", amount: 100, type: "income", category: "Nike" },
    { date: "2023-10-02", amount: 200, type: "expense", category: "Adidas" },
  ]);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTransaction = (data) => {
    if (isEditing) {
      const updatedTransactions = transactions.map((transaction, index) =>
        index === currentTransaction ? data : transaction
      );
      setTransactions(updatedTransactions);
      setIsEditing(false);
      setCurrentTransaction(null);
    } else {
      setTransactions([...transactions, data]);
    }
  };

  const handleEditTransaction = (index) => {
    setCurrentTransaction(index);
    setIsEditing(true);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Transaction" : "Add Transaction"}</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            onSubmit={handleAddTransaction}
            defaultValues={isEditing ? transactions[currentTransaction] : {}}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default Index;