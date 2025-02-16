import './App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './pages/DashBoard.jsx';
import ResumeMaker from './pages/ResumeMaker.jsx';
import Navbar from './components/Navbar.jsx';
import ResumePreview from './components/ResumePreview.jsx';

import { protectedRoutes } from './protectedRoutes.jsx'
import ResumeTemplates from './pages/ResumeTemplates.jsx';
import { ResumeTemplateProvider } from './context/resumeTemplateContext.jsx';
import { Template1, Template2, Template3 } from './miscellaneous/ResumePreviewTemplates.jsx';
import ChoosedResumeMaker from './pages/ChoosedResumeMaker.jsx';

function App() {
  // useLocation needs to be inside the Router context
  const location = useLocation();

  // Check if the current route is not login or register
  const showNavbar = !["/", '/login', '/register'].includes(location.pathname);

  return (
    <AuthProvider>
      <ResumeTemplateProvider>

        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<protectedRoutes><Dashboard /></protectedRoutes>} />
          <Route path="/create-resume" element={<protectedRoutes><ResumeMaker /></protectedRoutes>} />
          <Route path='/resume-preview' element={<protectedRoutes><ResumePreview /></protectedRoutes>} />
          <Route path='/resume-templates' element={<protectedRoutes><ResumeTemplates /></protectedRoutes>} />
          <Route path="/choosed-resume-maker" element={<protectedRoutes><ChoosedResumeMaker /></protectedRoutes>} />

        </Routes>
      </ResumeTemplateProvider>
    </AuthProvider>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
