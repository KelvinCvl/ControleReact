import { useState, useEffect, useMemo } from "react";
import { fetchUsers } from "../Data/API";
import { searchUsers } from "../component/Search";
import { Tri } from "../component/Tri";
import { toggleFavorite, loadFavorites } from "./Favorites";
import useLocalStorage from "../hooks/localstorage";
import type { User } from "../Model/User";

export function useUsers() {
  const [users, setUsers] = useLocalStorage<User[]>("users", []); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "age">("name");
  const [favorites, setFavorites] = useState<number[]>(() => loadFavorites());

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => toggleFavorite(id, prev));
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      const usersArray = Array.isArray(data) ? data : data.users;
      setUsers(usersArray || []); 
    } catch (err) {
      console.error("Erreur API, affichage des favoris uniquement", err);
      setError("API inaccessible, affichage des favoris uniquement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let temp = searchUsers(users, search);
    temp = Tri(temp, sortBy);
    return temp;
  }, [users, search, sortBy]);

  return {
    users: filteredUsers,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    favorites,
    handleToggleFavorite,
    reload: fetchAllUsers,
  };
}
