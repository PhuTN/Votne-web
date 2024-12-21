import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { AppProvider } from "./contexts/AppContexts";
import RouteHandler from "./routes/RouteHandler"; // Import RouteHandler

function App() {
  return (
    <div>
      <AppProvider>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Layout = route.isShowHeader ? DefaultComponent : Fragment; // Kiểm tra Header
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <RouteHandler route={route} /> {/* Sử dụng RouteHandler */}
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
