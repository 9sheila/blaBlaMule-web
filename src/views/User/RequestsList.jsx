import { useState, useEffect } from "react";
import { getRequests, respondToRequest } from "../../services/RequestService";
import { NavLink } from "react-router-dom";

const RequestList = () => {
    const [ requestList, setRequestList ] = useState([])

    useEffect(() => {
        getRequests()
        .then((requests) => {
            setRequestList(requests)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleRespondToRequest = (id, action) => {
        respondToRequest(id, action)
        .then((updatedRequest) => {
            console.log('Solicitud editada')
            const updatedRequests = requestList.filter(request => request.id !== updatedRequest.id);
                setRequestList(updatedRequests);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className="RequestList">
            <div className="request-container">
                <h3>Solicitudes</h3>

                {requestList.length <= 0 ? 
                (<p>No tienes ninguna solicitud</p>) 
                : 
                (requestList.map((request) => (
                    <div className="mt-3" key={request.id}>
                    <div>
                    <NavLink to={`/user/detail/${request.userSending.id}`}><img className="mb-3" src={request.userSending.profilePicture} alt="" width={100}/></NavLink>
                    <NavLink style={{ textDecoration: 'none', color: 'black'}} to={`/user/detail/${request.userSending.id}`}><h5>{request.userSending.name}</h5></NavLink>
                    <p>{request.message}</p>
                    </div>
                    <div className="request-buttons d-flex">
                        <button className="btn btn-success me-3" onClick={() => handleRespondToRequest(request.id, 'accepted')}>Aceptar</button>
                        <button className="btn btn-danger" onClick={() => handleRespondToRequest(request.id, 'rejected')}>Rechazar</button>
                    </div>
                    <hr />
                    </div>
                )))}
            </div>
        </div>
    )
}

export default RequestList;