import React from "react";
import SIGNUPLOGO from "../assets/signuplogo.png";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState(null),
    [message, setMessage] = useState(null);

  const [first_name, setFirstName] = React.useState(""),
    [last_name, setLastName] = React.useState(""),
    [cnic, setCnic] = React.useState(""),
    [email, setEmail] = React.useState(""),
    [phone, setPhone] = React.useState(""),
    [gender, setGender] = React.useState(""),
    [password, setPassword] = React.useState("");
  const [valmsg1, setvalmsg1] = useState(null);
  const [valmsg2, setvalmsg2] = useState(null);

  var emailValid = false;
  var cnicValid = false;

  const emailvalidation = (e) => {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (regex.test(email)) {
      emailValid = true;
    } else if (email == "") {
    } else {
      setvalmsg1("Please enter a correct email address");
      emailValid = false;
    }

    const cnicRegex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
    if (cnicRegex.test(cnic)) {
      cnicValid = true;
    } else if (cnic == "") {
    } else {
      setvalmsg2("Please enter a correct CNIC Number");
      emailValid = false;
    }
  };

  const handleonclick = (e) => {
    setEmail(e.target.value);
  };
  const handleonclick1 = (e) => {
    setCnic(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    const data = {
      first_name,
      last_name,
      cnic,
      email,
      phone,
      password,
      gender,
    };
    if (emailValid == true && cnicValid == true) {
      try {
        const res = await axios.post(
          "http://localhost:3009/api/auth/signup",
          data
        );
        console.log(res.data);
        setUserInfo(data);

        setMessage({
          type: "success",
          text: "Account successfully created",
          action: (
            <Link
              to="/accounts/login"
              style={{ textDecoration: "none", alignSelf: "center" }}
            >
              <button type="submit" className="btn btn-primary py-0">
                Go to LoginPage
              </button>
            </Link>
          ),
        });
        emailValid = false;
        cnicValid = false;
      } catch (e) {
        console.log(e);
        setMessage({
          type: "error",
          text: "Email or CNIC already in use",
        });
      }
    }
  };

  return (
    <div className="register ">
      <div className="row shadow  ">
        <div className="col-md-3 register-left">
          <img src={SIGNUPLOGO} alt="Logo" />
          <h3>Welcome</h3>
          <p>You are now a few seconds away from being a car owner</p>
        </div>
        <div className="col-md-9 register-right">
          <div className="tab-control" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="empoye"
              role="tabpanel"
              aria-labelledby="employe-tab"
            >
              <h3 className="register-heading">Get yourself registered</h3>
              <form onSubmit={onSubmit}>
                <div className="row register-form">
                  <div className="col-md-6 ">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                      {/* {valmsg3} */}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                      {/* {valmsg4} */}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CNIC Number"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        onClick={handleonclick1}
                        required
                      />
                      <p className="colormsg">{valmsg2}</p>
                    </div>
                    <FormControl fullWidth size="small">
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Gender"
                        required
                        fullWidth
                        defaultValue={"Male"}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="business">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={handleonclick}
                      />
                      <p className="colormsg">{valmsg1}</p>
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* {valmsg5} */}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        minLength="11"
                        maxLenghth="11"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        // onClick={handleonclick2}
                        inputProps={{
                          inputMode: "numeric",
                        }}
                        required
                      />
                      {/* {valmsg6} */}
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-warning py-1 w-25"
                  value="Register"
                  onClick={emailvalidation}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      {message && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setMessage(null)}
        >
          <Alert
            severity={message.type}
            variant="filled"
            sx={{ width: "100%" }}
            action={message.action}
            onClose={() => setMessage(null)}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

//  "homepage": "https://github.com/codingjlu/express-react-template#readme",
