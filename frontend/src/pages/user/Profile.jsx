import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserManu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import api from "../../utils/api";
const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state

  // Get user data
  useEffect(() => {
    const { email, phone, name, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);
  }, [auth?.user]);

  // Form validation (basic example)
  const validateForm = () => {
    // Email validation (using regular expressions)
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Implement password strength validation (optional)
    // You can use a library like zxcvbn for more complex validation

    return true; // Return true if form is valid
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Exit if form is invalid

    setIsLoading(true); // Set loading state to true

    try {
      const { data } = await api.put(
        "/api/v1/auth/profile",
        {
          name,
          address,
          phone,
          email,
          password,
        },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      setIsLoading(false); // Set loading state to false

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data?.updateUser })
        );
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      setIsLoading(false); // Set loading state to false
      toast.error("Update failed. Please try again.");
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <section>
          <div className="row">
            <div className="col-md-3">
              <UserManu></UserManu>
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <div className="registerpage">
                  <form onSubmit={handleSubmit}>
                    <h4 className="text-center">User Profile</h4>
                    <div className="mb-3 ">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your Name"
                        className="form-control "
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        className="form-control  input"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter New Password"
                        className="form-control  input"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your Address"
                        className="form-control  input"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your Phone Number"
                        className="form-control  input"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary  input">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Profile;
