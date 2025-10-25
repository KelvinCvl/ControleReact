import "../Style/UserList.css";
import UserCard from "./UserCard";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useCallback } from "react";
import { useUsers } from "./useUsers";

function UserList() {
  const {
    users,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    favorites,
    handleToggleFavorite,
    reload,
  } = useUsers();

  const { theme, toggleTheme } = useTheme();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy]);

  const handlePageChange = useCallback(
    (page: number) => setCurrentPage(page),
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch]
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSortBy(e.target.value as "name" | "age"),
    [setSortBy]
  );

  if (loading) return <div className="spinner" aria-label="Chargement…"></div>;

  if (error)
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={reload}>
          Réessayer
        </button>
      </div>
    );

  if (users.length === 0) return <p>Aucun utilisateur trouvé.</p>;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  return (
    <>
      <div className="user-list-container">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="name">Trier par nom</option>
          <option value="age">Trier par âge</option>
        </select>
      </div>

      <div className="user-list">
        {currentUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.includes(user.id)}
          />
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
        <button onClick={toggleTheme}>
          Thème: {theme === "light" ? "☀️ Clair" : "🌙 Sombre"}
        </button>
      </div>
    </>
  );
}

export default UserList;
