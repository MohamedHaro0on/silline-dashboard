import React, { useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Logo from "../../assets/images/logo.png";
import "./sidebar.scss";
import LanguageContext from "../../context/langContext";
import strings from "../../assets/locals/locals";
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = ({ Component }) => {
  const { lang } = useContext(LanguageContext);
  strings.setLanguage(lang);

  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen(!open);
  };

  const routes = [
    {
      icon: <DashboardIcon className="icon" />,
      to: "/home",
      title: strings.overView,
    },
    {
      icon: <AddIcon className="icon" />,
      to: "/sign-up",
      title: strings.AddUser,
    },
    {
      icon: <FormatAlignJustifyIcon className="icon" />,
      to: "/items",
      title: strings.items,
    },
    {
      icon: <CategoryIcon className="icon" />,
      to: "/categories",
      title: strings.categories,
    },
    {
      icon: <SoupKitchenIcon className="icon" />,
      to: "/kitchen",
      title: strings.kitchen,
    }
    ,
    {
      icon: <AccountBalanceIcon className="icon" />,
      to: "/hall",
      title: strings.hall,
    }
  ];

  return (
    <Grid item xs={0} sm={0} lg={2} className="sideBarContainer">
      {open && <div className="overLay" onClick={toggleSideBar}></div>}
      <div className={open ? "sidebar sidebarOpen" : "sidebar sidebarClosed"}>
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
        {Component && Component }
        {!Component && <div className="center">
          <ul>
            {routes.map(({ title, icon, to }) => {
              return (
                <li key={title}>
                  <Link to={to}>
                    {icon}
                    <span>{title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>}

      </div>

      <Button onClick={toggleSideBar} className="toggleSideBarBtn">
        <ArrowRightAltIcon />
      </Button>
    </Grid>
  );
};

export default Sidebar;
