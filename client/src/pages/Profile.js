import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = (props) => {
    const [userId, setUserId] = useState('');
    const [currentTab, setCurrentTab] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentCollection, setCurrentCollection] = useState([]);

    //you can create a default object or model and set it here so you don't run into empty error
    //make a class called UserProfile with everything set to blank and set it to the default state

    /*
        class UserProfile {
            constructor(){
                this.name = '';
                this.profilePic = '';
                this.email = '';
                this.isFavorite = '';
                this.description = '';
                etc etc
            }
        }

    */


    //const [userProfile, setUserProfile] = useState({new UserProfile()});

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

    const getData = () => {
        //make the call fetch/axios?
        fetch('some url') //This is use the promise arch you can use async await
            .then(response => response.json)
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })

        axios.get('some url') //This is use the promise arch you can use async await
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })

        //set the first tab
        const firstTab = userProfile.genres[0];
        switchTab(firstTab);

        setLoading(false);
    }

    const switchTab = (tabName) => {
        setCurrentTab(tabName);
        const currentColl = userProfile.collection.find(x => x.type === tabName);
        setCurrentCollection(currentColl.images);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {loading ? <div>Some Loading Icon etc</div> :
                <>
                    <header class="columns is-centered is-gapless">
                        <div class="column is-one-fifth ml-5">
                            <div class="card">
                                <div class="">
                                    <figure class="image">
                                        {userProfile.profilePic ? <img src={userProfile.profilePic} class="profilePic p-5" alt="Profile picture" /> : ''}
                                    </figure>
                                </div>
                                <footer class="card-footer is-size-4">
                                    <a href={`mailto:${userProfile.email}`} class="card-footer-item"><i class="fas fa-envelope has-text-black"></i></a>
                                    {userProfile.isFavorite
                                        ? <a href="#" class="card-footer-item"><i class="fas fa-heart has-text-danger"></i></a> :
                                        <a href="#" class="card-footer-item"><i class="far fa-heart has-text-danger"></i></a>}
                                    <a href="#" class="card-footer-item"><i class="fas fa-share-square has-text-black"></i></a>
                                </footer>

                            </div>
                        </div>

                        <div class="column columns is-centered is-three-fifths">
                            <div class="column columns is-four-fifths">
                                <div class="column is-full is-size-4 has-text-centered mt-5">
                                    <div class="aboutMeWrapper">
                                        <h2 id="nameContainer" class="is-size-3">{userProfile.name}</h2>
                                        <span id="aboutMeContainer">{userProfile.description}</span>
                                    </div>
                                    <div class="manageBtnWrapper">
                                        <button class="button has-text-light manageBtn">Manage Portfolio</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </header>
                    <section class="columns is-centered">
                        <div class="column is-four-fifths">
                            <div class="tabs is-centered mt-5">
                                <ul>
                                    {userProfile.genres.map((singleGenre, idx) => (
                                        <li key={idx} className={`is-pointer ${currentTab === singleGenre ? 'active' : ''}`} onClick={() => switchTab(singleGenre)}>{singleGenre}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                    <main class="columns is-centered">
                        <div class="column columns is-four-fifths is-multiline">
                            {currentCollection && currentCollection.length > 0 ?
                                currentCollection.map((singleImage, idx) => (
                                    <div key={idx} class="column is-one-third-desktop is-half-tablet">
                                        <div class="card">
                                            <div class="card-image">
                                                <figure class="image">
                                                    <img src={singleImage} alt="" />
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : ''}
                        </div>
                    </main>
                </>
            }
        </>
    )
}

export default Profile;