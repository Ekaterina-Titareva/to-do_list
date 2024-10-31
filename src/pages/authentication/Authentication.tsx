import React, { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { Button, FormControl, Input, InputLabel } from "@mui/material";

import {
  AUTH,
  AUTH_BUTTON,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGIN_TITLE,
  MAIN_PAGE,
  PASSWORD,
  PASSWORD_TITLE,
} from "../../utilities/constants";

import styles from "./authentication.module.css";

const Authentication = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login === LOGIN && password === PASSWORD) {
      Cookies.set(AUTH, JSON.stringify({ login, password }), { expires: 1 });
      alert(AUTH_SUCCESS);
      navigate(MAIN_PAGE);
    } else {
      alert(AUTH_ERROR);
      setLogin("");
      setPassword("");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.layout}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="login">{LOGIN_TITLE}</InputLabel>
          <Input
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="password">{PASSWORD_TITLE}</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" type="submit">
          {AUTH_BUTTON}
        </Button>
      </form>
    </main>
  );
};

export default Authentication;
