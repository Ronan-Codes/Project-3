import React from 'react';

function User() {
    return (
        <section class="columns column is-four-fifths is-multiline mt-5">
                <div class="column dropShadow whiteBg">
                    <div class="columns">
                        <div class="column is-one-quarter searchedUserPicCont">
                            <div class="">
                                <figure class="image">
                                    <img src="../../server/assets/seedimages/Profiles/LeesAdventures.jpg"
                                        class="profilePic p-2" alt="Profile picture" />
                                </figure>
                                <h2 class="has-text-centered is-size-4">John Doe</h2>
                                    <h3 class="has-text-centered has-text-grey searchedUserGenre">Street | Portrait |
                                        Travel</h3>
                            </div>
                        </div>

                        <div class="column is-three-quarters scrolling-wrapper">
                            <div class="image mr-3">
                                <img src="../../server/assets/seedimages/portrait/pexels-ali-pazani-3196587.jpg" />
                            </div>
                            <div class="image mr-3">
                                <img src="../../server/assets/seedimages/portrait/pexels-ali-pazani-3196587.jpg" />
                            </div>
                            <div class="image mr-3">
                                <img src="../../server/assets/seedimages/portrait/pexels-ali-pazani-3196587.jpg" />
                            </div>
                            <div class="image mr-3">
                                <img src="../../server/assets/seedimages/portrait/pexels-ali-pazani-3196587.jpg" />
                            </div>
                            <div class="image mr-3">
                                <img src="../../server/assets/seedimages/portrait/pexels-ali-pazani-3196587.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default User;