import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuid } from "uuid";

function App() {
  //*******************State Values ******/
  //***********All expenses, Add expense */

  const initialExpense = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [];
  const [expense, setExpense] = useState(initialExpense);
  //************charge */
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  //edit states
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  //*******************use Effect ******/
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  //********* Functionality********/
  //handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //Handle Amount
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  //Handle Alert

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpense = expense.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpense(newExpense);
        setEdit(false);
      } else {
        const newExpense = {
          id: uuid(),
          charge: charge,
          amount: Number(amount),
        };
        setExpense([...expense, newExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty and amount must be bigger than zero`,
      });
    }
  };
  //handle Delete
  const handleDelete = (id) => {
    const tempExpense = expense.filter((item) => item.id !== id);
    setExpense(tempExpense);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // handle Edit
  const handleEdit = (id) => {
    const editedItem = expense.find((item) => item.id == id);
    let { charge, amount } = editedItem;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  // clear Items
  const clearItems = () => {
    setExpense([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  //************* Alert ************* */
  const [alert, setAlert] = useState({ show: false });

  return (
    <>
      <h1> Budget Calculator</h1>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expense}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total spending :
        <span className="total">
          $
          {expense.reduce((acc, curr) => {
            return parseInt((acc += curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
