import React from "react";
import { Link } from "react-router-dom";

const ArtistCollection = (props) => {
    let genreArr = []
    let genreNameObj = props.data.genres ? props.data.genres : '';
    const name = props.data.name ? props.data.name : ''

    genreNameObj.map((genre, idx) => {
        genreArr.push(genre.name)
    })

    let genreNames = genreArr.join(" | ")

    return (
        <> 
            <section className="columns column is-four-fifths is-multiline mb-4">
                <div className="column dropShadow whiteBg">
                    <div className="columns is-mobile">
                        <div className="column is-one-quarter searchedUserPicCont">
                            <Link to={`/photographer/${props.data._id}`}>
                                <a href="javascript:void(0);"> 
                                    <div className="">
                                            <div className="imageContainer">
                                                {props.data.profilePhoto? 
                                                (<img src={`/photo/${props.data.profilePhoto._id}`} className="profilePic profilePicCustomPadding portfolioImg" alt="Profile picture" />
                                                ):
                                                (<img src='/images/Profiles/user.png' className="profilePic profilePicCustomPadding portfolioImg" alt="Profile picture" />)}
                                            </div>
                                        
                                        <h2 className="has-text-centered is-size-4-tablet is-size-7-mobile">{props.data.username}</h2>
                                        <h3 className="has-text-centered has-text-grey searchedUserGenre">
                                            {genreNames}
                                        </h3>
                                    </div>
                                </a>   
                            </Link>
                        </div>
                        <div className="column is-three-quarters scrolling-wrapper is-vcentered">
                            <div className="columns is-full is-vcentered is-mobile">
                                {props.data.photos && props.data.photos.length > 0 ?
                                    props.data.photos.map((singleImage, idx) => (

                                        <div key={idx} className="is-one-third column mr-3 image p-0">
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