import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function LayoutPage({ children }) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}

export default LayoutPage;
