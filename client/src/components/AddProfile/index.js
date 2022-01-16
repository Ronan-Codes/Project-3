import { useMutation} from '@apollo/client';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {ADD_PROFILE_PHOTO} from '../../utils/mutations'
import AuthService from '../../utils/auth'


function AddProfile(){
    const [addPhoto] = useMutation(ADD_PROFILE_PHOTO)
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
                <i className="far fa-id-badge has-text-black"></i>
            ) : (
                <i className="far fa-id-badge has-text-black"></i>
            )}
        </div>
        // <form action='/add' method='post' encType='multipart/form-data'>
        //     <input type='file' name='avatar'/>
        //     <button onClick={onDrop}>Add</button>
        // </form>
    )
}

export default AddProfile;