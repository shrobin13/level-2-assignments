import bcrypt from "bcryptjs";
import { pool } from "../../db/init";
import jwt, { type JwtPayload } from "jsonwebtoken";
import properties from "../../config/properties";
import type { loginPayload, registerPayload } from "./auth.interface";
import type { User } from "../user/user.interface";

const registerHandler = async (payload: registerPayload): Promise<User> => {
  const { name, email, password, role } = payload;
  const hashedPass = await bcrypt.hash(password, 11);
  const createdUser = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *`,
    [name, email, hashedPass, role],
  );

  if (createdUser.rows.length === 0) {
    throw new Error("Failed to create user!");
  }

  delete createdUser.rows[0].password;
  return createdUser.rows[0];
};

const loginHandler = async (payload: loginPayload) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users where email = $1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("User not found!");
  }

  const isVerified = await bcrypt.compare(password, userData.rows[0].password);

  if (!isVerified) {
    throw new Error("Invalid username or password!");
  }

  const user: User = userData.rows[0];

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, properties.accessSecret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    properties.refreshSecret as string,
    {
      expiresIn: "30d",
    },
  );

  return { user, accessToken, refreshToken };
};

const generateFreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized!");
  }

  const decoded = jwt.verify(
    token,
    properties.refreshSecret as string,
  ) as JwtPayload;

  const userData = await pool.query(`SELECT * FROM users where email = $1`, [
    decoded.email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("User not found!");
  }

  const user: User = userData.rows[0];

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, properties.accessSecret as string, {
    expiresIn: "30d",
  });

  return accessToken;
};

export const authService = {
  registerHandler,
  loginHandler,
};
