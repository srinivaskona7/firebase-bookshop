import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/todos')
      setTodos(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch todos')
      console.error('Error fetching todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const response = await axios.post('/api/todos', { text: newTodo })
      setTodos([...todos, response.data])
      setNewTodo('')
      setError('')
    } catch (err) {
      setError('Failed to add todo')
      console.error('Error adding todo:', err)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, { completed: !completed })
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ))
      setError('')
    } catch (err) {
      setError('Failed to update todo')
      console.error('Error updating todo:', err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
      setError('')
    } catch (err) {
      setError('Failed to delete todo')
      console.error('Error deleting todo:', err)
    }
  }

  if (loading) {
    return (
      <div className="component-container">
        <div className="loading">Loading todos...</div>
      </div>
    )
  }

  return (
    <div className="component-container">
      <h2 className="component-title">📝 Todo List</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={addTodo}>
        <div className="form-group">
          <label htmlFor="newTodo">Add a new todo:</label>
          <input
            id="newTodo"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your todo..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>

      <ul className="item-list">
        {todos.map(todo => (
          <li key={todo.id} className={`item ${todo.completed ? 'completed' : ''}`}>
            <div className="item-content">
              <strong>{todo.text}</strong>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                Status: {todo.completed ? '✅ Completed' : '⏳ Pending'}
              </div>
            </div>
            <div className="item-actions">
              <button
                onClick={() => toggleTodo(todo.id, todo.completed)}
                className={`btn ${todo.completed ? 'btn-primary' : 'btn-success'}`}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No todos yet. Add one above to get started!
        </div>
      )}
    </div>
  )
}

export default TodoList