import { useState, useEffect } from "react";
import TravelsCard from "../../../components/TravelsCard/TravelsCard";
import { getTravels } from "../../../services/TravelService";


const TravelsList = () => {

    const [travels, setTravels] = useState([])

    useEffect(() => {
        getTravels()
            .then(travelElem => {
                setTravels(travelElem)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    console.log(travels)

    return (
        <div className="TravelsList container">
            <h1>Encuentra usuarios según tus intereses</h1>
            {filteredUsers.map((travel) => (
                <TravelsCard key={travel.id} {...travel}/>
            ))}
        </div>
    )
}

export default TravelsList;

