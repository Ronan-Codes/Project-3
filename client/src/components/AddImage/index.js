import React from 'react';

function AddImage(){
    return(
        <form action="/profile" method="post" enctype="multipart/form-data">
            <input type="file" name="avatar"/>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddImage;