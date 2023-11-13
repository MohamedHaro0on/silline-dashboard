import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
import ItemsContext from "../../context/itemsContext";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import strings from "../../assets/locals/locals";

export default function Item({
  Image,
  Description,
  ItemName,
  Price,
  AdminItemID,
  CategoryName,
  AllergyInfo,
  status
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { deleteItemHandler , updateAvailabilty } = React.useContext(ItemsContext);
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
            <h3>{ItemName}</h3>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={"composition-menu"}
              aria-expanded={"true"}
              aria-haspopup="true"
              onClick={handleToggle}
              color="warning"
            >
              <GridMoreVertIcon />
            </Button>
          </Grid>
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
                                    deleteItemHandler(AdminItemID);
                                    setOpen(false);
                                  }}
                                >
                                  {strings.delete}
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    updateAvailabilty(AdminItemID , status);
                                    setOpen(false);
                                  }}
                                >
                                  {status === 0 ? strings.makeItAvailable : strings.makeItUnavailable}
                                </MenuItem>
                                {/* <MenuItem>
                                  <Link
                                    to={{
                                      pathname: `/items/${AdminItemID}`,
                                      state: { id: AdminItemID },
                                    }}
                                  >
                                    edit
                                  </Link>
                                </MenuItem> */}
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
          </Grid>
        </Grid>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={`https://silinbakeri.net/php/uploads/${Image}`}
        alt={ItemName}
      />
      <CardContent>
        <Typography paragraph>
          <strong>{strings.description} : </strong>
          {Description}
        </Typography>
        <Typography paragraph>
          <strong>{strings.allergy}:</strong> {AllergyInfo}
        </Typography>
        <Typography paragraph>
          <strong>{strings.category} :</strong> {CategoryName}
        </Typography>
        <Typography paragraph>
          <strong>{strings.price}:</strong>{" "}
          <span color="error">
            {Price}
            <AttachMoneyIcon fontSize="15px" />
          </span>
        </Typography>
        <Typography paragraph>
          <strong>{strings.status} :</strong> {status === 1 ? strings.available : strings.notAvailable}
        </Typography>
      </CardContent>
    </Card>
  );
}
