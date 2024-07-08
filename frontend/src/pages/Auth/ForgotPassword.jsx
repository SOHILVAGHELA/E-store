import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/forget-password",
        {
          email,
          newPassword,
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
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div>
          <div className="container">
            <div className="login-box mx-auto">
              <h1 className="fw-300 text-center mb-4">Forgot Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    placeholder="Enter Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="emailInput"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Enter Your Favorite Sport"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="answerInput"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    placeholder="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    id="passwordInput"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
