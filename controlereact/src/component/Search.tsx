import type { User } from '../Model/User';

export function searchUsers(users: User[], query: string): User[] {
  const search = query.toLowerCase();
  return users.filter(user =>
    user.firstName.toLowerCase().includes(search) ||
    user.lastName.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search)
  );
}
