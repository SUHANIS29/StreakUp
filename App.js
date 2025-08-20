// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [streak, setStreak] = useState(0);

//   const increaseStreak = () => setStreak(streak + 1);
//   const resetStreak = () => setStreak(0);

//   return (
//     <div className="app">
//       <h1>🔥 Streak Up</h1>
//       <p className="streak-text">Current Streak: <span>{streak}</span></p>
//       <div className="buttons">
//         <button className="btn increase" onClick={increaseStreak}>
//           Increase
//         </button>
//         <button className="btn reset" onClick={resetStreak}>
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Users, TrendingUp, Bell, Target, Zap, Star, Play, ChevronRight, Check, Award, BarChart3, Flame } from 'lucide-react';
import './App.css';

const StreakUp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Workout', streak: 12, completed: true, category: 'Fitness', target: 30 },
    { id: 2, name: 'Read 30 Minutes', streak: 8, completed: false, category: 'Learning', target: 21 },
    { id: 3, name: 'Meditation', streak: 15, completed: true, category: 'Wellness', target: 50 },
    { id: 4, name: 'Drink 8 Glasses Water', streak: 5, completed: true, category: 'Health', target: 14 }
  ]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const motivationalQuotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "Don't break the chain! Every day counts.",
    "Consistency is the mother of mastery.",
    "Small habits, big results."
  ];

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
        : habit
    ));
  };

  const Navigation = () => (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-box"><Flame size={20} color="white" /></div>
        <span className="logo-text">Streak Up</span>
      </div>

      <div className="nav-links">
        {['Dashboard', 'Habits', 'Challenges', 'Analytics'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item.toLowerCase())}
            className={`nav-btn ${activeTab === item.toLowerCase() ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="join-btn">Join Now</button>
    </nav>
  );

  const Hero = () => (
    <section className="hero">
      <h1 className="hero-title">
        <span className="highlight">Build Habits</span><br />
        <span className="white-text">That Stick</span>
      </h1>
      <p className="hero-subtext">
        Transform your life with daily streak tracking, smart reminders, and gamified challenges. 
        Join thousands building better habits together.
      </p>
      <div className="hero-buttons">
        <button className="primary-btn"><Play size={18} /> Start Your Journey</button>
        <button className="secondary-btn">View Features <ChevronRight size={18} /></button>
      </div>
    </section>
  );

  const Dashboard = () => (
    <div className="dashboard">
      <h2 className="section-title">Your Dashboard</h2>
      <div className="habits-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-card">
            <button 
              className={`check-btn ${habit.completed ? 'done' : ''}`} 
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.completed && <Check size={14} color="white" />}
            </button>
            <div className="habit-info">
              <div className={habit.completed ? "habit-name done-text" : "habit-name"}>{habit.name}</div>
              <div className="habit-category">{habit.category}</div>
            </div>
            <div className="habit-stats">
              <div>{habit.streak} days</div>
              <div className="progress-bar">
                <div style={{width: `${(habit.streak / habit.target) * 100}%`}}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="footer">
      <p>&copy; 2025 Streak Up. All rights reserved.</p>
    </footer>
  );

  return (
    <div className="app">
      <Navigation />
      {activeTab === 'dashboard' && <><Hero /><Dashboard /></>}
      {activeTab === 'habits' && <Dashboard />}
      {activeTab === 'challenges' && <div className="placeholder">Leaderboards Coming Soon...</div>}
      {activeTab === 'analytics' && <div className="placeholder">Analytics Coming Soon...</div>}
      <Footer />

      {showNotification && (
        <div className="notification">
          <Bell size={18} /> Don't break your streak!
          <p>{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}</p>
        </div>
      )}
    </div>
  );
};

export default StreakUp;

