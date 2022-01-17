import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import {USER_PHOTOS} from '../utils/queries'

const Photographer = (props) => {
    const { id } = useParams();
    // alert(id)
    const {loading, data} = useQuery(USER_PHOTOS, {
        variables: {userId: id}
    })
    console.log(data)
    let _id
    let photoArray
    let email
    let username
    let profilePic
    let description
    if(!loading){
        _id = data.userPhotos._id
        // console.log(data.userPhotos.photos)
        photoArray = data.userPhotos.photos
        email = data.userPhotos.email
        username = data.userPhotos.username
        profilePic = data.userPhotos.profilePhoto
        description = data.userPhotos.description
    }

    // photoModal functions
    const [currentModalImage, setModalImage] = useState("");
    const [currentModalStatus, setPhotoModal] = useState(false);
    var photoModalStatus = currentModalStatus ? "is-active" : "";
    const openPhotoModal = (id) => {
        setModalImage(id)
        setPhotoModal(!currentModalStatus)
    }
    const closePhotoModal = () => {
        setPhotoModal(!currentModalStatus)
    }

    return (
        <>
            {loading ? <div>Some Loading Icon etc</div> :
                <>
                    <header className="columns is-centered is-gapless ">
                        <div className="column is-one-fifth ml-5">
                            <div className="card">
                                <div class="imageContainer">
                                {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-3 portfolioImg" alt="Profile picture" /> : <img src='/images/Profiles/user.png' className="profilePic p-3 portfolioImg" alt="Profile picture" />}
                                </div>

                                <footer className="card-footer is-size-4">
                                    <a href={`mailto:${email}`} className="card-footer-item"><i className="fas fa-envelope has-text-black"></i></a>
                                    {/* {userProfile.isFavorite
                                        // add like function here
                                        ? <a href="#" className="card-footer-item"><i className="fas fa-heart has-text-danger"></i></a> :
                                        <a href="#" className="card-footer-item"><i className="far fa-heart has-text-danger"></i></a>} */}
                                    <a href="#" className="card-footer-item"><i className="fas fa-heart has-text-danger"></i></a>


                                </footer>

                            </div>
                        </div>

                        <div className="column columns is-centered is-three-fifths">
                            <div className="column columns is-four-fifths">
                                <div className="column is-full is-size-4 has-text-centered mt-5">
                                    <div className="aboutMeWrapper">
                                        <h2 id="nameContainer" className="is-size-3">{username}</h2>
                                        <span id="aboutMeContainer">{description? description : ""}</span>
                                        
                                    </div>
                                    <div className="manageBtnWrapper">
                                        {/* <button className="button has-text-light manageBtn"><AddImage/></button> */}
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className="columns is-centered">
                        <div className="column is-four-fifths">
                            <div className="tabs is-centered mt-5">
                                <ul>
                                    {/* {userProfile.genres.map((singleGenre, idx) => (
                                        <li key={idx} className={`is-pointer ${currentTab === singleGenre ? 'active' : ''}`} onClick={() => switchTab(singleGenre)}>{singleGenre}</li>
                                    ))} */}
                                    <li className="is-pointer">Portfolio</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <main className="columns is-centered">
                        <div className="column columns is-four-fifths is-multiline">
                            {photoArray && photoArray.length > 0 ?
                                photoArray.map((p, idx) => (
                                    <div key={idx} className="column is-one-third-desktop is-half-tablet imageWrapper">
                                     
                                        <div class="imageContainer">
                                            {/* <a>
                                            <img className="portfolioImg" src={`/photo/${p._id}`} alt="" />
                                            </a> */}
                                            <a >
                                            <img className="portfolioImg" src={`/photo/${p._id}`} onClick={() => openPhotoModal(`${p._id}`)} alt="Portfolio photo" />
                                            </a>
                                        </div>
                                    </div>
                                ))
                                : ''}
                        </div>

                        <div className={`modal ${photoModalStatus}`}>
                                <div className="modal-background" onClick={closePhotoModal}></div>
                                <div className="modal-content">
                                    <p className="image is-fullwidth">
                                    <img src={`/photo/${currentModalImage}`} alt="Portfolio photo modal"/>
                                    </p>
                                </div>
                                <button className="modal-close is-large" onClick={closePhotoModal} aria-label="close"></button>
                        </div>
                    </main>

                </>
            }
        </>
    )
}

export default Photographer;