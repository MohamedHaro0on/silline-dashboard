import { Grid, TextField, Typography } from "@mui/material";

const Input = ({name , handleBlur , icon , lang , id  , error  ,  touched }) => {
    return (
        (
            <>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    key={name}
                >
                    <Grid
                        item
                        xs={2}
                        sm={2}
                        md={2}
                        lg={1}
                        display={"flex"}
                        justifyContent={
                            "center"
                        }
                        alignItems={"center"}
                    >
                        <Typography
                            variant="h6"
                            color={
                                    touched
                                    ? "#d32f2f"
                                    : "#FFB600"
                            }
                        >
                            {icon}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        sm={9}
                        lg={12}
                        textAlign={"start"}
                    >
                        <TextField
                            key={"title"}
                            placeholder={"title"}
                            fullWidth
                            id={id}
                            label={"title"}
                            type={"text"}
                            name={"title"}
                            margin="normal"
                            onBlur={handleBlur}
                            error={ error }
                        />
        
                        <Typography
                            variant="p"
                            fontSize={"15px"}
                            textAlign={
                                lang === "ar"
                                    ? "right"
                                    : "left"
                            }
                            color={"#D32F2F"}
                        >
                            
                        </Typography>
                    </Grid>
                </Grid>
            </>
        )
    )
}

export default Input ; 