export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}


