import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { Box, CircularProgress, Alert, AlertIcon } from "@chakra-ui/react";
import ExpenseForm from "./assets/components/ExpenseForm";

import Expense from "./assets/components/Expense";
import Expenses from "./assets/components/Expenses";
import axios from "axios";
import ExpenseEditForm from "./assets/components/ExpenseEditForm";

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const handleExpenseCreate = async (expense: Expense) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/expenses",
        expense
      );
      const createdExpense = response.data;
      setExpenses([...expenses, createdExpense]);
      setMessage("The row is created");
      setTimeout(() => setMessage(null), 5000); // Clear the message after 5 seconds
    } catch (error) {
      console.error("Error creating expense:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/expenses");
      const fetchedExpenses = response.data;
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpenseUpdate = async (expense: Expense) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/expenses/${expense.id}`
      );
      const updatedExpense = response.data;
      const updatedExpenses = expenses.map((e) =>
        e.id === updatedExpense.id ? updatedExpense : e
      );
      setExpenses([...updatedExpenses]);
      setMessage("The row is updated");
      setTimeout(() => setMessage(null), 5000); // Clear the message after 5 seconds
    } catch (error) {
      console.error("Error updating expense:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpenseDelete = async (expense: Expense) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:8000/api/expenses/${expense.id}`);
      const updatedExpenses = expenses.filter((e) => e.id !== expense.id);
      setExpenses(updatedExpenses);
      setMessage("The row is deleted");
      setTimeout(() => setMessage(null), 5000); // Clear the message after 5 seconds
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const history = useHistory();

  return (
    <Router>
      <div>
        {message && (
          <Alert status="success">
            <AlertIcon />
            {message}
          </Alert>
        )}
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress isIndeterminate color="green.300" />
          </Box>
        ) : (
          <Switch>
            <Route path="/expenses/new">
              <ExpenseForm onExpenseCreate={handleExpenseCreate} />
            </Route>
            <Route path="/expenses/:id/edit">
              <ExpenseEditForm onExpenseUpdate={handleExpenseUpdate} />
            </Route>
            <Route path="/expenses">
              <Expenses
                expenses={expenses}
                onDeleteExpense={handleExpenseDelete}
              />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
