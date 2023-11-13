import { Box, Button, Grid } from "@mui/material"
import NotAuthorizedImage from "../assets/images/not-authorized.jpg";
import { Link } from "react-router-dom";

const NotAuthorized = ()=>{
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
            src={NotAuthorizedImage}
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
    )
}

export default NotAuthorized ; 