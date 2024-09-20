import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { toast } from "sonner";
import Modal from "react-modal";
import { deleteGoal, getGoals, updateGoal } from "../../api/GoalApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGoal } from "../../app/slices/transactionSlice";

function Goal() {
  const selectedGoal = useSelector((state) => state.transaction.selectedGoal);
  const dispatch = useDispatch();
  const [goalHistory, setGoalHistory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progressAmount, setProgressAmount] = useState("");

  const navigate = useNavigate();

  async function fetchGoals() {
    const { data } = await getGoals();
    setGoalHistory(data);
  }

  useEffect(() => {
    fetchGoals();
  }, []);

  function handleMenuClick(event, goal) {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedGoal(goal));
  }

  const handleAddAmount = () => {
    setIsModalOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteGoal = () => {
    toast.warning("Confirm to delete Goal", {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            await deleteGoal(selectedGoal._id);
            toast.success("Goal deleted");
            fetchGoals();
          } catch (error) {
            console.error("Error deleting goal:", error);
            toast.error("Error deleting goal");
          }
        },
      },
    });
    setAnchorEl(null);
  };

  const handleUpdateProgress = async () => {
    const { user, title, description, amount, progress } = selectedGoal;
    try {
      await updateGoal(selectedGoal._id, {
        user,
        title,
        description,
        amount,
        progress: progress + parseFloat(progressAmount),
      });
      toast.success("Progress updated");
      fetchGoals();
      setIsModalOpen(false);
      setProgressAmount("");
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Error updating progress");
    }
  };

  return (
    <div className="min-h-full bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Goals</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goalHistory.map((goal) => (
            <div
              key={goal._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg relative flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold">{goal.title}</div>
                <IconButton onClick={(e) => handleMenuClick(e, goal)}>
                  <MoreVertIcon className="text-white" />
                </IconButton>
              </div>
              <div className="mb-4 text-sm">{goal.description}</div>
              <div className="mb-4">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                    <div
                      className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                      style={{
                        width: `${(goal.progress / goal.amount) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {(goal.progress / goal.amount) * 100}%
                  </div>
                </div>
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Target:</span> ₹ {goal.amount}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Progress:</span> ₹{" "}
                {goal.progress}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/goalForm"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
          >
            Set New Budget
          </Link>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          <MenuItem onClick={handleAddAmount}>Add Amount</MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/editGoal");
              setAnchorEl(null);
            }}
          >
            Edit Goal
          </MenuItem>
          <MenuItem onClick={handleDeleteGoal}>Delete Goal</MenuItem>
        </Menu>

        <Modal
          isOpen={isModalOpen}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          appElement={document.getElementById("root")}
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-white text-2xl font-bold mb-4 text-center">
              Add Amount
            </h2>
            <input
              type="number"
              value={progressAmount}
              onChange={(e) => setProgressAmount(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-4"
              placeholder="Enter amount"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdateProgress}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Goal;
