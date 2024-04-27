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
import SingleEvent from './pages/SingleEvent';
import Settings from './pages/Settings';
import CreateEvent from './pages/CreateEvent';
import WithoutFooter from './layout/WithoutFooter';
import CreateOrganization from './pages/CreatOrganization';
import ChallengePage from './pages/ChallengePage';
import CreateChallenge from './pages/CreateChallenge';
import CreateJobPost from './pages/CreateJobPost';
import OrganizationDashboard from './pages/OrganizationDashboard';
import OrganizationPage from './pages/SingleOrganization';
import UserSessionContext from '../application/contexts/UserSessionContext';
import useUserSession from '../application/hooks/useUserSession';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateEvent from './pages/UpdateEvent';

function App() {
  const toastManager = useToast();
  const useUserSessionValue = useUserSession();

  return (
    <ToastContext.Provider value={toastManager}>
      <UserSessionContext.Provider value={useUserSessionValue}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/challenges/:id" element={<ChallengePage />} />
          <Route path='/' element={(<Root />)}>
            <Route path="" element={<LandingPage />} />
            <Route path="jobs-post" element={<JobPost />} />
            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="events" element={<Events />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="search" element={<Search />} />
            <Route path="single-job-post/:id" element={<SingleJobPost />} />
            <Route path="single-event/:id" element={<SingleEvent />} />
            <Route path="settings" element={<Settings />} />

            <Route path='/organization/create' element={<CreateOrganization />} />
          </Route>

          <Route path='/organization/:id/dashboard' element={<ProtectedRoute><OrganizationDashboard /></ProtectedRoute>} />
          <Route path='/organization/:id' element={(<Root />)}>
            <Route index element={<OrganizationPage />} />
          </Route>

          <Route path='/' element={(<WithoutFooter />)}>
            <Route path="create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="create-organization" element={<ProtectedRoute><CreateOrganization /></ProtectedRoute>} />
            <Route path="create-challenge" element={<ProtectedRoute><CreateChallenge /></ProtectedRoute>} />
            <Route path="create-job-post" element={<ProtectedRoute><CreateJobPost /></ProtectedRoute>} />
            <Route path="update-event/:id" element={<UpdateEvent />} />
          </Route>
        </Routes>
        <Toast />
      </UserSessionContext.Provider>
    </ToastContext.Provider>
  )
}

export default App;
