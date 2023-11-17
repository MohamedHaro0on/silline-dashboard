

import { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




import OrdersContext from "../context/ordersContext";
import strings from "../assets/locals/locals";
import Order from "../components/order";
import LanguageContext from "../context/langContext";
import NoContent from "../components/noContent";
import Logo from "../assets/images/logo.png";
import "../components/sidebar/sidebar.scss";
import UserContext from "../context/userContext";
import NotAuthorized from "../components/NotAuthorized";



const Kitchen = () => {
  const { getOrders, notFinishedOrders, finishedOrders } = useContext(OrdersContext);
  const { token } = useContext(UserContext)
  const [searchOrder, setSearchOrder] = useState([]);

  const { lang } = useContext(LanguageContext)

  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen(!open);
  };
  strings.setLanguage(lang);



  const handleChange = (e) => {
    formik.setFieldValue("orderNumber", e.target.value)
    const temp = finishedOrders.filter(el => el.OrderNumber == formik.values.orderNumber)
    setSearchOrder(temp);
    setOpen(true)
  }

  const formik = useFormik({
    initialValues: {
      orderNumber: null,
    },
    validationSchema: yup.object({
      orderNumber: yup
        .number(strings.orderNumberIsNotNumberError)
        .min(0, strings.orderNumberCannotBeLessThanZero)
    }),
    onSubmit: () => handleChange(),
    validateOnChange: true,
  })

  if (token && notFinishedOrders && notFinishedOrders.length === 0) {
    return <NoContent />
  }

  else if (token && notFinishedOrders.length > 0) {
    return (
      <Grid container justifyContent={"center"} display="flex">
        {open && <Grid item xs={12} sm={12} lg={2} xl={2} className="sideBarContainer" >
          <div className="overLay" onClick={toggleSideBar}></div>
          <Grid item className={open ? "sidebar sidebarOpen" : "sidebar sidebarClosed"}>
            <div className="top">
              <span className="logo">
                <Box
                  component="img"
                  sx={{
                    height: "100px",
                    width: "100%",
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={Logo}
                />
              </span>
            </div>
            <hr />
            {searchOrder.length > 0 && <Grid item xs={12} sm={12}> <Order {...searchOrder[0]} /> </Grid>}

            <Grid item xs={12} sm={12} textAlign={"center"} marginTop={4}>
              <Button onClick={toggleSideBar}>
                <ArrowBackIcon />
              </Button>
            </Grid>

            {searchOrder.length === 0 && <NoContent />}




          </Grid>
        </Grid>
        }
        <Grid item xs={12} sm={12} lg={open ? 10 : 12}>
          <Grid container display="flex" padding={4} alignItems={"stretch"} justifyContent={"space-between"}>
            <Grid item xs={12} md={11} lg={11} display="flex" justifyContent={"space-between"} marginBottom={3}>
              <form onSubmit={formik.handleSubmit} >
                <TextField
                  fontSize="15px"
                  fullWidth
                  id={"orderNumber"}
                  name="orderNumber"
                  type={"number"}
                  label={strings.searchWithorderNumber}
                  placeholder={strings.searchWithorderNumber}
                  margin="normal"
                  onChange={(e) => handleChange(e)}
                  onSubmit={formik.handleSubmit}
                  onBlur={formik.handleBlur}
                  color="warning"
                  error={
                    formik.touched.orderNumber && Boolean(formik.errors.orderNumber)
                  } />
                <Typography
                  variant="p"
                  fontSize={"15px"}
                  textAlign={lang === "ar" ? "right" : "left"}
                  color={"#D32F2F"}
                >
                  {formik.touched.orderNumber && formik.errors.orderNumber}
                </Typography>
              </form>
              <Button onClick={getOrders} color="warning" variant="outlined"> {strings.updateOrders}</Button>

            </Grid>

            {notFinishedOrders &&
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12} border={"solid 1px #eee"}>
                <Grid container>
                  {
                    notFinishedOrders.map((el) => <Grid key={el.OrderID} item xs={12} sm={12} md={6} lg={4} xl={3} padding={1}> <Order {...el} /> </Grid>)
                  }
                </Grid>
              </Grid>
            }

          </Grid>
        </Grid>

      </Grid>

    );
  }
  else {
    return (
      <NotAuthorized />
    )
  }
}
export default Kitchen;