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


function Category(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [doopen, seDoOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        seDoOpen(false);
    };

    const handleDoClickOpen = () => {
        seDoOpen(true);
    };

    const handleInsert = (values) => {
        console.log(values);

        let localData = JSON.parse(localStorage.getItem("category"))

        let id = Math.floor(Math.random() * 10000);
        console.log(id);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("category", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("category", JSON.stringify(localData))
        }

        handleClose()
        formikObj.resetForm()
        loadData()
    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        category_img: yup.mixed().required("please select any product image")
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            category_img: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            handleInsert(values);
        },
    });

    const { handleChange, handleSubmit, handleBlur, errors, touched, setFieldValue } = formikObj;


    const columns = [
        { field: 'name', headerName: 'Name', width: 120 },
        {
            field: 'category_img',
            headerName: 'category_img',
            width: 120,
            renderCell: (params) => (
                <img src={params.row.product_img} width={50} height={50} />
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handleDoClickOpen();}}>
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


const handleDelete = () => {

}

return (
    <div>
        <div>
            <h2>Category</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category List
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
                    {"Are you sure want to delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add category</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
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
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Submit</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>

    </div>
);
}

export default Category;