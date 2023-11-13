import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";

import Logo from "../../../assets/images/logo.png";
import { useFormik } from "formik";
import strings from "../../../assets/locals/locals";
import LanguageContext from "../../../context/langContext";
import { UserContext } from "../../../context/userContext";

const LogInPage = () => {
  const { login } = useContext(UserContext);

  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string(strings.userNameEmptyError)
        .required(strings.userNameEmptyError),

      password: yup
        .string(strings.passwordNotString)
        .min(4, strings.passwordLessThanMin)
        .required(strings.passwordEmptyError),
    }),

    onSubmit: (data) => login(data),
  });

  const inputs = [
    {
      name: "userName",
      label: strings.userName,
      type: "text",
      id: "userName",
      icon: <FaEnvelope />,
    },
    {
      name: "password",
      label: strings.password,
      type: "password",
      id: "password",
      icon: <FaLock />,
    },
  ];

  return (
    <Grid container className={"mainContainer"}>
      <Grid
        item
        xs={11}
        lg={8}
        xl={8}
        justifyContent={"space-around"}
        bgcolor={"#fff"}
        borderRadius={"50px"}
        padding={{ xs: 1, sm: 1, md: 2, lg: 3 }}
      >
        <Grid
          container
          margin={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={12} lg={6} xl={4}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h4" gutterBottom>
                {strings.login}
              </Typography>
              <Grid container alignItems="center" margin={1}>
                <FormControl fullWidth>
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
                        xs={9}
                        sm={9}
                        lg={10}
                        textAlign={lang === "ar" ? "right" : "left"}
                      >
                        <TextField
                          style={{
                            direction: lang === "ar" ? "right" : "left",
                          }}
                          key={name}
                          placeholder={label}
                          fullWidth
                          id={id}
                          label={label}
                          type={type}
                          select={type === "select" ? true : false}
                          name={name}
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
                </FormControl>
              </Grid>
            </form>

            <Grid container>
              <Grid item xs={12} md={12} xl={12} lg={12}>
                <Button
                  variant="contained"
                  onClick={formik.handleSubmit}
                  style={{ backgroundColor: "#FFB600" }}
                  padding={2}
                >
                  {strings.login}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
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
export default LogInPage;
