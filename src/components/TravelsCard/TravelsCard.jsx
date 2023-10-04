import { Link } from 'react-router-dom';

const TravelCard = (travel) => {
    return (
        <div className="card mt-4" style={{ width: '100%' }}>
            <div className="row no-gutters">
                <div className="col-md-4 d-flex align-items-center">
                    <div className="ms-3">
                        <h3 className="card-title">{travel.startingPoint}-{travel.destination}</h3>
                        <p className="card-text">{travel.date}</p>
                        <p className= "card-text">{travel.user.id} </p>
                        <Link to={`/travels/detail/${travel.user.id}`}><button className="btn btn-primary">Ver más</button></Link>
                    </div>
                </div>
                {/* <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-text">{user.name} puede enseñar:</h5>
                        {user.teachSkills.map((skill) => (
                            <p key={skill.id}>{skill.name}</p>
                        ))}
                        <h5 className="card-text">{user.name} quiere aprender:</h5>
                        {user.learnSkills.map((skill) => (
                            <p key={skill.id}>{skill.name}</p>
                        ))}
                        <Link to={`/user/users/detail/${user.id}`}><button className="btn btn-primary">Ver más</button></Link>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default TravelCard;