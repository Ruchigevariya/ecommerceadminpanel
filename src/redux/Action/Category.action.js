import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import * as ActionTypes from '../ActionTypes'

export const getCategory = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "category"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(data);
            dispatch({ type: ActionTypes.GET_CATEGORYDATA, payload: data })
        });

    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}


export const addCategory = (data) => async (dispatch) => {
    try {
        const randomNum = Math.floor(Math.random() * 10000000).toString()
        console.log(randomNum);

        const categoryRef = ref(storage, 'category/' + randomNum);
        // console.log(categoryRef);

        uploadBytes(categoryRef, data.category_img)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "category"), {
                            ...data,
                            category_img: url,
                            fileName: randomNum
                        });
                        dispatch({
                            type: ActionTypes.ADD_CATEGORYDATA, payload: {
                                id: docRef.id,
                                ...data,
                                category_img: url,
                                fileName: randomNum
                            }
                        })
                        console.log(url);
                    });
            });
        // const docRef = await addDoc(collection(db, "category"), data);
        // console.log("Document written with ID: ", docRef.id);
        // dispatch({ type: ActionTypes.ADD_CATEGORYDATA, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}

export const deleteCategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        const categoryRef = ref(storage, 'category/' + data.fileName);

        deleteObject(categoryRef)
            .then(async () => {
                await deleteDoc(doc(db, "category", data.id));
                dispatch({ type: ActionTypes.DELETE_CATEGORYDATA, payload: data.id })
            })
            .catch((error) => {
                dispatch(errorCategory(error.message))
            });
    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}

export const updateCategory = (data) => async (dispatch) => {
    console.log(data);
    const categoryRef = doc(db, "category", data.id);

    try {

        if (typeof data.category_img === 'string') {
            console.log("No change image");
        } else {
            console.log("change image");
            const delcategoryRef = ref(storage, 'category/' + data.fileName);
            const randomNum = Math.floor(Math.random() * 10000000).toString()
            const instcategoryRef = ref(storage, 'category/' + randomNum);

            deleteObject(delcategoryRef) //1
                .then(async () => {
                    uploadBytes(instcategoryRef, data.category_img) //2
                        .then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            getDownloadURL(ref(storage, snapshot.ref)) //3
                                .then(async (url) => {
                                    console.log(url);
                                    await updateDoc(categoryRef, { //4
                                        name: data.name,
                                        fileName: randomNum,
                                        category_img: url
                                    });
                                    dispatch({ type: ActionTypes.UPDATE_CATEGORYDATA, payload: {...data, fileName: randomNum, category_img: url} }) //5

                                })
                        })
                })
        }
        // await updateDoc(categoryRef, {
        //     name: data.name,
        // });
        // dispatch({ type: ActionTypes.UPDATE_CATEGORYDATA, payload: data })
    } catch (error) {
        dispatch(errorCategory(error.message))
    }
}

export const errorCategory = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_CATEGORY, payload: error })
}