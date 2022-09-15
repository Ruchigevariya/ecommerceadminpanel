import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Category(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        category_img: yup.mixed().required("please select any product image")
    })

    const formikObj = useFormik({
        initialValues: {
            name: '',
            category_img: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { handleChange, handleSubmit, handleBlur, errors, touched, values, setFieldValue } = formikObj;

    return (
        <div>
            <div>
                <h2>Category</h2>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category List
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Add category</DialogTitle>
                    <Formik>
                        <Form>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name="name"
                                    label="Category name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <input
                                    type="file"
                                    name="category_img"
                                    id="category_img"
                                    onChange={(e) => setFieldValue("category_img", e.target.files[0])}
                                />
                                {errors.category_img && touched.category_img ? <p>{errors.category_img}</p> : ''}
                            </DialogContent>
                        </Form>
                    </Formik>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        {/* <Button onClick={handledelete}>Yes</Button> */}
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    );
}

export default Category;