import React, { useContext } from "react";
import { Grid } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import Widget from "../../components/widget/Widget";
import LanguageContext from "../../context/langContext";
import strings from "../../assets/locals/locals";
import "./home.scss";

// setBooking(res.data.data.reservations);

const Home = () => {
  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);



  const widgets = [
    {
      title: strings.totalCustomers,
      isMoney: false,
      icon: (
        <PersonOutlinedIcon className="icon" style={{ color: "crimson" }} />
      ),
      amount : 0
    },
    {
      title: strings.totalOrders,
      isMoney: false,
      icon: (
        <ShoppingCartOutlinedIcon
          className="icon"
          style={{
            color: "goldenrod",
          }}
        />
      ),
      amount : 0 
    },
    {
      title: strings.mostSoldItem,
      isMoney: false,
      icon: (
        <FormatAlignJustifyIcon
          className="icon"
          style={{
            color: "purple",
          }}
        />
      ),
      amount :  0,
    },
    {
      title: strings.totalProfit,
      isMoney: true,
      icon: (
        <MonetizationOnOutlinedIcon
          className="icon"
          style={{ color: "green" }}
        />
      ),
    },
  ];


  return (
    <Grid container>
      <Grid container className="homeContainer">
        {/* Widget */}
        <Grid container className="widgets">

          {widgets.map(({title , isMoney , icon , amount}) => {
            return(
              <Widget
              key = {title}
              title={title}
              isMony={false}
              icon={icon}
              amount  = {amount}
            />
            )
          })}

        </Grid>

        {/* <Grid item xs = {12} lg = {10} md = {10} className="datatable">
          <DataGrid
            getRowId={(row) => Math.floor(Math.random() * 1000000)}
            className="datagrid"
            rows={booking}
            columns={bookingColumns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Home;
