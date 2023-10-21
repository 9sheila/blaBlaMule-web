import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelper';

const UserTravelCard = (travel) => {
    const parsedDate = formatDate(new Date(travel.date))
    return (

        <div className="Card-body card m-3 d-flex text-align-center justify-content-center" style={{ width: '80%' }}>
            <h3 className="card-title">{travel.startingPoint}-{travel.destination}</h3>
            <p className="card-text">{parsedDate}</p>
            <p className="card-text">{travel.user.name} </p>
            <p className="card-text">{travel.weight}kg</p>
            <p className="card-text">1kg/{travel.price}€</p>
            <Link to={`/travel/edit`}><button className="btn btn-primary">Editar</button></Link>
        </div>



    )
}

export default UserTravelCard;