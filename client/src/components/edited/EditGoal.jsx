import React, { useState } from "react";
import { handleUserChange } from "../../utils/formHandleChanges.js";
import { updateGoal } from "../../api/GoalApi.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function GoalForm() {
  const profile = useSelector((state) => state.auth.profile);
  const selectedGoal = useSelector((state) => state.transaction.selectedGoal);
  const navigate = useNavigate();

  const { title, description, amount, progress } = selectedGoal;
  const [goalFormData, setGoalFormData] = useState({
    user: profile._id,
    title,
    description,
    amount,
    progress,
  });

  const submitForm = (e) => {
    e.preventDefault();
    const response = updateGoal(selectedGoal._id, goalFormData);

    setGoalFormData({
      user: profile._id,
      title: "",
      description: "",
      amount: 0,
      progress: 0,
    });

    navigate("/goal");
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Set New Goal</h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Goal Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Enter your goal title"
              value={goalFormData.title}
              onChange={(event) => {
                handleUserChange(event, goalFormData, setGoalFormData);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Enter a description"
              value={goalFormData.description}
              onChange={(event) => {
                handleUserChange(event, goalFormData, setGoalFormData);
              }}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium">
              Target Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Enter the target amount"
              value={goalFormData.amount}
              onChange={(event) => {
                handleUserChange(event, goalFormData, setGoalFormData);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="progress" className="block text-sm font-medium">
              Current Progress
            </label>
            <input
              type="number"
              name="progress"
              id="progress"
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              placeholder="Enter the target amount"
              value={goalFormData.progress}
              onChange={(event) => {
                handleUserChange(event, goalFormData, setGoalFormData);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save Goal
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoalForm;
