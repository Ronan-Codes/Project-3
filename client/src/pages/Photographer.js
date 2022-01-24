import React, { useState, useEffect} from "react";
import AuthService from "../utils/auth"
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import {USER_PHOTOS} from '../utils/queries'

import { ADD_FOLLOWING, UNFOLLOW, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../utils/mutations';

const Photographer = (props) => {
    // unfollow functions
    const userToken = AuthService.getProfile();
    // console.log(userToken)

    const {loading: loadingFollowing, data: dataFollowing} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
    // console.log(dataFollowing.userPhotos._id)
    // const {} = dataFollowing
    let userFollowing
    if(!loadingFollowing){
        userFollowing = dataFollowing.userPhotos.following
        console.log(userFollowing)
        // if (userFollowing.some(e => e._id === _id)) {
        //     console.log("true")
        //   }
        //   else {console.log("false")}


    }

    // unfollow functions end
    

    const { id } = useParams();
    // alert(id)
    const {loading: currentPhotographer, data: photographerData} = useQuery(USER_PHOTOS, {
        variables: {userId: id}
    })
    // console.log(data)
    let _id
    let photoArray
    let email
    let username
    let profilePic
    let description
    if(!currentPhotographer){
        _id = photographerData.userPhotos._id
        // console.log(data.userPhotos.photos)
        photoArray = photographerData.userPhotos.photos
        email = photographerData.userPhotos.email
        username = photographerData.userPhotos.username
        profilePic = photographerData.userPhotos.profilePhoto
        description = photographerData.userPhotos.description
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

    // Following functions
    const [addFollowing] = useMutation(ADD_FOLLOWING);
    const [unfollow] = useMutation(UNFOLLOW);
    const [addFollower] = useMutation(ADD_FOLLOWER);
    const [removeFollower] = useMutation(REMOVE_FOLLOWER);

    const handleFollowing = async() => {
        try {
          await addFollowing({
            variables: { id: _id }
          });
        } catch (e) {
          console.error(e);
        }

        try {
            await addFollower({
              variables: { id: _id }
            });
          } catch (e) {
            console.error(e);
          }
    }

    // unfollow functions contd..
    const handleUnfollow = async() => {
        try {
          await unfollow({
            variables: { id: _id }
          });
        } catch (e) {
          console.error(e);
        }

        try {
            await removeFollower({
              variables: { id: _id }
            });
        } catch (e) {
            console.error(e);
        }
    }

    // render Follow / Unfollow buttons
    const followUnfollow = () => {
        if (userFollowing.some(e => e._id === _id)) {
            return(
                <button className="btnInProfile button is-size-7-mobile is-primary" onClick={handleUnfollow}>Unfollow</button>
            )
          }
          else {
              return(
                <button className="btnInProfile button is-size-7-mobile is-primary" onClick={handleFollowing}>Follow</button>
              )
          }
    }
    

    return (
        <>
            {currentPhotographer ? <div>Some Loading Icon etc</div> :
                <>
                    <header className="columns is-centered is-gapless is-mobile pl-2">
                        <div className="column is-one-fifth-tablet is-one-third-mobile mt-2">
                            <div className="">
                                <div className="imageContainer">
                                {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-3 portfolioImg" alt="Profile picture" /> : <img src='/images/Profiles/user.png' className="profilePic p-3 portfolioImg" alt="Profile picture" />}
                                </div>

                                {/* <footer className="card-footer is-size-4">
                                    {/* {userProfile.isFavorite
                                        // add like function here
                                        ? <a href="#" className="card-footer-item"><i className="fas fa-heart has-text-danger"></i></a> :
                                        <a href="#" className="card-footer-item"><i className="far fa-heart has-text-danger"></i></a>} */}
                                    {/* <a href="#" className="card-footer-item"><i className="fas fa-heart has-text-danger"></i></a>
                                </footer> */}

                            </div>
                        </div>

                        <div className="column columns is-centered is-two-fifths-tablet is-two-thirds-mobile">
                            <div className="column columns is-full ">
                                <div className="column is-full  ml-1 mt-2 mr-2">
                                    <div className="aboutMeWrapper">
                                        <h2 className="is-size-3 is-size-5-mobile">{username}</h2>
                                        <span className="is-size-5 is-size-7-mobile long-word-break">{description? description : ""}</span>
                                        
                                    </div>
                                    <div className="manageBtnWrapper">
                                        {/* <button className="button has-text-light manageBtn"><AddImage/></button> */}
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="columns is-centered has-text-centered is-mobile mx-2">
                        <div className="column is-three-fifths-tablet is-full-mobile">
                            <div className="columns is-mobile customMargin">
                                <div className="column is-two-fourths-mobile p-0 mr-1">
                                    {/* follow & unfollow function */}
                                    {followUnfollow()}
                                </div>
                                <div className="column is-two-fourths-mobile p-0 ml-1">
                                    {/* <button className="button is-size-7-mobile is-primary modal-button is-hidden-tablet" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button> */}
                                    <a href={`mailto:${email}`}><button className="btnInProfile button is-size-7-mobile has-text-light">Email</button></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="columns is-centered">
                        <div className="column is-three-fifths pb-0 pt-0">
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
                        <div className="column columns is-three-fifths is-multiline is-mobile m-1 ">
                            {photoArray && photoArray.length > 0 ?
                                photoArray.map((p, idx) => (
                                    <div key={idx} className="column is-one-third-tablet is-one-third-mobile imageWrapper p-1">
                                     
                                        <div className="imageContainer">
                                            {/* <a>
                                            <img className="portfolioImg" src={`/photo/${p._id}`} alt="" />
                                            </a> */}
                                            <a href="javascript:void(0);">
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