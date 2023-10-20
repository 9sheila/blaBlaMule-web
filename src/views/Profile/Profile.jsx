import { useAuthContext } from "../../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { getRequests } from "../../services/RequestService";
import { getAcceptedRequest } from "../../services/RequestService";
import { onDismissedReq } from "../../services/RequestService";
import { Link, useParams } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
  const { user } = useAuthContext();
  const [connections, setConnections] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState(null);


 

  useEffect(() => {
    Promise.all([getRequests(), getAcceptedRequest()])
      .then(([connections, acceptedReq]) => {
        setConnections(connections);
        setAcceptedRequest(acceptedReq);

      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  const handleDismissedReq = (id) => () => {
    onDismissedReq(id) 
      .then(response => {
        console.log('Solicitud marcada como dismissed:', response);
       
      })
      .catch(error => {
        console.error('Error al marcar solicitud como dismissed:', error);
      
      });
  };

  return (
    <div>
      <div>
        {connections.length > 0 && (
          <div className="alert alert-primary" role="alert">
            You have  <Link to={'/requestsList'} className="alert-link">requests</Link>. Give it a click too see them.
          </div>
        )}
      </div>
      {
        acceptedRequest?.length > 0 &&
          acceptedRequest.map(req => {
            return <div key={req.id} className="alert alert-primary alert-dismissible fade show" role="alert">
            Your request has been accepted by {req.userReceiving?.name}. Here is the phone number to get in touch {req.userReceiving?.phoneNumber}
            <button type="button" onClick={handleDismissedReq(req.id)} className="btn-close" data-bs-dismiss="alert"/>
          </div>})
       }

        <div className="profile-container" >

          <img className="profile-picture"
            src={user.profilePicture}
            alt={user.name}
            width="150"
          />
        
          
         <p className="profile-name"> {user.name}</p>
          <p className="profile-email"> {user.email}</p>
          <Link to= {`/user/travels/${user.id}`}><button className="profile-button">my trips</button></Link>
         </div>
        
         
        </div>
  
  );
}

export default Profile;