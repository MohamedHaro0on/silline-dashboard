import { useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";




import OrdersContext from "../../context/ordersContext";
import NoContent from "../../components/noContent";
import "./hall.scss";
const Hall = () => {
  const { orders, notFinishedOrders, finishedOrders } = useContext(OrdersContext);

  useEffect(() => {
  }, [orders])

  if (orders && orders.length === 0) {
    return <NoContent />
  }
  else if (orders.length > 0) {
    const notFinishedOrdersPlaceHolder = Array.apply(null, Array(14)).map(function () { });
    const finishedOrdersPlaceHolder = Array.apply(null, Array(13)).map(function () { });

    return (

      <Grid container justifyContent={"center"} alignItems={"center"} padding={3} >

        {notFinishedOrders && notFinishedOrders.length > 0 && <Grid item xs={12} sm={12} lg={5} xl={5} border={"solid 2px #000"} className="hallList">
          <Grid container justifyContent={"space-between"} >
            <Grid item xs={12} sm={12} md={12} bgcolor={"black"} color={"white"} padding = {2} display={"flex"} alignItems={"center"}>
              <Typography variant="h4"> {"preparation of orders   جاري التسليم "} </Typography>
            </Grid>
            {
              notFinishedOrdersPlaceHolder && notFinishedOrdersPlaceHolder.map((_, index) => {
                return (
                  <Grid 
                    key={orders[index] && orders[index].OrderNumber}
                    item xs={6}
                    padding = {2}
                    border={"solid 2px #eee"} 
                    display={"flex"} 
                    alignItems={"center"} 
                    justifyContent="center"
                    >
                    <Typography variant="h5" fontSize={"2rem"} fontWeight={"bolder"} >{notFinishedOrders[index] && notFinishedOrders[index].OrderNumber}</Typography>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
        }
        {finishedOrders && finishedOrders.length > 0 && <Grid item xs={12} sm={12} lg={5} xl={5} border={"solid 2px #000"} className="finishedList">
          <Grid container padding={3} justifyContent={"space-between"} >
            <Grid item xs={12} sm={12} md={12}  padding = {2} >
              <Typography variant="h4"> {"Ready To Collect    جاهز للتسليم "} </Typography>
            </Grid>
            {
               finishedOrdersPlaceHolder.map((_ , index ) => {
                return (
                  <Grid 
                    item  
                    xs ={index === 0 ? 12 : 6} 
                    minHeight = {index === 0 ? "15vh" : "10vh"} 
                    key={index} 
                    padding = {2} 
                    border={"solid 2px #eee"} 
                    textAlign={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    >
                    <Typography variant="h5" fontSize={"2rem"} fontWeight={"bolder"} >{finishedOrders[index] && finishedOrders[index].OrderNumber}</Typography>
                  </Grid>
                )

              })
            }
          </Grid>
        </Grid>
        }





      </Grid>
    )
  }
};

export default Hall;
