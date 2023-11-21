import { Button, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import ItemsContext from '../../../context/itemsContext'
import { getAddAdjustmentValidaiton } from './configurations'
import AdjustmentForm from './adjustmentForm'
import LanguageContext from '../../../context/langContext'
import strings from '../../../assets/locals/locals'
import uniqid from 'uniqid';
import { useLocation } from 'react-router-dom'

const AddAdjustments = (props) => {
    const { addAdjustment } = useContext(ItemsContext);
    const { lang } = useContext(LanguageContext);
    const { state } = useLocation();
    return (
        <Grid container className={"mainContainer"}>
            <Grid
                item
                xs={11}
                lg={8}
                xl={10}
                justifyContent={"space-around"}
                bgcolor={"#fff"}
                borderRadius={"50px"}
                padding={{ xs: 1, sm: 1, md: 2, lg: 3 }}
            >

                <Grid
                    container
                    margin={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5"> {strings.addAdjustments} {state.ItemName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={11} xl={10}>
                        <Formik
                            initialValues={{
                                Adjustment: [{ title: "", adjustmentInfo: [{ overPrice: null, label: "", id: uniqid() }], id: uniqid() }],
                                ...state
                            }}
                            validationSchema={() => getAddAdjustmentValidaiton(lang)}
                            onSubmit={(data) => addAdjustment(data)}
                            enableReinitialize={true}
                        >
                            {(handlers) => (
                                <Form>
                                    <AdjustmentForm />
                                    <Grid item xs={12} textAlign={"center"}>
                                        <Button color='warning' variant='outlined' onClick={handlers.handleSubmit}> {strings.submit}</Button>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddAdjustments

