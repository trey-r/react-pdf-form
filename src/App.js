import { Routes, Route } from "react-router-dom";

import MainForm from "./views/MainForm";
import Login from "./views/Login";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <MainForm />} />
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
  );
}

export default App;
