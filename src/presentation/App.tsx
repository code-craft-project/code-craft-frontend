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
import Events from './pages/Events';
import Challenges from './pages/Challenges';
import Search from './pages/Search';
import SingleJobPost from './pages/SingleJobPost';
import SingleOrganization from './pages/SingleOrganization';
import SingleEvent from './pages/SingleEvent';
import Settings from './pages/Settings';

function App() {
  const toastManager = useToast();

  return (
      <ToastContext.Provider value={toastManager}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn  />} />
          <Route path='/' element={(<Root />)}>
            <Route path="" element={<LandingPage />} />
            <Route path="jobs-post" element={<JobPost />} />
            <Route path="home" element={<Home />} />
            <Route path="events" element={<Events />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="search" element={<Search />} />
            <Route path="single-job-post/:id" element={<SingleJobPost />} />
            <Route path="single-organization/:id" element={<SingleOrganization />} />
            <Route path="single-event/:id" element={<SingleEvent />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toast />
      </ToastContext.Provider>
  )
}

export default App;
