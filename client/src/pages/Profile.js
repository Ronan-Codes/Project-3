import React, { useState, useEffect} from "react";
import AuthService from '../utils/auth'
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER } from '../utils/mutations';
import {USER_PHOTOS} from '../utils/queries'
import AddImage from "../components/AddImage";
import AddProfile from "../components/AddProfile";

const Profile = (props) => {
    const userToken = AuthService.getProfile();
    // console.log(userToken.data._id)
    const {loading, data} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
    // console.log(data)
    let _id
    let photoArray
    let email
    let username
    let profilePic
    let description
    let following
    let followers
    let followingCount
    let followersCount
    if(!loading){
        _id = data.userPhotos._id
        // console.log(data.userPhotos.photos)
        photoArray = data.userPhotos.photos
        email = data.userPhotos.email
        username = data.userPhotos.username
        profilePic = data.userPhotos.profilePhoto
        description = data.userPhotos.description
        following = data.userPhotos.following
        followers = data.userPhotos.followers
        followingCount = data.userPhotos.followingCount
        followersCount = data.userPhotos.followersCount
    }
    console.log(following, followingCount)

    const [currentTab, setCurrentTab] = useState('');
    const [currentCollection, setCurrentCollection] = useState([]);

    const [userProfile, setUserProfile] = useState({
        name: 'John Doe',
        profilePic: '/images/Profiles/LeesAdventures.jpg',
        email: '',
        isFavorite: false,
        // description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ullam, in maxime voluptatum iste nemo laboriosam facere voluptas modi id velnulla mollitia libero, amet numquam, tempore architecto nostrum et.',
        genres: ['Portrait', 'Weddings', 'Street', 'Travel'],
        collection: [
            { type: 'Portrait', images: ['/images/portrait/pexels-ali-pazani-3196587.jpg', '/images/portrait/pexels-ali-pazani-3196587.jpg', '/images/portrait/pexels-ali-pazani-3196587.jpg', '/images/portrait/pexels-ali-pazani-3196587.jpg', '/images/portrait/pexels-ali-pazani-3196587.jpg', '/images/portrait/pexels-ali-pazani-3196587.jpg'] },
            { type: 'Weddings', images: ['/images/portrait/pexels-bruno-salvadori-2269872.jpg', '/images/portrait/pexels-bruno-salvadori-2269872.jpg', '/images/portrait/pexels-bruno-salvadori-2269872.jpg', '/images/portrait/pexels-bruno-salvadori-2269872.jpg', '/images/portrait/pexels-bruno-salvadori-2269872.jpg', '/images/portrait/pexels-bruno-salvadori-2269872.jpg'] },
            { type: 'Street', images: ['/images/portrait/pexels-cheda-stankovic-3395708.jpg', '/images/portrait/pexels-cheda-stankovic-3395708.jpg', '/images/portrait/pexels-cheda-stankovic-3395708.jpg', '/images/portrait/pexels-cheda-stankovic-3395708.jpg', '/images/portrait/pexels-cheda-stankovic-3395708.jpg', '/images/portrait/pexels-cheda-stankovic-3395708.jpg'] },
            { type: 'Travel', images: ['/images/portrait/GinaPix.jpg', '/images/portrait/GinaPix.jpg', '/images/portrait/GinaPix.jpg', '/images/portrait/GinaPix.jpg', '/images/portrait/GinaPix.jpg', '/images/portrait/GinaPix.jpg'] }
        ]
    });

    const switchTab = (tabName) => {
        setCurrentTab(tabName);
        const currentColl = userProfile.collection.find(x => x.type === tabName);
        setCurrentCollection(currentColl.images);
    }

    // editModal Functions
    const [updateUser] = useMutation(UPDATE_USER);
    const [editModalStatus, setEditModal] = useState(false);
    var modalStatus = editModalStatus ? "is-active" : "";
    var toggleEditModal = () => {
        setEditModal(!editModalStatus)
    }

    const [formState, setFormState] = useState({ description: description});
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await updateUser({
          variables: {
            description: formState.description,
          },
        });
       
        toggleEditModal();

        console.log(mutationResponse)
    };

    const handleChange = (event) => {
        const { description, value } = event.target;
        setFormState({
        description: value
        });
    };
    // editModal Function End
    
    useEffect(()=> {
        // fetchData();
    }, [data]);

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
                    <header className="columns is-centered is-gapless is-mobile pl-2">
                        {/* card option below */}
                        <div className="column is-one-fifth-tablet is-one-third-mobile mt-2">
                            <div className="">
                                {/* <div className="mt-2"> */}
                                    {/* <div className="">
                                        <figure className="image">
                                            {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-5" alt="Profile picture" /> : <img src='/images/Profiles/LeesAdventures.jpg' className="profilePic p-2" alt="Profile picture" />}
                                        </figure>
                                    </div> */}

                                <div className="imageContainer">
                                    {/* <img className="portfolioImg" src={`/photo/${p._id}`} alt="" /> */}
                                    {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-3 portfolioImg" alt="Profile picture" /> : <img src='/images/Profiles/user.png' className="profilePic p-3 portfolioImg" alt="Profile picture" />}
                                    <button className="addProfile is-size-2-widescreen is-size-3-desktop is-size-5-tablet is-size-7-mobile"><AddProfile><i className="fas fa-plus"></i></AddProfile></button>
                                    {/* <a href="#" className="card-footer-item pt-0 pb-1"><AddProfile><i className="fas fa-share-square has-text-black"></i></AddProfile></a> */}
                                </div>

                                <div className="has-text-centered">
                                {/* <h2 className="is-size-5 is-hidden-tablet">{username}</h2> */}
                                {/* <span className="is-size-7 is-hidden-tablet">{description? description : "Tell us about yourself!"}</span> */}

                                {/* <button className="button is-small is-primary modal-button is-hidden-mobile" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button> */}
                                {/* <button className="button is-small has-text-light is-hidden-tablet is-size-7-mobile"><AddImage/></button> */}

                                    <div className={`modal ${modalStatus}`}>
                                        <div className="modal-background" onClick={toggleEditModal}></div>
                                        <div className="modal-card">
                                            <header className="modal-card-head">
                                            <p className="modal-card-title">Edit Profile</p>
                                            <button className="delete" aria-label="close" onClick={toggleEditModal}></button>
                                            </header>
                                            {/* <section className="modal-card-body p-0">
                                                <h2>Edit Profile Picture </h2>
                                                <a href="#" className="card-footer-item pt-0 pb-1"><AddProfile><i className="fas fa-share-square has-text-black"></i></AddProfile></a>

                                            </section> */}
                                            <section className="modal-card-body">
                                                {/* <h2>Edit Profile Picture </h2>
                                                <button className="button is-small has-text-light is-size-7-mobile"><AddImage/></button> */}

                                                <h2>About Me</h2>
                                                {/* <form onSubmit={handleFormSubmit}> */}
                                                    <textarea className="textarea" maxLength="150" placeholder="e.g. Hello world" onChange={handleChange}></textarea>
                                                {/* </form> */}
                                                
                                            </section>
                                            <footer className="modal-card-foot">
                                                {/* add mutation to save Changes and toggle editmodal */}
                                            <button className="button is-success" onClick={handleFormSubmit}>Save changes</button>
                                            <button className="button is-success" onClick={toggleEditModal}>Cancel</button>
                                            </footer>
                                        </div>
                                    </div>
                                </div>

                                <footer className="card-footer is-size-4 is-size-6-mobile">

                                        {/* Not needed for own profile? */}
                                        {/* {userProfile.isFavorite
                                            ? <a href="#" className="card-footer-item"><i className="fas fa-heart has-text-danger"></i></a> :
                                            <a href="#" className="card-footer-item"><i className="far fa-heart has-text-danger"></i></a>} */}

                                            {/* Edit profile pic button, make more obvious for user */}

                                    {/* <a href={`mailto:${email}`} className="card-footer-item pt-0 pb-1"><i className="fas fa-envelope has-text-black"></i></a> */}
                                    {/* <a href="#" className="card-footer-item pt-0 pb-1"><AddProfile><i className="fas fa-share-square has-text-black"></i></AddProfile></a> */}
                                </footer>

                            </div>
                        </div>

                        <div className="column columns is-centered is-two-fifths-tablet is-two-thirds-mobile">
                            <div className="column columns is-full ">
                                {/* card option below */}
                                <div className="column is-full  ml-1 mt-2 mr-2">
                                    <div className="aboutMeWrapper  ">
                                        <h2 className="is-size-3 is-size-5-mobile">{username}</h2>
                                        <p className="is-size-5 is-size-7-mobile"><a href={`mailto:${email}`}><i className="fas fa-envelope has-text-black"></i>: {`${email}`}</a></p>
                                        <span className="is-size-5 is-size-7-mobile long-word-break">{description? description : "Tell us about yourself!"}</span>
                                        
                                    </div>
                                    {/* <div className="manageBtnWrapper">
                                        <button className="button is-size-7-mobile has-text-light is-hidden-mobile"><AddImage/></button>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                    </header>

                    {/* <div className="columns is-centered has-text-centered is-mobile is-hidden-tablet mx-2">
                        <div className="column is-two-fourths-mobile p-0 mr-1">
                            <button className="btnInProfile button is-size-7-mobile is-primary modal-button" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button>
                        </div>
                        <div className="column is-two-fourths-mobile p-0 ml-1">
                            <button className="btnInProfile button is-size-7-mobile has-text-light"><AddImage/></button>
                        </div>
                    </div> */}

                    <div className="columns is-centered has-text-centered is-mobile mx-2">
                        <div className="column is-three-fifths-tablet is-full-mobile">
                            <div className="columns is-mobile customMargin">
                                <div className="column is-two-fourths-mobile p-0 mr-1">
                                    <button className="btnInProfile button is-size-7-mobile is-primary modal-button" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button>
                                    {/* <button className="button is-size-7-mobile has-text-light"><AddImage/></button> */}
                                </div>
                                <div className="column is-two-fourths-mobile p-0 ml-1">
                                    {/* <button className="button is-size-7-mobile is-primary modal-button is-hidden-tablet" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button> */}
                                    <button className="btnInProfile button is-size-7-mobile has-text-light"><AddImage/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* removed is-hidden-tablet version */}
                    {/* <div className="columns is-centered has-text-centered is-mobile  mx-2">
                        <div className="column is-one-fifth is-two-fourths-mobile p-0 mr-1">
                            <button className="btnInProfile button is-size-7-mobile is-primary modal-button" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button>
                        </div>
                        <div className="column is-one-fifth is-two-fourths-mobile p-0 ml-1">
                            <button className="btnInProfile button is-size-7-mobile has-text-light"><AddImage/></button>
                        </div>
                    </div> */}

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
                                        {/* <div className="card">
                                            <div className="card-image">
                                                <figure className="image">
                                                    <img src={`/photo/${p._id}`} alt="" />
                                                </figure>
                                            </div>
                                        </div> */}
                                        <div className="imageContainer">
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

                    {/* <main class="columns is-centered">
                        <div class="column columns is-four-fifths is-multiline"> */}


                </>
            }
        </>
    )
}

export default Profile;