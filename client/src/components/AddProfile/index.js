import { useMutation} from '@apollo/client';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {ADD_PROFILE_PHOTO} from '../../utils/mutations'
import AuthService from '../../utils/auth'


function AddProfile(props){
    const [addPhoto] = useMutation(ADD_PROFILE_PHOTO, {
        onCompleted: props.reloadFunc
    })
    const userInfo = AuthService.getProfile();
    const onDrop = useCallback(
        ([photo]) => {
            addPhoto({variables: {photo, userId: userInfo.data._id}})
        },
        [addPhoto]
    )
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return(
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <i class="fas fa-plus"></i>
            ) : (
                <i class="fas fa-plus"></i>
            )}
        </div>
    )
}

export default AddProfile;