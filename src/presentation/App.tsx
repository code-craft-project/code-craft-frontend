import './App.css'
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ToastContext from "../application/contexts/ToastContext";
import useToast from "../application/hooks/useToast";
import Toast from "./components/Toast";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import JobPost from './pages/JobsPost';
import Root from './layout/Root';
import Home from './pages/Home';

function App() {
  const toastManager = useToast();

  return (
      <ToastContext.Provider value={toastManager}>
        <Routes>
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn  />} />
          <Route path='/' element={(<Root />)}>
            <Route path="" element={<LandingPage />} />
            <Route path="jobs_post" element={<JobPost />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
        <Toast />
      </ToastContext.Provider>
  )
}

export default App;
