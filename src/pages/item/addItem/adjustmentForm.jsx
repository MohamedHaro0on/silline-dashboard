import React, { useContext } from "react";
import { FieldArray, useFormikContext } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { FaPlus, FaTrash } from "react-icons/fa";
import LanguageContext from "../../../context/langContext";
import strings from "../../../assets/locals/locals";
import uniqid from 'uniqid';


const AdjustmentInfo = ({ adjustmentIndex, adjustmentInfoHelpers, adjustmentHelper }) => {
    const { values, handleChange, errors, touched, handleBlur } = useFormikContext();
    const { lang } = useContext(LanguageContext);
    strings.setLanguage(lang);



    const handleRemoveAdjustmentInfo = (adjustmentIndex, index) => {
        if (values.Adjustment[adjustmentIndex].adjustmentInfo.length > 1) {
            adjustmentInfoHelpers.remove(index)
        }
        else {
            adjustmentHelper.remove(0);
        }
    }
    return (
        <Grid container>
            {values.Adjustment[adjustmentIndex].adjustmentInfo.map(({ id }, index) => (
                <Grid container  justifyContent={"space-between"} marginTop={2} alignItems={"center"} display={"flex"} key={id} marginBottom={3} >
                    <Grid item xs={7} sm={5} md={4}>
                        <TextField
                            error={
                                touched.Adjustment &&
                                touched.Adjustment[adjustmentIndex] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index].label &&
                                errors.Adjustment &&
                                errors.Adjustment[adjustmentIndex] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].label &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].label &&
                                Boolean(
                                    errors.Adjustment[adjustmentIndex].adjustmentInfo[index].label
                                )
                            }
                            onBlur={handleBlur}
                            fullWidth
                            name={`Adjustment[${adjustmentIndex}].adjustmentInfo[${index}].label`}
                            label="Label"
                            type="text"
                            onChange={handleChange}
                        />
                        <Typography
                            variant="p"
                            fontSize={"15px"}
                            textAlign={
                                lang === "ar" ? "right" : "left"
                            }
                            color={"#D32F2F"}
                        >
                            {
                                touched.Adjustment &&
                                touched.Adjustment[adjustmentIndex] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index].label &&
                                errors.Adjustment &&
                                errors.Adjustment[adjustmentIndex] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].label &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].label
                            }


                        </Typography>
                    </Grid>

                    <Grid item xs={7} sm={4} md={4}>
                        <TextField
                            onBlur={handleBlur}
                            fullWidth
                            error={
                                touched.Adjustment &&
                                touched.Adjustment[adjustmentIndex] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice &&
                                errors.Adjustment &&
                                errors.Adjustment[adjustmentIndex] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice &&
                                Boolean(
                                    errors.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice
                                )
                            }
                            name={`Adjustment[${adjustmentIndex}].adjustmentInfo[${index}].overPrice`}
                            label="Over Price"
                            type="number"
                            onChange={handleChange}
                        />

                        <Typography
                            variant="p"
                            fontSize={"15px"}
                            textAlign={
                                lang === "ar" ? "right" : "left"
                            }
                            color={"#D32F2F"}
                        >
                            {
                                touched.Adjustment &&
                                touched.Adjustment[adjustmentIndex] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                touched.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice &&
                                errors.Adjustment &&
                                errors.Adjustment[adjustmentIndex] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index] &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice &&
                                errors.Adjustment[adjustmentIndex].adjustmentInfo[index].overPrice
                            }
                        </Typography>
                    </Grid>

                    <Grid item xs={4} sm = {3} padding={1} display="flex" alignItems={"center"} justifyContent={"space-between"} height={"100%"}>
                        {values.Adjustment[adjustmentIndex].adjustmentInfo.length > 1 &&
                            <Button color="error" variant="outlined" onClick={() => handleRemoveAdjustmentInfo(adjustmentIndex, index)} >
                                <FaTrash fontSize={25} />
                            </Button>
                        }
                        {index + 1 === values.Adjustment[adjustmentIndex].adjustmentInfo.length &&
                            <Button color="secondary" variant="outlined" onClick={() => {
                                adjustmentInfoHelpers.push({ overPrice: null, label: "", id: uniqid() })
                            }}>
                                <FaPlus fontSize={25} />
                            </Button>
                        }
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12} sm={12} display="flex" justifyContent={"space-between"} marginTop={2} alignItems={"center"}>

            </Grid>
        </Grid>
    );
};


const Adjustment = ({ adjustmentHelper }) => {
    const { values, handleChange, errors, touched, handleBlur, } = useFormikContext();
    const { lang } = useContext(LanguageContext);
    strings.setLanguage(lang);
    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                <Grid container>
                    <Grid item xs={12} sm={12} marginTop={2} marginBottom={2}>
                        {values.Adjustment.map(({ title, id }, index) => (
                            <React.Fragment key={id}>
                                <Grid container justifyContent={"space-between"}>
                                    <Grid item xs={9}>
                                        <TextField
                                            error={
                                                touched.Adjustment &&
                                                touched.Adjustment[index] &&
                                                touched.Adjustment[index].title &&
                                                errors.Adjustment &&
                                                errors.Adjustment[index] &&
                                                errors.Adjustment[index].title &&
                                                Boolean(
                                                    errors.Adjustment[index].title
                                                )
                                            }
                                            onBlur={handleBlur}
                                            fullWidth
                                            type="text"
                                            value={title}
                                            onChange={handleChange}
                                            label="title"
                                            placeholder="title"
                                            name={`Adjustment[${index}].title`}
                                        />

                                        <Typography
                                            variant="p"
                                            fontSize={"15px"}
                                            textAlign={
                                                lang === "ar" ? "right" : "left"
                                            }
                                            color={"#D32F2F"}
                                        >
                                            {
                                                touched.Adjustment &&
                                                touched.Adjustment[index] &&
                                                touched.Adjustment[index].title &&
                                                touched.Adjustment[index].title &&
                                                errors.Adjustment &&
                                                errors.Adjustment[index] &&
                                                errors.Adjustment[index].title &&
                                                errors.Adjustment[index].title
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <Button color="warning" variant="outlined" onClick={() => {
                                            adjustmentHelper.remove(index)
                                        }}>
                                            <FaTrash fontSize={25} />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <FieldArray name={`Adjustment[${index}].adjustmentInfo`}>
                                    {arrayHelpers => (
                                        <AdjustmentInfo
                                            adjustmentIndex={index}
                                            adjustmentInfoHelpers={arrayHelpers}
                                            adjustmentHelper={adjustmentHelper}
                                        />
                                    )}
                                </FieldArray>
                            </React.Fragment>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button color="warning" variant="outlined" onClick={() => {
                            adjustmentHelper.push({ title: "", adjustmentInfo: [{ overPrice: null, label: "", id: uniqid() }] , id : uniqid() })
                        }}>
                            add new adjustment
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const AdjustmentForm = () => {
    return (
        <Grid container display={"flex"} justifyContent={"center"}>
            <FieldArray name='Adjustment'>
                {(arrayHelpers, index) => {
                    return (
                        <Adjustment key={index} adjustmentHelper={arrayHelpers} />
                    );
                }}
            </FieldArray>
        </Grid>

    );
};

export default AdjustmentForm;