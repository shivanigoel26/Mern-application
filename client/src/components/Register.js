import React, { useState } from "react";
import {useHistory}from 'react-router-dom';
const Register = () => {
    const history=useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });

  };
  const PostData=async(e)=>{
      e.preventDafault();
      const{name,email,phone,password,confirm_password}=user;
      const res=await fetch("/register",{
          method="POST",
              headers:{
                  "content-type":"application/json"

              },
              body:JSON.stringify({
                name,email,phone,password,confirm_password
              })
          
      });
      const data=await res.json();
      if(data.status ==422 ||!data){
          window.alert("Invalid Registration");
          console.log("Invalid");
      }else{
          window.alert("Registration Success");
          console.log("Invalid registration");

          history.pushState("/login");
      }
  }
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Register Here</h2>
              <form method="POST" className="register-form" id="register-form"></form>
              <div className="form-group">
                <label htmlFor="name"></label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={user.name}
                  onchange={handleInputs}
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onchange={handleInputs}
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone"></label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={user.number}
                  onchange={handleInputs}
                  placeholder="Your Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={user.password}
                  onchange={handleInputs}
                  placeholder=" Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password"></label>
                <input
                  type="confirm_password"
                  name="confirm_password"
                  id="confirm_password"
                  autoComplete="off"
                  value={user.confirm_password}
                  onchange={handleInputs}
                  placeholder="Confirm password"
                />
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="register"
                  onClick={PostData}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
