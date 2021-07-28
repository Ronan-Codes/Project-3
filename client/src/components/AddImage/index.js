import { useMutation, useQuery } from '@apollo/client';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {ADD_PHOTO} from '../../utils/mutations'
import {ALL_PHOTOS} from '../../utils/queries'


function AddImage(){
    const [addPhoto] = useMutation(ADD_PHOTO)
    const {data} = useQuery(ALL_PHOTOS)
    console.log(data);
    const onDrop = useCallback(
        ([photo]) => {
            console.log(photo)
            addPhoto({variables: {photo}})
        },
        [addPhoto]
    )
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return(
        <div>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
                {data ? (data.photos.map((photo) => (
                    <img/>
                ))) : (<p>loading</p>)}
        </div>
        // <form action='/add' method='post' encType='multipart/form-data'>
        //     <input type='file' name='avatar'/>
        //     <button onClick={onDrop}>Add</button>
        // </form>
    )
}

export default AddImage;