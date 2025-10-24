export const fetchUsers = async () => {
  const response = await fetch('https://dummyjson.com/users');
  const data = await response.json();
    if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`); 
  }
  return data;
};

export const fetchUserbyId = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }
  return data;
};