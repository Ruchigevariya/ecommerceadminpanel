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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Product(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [doopen, setDoOpen] = React.useState(false);
    const [didid, setDidId] = useState(0);
    const [update, setUpdate] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDoOpen(false);
        setUpdate(false);
        formikObj.resetForm()
    };

    // Alert
    const handledoClickOpen = () => {
        setDoOpen(true);
    };
    
    const handleInsert = (values) => {
        console.log(values);

        let localData = JSON.parse(localStorage.getItem("product"))

        let id = Math.floor(Math.random() * 1000);
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

    const handleUpdateData = (values) => {
        console.log(values);

        let localData = JSON.parse(localStorage.getItem("product"))

        let uData = localData.map((l) => {
            if(l.id === values.id){
                return values;
            }else{
                return l;
            }
        })

        localStorage.setItem("product",JSON.stringify(uData))

        loadData();

        handleClose();

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
            if(update){
                handleUpdateData(values);
            }else{
                handleInsert(values);
            }
        },
    });

    const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formikObj;

    const handleDelete = () => {
        let localData = JSON.parse(localStorage.getItem("product"))
        // console.log(params.id);

        let fdata = localData.filter((l) => l.id !== didid)
        console.log(fdata);

        localStorage.setItem("product", JSON.stringify(fdata))

        loadData();

        handleClose();

    }

    const handleEdit = (params) => {
        handleClickOpen();

        formikObj.setValues(params.row)

        setUpdate(true);
    }
    
    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handledoClickOpen(); setDidId(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem("product"));

        if (localData !== null) {
            setData(localData);
        }

    }

    useEffect(() => {
        loadData()
    }, [])

    console.log(data);

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
            <Dialog
                open={doopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete this product data?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add product</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
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
                                value={values.category}
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
                                value={values.price}
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
                                value={values.quantity}
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
                                value={values.status}
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
                                {
                                    update ? 
                                    <Button type='submit'>Update</Button>
                                    :
                                    <Button type='submit'>Submit</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Product;