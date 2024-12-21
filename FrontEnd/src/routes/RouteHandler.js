import React from "react";
import ProtectedRoute from "./ProtecedRoute";

const RouteHandler = ({ route }) => {
  const { isProtected, allowedRoles, page: PageComponent } = route;

  if (isProtected) {
    return (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <PageComponent />
      </ProtectedRoute>
    );
  }

  return <PageComponent />;
};

export default RouteHandler;
