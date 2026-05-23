import { issueService } from "./../modules/issues/issues.service";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import properties from "../config/properties";
import sendResponse from "../utility/sendResponse";
import { UserRole } from "../enums-types/enums";
import { pool } from "../db/init";

const updatePermission = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const decoded = jwt.verify(
        req.headers.authorization as string,
        properties.accessSecret as string,
      ) as JwtPayload;

      const userResult = await pool.query(
        `SELECT role FROM users WHERE id = $1`,
        [decoded.id],
      );
      const userRole = userResult.rows[0]?.role;

      if (userRole === UserRole.maintainer) {
        return next();
      }

      if (userRole === UserRole.contributor) {
        const issue = await issueService.getIssueByIdHandler({ id });

        if (issue.reporter.id !== decoded.id) {
          return sendResponse(res, {
            statusCode: 403,
            success: false,
            message: "Forbidden",
          });
        }

        if (issue.status !== "open") {
          return sendResponse(res, {
            statusCode: 409,
            success: false,
            message: "Cannot update issue with non-open status",
          });
        }

        return next();
      }

      return sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden",
      });
    } catch (err: any) {
      next(err);
    }
  };
};

export default updatePermission;
