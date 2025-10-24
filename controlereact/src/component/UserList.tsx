import '../Style/UserList.css';
import { fetchUsers } from '../Data/API';
import { useState, useEffect } from 'react';
import type { User } from '../Model/User';
import UserCard from './UserCard';
import { searchUsers } from '../component/Search';
import { Tri } from '../component/Tri';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUsers()
      .then((data) => {
        const usersArray = Array.isArray(data) ? data : data.users;
        setUsers(usersArray || []);
        setFilteredUsers(usersArray || []);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
        setError("Impossible de charger les utilisateurs. Veuillez réessayer plus tard.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = searchUsers(users, search);
    temp = Tri(temp, sortBy);
    setFilteredUsers(temp);
    setCurrentPage(1); 
  }, [search, sortBy, users]);

  if (loading) return <p className="loading">Chargement des utilisateurs…</p>;
  if (error) return <p className="error">{error}</p>;
  if (users.length === 0) return <p>Aucun utilisateur trouvé.</p>;

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="user-list-container">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'age')}
          className="sort-select"
        >
          <option value="name">Trier par nom</option>
          <option value="age">Trier par âge</option>
        </select>
      </div>

      <div className="user-list">
        {currentUsers.map((user) => (
          <div key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Précédent
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant ▶
        </button>
      </div>
    </>
  );
}

export default UserList;
