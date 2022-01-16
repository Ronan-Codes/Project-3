import React from "react";
import { Link } from "react-router-dom";

// import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
// import 'swiper/components/navigation/navigation.min.css'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
SwiperCore.use([Pagination]);

const ArtistCollection = (props) => {
    const genres = props && props.data && props.data.genres ? props.data.genres.join(' | ') : '';
    const name = props && props.data && props.data.name ? props.data.name : ''

    // const viewPhotographer = (event) => {
    //     window.location.assign('/profile');
    // }

    return (
        <> 
            <section className="columns column is-four-fifths is-multiline mt-5">
                <div className="column dropShadow whiteBg">
                    <div className="columns">
                        <div className="column is-one-quarter searchedUserPicCont">
                            <Link to={`/photographer/${props.data._id}`}>    
                                <div className="">
                                    {/* <figure className="image">
                                        {props.data.profilePhoto? 
                                        (<img src={`/photo/${props.data.profilePhoto._id}`} className="profilePic p-3" alt="Profile picture" />
                                        ):
                                        (<img src='/images/Profiles/user.png' className="profilePic p-3" alt="Profile picture" />)}
                                    </figure> */}

                                    {/* <div className=""> */}
                                        <div className="imageContainer">
                                            {props.data.profilePhoto? 
                                            (<img src={`/photo/${props.data.profilePhoto._id}`} className="profilePic p-3 portfolioImg" alt="Profile picture" />
                                            ):
                                            (<img src='/images/Profiles/user.png' className="profilePic p-3 portfolioImg" alt="Profile picture" />)}
                                        </div>
                                    {/* </div> */}
                                    
                                    <h2 className="has-text-centered is-size-4">{props.data.username}</h2>
                                    <h3 className="has-text-centered has-text-grey searchedUserGenre">
                                        {genres}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                        <div className="column is-three-quarters scrolling-wrapper is-vcentered">
                            {/* <Swiper
                                // className="tall"
                                // className="width"
                                className=""
                                // navigation
                                // setWrapperSize={true}
                                
                                pagination={{
                                    clickable: true
                                }}
                                spaceBetween={0}
                                slidesPerView={3}
                                // centeredSlides
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {props.data.photos && props.data.photos.length > 0 ?
                                props.data.photos.map((singleImage, idx) => (
                                <SwiperSlide><img src={`/photo/${singleImage._id}`} /></SwiperSlide>
                                ))
                                    : ''}
                            </Swiper> */}

                            {/* can remove this div */}
                            <div className="columns is-full is-vcentered">
                                {props.data.photos && props.data.photos.length > 0 ?
                                    props.data.photos.map((singleImage, idx) => (

                                        // <div key={idx} className="image mr-3" style={{ 
                                        //     backgroundImage: `url("/photo/${singleImage._id}")` 
                                        //   }}>

                                        <div key={idx} className="is-one-third column mr-3 image">
                                            <img src={`/photo/${singleImage._id}`} />
                                        </div>
                                    ))
                                : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ArtistCollection;