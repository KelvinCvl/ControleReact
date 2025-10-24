export function loadFavorites(): number[] {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(id: number, currentFavorites: number[]): number[] {
  let updated: number[];

  if (currentFavorites.includes(id)) {
    updated = currentFavorites.filter(favId => favId !== id); 
  } else {
    updated = [...currentFavorites, id];
  }

  localStorage.setItem('favorites', JSON.stringify(updated)); 
  return updated;
}
