import React, { useContext } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import Logo from "../../../assets/images/logo.png";
import "./signUpPage.css";
import strings from "../../../assets/locals/locals";
import LanguageContext from "../../../context/langContext";
import { getInputs, getValidationSchema } from "./configurations";
import UserContext from "../../../context/authContext";

const SignUpPage = () => {
  const { lang } = useContext(LanguageContext);
  const { register } = useContext(UserContext);
  strings.setLanguage(lang);

  const inputs = getInputs(lang);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getValidationSchema(lang),
    onSubmit: (data) => {
      register(data);
    },
  });

  return (
    <Grid container className={"mainContainer"}>
      <Grid
        item
        xs={11}
        lg={8}
        xl={9}
        justifyContent={"space-around"}
        bgcolor={"#fff"}
        borderRadius={"50px"}
        padding={{ xs: 1, sm: 1, md: 2, lg: 3 }}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={12} sm={12} lg={6} xl={5}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h4" gutterBottom>
                {strings.signUp}
              </Typography>
              <Grid container alignItems="center">
                {inputs.map(({ name, label, id, type, icon }) => (
                  <Grid
                    container
                    key={name}
                    gap={{ xs: 0, sm: 0, md: 1, lg: 1 }}
                  >
                    <Grid
                      item
                      xs={2}
                      sm={2}
                      md={2}
                      lg={1}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography
                        variant="h6"
                        padding={"2"}
                        color={
                          formik.touched[name] && Boolean(formik.errors[name])
                            ? "#d32f2f"
                            : "#FFB600"
                        }
                      >
                        {icon}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      sm={9}
                      md={9}
                      lg={10}
                      className="text-feild"
                    >
                      <TextField
                        fontSize="15px"
                        key={name}
                        fullWidth
                        id={id}
                        type={type}
                        select={type === "select" ? true : false}
                        name={name}
                        label={label}
                        placeholder={label}
                        margin="normal"
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[name] && Boolean(formik.errors[name])
                        }
                      />

                      <Typography
                        variant="p"
                        fontSize={"15px"}
                        textAlign={lang === "ar" ? "right" : "left"}
                        color={"#D32F2F"}
                      >
                        {formik.touched[name] && formik.errors[name]}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </form>

            <Grid container>
              <Grid item xs={12} md={12} xl={12} lg={12}>
                <Button
                  variant="contained"
                  onClick={formik.handleSubmit}
                  className="signUpButton"
                >
                  {strings.register}
                </Button>
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} margin={"normal"}>
                <Typography variant="p" fontSize={"15px"}>
                  <span> {strings.haveAnAccount}</span>
                  <Link to={"/"}> {strings.login}</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} lg={5} padding={1}>
            <Box
              component="img"
              src={Logo}
              sx={{ height: "450px", width: "100%" }}
              alt="sign up"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SignUpPage;
