import '../Style/UserList.css';
import { fetchUserbyId } from '../Data/API';
import { useState, useEffect, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import type { User } from '../Model/User';
import '../Style/Details.css';

function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const [notFound, setNotFound] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserbyId(parseInt(id));
      if (!data) {
        setNotFound(true); 
      } else {
        setUser(data);
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de charger l'utilisateur. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) return <div className="spinner" aria-label="Chargement…"></div>;

  if (notFound) return <Navigate to="/404" />;

  if (error) return (
    <div className="error-container">
      <p className="error-message">{error}</p>
      <button className="retry-button" onClick={fetchUser}>
        Réessayer
      </button>
    </div>
  );

  if (!user) return null; 

  return (
    <>
      <div className="user-details">
        <h2>Détails de l'utilisateur :</h2>
        <h3>Nom: {user.firstName} {user.lastName}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Age: {user.age}</h3>
        <h3>Ville: {user.address?.city || "Non renseigné"}</h3>
        <h3>Société: {user.company?.name || "Non renseigné"}</h3>
      </div>
      <Link to="/">Retour</Link>
    </>
  );
}

export default UserDetails;
