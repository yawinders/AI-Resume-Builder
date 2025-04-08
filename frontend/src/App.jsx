import './App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from './context/authContext.jsx';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './pages/DashBoard.jsx';
import ResumeMaker from './pages/ResumeMaker.jsx';
import Navbar from './components/Navbar.jsx';
import ResumePreview from './components/ResumePreview.jsx';

// import { protectedRoutes } from './protectedRoutes.jsx'
import ResumeTemplates from './pages/ResumeTemplates.jsx';
import { ResumeTemplateProvider } from './context/resumeTemplateContext.jsx';
import { Template1, Template2, Template3 } from './miscellaneous/ResumePreviewTemplates.jsx';
import ChoosedResumeMaker from './pages/ChoosedResumeMaker.jsx';
import ChoosedResumePreview from './components/ChoosedResumePreview.jsx';
import HomePage from './pages/Home.jsx';
import { ProtectedRoutes } from './protectedRoutes.jsx';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path="/create-resume" element={<ResumeMaker />} />
          <Route path='/resume-preview' element={<ResumePreview />} />
          <Route path='/resume-templates' element={<ResumeTemplates />} />
          <Route path="/choosed-resume-maker" element={<ProtectedRoutes><ChoosedResumeMaker /></ProtectedRoutes>} />
          <Route path="/choosed-preview" element={<ChoosedResumePreview />} />

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
