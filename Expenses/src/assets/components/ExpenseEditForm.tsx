import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Expense from "./Expense";
import axios from "axios";

interface ExpenseEditFormProps {
  onExpenseUpdate: (expense: Expense) => void;
}

const ExpenseEditForm: React.FC<ExpenseEditFormProps> = ({
  onExpenseUpdate,
}) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const { id } = useParams(); // Get the expense ID from the URL
  const history = useHistory();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/expenses/${id}`
        );
        const expenseData = response.data;
        setDescription(expenseData.description);
        setValue(expenseData.value);
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    fetchExpense();
  }, [id]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedExpense: Expense = {
      id, // Use the existing expense ID
      description,
      value,
    };

    try {
      await axios.put(
        `http://localhost:8000/api/expenses/${id}`,
        updatedExpense
      );
      onExpenseUpdate(updatedExpense);
      history.push("/expenses");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Edit Expense
      </Heading>
      <Flex justifyContent="center" alignItems="center">
        <Box width="400px">
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                type="text"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="value">Value</FormLabel>
              <Input
                type="number"
                id="value"
                value={value}
                onChange={handleValueChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Update Expense
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpenseEditForm;
