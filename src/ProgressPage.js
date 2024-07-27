import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import './ProgressPage.css';

function ProgressPage() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch tasks for the logged-in user from Firestore
        const tasksRef = collection(firestore, 'tasks');
        const q = query(tasksRef, where('userId', '==', currentUser.uid));

        const unsubscribeTasks = onSnapshot(q, (snapshot) => {
          const tasksList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTasks(tasksList);
          const completed = tasksList.filter(task => task.done).length;
          setCompletedTasks(completed);
        });

        return () => {
          unsubscribeTasks(); // Clean up task subscription
        };
      } else {
        setUser(null);
        setTasks([]);
        setCompletedTasks(0);
      }
    });

    return () => {
      unsubscribeAuth(); // Clean up authentication subscription
    };
  }, [navigate]);

  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const handleBack = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="progress-page">
      <header>
        <h1>Progress</h1>
        <button className="btn-back" onClick={handleBack}>
          Back to Home
        </button>
      </header>
      
      <div className="progress-container">
        <h2>Tasks Completed: {completedTasks}/{tasks.length}</h2>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{Math.round(progress)}% Completed</p>
      </div>

      <footer>
        &copy; Your Website
      </footer>
    </div>
  );
}

export default ProgressPage;
