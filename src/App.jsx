import "./App.css";
import Header from "./Components/Header";
import ExpenseForm from "./Components/ExpenseForm";
import FormTable from "./Components/FormTable";
import { useState } from "react";
import { UseLocalStorage } from "./Custom Hooks/UseLocalStorage";

function App() {
  const [input, setInput] = UseLocalStorage("input", {
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = UseLocalStorage("expenses", []);
  const [isEditing, setIsEditing] = UseLocalStorage("isEditing", "");

  function handleInput(input) {
    setExpenses((prev) => [...prev, input]);
  }

  return (
    <>
      <Header />
      <div className="container">
        <ExpenseForm
          handleInput={handleInput}
          input={input}
          setInput={setInput}
          isEditing={isEditing}
          setExpenses={setExpenses}
          setIsEditing={setIsEditing}
        />
        <FormTable
          expenses={expenses}
          setInput={setInput}
          setExpenses={setExpenses}
          setIsEditing={setIsEditing}
        />
      </div>
    </>
  );
}

export default App;
