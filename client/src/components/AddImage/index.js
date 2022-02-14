import { useMutation } from '@apollo/client';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {ADD_PHOTO} from '../../utils/mutations'
import AuthService from '../../utils/auth'


function AddImage(props){
    const [addPhoto] = useMutation(ADD_PHOTO, {
        onCompleted: props.reloadFunc
    })
    const userInfo = AuthService.getProfile();
    // console.log(userInfo.data._id)
    const onDrop = useCallback(
        ([photo]) => {
            // console.log(photo)
            addPhoto({variables: {photo, userId: userInfo.data._id}})
        },
        [addPhoto]
    )
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return(
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop Here...</p>
            ) : (
                <p>Upload Photo</p>
            )}
        </div>
        // <form action='/add' method='post' encType='multipart/form-data'>
        //     <input type='file' name='avatar'/>
        //     <button onClick={onDrop}>Add</button>
        // </form>
    )
}

export default AddImage;