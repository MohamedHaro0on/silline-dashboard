import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import OrdersContext from "../context/ordersContext";
import strings from "../assets/locals/locals";
import LanguageContext from "../context/langContext";
const Order = ({ OrderNumber, OrderID, Quantity, SelectedItemNames, Status, TimeDifference }) => {
    const { changeStatus } = useContext(OrdersContext);
    console.log(TimeDifference);
    const { lang } = useContext(LanguageContext);
    strings.setLanguage(lang);
    return (
        <Button fullWidth onClick={() => changeStatus(OrderID, Status)}>
            <Card sx={{ minWidth: "100%" }} className="hallCard" >
                <CardContent className="cardContent">
                    <Typography sx={{ fontSize: 14 }} color="#fff" bgcolor={"#1976d2"} gutterBottom>
                        {OrderNumber}
                    </Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                    {SelectedItemNames && SelectedItemNames.map((items, index) => {
                        return (
                            <Grid container textAlign={"start"}>
                                {items && items.map(el => {
                                    if (typeof (el) === "object") {
                                        return (
                                            <Grid container borderBottom={"1px solid #eee"} padding={2} key={el}>
                                                {el.map(item => {
                                                    return (
                                                        <React.Fragment key={item}>
                                                            <Grid item xs={2} lg={2}> {JSON.parse(Quantity)[index]} </Grid>
                                                            <Grid item xs={10} lg={10}> <Typography variant="p"> {item} </Typography></Grid>
                                                        </React.Fragment>
                                                    )
                                                }
                                                )}
                                            </Grid>
                                        )
                                    }
                                    else {
                                        return (
                                            <Grid container key={el} borderBottom={"1px solid #eee"} padding={2}>
                                                <Grid item xs={2} lg={2}> {JSON.parse(Quantity)[index]} </Grid>
                                                <Grid item xs={10} lg={10}> <Typography variant="p"> {el} </Typography></Grid>
                                            </Grid>
                                        )
                                    }

                                })}
                            </Grid>
                        )
                    })}

                </CardContent>
                <Grid item xs={12} sm={12} textAlign={"end"} padding={2} fontWeight={"bolder"}>
                    <Typography variant="p"> {strings.orderDuration} : {TimeDifference && TimeDifference}</Typography>
                </Grid>
            </Card>
        </Button>
    )
}
export default Order;