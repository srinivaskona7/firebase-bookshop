import React, { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import UserList from './components/UserList'
import HealthCheck from './components/HealthCheck'

function App() {
  const [activeTab, setActiveTab] = useState('todos')

  const tabs = [
    { id: 'todos', label: 'Todo List', component: TodoList },
    { id: 'users', label: 'Users', component: UserList },
    { id: 'health', label: 'Health Check', component: HealthCheck }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Full-Stack Node.js Application</h1>
        <p>React Frontend + Express.js Backend</p>
      </header>

      <nav className="app-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {ActiveComponent && <ActiveComponent />}
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ using Node.js, Express, React, and Vite</p>
      </footer>
    </div>
  )
}

export default App