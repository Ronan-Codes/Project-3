import React, {useState, useEffect} from "react";
import AuthService from "../utils/auth"
import { useQuery } from "@apollo/client";
import { USERS, USER_PHOTOS, QUERY_GENRES } from "../utils/queries";
import ArtistCollection from "../components/ArtistCollection/artistCollection";

const Dashboard = (props) => {
    // state of Dropdown toggle
    const [dropDown, toggleDropdown] = useState(false);
    var genreDropDown = dropDown ? "is-active" : "";
    const activateDropdown = () => {
        toggleDropdown(!dropDown)
    }

    // state of Sort Checkbox
    const [currentSort, setSort] = useState("all");
    // state of Genre Dropdown
    const [currentGenre, setGenre] = useState("genre");
    const [usersArray, setUsersArray] = useState([]);

    // useEffect(() => { 
    //     if (sortGenre) {
    //     console.log(currentGenre)
    //     sortGenre(currentGenre)
    //     }
    // }, [currentGenre])

    // Get following users functions start
    const userToken = AuthService.getProfile();
    // console.log(userToken,userToken.data._id)

    const {loading: loadingFollowing, data: dataFollowing} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
    // console.log(dataFollowing)
    let userGenres
    let following
    let followingCount
    
    if(!loadingFollowing){
        following = dataFollowing.userPhotos.following
        followingCount = dataFollowing.userPhotos.followingCount
        userGenres = dataFollowing.userPhotos.genres
    }
    console.log(following)
    // console.log(following, followingCount, userGenres)
    // Get following users functions end

    // Get Genres functions start
    const { loading: loadingGenres, data: genresData } = useQuery(QUERY_GENRES);
    let genres
    if(!loadingGenres){
        genres = genresData.genres
    }
    // console.log(genres)

    // useEffect(() => {
    //     photographersArray = []
    //     // const filterGenre = () => {
    //         for (var i = 0; i < photographers.length; i++){
    //             // if (photographers[i]._id === currentGenre) {
    //             //     photographersArray.push(photographers[i].)
    //             // }
    //             console.log(photographers[i])
    //         }
    //     // }
    // }, [currentGenre]);

    const {loading: loadingUsers, data: dataUsers} = useQuery(USERS);
    let photographers
    let photographersArray = []
    // console.log(dataUsers)
    if(loadingUsers){
        return <p>Loading...</p>
    }
    else {
        photographers = dataUsers.users        
    }
    console.log(photographers)

    const sortGenre = (genreId) => {
        setGenre(genreId)
        
        photographersArray = []
        setUsersArray([])

        for (var i = 0; i < photographers.length; i++) {
            var photographerId = photographers[i]
            var currentPhotographerGenresArr = photographers[i].genres
            // console.log(currentPhotographerGenresArr[0])

            for (var x = 0; x < currentPhotographerGenresArr.length; x++) {
                // console.log(currentPhotographerGenresArr[x].name)
                var eachUserGenre = currentPhotographerGenresArr[x]._id
                if (eachUserGenre === genreId) {
                    photographersArray.push(photographerId)
                    // setUsersArray([...usersArray, photographers[i]])
                    // console.log(usersArray)
                } 
            }
            
            setUsersArray(photographersArray)
        }
        
    }

    // const filterGenre = () => {
    //     // return photographers.filter(photographer => photographer.users.genres === currentGenre)
    //     for (var i = 0; i < photographers.length; i++){
    //         if (photographers[i]._id === currentGenre) {

    //         }
    //     }
    //     // if photographer.user.genres include id:currentGenre, push that user's id into photographer's array. 
    //     // then map photographers array to render their data 
    // }

    
    // filterGenre()

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
                                <div className="control has-text-centered">
                                    <label className="radio">
                                        <input type="radio" value="all" name="photographersSort" checked={currentSort === 'all'} onClick={() => setSort('all')}/> All
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="following" name="photographersSort" checked={currentSort === 'following'} onClick={() => setSort('following')}/> Following
                                    </label>

                                    <label className="radio">
                                        <input type="radio" value="genre" name="photographersSort" checked={currentSort === 'genre'} onClick={() => setSort('genre')}/>&nbsp;
                                        {/* <div className="dropdown">
                                            <div className="dropdown-trigger">
                                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                                                <span>Click me</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                                </button>
                                            </div>
                                            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                                <div className="dropdown-content">
                                                <a href="#" className="dropdown-item">
                                                    Overview
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Modifiers
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Grid
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Form
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Elements
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Components
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Layout
                                                </a>
                                                <hr className="dropdown-divider"/>
                                                <a href="#" className="dropdown-item">
                                                    More
                                                </a>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <div className={`dropdown ${genreDropDown}`} onClick={activateDropdown}>
                                            <div className="dropdown-trigger">
                                                <a className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                    <span>Genre</span>
                                                    <span className="icon is-small">
                                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                    </span>
                                                </a>
                                            </div>
                                            <div className="" id="dropdown-menu" role="menu"> */}
                                                <select className="dropdown-content" value={currentGenre} onChange={e => sortGenre(e.currentTarget.value)}>
                                                    <option href="#" className="" value="genre">
                                                        Genre
                                                    </option>
                                                {/* <select className="" value={currentGenre} > */}
                                                    {genres && genres.length > 0 ?
                                                                genres.map((singleGenre, idx) => {
                                                                    return(
                                                                        <option href="#" className="" key={singleGenre.name} value={singleGenre._id}>
                                                                            {singleGenre.name}
                                                                        </option>
                                                                    )
                                                                }) : ""}
                                                </select>
                                            {/* </div>
                                        </div> */}
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
                
                {/* {currentSort === "following" ? 
                    following.map((singleCollection, idx) => (
                        <ArtistCollection key={singleCollection.name} data={singleCollection}/>
                    )) : 
                    dataUsers.users.map((singleCollection, idx) => (
                        <ArtistCollection key={singleCollection.name} data={singleCollection}/>
                    ))
                } */}
                
                {currentSort === "following" && 
                    following.map((singleCollection, idx) => (
                        <ArtistCollection key={singleCollection.name} data={singleCollection}/>
                    ))  
                }

                {currentSort === "all" && 
                    dataUsers.users.map((singleCollection, idx) => (
                        <ArtistCollection key={singleCollection.name} data={singleCollection}/>
                    ))  
                }

                {currentSort === "genre" && 
                    usersArray.map((singleCollection, idx) => (
                        <ArtistCollection key={singleCollection.name} data={singleCollection}/>
                    ))  
                }

                {/* .map photographers Array here */}
                {/* {currentSort === "genre" ? 
                    following.map((singleCollection, idx) => (
                        <ArtistCollection key={idx} data={singleCollection}/>
                    )) : 
                    dataUsers.users.map((singleCollection, idx) => (
                        <ArtistCollection key={idx} data={singleCollection}/>
                    ))
                    } */}
            
            </div>
        </>
    )
}

export default Dashboard