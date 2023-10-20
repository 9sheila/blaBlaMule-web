import { useState, useEffect } from "react";
import TravelCard from "../../components/TravelsCard/TravelsCard";
import { getTravels } from "../../services/TravelsService";
import SearchBar from "../SearchBar/SearchBar";
import { formatDate } from "../../utils/dateHelper";
import './TravelsList.css'

const TravelsList = () => {
    const [travels, setTravels] = useState([])

    useEffect(() => {
        getTravels()
            .then(travelsRes => setTravels(travelsRes))
            .catch((err) =>  console.log(err));
    }, [])

    const onSearch = ({ startingPoint, destination, date }) => {
         getTravels()
            .then(travelsRes => {
                const filteredTravels = travelsRes.filter(travel => {
                    console.log(formatDate(new Date(date)), formatDate(new Date(travel.date)))
                    return (startingPoint ? travel.startingPoint.toLowerCase().includes(startingPoint.toLowerCase()) : true) &&
                    (destination ? travel.destination.toLowerCase().includes(destination.toLowerCase()) : true) &&
                    (date ? formatDate(new Date(date)) === formatDate(new Date(travel.date)) : true)
                })
                setTravels(filteredTravels)
            })
            .catch((err) => console.log(err));
    }


    return (
    
               <div className="TravelsList-container">
            <h1>Viajes</h1>
            <SearchBar onSearch={onSearch}/>
            {travels.map((travel) => (
                <TravelCard key={travel.id} {...travel} />
                
            ))}
             </div>
    
    )
}

export default TravelsList;

