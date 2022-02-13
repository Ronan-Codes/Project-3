import React, {useState} from "react";
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

    const userToken = AuthService.getProfile();

    const {loading: loadingFollowing, data: dataFollowing} = useQuery(USER_PHOTOS, {
        variables: {userId: userToken.data._id}
    })
    let userGenres
    let following
    let followingCount
    
    if(!loadingFollowing){
        following = dataFollowing.userPhotos.following
        followingCount = dataFollowing.userPhotos.followingCount
        userGenres = dataFollowing.userPhotos.genres
    }
    console.log(following)
    // Get following users functions end

    // Get Genres functions start
    const { loading: loadingGenres, data: genresData } = useQuery(QUERY_GENRES);
    let genres
    if(!loadingGenres){
        genres = genresData.genres
    }

    const {loading: loadingUsers, data: dataUsers} = useQuery(USERS);
    let photographers
    let photographersArray = []
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

            for (var x = 0; x < currentPhotographerGenresArr.length; x++) {
                var eachUserGenre = currentPhotographerGenresArr[x]._id
                if (eachUserGenre === genreId) {
                    photographersArray.push(photographerId)
                } 
            }
            
            setUsersArray(photographersArray)
        }
        
    }

    let followingArr = []
    // get following data based on following ID
    for (var i = 0; i < following.length; i++) {
        var result = (photographers.filter(e => e._id === following[i]._id))
        console.log(result)
        followingArr.push(result[0])
    }
    console.log(followingArr)

    return (
        <>  
            <div className="columns is-centered is-gapless mt-4 is-multiline mx-2">
            <div className="column is-four-fifths">
                    <div className="card mb-4">
                        <header className="card-header browseSortBg">
                            <p className="card-header-title is-centered has-text-light">
                            Browse
                            </p>

                        </header>
                        <div className="card-content">
                            <div className="content">
                         
                                <div className="control has-text-centered">
                                    <label className="radio">
                                        <input type="radio" value="all" name="photographersSort" checked={currentSort === 'all'} onClick={() => setSort('all')}/> All
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="following" name="photographersSort" checked={currentSort === 'following'} onClick={() => setSort('following')}/> Following
                                    </label>

                                    <label className="radio">
                                        <input type="radio" value="genre" name="photographersSort" checked={currentSort === 'genre'} onClick={() => setSort('genre')}/>&nbsp;

                                                <select className="dropdown-content" value={currentGenre} onChange={e => sortGenre(e.currentTarget.value)}>
                                                    <option href="#" className="" value="genre">
                                                        Genre
                                                    </option>
                                                    {genres && genres.length > 0 ?
                                                                genres.map((singleGenre, idx) => {
                                                                    return(
                                                                        <option href="#" className="" key={singleGenre.name} value={singleGenre._id}>
                                                                            {singleGenre.name}
                                                                        </option>
                                                                    )
                                                                }) : ""}
                                                </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {currentSort === "following" && 
                    followingArr.map((singleCollection, idx) => (
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
            </div>
        </>
    )
}

export default Dashboard