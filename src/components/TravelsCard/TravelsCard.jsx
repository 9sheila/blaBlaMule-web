import { Link } from 'react-router-dom';

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear();
  
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
};

const TravelCard = (travel) => {
    const parsedDate = formatDate(new Date(travel.date) )
    return (
        <div className="card mt-4" style={{ width: '100%' }}>
            <div className="row no-gutters">
                <div className="col-md-4 d-flex align-items-center">
                    <div className="ms-3">
                        <h3 className="card-title">{travel.startingPoint}-{travel.destination}</h3>
                        <p className="card-text">{parsedDate}</p>
                        <p className= "card-text">{travel.user.name} </p>
                        <Link to={`/travels/details/${travel.id}`}><button className="btn btn-primary">Ver más</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelCard;