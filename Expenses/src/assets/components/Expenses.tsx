import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  Stack,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Expense from "./Expense";

interface ExpensesProps {
  expenses: Expense[];
  onDeleteExpense: (expense: Expense) => void;
}

const Expenses: React.FC<ExpensesProps> = ({ expenses, onDeleteExpense }) => {
  const [sortColumn, setSortColumn] = useState(""); // Track the currently sorted column
  const [sortOrder, setSortOrder] = useState(""); // Track the sorting order ('asc' or 'desc')

  // Handle sorting when a column header is clicked
  const handleSort = (column: string) => {
    // If the same column is clicked, toggle the sorting order
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the new sorting column and use 'asc' as the default order
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Sort the expenses based on the sorting column and order
  const sortedExpenses = expenses.sort((a, b) => {
    if (sortColumn === "Description") {
      const aValue = a.description.toLowerCase();
      const bValue = b.description.toLowerCase();
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    } else if (sortColumn === "Value") {
      return sortOrder === "asc" ? a.value - b.value : b.value - a.value;
    }
    return 0;
  });

  return (
    <Box p={4}>
      <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
        Expenses Manager
      </Heading>
      <Link
        to="/expenses/new"
        className="btn btn-success mt-4"
        style={{ backgroundColor: "grey", color: "white" }}
      >
        Add New Expense
      </Link>
      <Table
        variant="simple"
        mx="auto"
        borderWidth="1px"
        borderColor="black"
        mt={4}
      >
        <thead>
          <Tr>
            <Th>
              <Button
                variant="link"
                fontWeight="bold"
                color="black"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                onClick={() => handleSort("Description")}
              >
                Description
              </Button>
            </Th>
            <Th>
              <Button
                variant="link"
                fontWeight="bold"
                color="black"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                onClick={() => handleSort("Value")}
              >
                Value
              </Button>
            </Th>
            <Th fontWeight="bold" color="black">
              Action
            </Th>
          </Tr>
        </thead>
        <Tbody>
          {sortedExpenses.map((expense, index) => (
            <Tr key={index}>
              <Td _hover={{ color: "blue" }} _focus={{ boxShadow: "none" }}>
                {expense.description}
              </Td>
              <Td _hover={{ color: "blue" }} _focus={{ boxShadow: "none" }}>
                {expense.value}
              </Td>
              <Td>
                <Stack direction="row" spacing={2}>
                  <Link
                    to={`/expenses/${expense.id}/edit`}
                    className="btn btn-primary"
                    style={{ backgroundColor: "lightblue", color: "white" }}
                  >
                    Edit
                  </Link>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    _hover={{ backgroundColor: "red", color: "white" }}
                    _focus={{ boxShadow: "none" }}
                    onClick={() => onDeleteExpense(expense)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Expenses;
