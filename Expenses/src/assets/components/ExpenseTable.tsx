import React from "react";
import Expense from "./Expense";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ExpenseTableProps {
  expenses: Expense[];
  onAddNewExpense: () => void;
  isLoading: boolean; // Add isLoading prop
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onAddNewExpense,
  isLoading,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <h2>Expenses Manager</h2>
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={onAddNewExpense}
        >
          Add New Expense
        </button>
        {isLoading ? (
          <div className="loading-indicator">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.value}</td>
                  <td>
                    <Link to={`/expenses/${expense.id}`}>Edit</Link>
                    <Link to={`/expenses/${expense.id}`}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;
