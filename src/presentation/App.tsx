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
import WithoutFooter from './layout/WithoutFooter';
import CreateOrganization from './pages/CreatOrganization';
import ChallengePage from './pages/ChallengePage';
import CreateJobPost from './pages/CreateJobPost';
import OrganizationDashboard from './pages/OrganizationDashboard';
import OrganizationPage from './pages/SingleOrganization';
import UserSessionContext from '../application/contexts/UserSessionContext';
import useUserSession from '../application/hooks/useUserSession';
import ProtectedAuthenticatedRoute from './components/ProtectedAuthenticatedRoute';
import MyOrganizations from './pages/MyOrganizations';
import ProtectedUnauthenticatedRoute from './components/ProtectedUnauthenticatedRoute';

function App() {
  const toastManager = useToast();
  const useUserSessionValue = useUserSession();

  return (
    <ToastContext.Provider value={toastManager}>
      <UserSessionContext.Provider value={useUserSessionValue}>
        <Routes>
          <Route path="/sign-up" element={<ProtectedUnauthenticatedRoute><SignUp /></ProtectedUnauthenticatedRoute>} />
          <Route path="/sign-in" element={<ProtectedUnauthenticatedRoute><SignIn /></ProtectedUnauthenticatedRoute>} />
          <Route path="/challenges/:id" element={<ChallengePage />} />
          <Route path='/' element={(<Root />)}>
            <Route path="" element={<LandingPage />} />
            <Route path="job-posts" element={<JobPost />} />
            <Route path="home" element={<ProtectedAuthenticatedRoute><Home /></ProtectedAuthenticatedRoute>} />
            <Route path="events" element={<Events />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="search" element={<Search />} />
            <Route path="job-posts/:id" element={<SingleJobPost />} />
            <Route path="settings" element={<ProtectedAuthenticatedRoute><Settings /></ProtectedAuthenticatedRoute>} />
            <Route path="events/:id" element={<SingleEvent />} />
            <Route path="my-organizations" element={<ProtectedAuthenticatedRoute><MyOrganizations /></ProtectedAuthenticatedRoute>} />
          </Route>

          <Route path='/organization/:id/dashboard' element={<ProtectedAuthenticatedRoute><OrganizationDashboard /></ProtectedAuthenticatedRoute>} />
          <Route path='/organization/:id' element={(<Root />)}>
            <Route index element={<OrganizationPage />} />
          </Route>

          <Route path='/' element={(<WithoutFooter />)}>
            <Route path='/organization/create' element={<ProtectedAuthenticatedRoute><CreateOrganization /></ProtectedAuthenticatedRoute>} />
            <Route path="create-job-post" element={<ProtectedAuthenticatedRoute><CreateJobPost /></ProtectedAuthenticatedRoute>} />
          </Route>
        </Routes>
        <Toast />
      </UserSessionContext.Provider>
    </ToastContext.Provider>
  )
}

export default App;
