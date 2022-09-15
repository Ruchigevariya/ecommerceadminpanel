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
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProductData, getProduct, updateProductData } from '../../redux/Action/Product.action';

function Product(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [doopen, setDoOpen] = React.useState(false);
    const [didid, setDidId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const c = useSelector(state => state.counter);

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

        // let localData = JSON.parse(localStorage.getItem("product"))

        // let id = Math.floor(Math.random() * 1000);
        // console.log(id);

        // let data = {
        //     id: id,
        //     ...values
        // }

        dispatch(addProduct(values))
        // if (localData === null) {
        //     localStorage.setItem("product", JSON.stringify([data]))
        // } else {
        //     localData.push(data)
        //     localStorage.setItem("product", JSON.stringify(localData))
        // }

        handleClose()
        formikObj.resetForm()
        loadData()
    }

    const handleUpdateData = (values) => {
        console.log(values);

        // let localData = JSON.parse(localStorage.getItem("product"))

        // let uData = localData.map((l) => {
        //     if (l.id === values.id) {
        //         return values;
        //     } else {
        //         return l;
        //     }
        // })

        // localStorage.setItem("product", JSON.stringify(uData))

        dispatch(updateProductData(values))

        loadData();

        handleClose();

    }
    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        category: yup.string().required("please enter category"),
        price: yup.string().required("please enter price"),
        quantity: yup.string().required("please enter quantity"),
        status: yup.string().required("please enter status"),
        product_img: yup.mixed().required("please select any product image")
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            category: '',
            price: '',
            quantity: '',
            status: '',
            product_img: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdateData(values);
            } else {
                handleInsert(values);
            }
        },
    });

    const { handleChange, errors, handleSubmit, handleBlur, touched, values, setFieldValue } = formikObj;

    const handleDelete = () => {
        // let localData = JSON.parse(localStorage.getItem("product"))
        // // console.log(params.id);

        // let fdata = localData.filter((l) => l.id !== didid)
        // console.log(fdata);

        // localStorage.setItem("product", JSON.stringify(fdata))

        dispatch(deleteProductData(didid))

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
            field: 'product_img', 
            headerName: 'Product_img', 
            width: 130,
            renderCell: (params) => (
                <img  src={params.row.product_img} width={50} height={50} />
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handledoClickOpen(); setDidId(params.row) }}>
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

    const dispatch = useDispatch()
    const Product = useSelector(state => state.Product)
    // console.log(Product);
    useEffect(() => {
        // loadData()
        dispatch(getProduct())
    }, [])

    // console.log(data);

    const handlesearch = (val) => {
        console.log(val);

        let localData = JSON.parse(localStorage.getItem("product"))

        let fData = localData.filter((p) => (
            p.name.toLowerCase().includes(val) ||
            p.category.toLowerCase().includes(val) ||
            p.price.toString().includes(val) ||
            p.quantity.toString().includes(val) ||
            p.status.toString().includes(val)
        ))

        setFilterData(fData);

        console.log(fData);
    }

    let finalData = filterData.length > 0 ? filterData : data

    return (
        <div>
            {
                Product.isLoading ?
                    <p>Loading.....</p>
                    :
                    Product.error !== '' ?
                    <p>{Product.error}</p>
                    :
                    <div>
                        <h2>Product {c.counter}</h2>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add product
                        </Button>
                        <TextField
                            margin="dense"
                            name="search"
                            label="product search"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(p) => handlesearch(p.target.value)}
                        />
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={Product.Product}
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
                            {
                                update ?
                                    <DialogTitle>Update product</DialogTitle>
                                    :
                                    <DialogTitle>Add product</DialogTitle>
                            }

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
                                        <input 
                                            type="file"
                                            name="product_img"
                                            id="product_img"
                                            onChange={(e) => setFieldValue("product_img", e.target.files[0])}
                                        /> 
                                        {errors.product_img && touched.product_img ? <p>{errors.product_img}</p> : ''}
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
            }
        </div>
    );
}

export default Product;
