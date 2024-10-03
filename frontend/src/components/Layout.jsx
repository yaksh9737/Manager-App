import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
