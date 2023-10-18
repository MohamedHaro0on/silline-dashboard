import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import Widget from "../../components/widget/Widget";
import LanguageContext from "../../context/langContext";
import strings from "../../assets/locals/locals";
import "./home.scss";

const endpoints = [
  "https://web01.usn.no/~240179/lastupdate/AllTotalCustomer.php",
  "https://web01.usn.no/~240179/lastupdate/RoomsSelectCount.php",
  "https://web01.usn.no/~240179/lastupdate/TotalBooking.php",
  "https://api.github.com/users/ejirocodes/following",
  "https://web01.usn.no/~240179/lastupdate/OverviewComplete.php",
];

// setBooking(res.data.data.reservations);

const Home = () => {
  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  const [customers, setCustomers] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [bookings, setBookings] = useState(null);
  // const [overview, setOverview] = useState(null);
  // const [following, setFollowing] = useState(null);

  useEffect(() => {
    // axios.all(endpoints.map((promise) => axios.get(promise))).then(
    //   axios.spread((customers, rooms, totalBookings, following, overView) => {
    //     setCustomers(customers);
    //     setRooms(rooms);
    //     setBookings(totalBookings);
    //     // setFollowing(following);
    //     // setOverview(overView);
    //   }),
    // );
  }, []);

  // const bookingColumns = [
  //   { field: "ID", headerName: "ID", width: 70 },
  //   { field: "email", headerName: "email", width: 200 },
  //   { field: "phone", headerName: "phone", width: 100 },
  //   { field: "full_name", headerName: "name", width: 160 },
  //   { field: "room_name", headerName: "Room name", width: 100 },
  //   { field: "CheckInDate", headerName: "Check in date", width: 200 },
  //   { field: "ChectOutDate", headerName: "Check out date", width: 200 },
  // ];

  const widgets = [
    {
      title: strings.totalCustomers,
      isMoney: false,
      icon: (
        <PersonOutlinedIcon className="icon" style={{ color: "crimson" }} />
      ),
      amount : customers && customers.data.data.users[0].TotalCustomer 
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
      amount : rooms && rooms.data.data.floors[0].totalroom ,
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
      amount :  bookings && bookings.data.data.total_reservations ,
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
