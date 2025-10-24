import type { User } from "../Model/User"
    
export function Tri(users: User[], sortBy: 'name' | 'age'): User[] {
  const sorted = [...users]; 

    sorted.sort((a, b) => {
      if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
      if (sortBy === 'age') return a.age - b.age;
      return 0;
    });
return sorted
}