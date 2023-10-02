import { useAuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Profile</h1>

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