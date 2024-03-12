import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ToastContext from "../application/contexts/ToastContext";
import useToast from "../application/hooks/useToast";
import Toast from "./components/Toast";

function App() {
  const toastManager = useToast();

  return (
    <div className="w-full h-screen overflow-auto">
      <ToastContext.Provider value={toastManager}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        <Toast />
      </ToastContext.Provider>
    </div>
  )
}

export default App;
