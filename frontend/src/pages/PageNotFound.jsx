import React from "react";
import Layout from "../components/Layout/Layout";
import {Link} from "react-router-dom"
const PageNotFound = () => {
  return (
    <>
      <Layout>
        <div className="pnf text-center mt-5">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oop ! Page Not Found</h2>
        <Link to="/" className="pnf-btn "> GO Back </Link>
        </div>
      </Layout>
    </>
  );
};
export default PageNotFound;
