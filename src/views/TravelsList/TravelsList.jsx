import { useState, useEffect } from "react";
import TravelCard from "../../components/TravelsCard/TravelsCard";
import { getTravels } from "../../services/TravelsService";
import { useAuthContext } from "../../contexts/AuthContext";



const TravelsList = () => {
    const [travels, setTravels] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        getTravels()
            .then(travelArr => {
                const filteredArr = travelArr.filter((travelElem) => travelElem.user.id !== user.id)
                setTravels(filteredArr)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])


    return (
        <div className="TravelsList container">
            <h1>Viajes</h1>
            {travels.map((travel) => (
                <TravelCard key={travel.id} {...travel}/>
            ))}
        </div>
    )
}

export default TravelsList;

