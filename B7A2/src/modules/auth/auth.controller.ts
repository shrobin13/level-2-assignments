import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";

const registerController = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerHandler(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    // Handle duplicate email error
    if (err?.code === "23505") {
      return sendResponse(res, {
        statusCode: 409,
        success: false,
        message: "Email already exists",
      });
    }
    throw new Error(err?.message);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginHandler(req.body);
    const { user, accessToken, refreshToken } = result;
    res.cookie("refresh-token", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        token: accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      },
    });
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export const authController = { loginController, registerController };
