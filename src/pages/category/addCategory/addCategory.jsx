import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

import LanguageContext from "../../../context/langContext";
import NoImageAvailable from "../../../assets/images/No-Image-Placeholder.svg.png";
import { getValidationSchema, getInputs } from "./configurations";
import strings from "../../../assets/locals/locals";
import CategoriesContext from "../../../context/categoryContext";

const AddCategory = () => {
  const { id } = useParams();

  const { categories, addCategory, getCategory } =
    useContext(CategoriesContext);

  // setting up the language
  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  // getting the inputs , and the validation schema ;
  const inputs = getInputs(lang, categories);
  const validationSchema = getValidationSchema(lang);


  // handling if the user wants to edit category ;
  let initialValues;
  const category = getCategory(id); // get the category the user wants to edit ;
  if (id && category) {
    initialValues = {
      CategoryName: category[0].CategoryName,
      CategoryPicture: category[0].CategoryPicture,
    };
  } else {
    initialValues = {
      CategoryName: "",
      CategoryPicture: "",
    };
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (data) => addCategory(data),
  });

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
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={12} lg={11} xl={10}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h4" gutterBottom>
                {strings.addNewItem}
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent={"center"}
                margin={1}
              >
                <Grid
                  item
                  xs={8}
                  sm={8}
                  lg={4}
                  className="left"
                  justifyContent={"center"}
                  display={"flex"}
                >
                  <Box
                    component="img"
                    sx={{
                      maxWidth: "80%",
                      height: "20%",
                    }}
                    alt="No orders to view"
                    src={
                      id
                        ? `http://localhost:8080//php/uploads/${formik.values.CategoryPicture}`
                        : !id && formik.values.CategoryPicture
                        ? URL.createObjectURL(formik.values.CategoryPicture)
                        : NoImageAvailable
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} lg={8}>
                  <Grid container>
                    <FormControl fullWidth>
                      {inputs.map(
                        ({ name, label, id, type, icon, options }) => (
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
                                  formik.touched[name] &&
                                  Boolean(formik.errors[name])
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
                              textAlign={"start"}
                            >
                              <TextField
                                key={name}
                                placeholder={label}
                                fullWidth
                                id={id}
                                label={label}
                                type={type}
                                select={type === "select" ? true : false}
                                name={name}
                                margin="normal"
                                value={
                                  type !== "file" ? formik.values[name] : ""
                                }
                                onChange={
                                  type === "file"
                                    ? (e) =>
                                        formik.setFieldValue(
                                          "CategoryPicture",
                                          e.target.files[0]
                                        )
                                    : formik.handleChange
                                }
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched[name] &&
                                  Boolean(formik.errors[name])
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
                        )
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </form>

            <Grid container>
              <Grid
                item
                xs={12}
                md={12}
                xl={12}
                lg={12}
                justifyContent={"center"}
                display={"flex"}
              >
                <Button
                  variant="outlined"
                  onClick={formik.handleSubmit}
                  padding={2}
                  color="warning"
                  className="mainBtn"
                >
                  {strings.submit}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AddCategory;
