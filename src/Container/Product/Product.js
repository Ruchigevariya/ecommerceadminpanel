import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';

function Product(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInsert = (values) => {
        console.log(values);

        let localData = JSON.parse(localStorage.getItem("product"))

        let id = Math.floor(Math.random()*1000);
        console.log(id);
    
        let data = {
          id: id,
          ...values
        }
    
        if (localData === null) {
          localStorage.setItem("product", JSON.stringify([data]))
        } else {
          localData.push(data)
          localStorage.setItem("product", JSON.stringify(localData))
        }

        handleClose()
        formikObj.resetForm()
        loadData()
    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        category: yup.string().required("please enter category"),
        price: yup.string().required("please enter price"),
        quantity: yup.string().required("please enter quantity"),
        status: yup.string().required("please enter status"),
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            category: '',
            price: '',
            quantity: '',
            status: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikObj;

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

    const loadData = () => {
    
        let localData = JSON.parse(localStorage.getItem("product"));
        
        if(localData !== null){
          setData(localData);
        }
    
    }
    
    useEffect (() => {
        loadData()
    },[])

    return (
        <div>
            <h2>Product</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add product
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add product</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                label="product name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                margin="dense"
                                name="category"
                                label="product category"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.category && touched.category ? <p>{errors.category}</p> : ''}
                            <TextField
                                margin="dense"
                                name="price"
                                label="product price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                            <TextField
                                margin="dense"
                                id="quantity"
                                label="product quantity"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                            <TextField
                                margin="dense"
                                id="status"
                                label="product status"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.status && touched.status ? <p>{errors.status}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Submit</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Product;