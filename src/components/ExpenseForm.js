import React from "react";
import Item from "./ExpenseItem";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            value={charge}
            onChange={handleCharge}
            placeholder="e.g rent"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={handleAmount}
            placeholder="e.g 500"
          ></input>
        </div>
      </div>
      <button className="btn">
        {edit ? "edit" : "submit"}
        <MdSend />
      </button>
    </form>
  );
};

export default ExpenseForm;
