import "../App.css";
import Router from "../routes/Router";
import { toast_timer } from "../shared/constants";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router />
      <ToastContainer autoClose={toast_timer} />
    </div>
  );
}

export default App;
