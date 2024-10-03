import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AllTasks from "./AllTask";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome {user?.username}</h1>
      {/* Additional dashboard content can go here */}
      <AllTasks />
    </div>
  );
};

export default Dashboard;
