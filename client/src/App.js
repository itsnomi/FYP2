import React from "react";
import LiveIDE from "./components/LiveIDE";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login"
import TeacherSignUp from "./components/TeacherSignUp";
import TeacherDashBoard from "./components/TeacherDashBoard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AttemptTests from "./components/AttemptTests";

const App = () => {
    // const getAPI = () => {   
    //     fetch("/msg", { method: "GET" })
    //         .then((res) => res.json())
    //         .then((data) => console.log(data));
    // };
    let href = "#";
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/liveide" element={<LiveIDE />} />
                    <Route path="/teacherSignUp" element={<TeacherSignUp />} />
                    <Route path="/teacherDashboard" element={<TeacherDashBoard />} />
                    <Route path="/attemptTests" element={<AttemptTests />} />
                </Routes>
            </Router>
            {/* <LiveIDE /> */}
        </div>
    );
};

export default App;
