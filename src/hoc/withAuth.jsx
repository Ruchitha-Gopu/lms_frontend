import React from "react";

const withAuth = (Component) => {
  return function ProtectedComponent(props) {
    const user = localStorage.getItem("user");

    if (!user) {
      return (
        <div className="container mt-5 text-center">
          <h2>Please Login First</h2>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default withAuth;