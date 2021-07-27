import { useMutation } from '@apollo/client';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {ADD_PHOTO} from '../../utils/mutations'

function AddImage(){
    const [addPhoto] = useMutation(ADD_PHOTO)
    const onDrop = useCallback(
        ([photo]) => {
            console.log(photo)
            addPhoto({variables: {photo}})
        },
        [addPhoto]
    )
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return(
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
        // <form action='/add' method='post' encType='multipart/form-data'>
        //     <input type='file' name='avatar'/>
        //     <button onClick={onDrop}>Add</button>
        // </form>
    )
}

export default AddImage;