import type { User } from '../Model/User';
import '../Style/UserCard.css';
import { Link } from "react-router-dom";
import React from "react";

type UserCardProps = {
  user: User; 
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

function UserCard({ user, isFavorite, onToggleFavorite }: UserCardProps) {

    console.log("Rendering UserCard for user:", user);

  return (
    <>
        <div className="user-card">
          <div className="image-container">
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="user-image" />
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(user.id)}
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              ★
            </button>
          </div>
          <div className="user-info">
            <h2 className="user-name">{user.firstName} {user.lastName}</h2>
            <h2 className="user-email">{user.email}</h2>
          </div>
          <Link to={`/details/${user.id}`} className="details-link">Voir les détails</Link>
        </div>
    </>
  )
}

export default React.memo(UserCard);