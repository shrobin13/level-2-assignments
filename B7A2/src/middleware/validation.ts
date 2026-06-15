import type { Request, Response, NextFunction } from "express";
import sendResponse from "../utility/sendResponse";
import { IssueType, StatusType, UserRole } from "../enums-types/enums";

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isValidPassword = (password: string): boolean => {
  return password && password.length >= 6;
};

export const validateUserRegistration = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Name is required and must be a non-empty string",
      });
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Valid email is required",
      });
    }

    // Validate password
    if (!password || !isValidPassword(password)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Validate role (optional, defaults to contributor)
    if (role && ![UserRole.contributor, UserRole.maintainer].includes(role)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Role must be either 'contributor' or 'maintainer'",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateIssueCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, type } = req.body;

    // Validate title
    if (!title || typeof title !== "string") {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Title is required and must be a string",
      });
    }

    if (title.length > 150) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Title must not exceed 150 characters",
      });
    }

    if (title.trim().length === 0) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Title cannot be empty",
      });
    }

    // Validate description
    if (!description || typeof description !== "string") {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Description is required and must be a string",
      });
    }

    if (description.length < 20) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Description must be at least 20 characters long",
      });
    }

    // Validate type
    if (!type || ![IssueType.bug, IssueType.feature_request].includes(type)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Type must be either 'bug' or 'feature_request'",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateIssueUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, type, status } = req.body;

    // At least one field must be provided
    if (!title && !description && !type && !status) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message:
          "At least one field (title, description, type, or status) must be provided",
      });
    }

    // Validate title if provided
    if (title !== undefined) {
      if (typeof title !== "string") {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "Title must be a string",
        });
      }

      if (title.length > 150) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "Title must not exceed 150 characters",
        });
      }

      if (title.trim().length === 0) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "Title cannot be empty",
        });
      }
    }

    // Validate description if provided
    if (description !== undefined) {
      if (typeof description !== "string") {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "Description must be a string",
        });
      }

      if (description.length < 20) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "Description must be at least 20 characters long",
        });
      }
    }

    // Validate type if provided
    if (type && ![IssueType.bug, IssueType.feature_request].includes(type)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Type must be either 'bug' or 'feature_request'",
      });
    }

    // Validate status if provided
    if (
      status &&
      ![StatusType.open, StatusType.in_progress, StatusType.resolved].includes(
        status,
      )
    ) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Status must be one of: 'open', 'in_progress', or 'resolved'",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !isValidEmail(email)) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Valid email is required",
      });
    }

    if (!password) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Password is required",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
