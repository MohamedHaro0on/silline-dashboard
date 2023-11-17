import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  Form,
  Formik,
} from "formik";

import LanguageContext from "../../../context/langContext";
import NoImageAvailable from "../../../assets/images/No-Image-Placeholder.svg.png";
import { getValidationSchema, getInputs } from "./configurations";
import strings from "../../../assets/locals/locals";
import ItemsContext from "../../../context/itemsContext";
import CategoriesContext from "../../../context/categoryContext";
import NoContent from "../../../components/noContent";
import AdjustmentForm from "./adjustmentForm";
import uniqid from 'uniqid';

const AddItem = () => {
  const { addItem, loading } = useContext(ItemsContext);

  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  // getting the inputs , and the validation schema ;
  const { categories } = useContext(CategoriesContext);
  const inputs = getInputs(lang, categories);
  const validationSchema = getValidationSchema(lang, categories);

  if (categories) {
    return (
      <Grid container className={"mainContainer"}>
        <Grid
          item
          xs={11}
          lg={8}
          xl={10}
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
              <Formik
                initialValues={{
                  ItemName: "",
                  Description: "",
                  Price: null,
                  AllergyInfo: "",
                  Image: null,
                  CategoryID: "",
                  Adjustment: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(data) => addItem(data)}
                enableReinitialize={true}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  setFieldValue,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form>
                    <Typography variant="h4" gutterBottom>
                      {strings.addNewItem}
                    </Typography>
                    <Grid container alignItems="center" justifyContent={"center"} margin={1} >
                      <Grid item xs={8} sm={8} lg={12} className="left" justifyContent={"center"} display={"flex"} >
                        <Box component="img"
                          sx={{
                            maxWidth: "100%",
                            height: "300px",
                          }}
                          alt="No orders to view"
                          src={
                            touched.Image && values.Image
                              ? URL.createObjectURL(values.Image)
                              : NoImageAvailable
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={12}>
                        <Grid container padding={2} gap={{ xs: 0, sm: 0, md: 1, lg: 1 }} >
                          <FormControl fullWidth>
                            <Grid container justifyContent={"center"}>
                              {inputs.map(
                                ({ name, label, id, type, icon, options }) => {
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={6}
                                      key={name}
                                    >
                                      <Grid container>
                                        <Grid
                                          item
                                          xs={10}
                                          sm={10}
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
                                            select={
                                              type === "select" ? true : false
                                            }
                                            name={name}
                                            margin="normal"
                                            onChange={
                                              type === "file"
                                                ? (e) => {
                                                  setFieldValue(
                                                    "Image",
                                                    e.target.files[0]
                                                  );
                                                }
                                                : handleChange
                                            }
                                            onBlur={handleBlur}
                                            error={
                                              touched[name] &&
                                              Boolean(errors[name])
                                            }
                                          >
                                            {options &&
                                              options.map(
                                                ({
                                                  CategoryID,
                                                  CategoryName,
                                                }) => (
                                                  <MenuItem
                                                    key={CategoryID}
                                                    value={CategoryID}
                                                  >
                                                    {CategoryName}
                                                  </MenuItem>
                                                )
                                              )}
                                          </TextField>

                                          <Typography
                                            variant="p"
                                            fontSize={"15px"}
                                            textAlign={
                                              lang === "ar" ? "right" : "left"
                                            }
                                            color={"#D32F2F"}
                                          >
                                            {touched[name] && errors[name]}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  );
                                }
                              )}

                              <AdjustmentForm />
                            </Grid>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={12} xl={12} lg={12} justifyContent={"center"} display={"flex"}>
                        <Button
                          variant="outlined"
                          onClick={handleSubmit}
                          padding={2}
                          className="mainBtn"
                          color="warning"
                        >
                          <Typography variant="h6" paddingRight={2} paddingLeft={2} fontSize={20}> {strings.submit}</Typography>
                          {loading && <CircularProgress color="inherit" padding={2} fontSize={15} />}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid>
        <Grid item xs={12}>
          {" "}
          {strings.needToAddCategoryFirst}
        </Grid>
        <NoContent />
      </Grid>
    );
  }
};
export default AddItem;
