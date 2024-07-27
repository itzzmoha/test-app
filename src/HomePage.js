import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore'; // Import missing functions
import './HomePage.css';

function HomePage() {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = doc(firestore, 'users', currentUser.uid);
        getDoc(userDoc).then((docSnap) => {
          if (docSnap.exists()) {
            setUsername(docSnap.data().username);
          }
        });

        // Fetch tasks for the logged-in user
        const tasksRef = collection(firestore, 'tasks');
        const q = query(tasksRef, where('userId', '==', currentUser.uid));

        const unsubscribeTasks = onSnapshot(q, (snapshot) => {
          const tasksList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setDailyTasks(tasksList);
        });

        return () => {
          unsubscribeTasks(); // Clean up task subscription
        };
      } else {
        setUser(null);
        setUsername('');
        setDailyTasks([]);
      }
    });

    return () => {
      unsubscribeAuth(); // Clean up authentication subscription
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="homepage">
      <nav>
        <ul>
          <li><Link to="/tasks" className='hv'>Tasks</Link></li>
          <li><Link to="/progress" className='hv'>Progress</Link></li>
          <li><Link to="/chat" className='hv'>Chat</Link></li>
          <li>{username ? `@${username}` : 'Loading...'}</li>
          <li className="logout-button" onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      <div className="main-content">
        <div className="daily-tasks">
          <h2>Daily Tasks</h2>
          <ul>
            {dailyTasks.map((task) => (
              <li key={task.id} className={task.done ? 'task-done' : ''}>
                {task.title} - {task.date}
                <span className="task-emoji">
                  {task.done ? ' ✔️' : ' ❌'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lofi-music">
          <h2>Lofi Music</h2>
          <iframe
            width="400"
            height="300"
            src="https://www.youtube.com/embed/4xDzrJKXOOY?si=Ptna9ekVECKaEXVG"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <footer>
        &copy; 2024 Productivity Trick
      </footer>
    </div>
  );
}

export default HomePage;
