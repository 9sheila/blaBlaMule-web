import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelper';
import './TravelCard.css'

const TravelCard = (travel) => {
    const parsedDate = formatDate(new Date(travel.date))
    return (

        <div className="Card-body card m-3 d-flex text-align-center justify-content-center" style={{ width: '80%' }}>
            <h3 className="card-title">{travel.startingPoint}-{travel.destination}</h3>
            <p className="card-text">{parsedDate}</p>
            <p className="card-text">{travel.user.name} </p>
            <Link to={`/travels/details/${travel.id}`}><button className="btn btn-primary">Ver más</button></Link>
        </div>



    )
}

export default TravelCard;