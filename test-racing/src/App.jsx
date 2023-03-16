import { useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";


function App() {
  // const navigate = useNavigate();



  // const [nombre, setNombre] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [user, setUser] = useState("");
  // const [response, setResponse] = useState("");

  // function axiosCall(url, body, method) {
  //   return axios({
  //     baseURL: "http://localhost:3000",
  //     url: url,
  //     data: body,
  //     method: method,
  //   });
  // }

  // const signUp = async () => {
  //   let body = {
  //     nombre,
  //     email,
  //     password,
  //     confirmPassword,
  //   };
  //   axiosCall("/signup", body, "post").then((data) => {
  //     console.log(data)
  //     if (data.status === 201) {
  //       navigate("/login");
  //     }
  //   });
  // };

  // const logIn = async () => {
  //   let body = {
  //     email,
  //     password,
  //     };
  //   axiosCall("/login", body, "post").then((data) => {
  //     console.log(data)
  //     if (data.status === 201) {
  //       setUser(data.data.user)
  //       navigate("/user");
        
  //     }
  //   });
  // };

 


  return (
<h1>App</h1>
  );
}

export default App;
