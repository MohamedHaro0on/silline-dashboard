import React, { useContext } from "react";
import Category from "./category";
import { Box, Button, Grid } from "@mui/material";
import CategoriesContext from "../../context/categoryContext";
import NoItemsFound from "../../assets/images/noitems.png";
import { Link } from "react-router-dom";
import strings from "../../assets/locals/locals";

const Categories = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        sm={12}
        lg={12}
        xl={12}
        display={"flex"}
        justifyContent={"end"}
        padding={3}
        borderBottom={"0.5px solid #e7e4e4"}
      >
        <Button className = "mainBtn" padding={3}>
          <Link to={"/categories/add"}>{strings.addNewItem}</Link>
        </Button>
      </Grid>
      {categories && categories.length > 0 ? (
        categories.map((item) => {
          return (
            <Grid
              key={item.CategoryID}
              item
              sm={6}
              xl={3}
              lg={4}
              padding={3}
              marginTop={3}
              display={"flex"}
              alignItems={"stretch"}
              flexWrap={"wrap"}
            >
              <Category {...item} />
            </Grid>
          );
        })
      ) : (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
          minHeight={"80vh"}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box
            component="img"
            sx={{
              height: "500px",
              width: "fit-content",
            }}
            alt="No Items Found"
            src={NoItemsFound}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Categories;
