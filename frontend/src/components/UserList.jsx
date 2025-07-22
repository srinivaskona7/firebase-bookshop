import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users')
      setUsers(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (e) => {
    e.preventDefault()
    if (!newUser.name.trim() || !newUser.email.trim()) return

    try {
      const response = await axios.post('/api/users', newUser)
      setUsers([...users, response.data])
      setNewUser({ name: '', email: '' })
      setError('')
    } catch (err) {
      setError('Failed to add user')
      console.error('Error adding user:', err)
    }
  }

  if (loading) {
    return (
      <div className="component-container">
        <div className="loading">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="component-container">
      <h2 className="component-title">👥 User Management</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={addUser}>
        <div className="form-group">
          <label htmlFor="userName">Name:</label>
          <input
            id="userName"
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Enter user name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email:</label>
          <input
            id="userEmail"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Enter user email..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>

      <ul className="item-list">
        {users.map(user => (
          <li key={user.id} className="item">
            <div className="item-content">
              <strong>{user.name}</strong>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                📧 {user.email}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.25rem' }}>
                ID: {user.id}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {users.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No users found. Add one above to get started!
        </div>
      )}
    </div>
  )
}

export default UserList