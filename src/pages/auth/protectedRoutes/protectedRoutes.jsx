import React, { useContext } from "react";
import { Box, Button, Grid } from "@mui/material";

import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import UserContext from "../../../context/authContext";
import { Link } from "react-router-dom";
import NotAuthorized from "../../../assets/images/not-authorized.jpg";
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
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Grid item xs={12} sm={12} lg={12} xl={12} alignItems={"center"} justifyContent={"center"} display={"flex"}>
          <Box
            component="img"
            sx={{
              height: "500px",
              width: "fit-content",
            }}
            alt="No Items Found"
            src={NotAuthorized}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          xl={6}
          justifyContent={"space-around"}
          alignItems={"center"}
          display={"flex"}
        >
          <Button color="error" variant="contained">
            <Link to="/"> back to Login Page</Link>
          </Button>
          <Button color="error" variant="contained">
            <Link to="/sign-up"> back to signUp Page</Link>
          </Button>
        </Grid>
      </Grid>
    );
  }
};
export default ProtectedRoute;
