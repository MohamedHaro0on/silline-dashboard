import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CategoriesContext from "../../context/categoryContext";

export default function Category({
  CategoryPicture,
  CategoryName,
  CategoryID,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { deleteCategoryHandler } = React.useContext(CategoriesContext);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            className="listKeysContainer"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h3>{CategoryName}</h3>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={"composition-menu"}
              aria-expanded={"true"}
              aria-haspopup="true"
              onClick={handleToggle}
              color="warning"
            >
              {/* <GridMoreVertIcon /> */}
            </Button>
          </Grid>
{/* 
          <Grid item xs={10}>
            <Stack direction="row" spacing={2}>
              <div>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      {
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            {
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem
                                  onClick={() => {
                                    deleteCategoryHandler(CategoryID);
                                    setOpen(false);
                                  }}
                                >
                                  Delete
                                </MenuItem>
                                 <MenuItem>
                                  <Link
                                    to={{
                                      pathname: `/categories/${CategoryID}`,
                                      state: { id: CategoryID },
                                    }}
                                  >
                                    edit
                                  </Link>
                                </MenuItem> 
                              </MenuList>
                            }
                          </ClickAwayListener>
                        </Paper>
                      }
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          </Grid> */}
        </Grid>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:8080//php/uploads/${CategoryPicture}`}
        alt={CategoryName}
        style={{ objectFit: "contain" }}
      />
    </Card>
  );
}
