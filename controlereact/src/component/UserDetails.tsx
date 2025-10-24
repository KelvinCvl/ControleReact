import '../Style/UserList.css';
import { fetchUserbyId } from '../Data/API';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { User } from '../Model/User';
import {Link} from 'react-router-dom';  
import '../Style/Details.css';

function UserList() {
  const {id} = useParams();
  const [users, setUsers] =useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (id){
        fetchUserbyId(parseInt(id))
        .then((data) => {
            setUsers(data);
            })
        .catch((err) => {
            setError("Impossible de charger les utilisateurs. Veuillez réessayer plus tard.");
        })
        .finally(() => {
            setLoading(false);
            console.log(users);
        });
    }  
  }, []);

  if (loading) {
    return <p className="loading">Chargement des utilisateurs…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (users === null) {
    return <p>Aucun utilisateur trouvé.</p>;
  }

  return (
    <>
        <div className="user-details">
            <h2>Utilisateur Détails:</h2>
            <h2>Nom: {users.firstName} {users.lastName}</h2>
            <h2>Email: {users.email}</h2>
            <h2>Age: {users.age}</h2>
            <h2>Ville: {users.address?.city || "Non renseigné"}</h2>
            <h2>Société: {users.company?.name || "Non renseigné"}</h2>
        </div>
        <Link to="/">Retour</Link>
    </>
  );
}

export default UserList;
