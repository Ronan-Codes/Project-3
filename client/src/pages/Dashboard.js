import React, {useState, useEffect} from "react";
import AuthService from "../utils/auth"
import { useQuery } from "@apollo/client";
import {USERS} from '../utils/queries';
import { USER_PHOTOS } from "../utils/queries";
import ArtistCollection from "../components/ArtistCollection/artistCollection";

const Dashboard = (props) => {
    const [currentSort, setSort] = useState("all");

    // Get following users functions start
    const userToken = AuthService.getProfile();
    console.log(userToken,userToken.data._id)

    const {loading: loadingFollowing, data: dataFollowing} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
    console.log(dataFollowing)

    let following
    let followingCount
    
    if(!loadingFollowing){
        following = dataFollowing.userPhotos.following
        followingCount = dataFollowing.userPhotos.followingCount
    }
    console.log(following, followingCount)
    // Get following users functions end

    const {loading: loadingUsers, data: dataUsers} = useQuery(USERS);
    console.log(dataUsers)
    if(loadingUsers){
        return <p>Loading...</p>
    }
    else {
        console.log(dataUsers)
    }

    // var handleChange = e => {
    //     const { name, value } = e.target;
    
    //     this.setState({
    //       [name]: value
    //     });
    //   };

    return (
        <>  
            {/* <div className="columns is-multiline mb-4 is-centered">
                <div className="column is-four-fifths">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">
                            Component
                            </p>
                            <button className="card-header-icon" aria-label="more options">
                            <span className="icon">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </header>
                        <div className="card-content">
                            <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" className="card-footer-item">Save</a>
                            <a href="#" className="card-footer-item">Edit</a>
                            <a href="#" className="card-footer-item">Delete</a>
                        </footer>
                    </div>
                </div>
            </div> */}


            <div className="columns is-centered is-gapless mt-4 is-multiline mx-2">
            <div className="column is-four-fifths">
                    <div className="card mb-4">
                        <header className="card-header browseSortBg">
                            <p className="card-header-title is-centered has-text-light">
                            Browse
                            </p>
                            {/* <button className="card-header-icon" aria-label="more options">
                            <span className="icon">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button> */}
                        </header>
                        <div className="card-content">
                            <div className="content">
                                {/* <div className="control">
                                    <div className="select">
                                        <select>
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div class="control has-text-centered">
                                    <label className="radio">
                                        <input type="radio" value="all" name="photographersSort" checked={currentSort === 'all'} onClick={() => setSort('all')}/> All
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="following" name="photographersSort" checked={currentSort === 'following'} onClick={() => setSort('following')}/> Following
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* <footer class="card-footer">
                            <a href="#" className="card-footer-item">Save</a>
                            <a href="#" className="card-footer-item">Edit</a>
                            <a href="#" className="card-footer-item">Delete</a>
                        </footer> */}
                    </div>
                </div>
                
                {currentSort === "following" ? 
                    following.map((singleCollection, idx) => (
                        <ArtistCollection key={idx} data={singleCollection}/>
                    )) : 
                    dataUsers.users.map((singleCollection, idx) => (
                        <ArtistCollection key={idx} data={singleCollection}/>
                    ))}
                {/* { dataUsers.users.map((singleCollection, idx) => (
                    <ArtistCollection key={idx} data={singleCollection}/>
                ))
                } */}
            
            </div>
        </>
    )
}

export default Dashboard