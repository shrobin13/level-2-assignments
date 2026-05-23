import type { Request, Response } from "express";
import { issueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import properties from "../../config/properties";

const createIssues = async (req: Request, res: Response) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization as string,
      properties.accessSecret as string,
    ) as JwtPayload;

    const createdIssue = await issueService.createIssuesHandler(
      decoded.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: createdIssue,
    });
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesHandler(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const getIssueById = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getIssueByIdHandler(req.params);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const updateIssueById = async (req: Request, res: Response) => {
  try {
    const result = await issueService.updateIssueHandler(req.params, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const deleteIssueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await issueService.deleteIssueHandler(Number(id));
    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found!",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getIssueById,
  updateIssueById,
  deleteIssueById,
};
