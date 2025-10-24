import type { User } from '../Model/User';
import '../Style/UserCard.css';
import { Link } from "react-router-dom";

type UserCardProps = {
  user: User; 
};

function UserCard({ user }: UserCardProps) {

    console.log("Rendering UserCard for user:", user);

  return (
    <>
        <div className="user-card">
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="user-image" />
            <div className="user-info">
                <h2 className="user-name">{user.firstName} {user.lastName}</h2>
                <h2 className="user-email">{user.email}</h2>
            </div>
            <Link to={`/details/${user.id}`} className="details-link">Voir les détails</Link>
        </div>
    </>
  )
}

export default UserCard