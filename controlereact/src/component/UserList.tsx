import '../Style/UserList.css';
import { fetchUsers } from '../Data/API';
import { useState, useEffect } from 'react';
import type { User } from '../Model/User';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUsers()
      .then((data) => {
        const usersArray = Array.isArray(data) ? data : data.users;
        setUsers(usersArray || []);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des utilisateurs :", err);
        setError("Impossible de charger les utilisateurs. Veuillez réessayer plus tard.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Chargement des utilisateurs…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (users.length === 0) {
    return <p>Aucun utilisateur trouvé.</p>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
