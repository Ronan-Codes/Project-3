import React from "react";
import { Link } from "react-router-dom";

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
                                <a href="javascript:void(0);"> 
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
                                </a>   
                            </Link>
                        </div>
                        <div className="column is-three-quarters scrolling-wrapper is-vcentered">
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