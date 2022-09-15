import { getProductData, postProductData, deleteProductdata, putProductData } from '../../Common/Apis/Product.api';
import { baseUrl } from '../../Shares/BaseURL';
import * as ActionTypes from '../ActionTypes'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getProduct = () => async (dispatch) => {
    try {

        const querySnapshot = await getDocs(collection(db, "product"));

        let data = []

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(data);
            dispatch({ type: ActionTypes.GET_PRODUCTDATA, payload: data })
        });

        // dispatch(loadingProduct())

        // setTimeout(function () {
        //     getProductData()
        //         .then((data) => dispatch(({ type: ActionTypes.GET_PRODUCTDATA, payload: data.data })))
        //         .catch(error => dispatch(errorProduct(error.message)));
        // fetch(baseUrl + 'product')
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then(response => response.json())
        //     .then((data) => dispatch(({ type: ActionTypes.GET_PRODUCTDATA, payload: data })))
        //     .catch(error => dispatch(errorProduct(error.message)));
        // }, 2000)

    } catch (error) {
        dispatch(errorProduct(error.message))
    }

}

export const addProduct = (data) => async (dispatch) => {
    try {
        const productRef = ref(storage, 'product/' + data.product_img.name);
        // console.log(productRef);
        uploadBytes(productRef, data.product_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async(url) => {
                        const docRef = await addDoc(collection(db, "product"),{
                            ...data,
                            product_img: url
                        });
                        dispatch({ type: ActionTypes.ADD_PRODUCTDATA, payload: {
                            id: docRef.id,
                            ...data,
                            product_img: url
                        } })
                        console.log(url);
                    });
            });
        // console.log("Document written with ID: ", docRef.id);

        // postProductData(data)
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.ADD_PRODUCTDATA, payload: data.data })
        //     })
        //     .catch((error) => {
        //         dispatch(errorProduct(error.message))
        //     });
        // fetch(baseUrl + 'product', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.ADD_PRODUCTDATA, payload: data })
        //     })
        //     .catch((error) => {
        //         dispatch(errorProduct(error.message))
        //     });
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const deleteProductData = (id) => async (dispatch) => {
    console.log(id);
    try {
        await deleteDoc(doc(db, "product", id));
        dispatch({ type: ActionTypes.DELETE_PRODUCTDATA, payload: id })
        // deleteProductdata(id)
        //     .then(
        //         dispatch({ type: ActionTypes.DELETE_PRODUCTDATA, payload: id })
        //     )
        //     .catch((error) => {
        //         dispatch(errorProduct(error.message))
        //     });
        // fetch(baseUrl + 'product/' + id , {
        //     method:'DELETE'
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        // .then((response) => response.json())
        // .then(
        //     dispatch({ type: ActionTypes.DELETE_PRODUCTDATA, payload: id })
        // )
        // .catch((error) => {
        //     dispatch(errorProduct(error.message))
        // });
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const updateProductData = (data) => async (dispatch) => {
    console.log(data);
    try {
        const productref = doc(db, "product", data.id);

        await updateDoc(productref, {
            name: data.name,
            category: data.category,
            price: data.price,
            quantity: data.quantity,
            status: data.status
        });
        dispatch({ type: ActionTypes.UPDATE_PRODUCTDATA, payload: data })

        // putProductData(data)
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.UPDATE_PRODUCTDATA, payload: data.data })
        //     })
        //     .catch((error) => {
        //         dispatch(errorProduct(error.message))
        //     });
        // fetch(baseUrl + 'product/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         dispatch({ type: ActionTypes.UPDATE_PRODUCTDATA, payload: data })
        //     })
        //     .catch((error) => {
        //         dispatch(errorProduct(error.message))
        //     });
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const loadingProduct = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PRODUCT })
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}