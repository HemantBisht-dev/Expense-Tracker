import { useState } from "react";
import "../Components/ExpenseForm.css";

function ExpenseForm({
  handleInput,
  input,
  setInput,
  isEditing,
  setExpenses,
  setIsEditing,
}) {
  const [error, setError] = useState({});

  // form validation

  const validateConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 3, message: "Title should be at least 3 character long" },
    ],
    category: [{ required: true, message: "Please enter category" }],
    amount: [{ required: true, message: "Please enter amount" }],
  };

  const validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      const rules = validateConfig[key];
      if (!rules) {
        // console.warn(`No validation rules for field: ${key}`);
        return;
      }
      // console.log("Validating field:", key, "with value:", value);

      validateConfig[key].some((rule) => {
        // console.log("hello", rule);

        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorData[key] = rule.message;
          return true;
        }

        // if (rule.pattern && !rule.pattern.test(value)) {
        //   errorData[key] = rule.message;
        //   return true;
        // }
      });
    });

    setError(errorData);
    return errorData;
  };

  // set Inputs

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => ({ ...prev, [name]: value, id: crypto.randomUUID() }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validateResult = validate(input);
    if (Object.keys(validateResult).length) return;

    // update input

    if (isEditing) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === isEditing) {
            return { ...input, id: isEditing };
          }
          return prevExpense;
        })
      );
      setInput({ title: "", category: "", amount: "" });
      setIsEditing("");
      return;
    }

    // adding input

    handleInput(input);
    setInput({ title: "", category: "", amount: "" });
  }

  return (
    <form className="expenseForm" onSubmit={handleSubmit}>
      <div className="input_container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={input.title}
          placeholder="Enter title"
          onChange={handleChange}
        />
        <p className="error">{error.title}</p>
      </div>

      <div className="input_container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={input.category}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
        <p className="error">{error.category}</p>
      </div>

      <div className="input_container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={input.amount}
          placeholder="Enter amount"
          onChange={handleChange}
        />
        <p className="error">{error.amount}</p>
      </div>

      <button className="add-btn" type="submit">
        {isEditing ? "SAVE" : "ADD"}
      </button>
    </form>
  );
}

export default ExpenseForm;
