import React, { useState} from "react";
import AuthService from '../utils/auth'
import { useQuery } from "@apollo/client";
import {USER_PHOTOS} from '../utils/queries'
import AddImage from "../components/AddImage";
import AddProfile from "../components/AddProfile";

// // import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination } from "swiper/core";
// // import 'swiper/components/navigation/navigation.min.css'
// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'
// import 'swiper/components/pagination/pagination.min.css'
// SwiperCore.use([Pagination]);

const Profile = (props) => {
    const userToken = AuthService.getProfile();
    console.log(userToken.data._id)
    const {loading, data} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
    let photoArray
    let email
    let username
    let profilePic
    if(!loading){
        console.log(data.userPhotos.photos)
        photoArray = data.userPhotos.photos
        email = data.userPhotos.email
        username = data.userPhotos.username
        profilePic = data.userPhotos.profilePhoto
    }

    const [currentTab, setCurrentTab] = useState('');
    const [currentCollection, setCurrentCollection] = useState([]);

    const [userProfile, setUserProfile] = useState({
        name: 'John Doe',
        profilePic: '/images/Profiles/LeesAdventures.jpg',
        email: '',
        isFavorite: false,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ullam, in maxime voluptatum iste nemo laboriosam facere voluptas modi id velnulla mollitia libero, amet numquam, tempore architecto nostrum et.',
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

    

    return (
        <>
            {loading ? <div>Some Loading Icon etc</div> :
                <>
                    <header className="columns is-centered is-gapless ">
                        <div className="column is-one-fifth ml-5">
                            <div className="card">
                                {/* <div className="">
                                    <figure className="image">
                                        {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-5" alt="Profile picture" /> : <img src='/images/Profiles/LeesAdventures.jpg' className="profilePic p-2" alt="Profile picture" />}
                                    </figure>
                                </div> */}

                                <div class="imageContainer">
                                    {/* <img className="portfolioImg" src={`/photo/${p._id}`} alt="" /> */}
                                    {profilePic ? <img src={`/photo/${profilePic._id}`} className="profilePic p-3 portfolioImg" alt="Profile picture" /> : <img src='/images/Profiles/user.png' className="profilePic p-3 portfolioImg" alt="Profile picture" />}
                                </div>
                                

                                <footer className="card-footer is-size-4">
                                    <a href={`mailto:${email}`} className="card-footer-item"><i className="fas fa-envelope has-text-black"></i></a>
                                    {userProfile.isFavorite
                                        ? <a href="#" className="card-footer-item"><i className="fas fa-heart has-text-danger"></i></a> :
                                        <a href="#" className="card-footer-item"><i className="far fa-heart has-text-danger"></i></a>}
                                    <a href="#" className="card-footer-item"><AddProfile><i className="fas fa-share-square has-text-black"></i></AddProfile></a>
                                </footer>

                            </div>
                        </div>

                        <div className="column columns is-centered is-three-fifths">
                            <div className="column columns is-four-fifths">
                                <div className="column is-full is-size-4 has-text-centered mt-5">
                                    <div className="aboutMeWrapper">
                                        <h2 id="nameContainer" className="is-size-3">{username}</h2>
                                        <span id="aboutMeContainer">{userProfile.description}</span>
                                    </div>
                                    <div className="manageBtnWrapper">
                                        <button className="button has-text-light manageBtn"><AddImage/></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </header>
                    <section className="columns is-centered">
                        <div className="column is-four-fifths">
                            <div className="tabs is-centered mt-5">
                                <ul>
                                    {userProfile.genres.map((singleGenre, idx) => (
                                        <li key={idx} className={`is-pointer ${currentTab === singleGenre ? 'active' : ''}`} onClick={() => switchTab(singleGenre)}>{singleGenre}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* <div className="columns is-centered">
                        <Swiper
                            // className="tall"
                            // navigation
                            
                            pagination={{
                                clickable: true
                            }}
                            spaceBetween={50}
                            slidesPerView={3}
                            // centeredSlides
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {photoArray && photoArray.length > 0 ?
                                photoArray.map((p, idx) => (
                            <SwiperSlide><img src={`/photo/${p._id}`} alt="Profile picture"/></SwiperSlide>
                            ))
                                : ''}
                            //<div className="swiper-pagination swiper-pagination-timeline-page" />//
                        </Swiper>
                    </div> */}

                    <main className="columns is-centered">
                        <div className="column columns is-four-fifths is-multiline">
                            {photoArray && photoArray.length > 0 ?
                                photoArray.map((p, idx) => (
                                    <div key={idx} className="column is-one-third-desktop is-half-tablet imageWrapper">
                                        {/* <div className="card">
                                            <div className="card-image">
                                                <figure className="image">
                                                    <img src={`/photo/${p._id}`} alt="" />
                                                </figure>
                                            </div>
                                        </div> */}
                                        <div class="imageContainer">
                                            <img className="portfolioImg" src={`/photo/${p._id}`} alt="" />
                                        </div>
                                    </div>
                                ))
                                : ''}
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