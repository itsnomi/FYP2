import React ,{ useState }from 'react'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";



const TeacherSignUp = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        institute: "",
        type : "teacher"
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setUser({
            ...user,
            [name]: value
        })
    }
    //const navigate = useNavigate()
    const register = (e) => {
        e.preventDefault();
        const { name, email, password, reEnterPassword } = user
         if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:8000/teacher/signup", user)
                .then(res => {
                    const { message } = res.data;
                    console.log(message)
                    alert(message)
                }).then((res)=>{
                    navigate('/teacherDashboard')
                })
        console.log(user)
        }
        else {
            console.log("Invalid Inputs")
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <h1>Learning-Portal</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4rem" }}>
                <form style={{ width: "40vw" }} onSubmit={register}>
                    <div className="form-outline mb-4">
                        <input type="text" name="name" value={user.name} className="form-control" onChange={handleChange} placeholder="Name" />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="email" name="email" value={user.email} className="form-control" onChange={handleChange} placeholder="Email" />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" name="institute" value={user.institute} className="form-control" onChange={handleChange} placeholder="Institue" />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" name="password" value={user.password} className="form-control" onChange={handleChange} placeholder="Password" />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" name="reEnterPassword" value={user.reEnterPassword} className="form-control" onChange={handleChange} placeholder="Re-enter your Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4" onClick={register}>Sign-up</button>
                </form>
            </div>
        </div>

    )
}

export default TeacherSignUp