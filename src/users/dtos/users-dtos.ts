import { Request } from "express";

export class LoginDto {
    userEmail: string;
    password: string;
}

export class SignupDto {
    nickname: string;
    userName: string;
    userEmail: string;
    password: string;
}

export class Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface GoogleRequestDTO extends Request {
    user?: { email: string; fullName: string }; // Define the user property
  }
