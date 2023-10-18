import React from "react";
import { Grid, Typography } from "@mui/material";

import "./widget.scss";

const Widget = ({ title, isMoney, icon, link, amount }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} padding={2}>
      <Grid container className="widget">
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Typography variant="h5" className="title">
            {title}
          </Typography>
          <span className="counter">
            {isMoney && "$"} {amount}
          </span>
          <span className="link">{link}</span>
        </Grid>
        <Grid item xs={4} lg={4} md={4}>
          <div className="right">{icon}</div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Widget;
