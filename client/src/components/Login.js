import axios from "axios"
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target
        //console.log(name, value)
        setUser({
            ...user,
            [name]: value
        })
        // console.log(user)
    }
    const login = () => {
        //console.log(user)
        axios.get("http://localhost:8000/allteachers")
            .then((res) => {
                const foundTeacher = res.data.find((teacher) => teacher.email === user.email)
                console.log(foundTeacher)
                if (foundTeacher) {
                    console.log("teacher")
                    axios.post("http://localhost:8000/teachersignin", user)
                        .then(res => {
                            const token = res.data.token
                            if (token) {
                                console.log('token check')
                                navigate('/teacherDashboard')
                            }
                            else {
                                alert('user not found')
                            }
                        })
                }
                else {
                    axios.get("http://localhost:8000/allusers").then((res) => {
                        const foundStudent = res.data.find((student) => student.email === user.email);
                        if (foundStudent) {
                            console.log("student");
                            axios.post("http://localhost:8000/signin", user)
                                .then(res => {
                                    const token = res.data.token
                                    if (token) {
                                        console.log('token check')
                                        navigate('/liveide')
                                    }
                                    else {
                                        alert('user not found')
                                    }
                                })
                        } else {
                            alert("User not found");
                        }
                    });
                }

            })
    }

    const signUp = (event) => {
        //console.log(event.target.id);
        const params = event.target.id
        if (params === 'student') {
            navigate('/signup')
        }
        else if (params === 'teacher') {
            navigate('/teacherSignUp')
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <h1>Learning-Portal</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4rem" }}>
                <form style={{ width: "40vw" }}>
                    <div className="form-outline mb-4">
                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={login}>Log-in</button>
                    </div>
                    <div className="text-center">
                        <p>Not a member? Sign-up as</p>
                        <button
                            type="button"
                            id="student"
                            className="btn btn-primary btn-block me-4"
                            onClick={signUp}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            id="teacher"
                            className="btn btn-primary btn-block"
                            onClick={signUp}
                        >
                            Teacher
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;