import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/UsersService";
import { createReview, getReview, deleteReview } from "../../services/ReviewService";
import { useAuthContext } from "../../contexts/AuthContext";


const initialValues = {
  message: "",
  points: "1"
}

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [newReview, setNewReview] = useState(initialValues);
  const [reviewList, setReviewList] = useState([]);
  const { id } = useParams();
  const { user: currentUser } = useAuthContext();

  useEffect(() => {
    Promise.all([getUser(id), getReview(id)])
      .then(([user, reviews]) => {
        console.log(user)
        setUser(user);
        setReviewList(reviews)
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);



  const handleChange = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setNewReview(prevReview => ({
      ...prevReview,
      [key]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    createReview({
        ...newReview,
        owner: currentUser.id,
        user: user.id
    })
      .then(() => {
        console.log('review creado')
        setNewReview(initialValues)
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
        const filteredReviews = reviewsList.filter((review) => review.id !== reviewId);
        setReviewList(filteredReviews);
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
            <div className="mt-4 profile-info-container">
              <h1>{user.name}</h1>
              <p>{user.description}</p>
              <p>{user.city}</p>
            </div>
 
            <hr />
    
            <div className="review-form">
              <form onSubmit={handleSubmit}>
                <h4>Deja una reseña sobre {user.name}</h4>
                <div className="mb-3">
                  <label id="review-message" className="form-label">Comentario</label>
                  <input onChange={handleChange} id="review-message" type="text" name="message" className="form-control" value={newReview.message} placeholder="Comentario" />
                </div>
                <div className="mb-3">
                  <label id="review-score" className="form-label">Valoración</label>
                  <input onChange={handleChange} id="review-points" type="number" name="points" className="form-control" value={newReview.points} />
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