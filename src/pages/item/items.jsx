import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem , TextField } from "@mui/material";
import ItemsContext from "../../context/itemsContext";
import { Link } from "react-router-dom";

import strings from "../../assets/locals/locals";
import NoItemsFound from "../../assets/images/noitems.png";
import Item from "./item";
import "./items.scss";
import CategoriesContext from "../../context/categoryContext";

const Items = () => {
  const { items } = useContext(ItemsContext);
  let { categories } = useContext(CategoriesContext);
  const [displayedItems, setDisplayedItems] = useState(items);

  useEffect(()=>{
    setDisplayedItems(items);
  }, [items])
  const filterItemsByCategory = (cat) => {
    if (cat === "all") {
      setDisplayedItems(items);
    } else {
      setDisplayedItems(items.filter((el) => el.CategoryID === cat));
    }
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid
        item
        xs={12}
        md={12}
        sm={12}
        lg={12}
        xl={12}
        display={"flex"}
        justifyContent={"space-between"}
        padding={3}
        borderBottom={"0.5px solid #e7e4e4"}
      >
        <Button>
          <TextField
            select
            label = {strings.filterItems}
            onChange={(e) => filterItemsByCategory(e.target.value)}
            defaultValue={"all"}
            color="warning"
            variant="outlined"
          >
            {categories &&
              categories.map(({ CategoryID, CategoryName}) => {
                return (
                  <MenuItem key={CategoryID} value={CategoryID}>
                    {CategoryName}
                  </MenuItem>
                );
              })}
            <MenuItem value={"all"}> {strings.all} </MenuItem>
          </TextField>
        </Button>
        <Button variant="outlined" color="warning" className={"mainBtn"}>
          <Link to={"/items/add"}>{strings.addNewItem}</Link>
        </Button>
      </Grid>

      <Grid container>
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => {
            return (
              <Grid
                key={item.AdminItemID}
                item
                sm={6}
                lg={4}
                xl={3}
                padding={3}
                marginTop={3}
                display={"flex"}
                alignItems={"stretch"}
                flexWrap={"wrap"}
              >
                <Item {...item} />
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
    </Grid>
  );
};

export default Items;
