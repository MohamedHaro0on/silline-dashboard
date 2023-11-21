import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import OrdersContext from "../context/ordersContext";
import strings from "../assets/locals/locals";
import LanguageContext from "../context/langContext";
const Order = ({
  OrderNumber,
  OrderID,
  Quantity,
  SelectedItemNames,
  Status,
  TimeDifference,
  adjustments,
  SelectedItems

}) => {
  const { changeStatus } = useContext(OrdersContext);
  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  // calculating the order duration :
  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;

  if (TimeDifference) {
    seconds = Math.floor(TimeDifference % 60);
    minutes = Math.floor((TimeDifference % 3600) / 60);
    hours = Math.floor((TimeDifference % 86400) / 3600);
    days = Math.floor((TimeDifference % (86400 * 30)) / 86400);
  }

  return (
    <Button fullWidth onClick={() => changeStatus(OrderID, Status)}>
      <Card sx={{ minWidth: "100%" }} className="hallCard">
        <CardContent className="cardContent">
          <Typography
            sx={{ fontSize: 14 }}
            color="#fff"
            bgcolor={"#1976d2"}
            gutterBottom
          >
            {OrderNumber}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          {SelectedItems &&
            SelectedItems.map(({ ItemName, Adjustments }, index) => {
              return (
                <Grid container textAlign={"start"} key={`${OrderID} ${ItemName}`}>
                  <Grid
                    container
                    borderBottom={"1px solid #eee"}
                    padding={2}
                    key={ItemName}
                  >
                    <Grid item xs={2} lg={2}>
                      {" "}
                      {JSON.parse(Quantity)[index]}{" "}
                    </Grid>
                    <Grid item xs={10} lg={10}>
                      {" "}
                      <Typography variant="p">
                        {" "}
                        {ItemName}{" "}
                        <ul>
                          {Adjustments && Adjustments.map(el => {
                            return (
                              <li key={el}> {el} </li>
                            )
                          })}
                        </ul>
                      </Typography>
                    </Grid>


                  </Grid>
                </Grid>
              );
            })}
        </CardContent>
        <Grid
          item
          xs={12}
          sm={12}
          textAlign={"center"}
          padding={2}
          fontWeight={"bolder"}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
        >
          <Typography variant="p">{strings.orderDuration} :</Typography>
          <Typography variant="p">
            {` ${days} D : ${hours} H:  : ${minutes}  M: ${seconds} S`}{" "}
          </Typography>
        </Grid>
      </Card>
    </Button>
  );
};
export default Order;
