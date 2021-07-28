import React, {useState, useEffect} from "react";
import axios from "axios";
import ArtistCollection from "../components/ArtistCollection/artistCollection";

const Dashboard = (props) => {

    const [userId, setUserId] = useState('');
    const [collection, setCollection] = useState([
        {
            profile: '/images/Profiles/LeesAdventures.jpg',
            name: 'John Doe',
            genres: ['Street','Portrait','Travel'],
            images: [
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg"
            ]
        },
        {
            profile: '/images/Profiles/LeesAdventures.jpg',
            name: 'John Doe',
            genres: ['Street','Portrait','Travel'],
            images: [
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg"
            ]
        },
        {
            profile: '/images/Profiles/LeesAdventures.jpg',
            name: 'John Doe',
            genres: ['Street','Portrait','Travel'],
            images: [
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg",
                "/images/portrait/pexels-ali-pazani-3196587.jpg"
            ]
        }
    ]);
    //you need to get the current userId? localstorage? redux? api call?    

    //use the userid to make a call to the api
    const getData = () => {
        //make the call fetch/axios?
        fetch('some url')
            .then(response => response.json)
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })

        axios.get('some url')
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getData();
    }, [])

    //when displaying the collection do a check to make sure it's valid
    //like {collection && collection.profile ? collection.map}

    return (
        <>  
            <div className="columns is-centered is-gapless mt-5 is-multiline">
                {collection && collection.length > 0 ? collection.map((singleCollection, idx) => (
                    <ArtistCollection key={idx} data={singleCollection}/>
                )) : ''}
            </div>
        </>
    )
}

export default Dashboard