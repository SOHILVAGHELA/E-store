import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend,BiPhoneCall,BiSupport} from "react-icons/bi";
// import contactus from "../images/contact.jpg"
const Contact = () => {
  return (
    <>
      <Layout title={"Contact us - Ecommer app"}>
      <div className="row contactus mt-5 ">
        <div className="col-md-6 ">
          <img
            src="images/contact.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2  text-white  text-center">Contact Us </h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24*7 available
          </p>
          <p className="mt-3">
          <BiMailSend /> :www.eccomerce.com
          </p>
          <p className="mt-3">
          <BiPhoneCall /> :9978619720
          </p>
          <p className="mt-3">
          <BiSupport /> :1800-000-111(toll free)
          </p>
        </div>
      </div>
    </Layout>
    </>
  );
};
export default Contact;
