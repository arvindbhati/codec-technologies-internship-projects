

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statuses = ['todo', 'inprogress', 'done'];

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', config);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', form, config);
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      alert('Error creating task');
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status }, config);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Kanban Task Board</h2>

      <form onSubmit={createTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ marginLeft: '10px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Add Task</button>
      </form>

      <div style={{ display: 'flex', gap: '20px' }}>
        {statuses.map((status) => (
          <div key={status} style={{ flex: 1 }}>
            <h3>{status.toUpperCase()}</h3>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div
                  key={task._id}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '10px'
                  }}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p style={{ fontSize: '0.8rem' }}>Assigned: {task.assignedTo?.name || 'N/A'}</p>
                  <div>
                    {statuses
                      .filter((s) => s !== status)
                      .map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(task._id, s)}
                          style={{ marginRight: '5px' }}
                        >
                          Move to {s}
                        </button>
                      ))}
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
