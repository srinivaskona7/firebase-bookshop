import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HealthCheck = () => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkHealth()
  }, [])

  const checkHealth = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/health')
      setStatus(response.data)
      setError('')
    } catch (err) {
      setError('Failed to connect to backend server')
      setStatus(null)
      console.error('Error checking health:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="component-container">
      <h2 className="component-title">🏥 Health Check</h2>
      
      {loading && <div className="loading">Checking server status...</div>}
      
      {error && (
        <div className="error">
          {error}
          <br />
          <button 
            onClick={checkHealth} 
            className="btn btn-primary" 
            style={{ marginTop: '1rem' }}
          >
            Retry Connection
          </button>
        </div>
      )}
      
      {status && !loading && (
        <div className="status-card">
          <h3>✅ Server Status: {status.status}</h3>
          <p>{status.message}</p>
          <p>Last checked: {formatTimestamp(status.timestamp)}</p>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>🔧 Connection Details</h3>
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '10px', marginTop: '1rem' }}>
          <p><strong>Frontend:</strong> React + Vite (Port 5173)</p>
          <p><strong>Backend:</strong> Express.js (Port 5000)</p>
          <p><strong>API Endpoint:</strong> /api/health</p>
          <p><strong>Proxy:</strong> Vite development server</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={checkHealth} 
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <h4>🔍 What this checks:</h4>
        <ul style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
          <li>Backend server connectivity</li>
          <li>API endpoint responsiveness</li>
          <li>CORS configuration</li>
          <li>Express.js middleware stack</li>
        </ul>
      </div>
    </div>
  )
}

export default HealthCheck