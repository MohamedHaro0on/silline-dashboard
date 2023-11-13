import React, { useContext } from "react";
import {Grid } from "@mui/material";

import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import UserContext from "../../../context/userContext";
import NotAuthorized from "../../../components/NotAuthorized";
const ProtectedRoute = ({
  children: Children,
  component: Component,
  ...rest
}) => {
  const user = useContext(UserContext);

  if (user.isAuth && user.token) {
    return (
      <Grid container>
        <Sidebar />
        <Grid item md={12} lg={10} sm={12}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <Navbar />
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
              {Component}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (!user.isAuth) {
    user.logout();
    return (
        <NotAuthorized/>
    );
  }
};
export default ProtectedRoute;
