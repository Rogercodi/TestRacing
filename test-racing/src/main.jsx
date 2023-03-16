import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpForm from "./components/index-components/SignUpForm";
import LogInForm from "./components/index-components/LogInForm";
import { Navbar } from "./components/index-components/Navbar";
import { RacingContextProvider } from "./context/Context";
import Mainuser from "./components/user-components/Mainuser";
import { Root } from "./components/index-components/Root";
import Sessions from "./components/user-components/Sessions";
import Vehicles from "./components/user-components/Vehicles";
import About from "./components/index-components/About";
import Footer from "./components/index-components/Footer";
import SessionForm from "./components/user-components/SessionForm";
import VehicleForm from "./components/user-components/VehicleForm";
import SetupForm from "./components/user-components/SetupForm";

const indexRouter = createBrowserRouter(
  [
  {
    element: <RacingContextProvider />,
    path: "/",
    children: [
      {
        path: "/",
        element: [<Navbar />, <Root />, <Footer />],
      },
      {
        path: "/signup",
        element: [<Navbar />, <SignUpForm />],
      },
      {
        path: "/login",
        
        element: [<Navbar />, <LogInForm />],
      },
      {
        path: "/about",
        element: [<Navbar />, <About />],
      },
    ],
  },
  {
    path: "/user",
    element: <RacingContextProvider />,
    children: [
      {
        path: "/user",
        
        element: [<Navbar />, <Mainuser />],
      },
      {
        path: "/user/mysessions",
        element: [<Navbar />, <Sessions />],
      },
      {
        path: "/user/myvehicles",
        element: <Navbar />,
        children: [
          {
            path: "/user/myvehicles",
            element: <Vehicles />,
          },
          {
            path: "/user/myvehicles/setup",
            element: <SetupForm/>,
          },
         
        ],
      },
      {
        path: "/user/newvehicle",
        element: [<Navbar />, <VehicleForm />],
      },
      {
        path: "/user/newsession",
        element: [<Navbar />, <SessionForm />],
      },
      {
        path: "/user/editsession",

        element: [<Navbar />, <SessionForm />],
      },
      {
        path: "/user/editvehicle",
        element: [<Navbar />, <VehicleForm />],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={indexRouter}>
      <RacingContextProvider>{/* <App /> */}</RacingContextProvider>
    </RouterProvider>
  </div>
);
