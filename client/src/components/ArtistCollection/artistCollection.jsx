import React from "react";

const ArtistCollection = (props) => {
    const genres = props && props.data && props.data.genres ? props.data.genres.join(' | ') : '';
    const name = props && props.data && props.data.name ? props.data.name : ''

    return (
        <>
            <section className="columns column is-four-fifths is-multiline mt-5">
                <div className="column dropShadow whiteBg">
                    <div className="columns">
                        <div className="column is-one-quarter searchedUserPicCont">
                            <div className="">
                                <figure className="image">
                                    <img src='/images/Profiles/LeesAdventures.jpg' className="profilePic p-2" alt="Profile picture" />
                                </figure>
                                <h2 className="has-text-centered is-size-4">{props.data.username}</h2>
                                <h3 className="has-text-centered has-text-grey searchedUserGenre">
                                    {genres}
                                </h3>
                            </div>
                        </div>
                        <div className="column is-three-quarters scrolling-wrapper">
                            {props.data.photos && props.data.photos.length > 0 ?
                                props.data.photos.map((singleImage, idx) => (
                                    <div key={idx} className="image mr-3">
                                        <img src={`/photo/${singleImage._id}`} />
                                    </div>
                                ))
                            : ''}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ArtistCollection;