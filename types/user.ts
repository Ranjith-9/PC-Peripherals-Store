export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Session {
  user: GoogleUser;
}

export interface GoogleUser {
  name: string;
  email: string;
  image: string;
}
