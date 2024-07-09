import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-backend-y0rv.onrender.com/api/v1/auth/register",
        {
          name,
          address,
          phone,
          email,
          password,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <Layout>
      <section className="py-5">
        <h1 className="text-center">Register Page</h1>
        <div className="registerpage">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                required
                className="form-control "
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="form-control  input"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
                className="form-control  input"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your Address"
                required
                className="form-control  input"
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone Number"
                required
                className="form-control  input"
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your favorite sports"
                required
                className="form-control  input"
              />
            </div>

            <button type="submit" className="btn btn-primary  input">
              register
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
