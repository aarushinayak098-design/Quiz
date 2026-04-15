import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import Dashboard from './pages/admin/Dashboard';
import QuizEditor from './pages/admin/QuizEditor';
import AddQuiz from './pages/admin/AddQuiz';
import QuizResults from './pages/admin/QuizResults';
import WelcomePage from './pages/WelcomePage';

const Landing = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return <WelcomePage />;
  }

  return <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/client"
            element={
              <ProtectedRoute roles={['student', 'admin']}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/quiz/:id"
            element={
              <ProtectedRoute roles={['student', 'admin']}>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute roles={['student', 'admin']}>
                <Quiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quiz/:id"
            element={
              <ProtectedRoute roles={['admin']}>
                <QuizEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quiz/new"
            element={
              <ProtectedRoute roles={['admin']}>
                <AddQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/results/:quizId"
            element={
              <ProtectedRoute roles={['admin']}>
                <QuizResults />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={1800} />
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
