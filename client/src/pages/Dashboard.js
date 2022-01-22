import React from "react";
import { useQuery } from "@apollo/client";
import {USERS} from '../utils/queries';
import ArtistCollection from "../components/ArtistCollection/artistCollection";

const Dashboard = (props) => {
    const {loading, data} = useQuery(USERS);
    if(loading){
        return <p>Loading...</p>
    }
    else {
        console.log(data)
    }

    return (
        <>  
            <div className="columns is-centered is-gapless mt-4 is-multiline mx-2">
                { data.users.map((singleCollection, idx) => (
                    <ArtistCollection key={idx} data={singleCollection}/>
                ))
                }
            </div>
        </>
    )
}

export default Dashboard