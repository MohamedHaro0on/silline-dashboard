import React, { useContext } from "react";
import Category from "./category";
import { Box, Button, Grid } from "@mui/material";
import CategoriesContext from "../../context/categoryContext";
import NoItemsFound from "../../assets/images/noitems.png";
import { Link } from "react-router-dom";
import strings from "../../assets/locals/locals";
import NoContent from "../../components/noContent";

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
          <Link to={"/categories/add"}>{strings.addNewCategory}</Link>
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
      ) : <NoContent/>}
    </Grid>
  );
};

export default Categories;
