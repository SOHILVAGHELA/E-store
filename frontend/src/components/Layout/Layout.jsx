import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
const Layout = (props) => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header></Header>
        <main className="flex-grow-1 d-flex flex-column justify-content-center">
          <Toaster />
          {props.children}
        </main>
        <Footer></Footer>
      </div>
    </>
  );
};
export default Layout;
