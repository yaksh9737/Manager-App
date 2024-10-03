import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState('user'); 
  const [error, setError] = useState('');

  // Function to fetch tasks and decode the JWT to get user info
  const fetchTasksAndUserInfo = async () => {
    const yourToken = localStorage.getItem('token');
    if (yourToken) {
      try {
        // Decode the token to extract user details
        const decodedToken = jwtDecode(yourToken);
        setUserId(decodedToken.id);
        setRole(decodedToken.role);

        // Fetch tasks
        const taskResponse = await fetch('http://localhost:8000/api/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourToken}`,
          },
        });

        if (!taskResponse.ok) {
          setError('Error fetching tasks');
          return;
        }

        const taskData = await taskResponse.json();
        console.log('Fetched Task Data:', taskData); // Debugging

        // Sort tasks by due date
        const sortedTasks = taskData.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setTasks(sortedTasks);
      } catch (err) {
        console.error("Error fetching tasks and user info:", err);
        setError('Error fetching tasks and user info, please try again.');
      }
    } else {
      setError('No token found. Please log in.');
    }
  };

  const handleDelete = async (taskId) => {
    const yourToken = localStorage.getItem('token');
    
    if (role !== 'admin') {
      setError('Only admins can delete tasks');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${yourToken}`,
        },
      });

      if (!response.ok) {
        setError('Error deleting task.');
        return;
      }

      // Remove the deleted task from the state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Error deleting task, please try again.');
    }
  };

  useEffect(() => {
    fetchTasksAndUserInfo();
  }, []); // Fetch tasks and user info once when the component loads

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Tasks</h2>
      
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Due Date</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Status</th>
              {role === 'admin' && <th className="px-4 py-2 border text-left text-sm font-medium text-gray-700">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No tasks available
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-4 py-2 border text-sm text-gray-800">{task.title}</td>
                  <td className="px-4 py-2 border text-sm text-gray-800">{task.description}</td>
                  <td className="px-4 py-2 border text-sm text-gray-800">{task.category}</td>
                  <td className="px-4 py-2 border text-sm text-gray-800">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border text-sm text-gray-800">{task.status}</td>
                  {role === 'admin' && (
                    <td className="px-4 py-2 border text-sm text-gray-800">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTasks;
