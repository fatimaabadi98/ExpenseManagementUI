import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import Expense from "./Expense";

interface ExpenseFormProps {
  onExpenseCreate: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onExpenseCreate }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: "", // Set the ID based on your logic
      description,
      value,
    };

    onExpenseCreate(newExpense);
    setDescription("");
    setSuccessMessage("Expense created successfully");
    setValue("");
    history.push("/expenses");
  };

  return (
    <Box p={4}>
      {successMessage && (
        <Text className="success-message" role="alert">
          {successMessage}
        </Text>
      )}
      <Heading as="h2" mb={4}>
        Add New Expense
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
            <Flex justifyContent="space-between">
              <Button type="submit" colorScheme="green">
                Submit
              </Button>
              <Button
                type="button"
                colorScheme="red"
                onClick={() => history.push("/expenses")}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpenseForm;
