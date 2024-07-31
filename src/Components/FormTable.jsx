import { useState } from "react";
import "./FormTable.css";
import ContextMenu from "./ContextMenu";

function FormTable({ expenses, setExpenses, setInput, setIsEditing }) {
  const [filter, setFilter] = useState("");
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [sortCallback, setSortCallback] = useState(() => () => {});

  function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string(1);
  }

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        expenses={expenses}
        setExpenses={setExpenses}
        setInput={setInput}
        setIsEditing={setIsEditing}
        rowId={rowId}
      />
      <table
        className="expenseTable"
        onClick={() => {
          if (menuPosition.left) {
            setMenuPosition({});
          }
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() =>
                    setSortCallback(() => (a, b) => a.amount - b.amount)
                  }
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() =>
                    setSortCallback(() => (a, b) => b.amount - a.amount)
                  }
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>

                {/* creoss
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    console.log("sddd");
                    setSortCallback(() => () => {});
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg> */}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {expenses
            .sort(sortCallback)
            .filter((item) => item.category?.includes(filter))
            .map(({ id, title, category, amount }) => (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuPosition({
                    left: e.clientX + 4,
                    top: e.clientY + 4,
                  });
                  setRowId(id);
                }}
              >
                <td>{title.charAt(0).toUpperCase() + title.slice(1)}</td>
                <td>{category.charAt(0).toUpperCase() + category.slice(1)}</td>
                <td>₹{amount}</td>
              </tr>
            ))
            .reverse()}
        </tbody>

        {expenses.length ? (
          <tfoot>
            <tr>
              <td>Total</td>

              <td colSpan={2}>
                ₹
                {expenses
                  .filter((item) => item.category?.includes(filter))
                  .reduce((acc, data) => acc + parseInt(data.amount), 0)}
              </td>
            </tr>
          </tfoot>
        ) : (
          ""
        )}
      </table>
    </>
  );
}

export default FormTable;
