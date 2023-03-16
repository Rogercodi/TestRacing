import React, { createContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

export const racingContext = createContext();

export function RacingContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState("Messages!");
  const [editData, setEditData] = useState("");
  const [editSetupData, setEditSetupData] = useState({
    desarrollo: {},
    suspension: {
      delantera: {},
      trasera: {},
    },
    neumaticos: {
      delantero: {},
      trasero: {},
    },
  });
  const [editRef, setEditRef] = useState("");
  const [id, setId] = useState("");
  const [flag, setFlag] = useState(false);

  async function axiosCall(url, body, method) {
    return axios({
      baseURL: "http://testracing.ddns.net:85",
      url: url,
      data: body,
      method: method,
      withCredentials: true,
    });
  }

  const logOut = async () => {
    await axiosCall("/logout", {}, "get");
    setUser("");
    navigate("/");
  };

  return (
    <racingContext.Provider
      value={{
        flag: [flag, setFlag],
        editSetupData: [editSetupData, setEditSetupData],
        user: [user, setUser],
        messages: [messages, setMessages],
        logOut,
        axiosCall,
        editData: [editData, setEditData],
        editId: [id, setId],
        editRef: [editRef, setEditRef],
      }}
    >
      <Outlet />
    </racingContext.Provider>
  );
}
