import React, { useState, useEffect} from "react";
import AuthService from '../utils/auth'
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER, ADD_GENRE, REMOVE_GENRE } from '../utils/mutations';
import {USER_PHOTOS, QUERY_GENRES} from '../utils/queries'
import AddImage from "../components/AddImage";
import AddProfile from "../components/AddProfile";

const Profile = (props) => {
    const userToken = AuthService.getProfile();

    const {loading, data, refetch: refetchUser} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
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
    let userGenres

    let genreArray = []
    let genreString = ""
    if(!loading){
        _id = data.userPhotos._id
        photoArray = data.userPhotos.photos
        email = data.userPhotos.email
        username = data.userPhotos.username
        profilePic = data.userPhotos.profilePhoto
        description = data.userPhotos.description
        following = data.userPhotos.following
        followers = data.userPhotos.followers
        followingCount = data.userPhotos.followingCount
        followersCount = data.userPhotos.followersCount
        userGenres = data.userPhotos.genres
        for (var i = 0; i < userGenres.length; i++) {
            genreArray.push(userGenres[i].name)
        }

        genreString = genreArray.join(" | ")
    }
    console.log(genreArray)

    const [currentTab, setCurrentTab] = useState('');
    const [currentCollection, setCurrentCollection] = useState([]);

    const [userProfile, setUserProfile] = useState({
        name: 'John Doe',
        profilePic: '/images/Profiles/LeesAdventures.jpg',
        email: '',
        isFavorite: false,
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
    const [updateUser, {error: errorUpdateUser}] = useMutation(UPDATE_USER,{
        onCompleted: refetchUser,
    });
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

    // ADD/REMOVE Genre functions
    const { loading: loadingGenres, data: genresData } = useQuery(QUERY_GENRES);
    let genres
    if(!loadingGenres){
        genres = genresData.genres
    }

    // { data, loading, error, reset } can utilize these
    const [addGenre, {error: addGenreError, reset}] = useMutation(ADD_GENRE,{
        onCompleted: refetchUser,
    });
    const [removeGenre,{error: removeGenreError}] = useMutation(REMOVE_GENRE,{
        onCompleted: refetchUser,
    });

    const handleAddGenre = async (genreId) => {
        const mutationResponse = await addGenre({
            variables: {
                genreId: genreId
            }
        })
        console.log(mutationResponse)
        // refetch()
    }

    const handleRemoveGenre = async (genreId) => {
        const mutationResponse = await removeGenre({
            variables: {
                genreId: genreId
            }
        })
        console.log(mutationResponse)
    }

    return (
        <>
            {loading ? <div>Some Loading Icon etc</div> :
                <>
                    <header className="columns is-centered is-gapless is-mobile pl-2">
                        <div className="column is-one-fifth-tablet is-one-third-mobile mt-2">
                            <div className="">

                                <div className="imageContainer">
                                    {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-3 portfolioImg" alt="Profile picture" /> : <img src='/images/Profiles/user.png' className="profilePic p-3 portfolioImg" alt="Profile picture" />}
                                    <button className="addProfile is-size-2-widescreen is-size-3-desktop is-size-5-tablet is-size-7-mobile"><AddProfile reloadFunc={refetchUser}><i className="fas fa-plus"></i></AddProfile></button>
                                </div>

                                <div className="has-text-centered is-centered">
                                
                                    <div className={`modal ${modalStatus}`}>
                                        <div className="modal-background" onClick={toggleEditModal}></div>
                                        <div className="modal-card editModalMobile">
                                            <header className="modal-card-head p-2">
                                                <p className="modal-card-title is-size-5 has-text-weight-semibold">Edit Profile</p>
                                            </header>

                                            <section className="modal-card-body p-0">
                                                <h2 className="pt-2 pb-1 has-text-weight-semibold">Add Specialty</h2>
                                                <form className="">
                                                        {genres && genres.length > 0 ?
                                                            genres.map((singleGenre, idx) => 
                                                                {
                                                                    if(genreArray.includes(singleGenre.name)) {
                                                                        return (
                                                                            <div className="is-inline-block" key={idx}>
                                                                                <label className="checkbox mr-3">
                                                                                    <input defaultChecked={true} type="checkbox" id="" name={singleGenre.name} value={singleGenre.name} onClick={() => handleRemoveGenre(`${singleGenre._id}`)}/> {singleGenre.name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <div className="is-inline-block" key={idx}>
                                                                                <label className="checkbox mr-3">
                                                                                    <input type="checkbox" id="" name={singleGenre.name} value={singleGenre.name} onClick={() => handleAddGenre(`${singleGenre._id}`)}/> {singleGenre.name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            ): ""
                                                        }
                                                </form>
                                            </section>

                                            <section className="modal-card-body px-4 pt-0 pb-4">
                                                <hr className="p-0 mt-2 mb-2"/>
                                                <h2 className="has-text-weight-semibold">About Me</h2>
                                                <textarea className="textarea" maxLength="150" placeholder={description} onChange={handleChange}></textarea>
                                            </section>
                                            
                                            <footer className="modal-card-foot p-2">
                                                <div className="m-auto">
                                                <button className="button is-small is-success" onClick={handleFormSubmit}>Save</button>
                                                <button className="button is-small is-success" onClick={toggleEditModal}>Exit</button>
                                                </div>
                                            </footer>
                                        </div>
                                    </div>
                                </div>

                                <footer className="card-footer is-size-4 is-size-6-mobile">
                                </footer>

                            </div>
                        </div>

                        <div className="column columns is-centered is-two-fifths-tablet is-two-thirds-mobile">
                            <div className="column columns is-full ">
                                <div className="column is-full  ml-1 mt-2 mr-2">
                                    <div className="aboutMeWrapper  ">
                                        <h2 className="is-size-3 is-size-5-mobile">{username}</h2>
                                        <p className="is-size-5 is-size-7-mobile"><i class="fas fa-camera-retro has-text-black"></i> {genreString}</p>
                                        <p className="is-size-5 is-size-7-mobile"><a href={`mailto:${email}`}><i className="fas fa-envelope has-text-black"></i> {email}</a></p>
                                        <span className="is-size-5 is-size-7-mobile long-word-break">{description? description : "Tell us about yourself!"}</span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </header>

                    <div className="columns is-centered has-text-centered is-mobile mx-2">
                        <div className="column is-three-fifths-tablet is-full-mobile">
                            <div className="columns is-mobile customMargin">
                                <div className="column is-two-fourths-mobile p-0 mr-1">
                                    <button className="btnInProfile button is-size-7-mobile is-primary modal-button" data-target="modal" aria-haspopup="true" onClick={toggleEditModal}>Edit Profile</button>
                                </div>
                                <div className="column is-two-fourths-mobile p-0 ml-1">
                                    <button className="btnInProfile button is-size-7-mobile has-text-light"><AddImage reloadFunc={refetchUser}/></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="columns is-centered">
                        <div className="column is-three-fifths pb-0 pt-0">
                            <div className="tabs is-centered mt-5">
                                <ul>
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

export default Profile;