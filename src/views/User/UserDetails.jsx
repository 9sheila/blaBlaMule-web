import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/UsersService";
import { createReview, getReview, deleteReview } from "../../services/ReviewService";
import { useAuthContext } from "../../contexts/AuthContext";
import { sendRequest, getPendingRequests, cancelRequest, getAcceptedRequest } from "../../services/RequestService";
import { NavLink } from "react-router-dom";
import './UserDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);








const reviewsInitialValues = {
  message: "",
  points: "1"
}


const UserDetails = () => {
  const [user, setUser] = useState(null);
  // const [newReview, setNewReview] = useState(reviewsInitialValues);
  const [reviewList, setReviewList] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [madeRequest, setMadeRequest] = useState(false);
  const [haveRequest, setHaveRequest] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState(null);
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState({ message: "", points: 1 });
  const { id } = useParams();
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    Promise.all([getUser(id), getReview(id)])
      .then(([user, reviews, connected]) => {
        console.log(user)
        setUser(user);
        setReviewList(reviews);
        setIsConnected(connected.some(c => c.id === user.id));

        // const receivedRequest = pendingRequests.find(request => request.userSend === user.id);
        // const sentRequest = pendingRequests.find(request => request.userReceive === user.id);

        // if (sentRequest) {
        //   setMadeRequest(true);
        // } else if (receivedRequest) {
        //   setHaveRequest(true);
        // }
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  //    reviews  

  const handleChangeReview = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setNewReview(prevReview => ({
      ...prevReview,
      [key]: value
    }))
  }
  const handleSubmitReview = (event) => {
    event.preventDefault();

    createReview({
      ...newReview,
      owner: currentUser.id,
      user: user.id,
    })
      .then(() => {
        console.log('Reseña creada con puntuación:', newReview.points); // Debería mostrar la puntuación correcta
        setNewReview(reviewsInitialValues);
        getReview(id)
          .then((reviews) => {
            setReviewList(reviews);
          });
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId)
      .then(() => {
        console.log('review borrado')
        const filteredReviews = reviewList.filter((review) => review.id !== reviewId);
        setReviewList(filteredReviews);
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleStarClick = (event) => {
    const selectedRating = parseInt(event.currentTarget.getAttribute('data-rating'));
  // Resto del código
    setNewReview((prevReview) => ({
      ...prevReview,
      points: selectedRating, // Actualiza la puntuación en newReview
    }));
    console.log(selectedRating);
  };

  //   requests




  const handleSubmitRequest = (event) => {
    event.preventDefault()
    sendRequest(id, request)
      .then(() => {
        console.log('request enviado')
        setRequestSent(true)
        setMadeRequest(true)
      })
      .catch(err => console.error(err))
  }

  const handleCancelRequest = (requestId) => {
    cancelRequest(requestId)
      .then(() => {
        console.log('request cancelada')
        setIsConnected(false);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleConnect = () => {
    sendRequest(id, { message: "Hola! Me gustaría conectar contigo." })
      .then(() => {
        console.log('Solicitud de conexión enviada');
        setRequestSent(true);
        setMadeRequest(true);
      })
      .catch((err) => console.error(err));
  };


  return (
    <div className="UserDetail">
      {!user ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="UserDetail detail-container container">
            <div className="row">
              <div className="col">
                <img className="d-block " src={user.profilePicture} alt="" width="200" />
              </div>
              <div className="col">
                <h1>{user.name}</h1>
                <p>{user.city}</p>
              </div>
            </div>


            {isConnected ? (
              <>
                <button className="btn btn-secondary mt-4">Enviar solicitud a {user.name}</button>
                <button className="btn btn-danger mt-4 ms-3" onClick={() => handleCancelRequest(acceptedRequest.id)}>Dejar de conectar con {user.name}</button>
              </>
            ) : (
              <>
                <div className="mt-4">
                  {madeRequest ? (
                    <p>Has enviado una solicitud a {user.name}.</p>
                  ) : haveRequest ? (
                    <>
                      <p>Tienes una solicitud pendiente de {user.name}.</p>
                      <NavLink to="/user/request-list"><button className="btn btn-primary">Ver solicitudes</button></NavLink>
                    </>
                  ) : (
                    !madeRequest && (
                      <button className="btn btn-info" onSubmit={handleSubmitRequest} onClick={handleConnect}>Conectar con {user.name}</button>
                    )
                  )}
                </div>
              </>
            )}


            <hr />

            <div className="review-form">
              <form onSubmit={handleSubmitReview}>
                <h4>Deja una reseña sobre {user.name}</h4>
               
                <div className="star-rating">
  <FontAwesomeIcon
    icon={rating >= 1 ? ["fas", "star"]  :  ["far", "star"]}
    alt= "star1"
    data-rating="1"
    onClick={handleStarClick}
    className={`star ${rating >= 1 ? 'selected' : ''}`}
    value={rating === 1 ? "1" : ""}
    
  />
  <FontAwesomeIcon
    icon={rating >= 2 ? ["fas", "star"]  :  ["far", "star"]}
    alt= "star2"
    data-rating="2"
    onClick={handleStarClick}
    className={`star ${rating >= 2 ? 'selected' : ''}`}
    value={rating === 2 ? "2" : ""}
  
  />
  <FontAwesomeIcon
    icon={rating >= 3 ? ["fas", "star"]  :  ["far", "star"]}
    alt= "star3"
    data-rating="3"
    onClick={handleStarClick}
    className={`star ${rating >= 3 ? 'selected' : ''}`}
    value={rating === 3 ? "3" : ""}
 
  />
  <FontAwesomeIcon
    icon={rating >= 4 ? ["fas", "star"]  :  ["far", "star"]}
    alt= "star4"
    data-rating="4"
    onClick={handleStarClick}
    className={`star ${rating >= 4 ? 'selected' : ''}`}
    value={rating === 4 ? "4" : ""}
    
  />
  <FontAwesomeIcon
    icon={rating >= 5 ? ["fas", "star"]  :  ["far", "star"]}
    alt= "star5"
    data-rating="5"
    onClick={handleStarClick}
    className={`star ${rating >= 5 ? 'selected' : ''}`}
    value={rating === 5 ? "5" : ""}
    
  />
</div>

                <div className="mb-3">
                  <label id="review-message" className="form-label">Comentario</label>
                  <textarea onChange={handleChangeReview} id="review-message" type="text" name="message" className="form-control" value={newReview.message} placeholder="Comentario" />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>

          {/* LISTA DE RESEÑAS */}
          <div className="review-list container mt-4">
            {reviewList.length > 0 ? (
              <>
                <h4>Reseñas acerca de {user.name}</h4>
                {reviewList.map((review) => (
                  <div key={review.id} className="review-container mt-4">
                    <img src={review.owner.profilePicture} alt="" width="100" />
                    <p>{review.owner.name}</p>
                    <p>{review.message}</p>
                    <p>{review.points}</p>
                    <p>{review.date}</p>
                    {review.owner.id === currentUser.id ? (
                      <button className="btn btn-danger" onClick={() => handleDeleteReview(review.id)}>Borrar</button>
                    ) : (
                      null
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>{user.name} todavía no tiene reseñas.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UserDetails;