import { Box, Grid } from "@mui/material"
import NoItemsFound from "../assets/images/noitems.png";

const NoContent = () => {
    return (
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
                    height: "250px",
                    width: "fit-content",
                }}
                alt="No Items Found"
                src={NoItemsFound}
            />
        </Grid>
    )
}

export default NoContent ; 