import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import './TasksPage.css';

function TasksPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem('userId');
  const username = location.state?.username || localStorage.getItem('username');

  // Redirect to login page if no user information is found
  useEffect(() => {
    if (!userId || !username) {
      navigate('/tasks');
    } else {
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
    }
  }, [userId, username, navigate]);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');

  useEffect(() => {
    const tasksRef = collection(firestore, 'tasks');
    const q = query(tasksRef, where('userId', '==', userId), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksList);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleAddTask = async () => {
    if (title && date) {
      try {
        await addDoc(collection(firestore, 'tasks'), {
          title,
          date,
          done: false,
          userId,
          timestamp: Date.now(),
        });
        setTitle('');
        setDate('');
        setShowAddTask(false);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDate(task.date);
  };

  const handleSaveEdit = async () => {
    if (editTitle && editDate !== '') {
      try {
        const taskRef = doc(firestore, 'tasks', editId);
        await updateDoc(taskRef, { title: editTitle, date: editDate });
        setEditId(null);
        setEditTitle('');
        setEditDate('');
      } catch (error) {
        console.error('Error editing task:', error);
      }
    }
  };

  const toggleTaskDone = async (task) => {
    try {
      const taskRef = doc(firestore, 'tasks', task.id);
      await updateDoc(taskRef, { done: !task.done });
    } catch (error) {
      console.error('Error toggling task done:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const taskRef = doc(firestore, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const handleReturnHome = () => {
    navigate('/home');
  };

  return (
    <div className="tasks-page">
      <header>
        <h1>Tasks  {username}</h1>
        <button className="btn-return-home" onClick={handleReturnHome}>
          Return Home
        </button>
      </header>

      <div className="tasks-container">
        <button className="btn-add-task" onClick={handleShowAddTask}>
          {showAddTask ? 'Cancel' : 'Add Task'}
        </button>
        {showAddTask && (
          <div className="add-task-form">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="btn-add-task" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        )}

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
              {editId === task.id ? (
                <div className="edit-task-form">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <button className="btn-save" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="btn-cancel" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{task.title} - {task.date}</span>
                  <div className="task-actions">
                    <button className="btn-done" onClick={() => toggleTaskDone(task)}>
                      {task.done ? 'Undo' : 'Done'}
                    </button>
                    <button className="btn-edit" onClick={() => handleEditTask(task)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <footer>
        &copy; 2024 Productivity Trick
      </footer>
    </div>
  );
}

export default TasksPage;
