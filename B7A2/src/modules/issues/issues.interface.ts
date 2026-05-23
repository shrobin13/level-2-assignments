import type { IssueType, StatusType } from "../../enums-types/enums";

export interface IIssuePayload {
  title?: string;
  description?: string;
  type?: IssueType;
  status?: StatusType;
}

export interface IIssues {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: string;
  reporter_id: number;
  created_at: string;
  updated_at: string;
}
