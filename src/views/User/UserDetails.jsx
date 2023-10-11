import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/UsersService";
import { createReview, getReview, deleteReview } from "../../services/ReviewService";
import { useAuthContext } from "../../contexts/AuthContext";
import InputGroup from "../../components/InputGroup/InputGroup";
import { sendRequest, getPendingRequests, cancelRequest, getAcceptedRequest } from "../../services/RequestService";
import { NavLink } from "react-router-dom";



const reviewsInitialValues = {
  message: "",
  points: "1"
}
const requestIntialValues = {
    message: ""
  } 

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [newReview, setNewReview] = useState(reviewsInitialValues);
  const [request, setRequest] = useState(requestIntialValues);
  const [reviewList, setReviewList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [madeRequest, setMadeRequest] = useState(false);
  const [haveRequest, setHaveRequest] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState(null);
  const { id } = useParams();
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    Promise.all([getUser(id), getReview(id), getPendingRequests()])
      .then(([user, reviews, connected, pendingRequests ]) => {
        console.log(user)
        setUser(user);
        setReviewList(reviews);
        setIsConnected(connected.some(c => c.id === user.id));

        const receivedRequest = pendingRequests.find(request => request.userSend === user.id);
        const sentRequest = pendingRequests.find(request => request.userReceive === user.id);

        if (sentRequest) {
          setMadeRequest(true);
        } else if (receivedRequest) {
          setHaveRequest(true);
        }
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
    event.preventDefault()

    createReview({
        ...newReview,
        owner: currentUser.id,
        user: user.id
    })
      .then(() => {
        console.log('review creado')
        setNewReview(reviewsInitialValues)
        getReview(id)
          .then(reviews => {
            setReviewList(reviews)
          })
      })
      .catch(err => console.error(err))
  }

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

//   requests

const handleShowInput = () => {
    setShowInput(true)
  }

  const handleChangeRequest = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setRequest(prevRequest => ({
      ...prevRequest,
      [key]: value
    }))
  }

  const handleSubmitRequest = (event) => {
    event.preventDefault()
    sendRequest(id, request)
      .then(() => {
        console.log('request enviado')
        setRequest(requestIntialValues)
        setShowInput(false)
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


  return (
    <div className="UserDetail">
      {!user ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="UserDetail detail-container container">
            <div className="mt-5">
              <img src={user.profilePicture} alt="" width="300" />
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
                      <button className="btn btn-success" onClick={handleShowInput}>Conectar con {user.name}</button>
                    )
                  )}
                </div>
                {showInput &&
                  <div>
                    <form onSubmit={handleSubmitRequest}>
                      <InputGroup
                        label={`Envía un mensaje a ${user.name}`}
                        type="text"
                        id="message"
                        name="message"
                        placeholder="!Hola! Me gustaría conectar contigo."
                        value={request.message}
                        onChange={handleChangeRequest} />
                      <button type="submit" className="btn btn-primary">Enviar petición</button>
                    </form>
                  </div>}
              </>
            )}
            <div className="mt-4 profile-info-container">
              <h1>{user.name}</h1>
              <p>{user.description}</p>
              <p>{user.city}</p>
            </div>
 
            <hr />
    
            <div className="review-form">
              <form onSubmit={handleSubmitReview}>
                <h4>Deja una reseña sobre {user.name}</h4>
                <div className="mb-3">
                  <label id="review-message" className="form-label">Comentario</label>
                  <input onChange={handleChangeReview} id="review-message" type="text" name="message" className="form-control" value={newReview.message} placeholder="Comentario" />
                </div>
                <div className="mb-3">
                  <label id="review-score" className="form-label">Valoración</label>
                  <input onChange={handleChangeReview} id="review-points" type="number" name="points" className="form-control" value={newReview.points} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
          <hr   />
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