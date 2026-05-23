import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../enums-types/enums";
import sendResponse from "../utility/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import properties from "../config/properties";
import { pool } from "../db/init";
import type { User } from "../modules/user/user.interface";

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(
        token,
        properties.accessSecret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `SELECT * FROM users where email = $1`,
        [decoded.email],
      );

      if (userData.rows.length === 0) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "User not found!",
        });
      }

      const user: User = userData.rows[0];

      if (roles.length > 0 && (!user.role || !roles.includes(user.role))) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden",
        });
      }

      req.user = decoded;
      next();
    } catch (err: any) {
      next(err);
    }
  };
};

export default auth;
