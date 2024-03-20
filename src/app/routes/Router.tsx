import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Signup from "../../features/Patient/components/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
