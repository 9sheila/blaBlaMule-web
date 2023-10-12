import { useAuthContext } from "../../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { getRequests } from "../../services/RequestService";
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuthContext();
  const [connections, setConnections] = useState([])

  const handleShowRequests = () => {
    alert("Haz clic en Aceptar para ir a la lista de solicitudes.");
     
  };

  useEffect(() => {
      getRequests()
      .then(connections => 
        setConnections(connections))
        .catch(err => 
          console.log(err))

  }, [getRequests])

  return (
    <div>
      <h1>Profile</h1>
      <div>
      {connections.length > 0 && (
        <div className="alert alert-primary" role="alert">
         You have  <Link to={`/requests/${user.id}`} className="alert-link">requests</Link>. Give it a click too see them.
        </div>
      )}
    </div>

      <div className="p-3 mt-3 mx-auto" style={{width: '18rem', display: 'grid'}}>
        <img
          className="round mx-auto mb-3"
          src={user.profilePicture}
          alt={user.name}
          width="150"
        />
        <p className="fw-lighter"><span className="fw-bold">Name:</span> {user.name}</p>
        <p className="fw-lighter"><span className="fw-bold">Email:</span> {user.email}</p>
      </div>
    </div>
    
  );
}

export default Profile;