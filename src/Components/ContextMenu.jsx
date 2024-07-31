import "./ContextMenu.css";

function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  setInput,
  setIsEditing,
  rowId,
}) {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          const foundExpense = expenses.find((expense) => expense.id === rowId);
          setIsEditing(rowId);
          setInput(foundExpense);
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
