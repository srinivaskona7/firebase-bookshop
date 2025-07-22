# 🚀 Full-Stack Node.js Application

A modern full-stack application built with Node.js, featuring a React frontend and Express.js backend. This project demonstrates best practices for building scalable web applications with modern JavaScript technologies.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **Modern CSS** - Responsive design with gradients and animations

### Backend
- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Nodemon** - Development auto-restart

## 📁 Project Structure

```
fullstack-nodejs-app/
├── package.json              # Root package.json with workspace configuration
├── README.md                 # This file
├── backend/                  # Backend Express.js application
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables
│   ├── .gitignore          # Backend gitignore
│   └── src/
│       └── server.js       # Main server file
└── frontend/                # Frontend React application
    ├── package.json         # Frontend dependencies
    ├── vite.config.js      # Vite configuration
    ├── index.html          # HTML template
    ├── .eslintrc.cjs       # ESLint configuration
    ├── .gitignore          # Frontend gitignore
    └── src/
        ├── main.jsx        # React entry point
        ├── App.jsx         # Main app component
        ├── App.css         # Main styles
        ├── index.css       # Base styles
        └── components/     # React components
            ├── TodoList.jsx
            ├── UserList.jsx
            └── HealthCheck.jsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <your-repo-url>
   cd fullstack-nodejs-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers concurrently.

### Alternative: Start servers individually

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

## 🌐 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start the production backend server
- `npm run install:all` - Install dependencies for all workspaces

### Frontend Scripts
- `npm run dev --workspace=frontend` - Start Vite development server
- `npm run build --workspace=frontend` - Build for production
- `npm run preview --workspace=frontend` - Preview production build
- `npm run lint --workspace=frontend` - Run ESLint

### Backend Scripts
- `npm run dev --workspace=backend` - Start with nodemon (auto-restart)
- `npm run start --workspace=backend` - Start production server
- `npm run build --workspace=backend` - Build (currently just an echo)

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
  ```json
  {
    "text": "Learn Node.js"
  }
  ```
- `PUT /api/todos/:id` - Update a todo
  ```json
  {
    "text": "Updated text",
    "completed": true
  }
  ```
- `DELETE /api/todos/:id` - Delete a todo

## 🎨 Features

### 🏥 Health Check
- Real-time backend connectivity testing
- Server status monitoring
- Connection diagnostics

### 📝 Todo Management
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Real-time updates

### 👥 User Management
- View user list
- Add new users with name and email validation
- RESTful API integration

### 🎨 Modern UI
- Responsive design that works on all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Glass-morphism design elements
- Accessible form controls

## 🔧 Configuration

### Environment Variables (Backend)
Create a `.env` file in the `backend` directory:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### CORS Configuration
The backend is configured to accept requests from the frontend URL specified in the environment variables.

### Proxy Configuration
The Vite frontend is configured to proxy API requests to the backend server during development.

## 🚀 Deployment

### Frontend (Vite Build)
```bash
npm run build --workspace=frontend
```
The built files will be in `frontend/dist/`

### Backend (Production)
```bash
npm run start --workspace=backend
```

### Full Build
```bash
npm run build
```

## 🛡️ Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configured for specific origins
- **Input validation** - Server-side validation for all inputs
- **Error handling** - Comprehensive error handling and logging

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🔍 Development Features

- **Hot reload** - Both frontend and backend support hot reloading
- **ESLint** - Code linting for consistent code style
- **Nodemon** - Automatic server restarts during development
- **Vite** - Fast development server with instant updates
- **Console logging** - Comprehensive logging for debugging

## 🚀 Production Considerations

For production deployment, consider:

1. **Environment Variables**: Set proper production environment variables
2. **Database**: Replace in-memory storage with a proper database
3. **Authentication**: Add user authentication and authorization
4. **HTTPS**: Enable HTTPS for secure communication
5. **Process Management**: Use PM2 or similar for process management
6. **Load Balancing**: Consider load balancing for high traffic
7. **Monitoring**: Add application monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Port Already in Use
If you get port errors:
- Change the PORT in `backend/.env`
- Change the port in `frontend/vite.config.js`
- Update the FRONTEND_URL in `backend/.env`

### CORS Issues
- Ensure the FRONTEND_URL in backend/.env matches your frontend URL
- Check that both servers are running

### Module Not Found
- Run `npm run install:all` to install all dependencies
- Check that you're in the correct directory

### Build Issues
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Restart the development servers

---

**Built with ❤️ using Node.js, Express, React, and Vite**