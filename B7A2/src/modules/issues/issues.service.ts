import { pool } from "../../db/init";
import type { GetIssuesQuery } from "../../enums-types/types";
import type { User } from "../user/user.intreface";
import type { IIssues, IIssuePayload } from "./issues.interface";

const createIssuesHandler = async (id: number, issuePayload: IIssuePayload) => {
  const { title, description, type } = issuePayload;

  const createdIssue = await pool.query(
    `INSERT INTO issues(title, description, type, reporter_id) values($1, $2, $3, $4) RETURNING *`,
    [title, description, type, id],
  );
  console.log(createdIssue.rows[0]);
  return createdIssue.rows[0];
};

const getAllIssuesHandler = async (query: GetIssuesQuery) => {
  const { sort = "newest", type, status } = query;

  const sortOptions = {
    newest: "created_at DESC",
    oldest: "created_at ASC",
  };

  type SortKey = keyof typeof sortOptions;

  const orderBy = sortOptions[sort as SortKey] || sortOptions.newest;

  const issuesResult = await pool.query(
    `SELECT * FROM issues ORDER BY ${orderBy}`,
  );

  const issues = issuesResult.rows;

  if (issues.length === 0) return [];

  const reporterIds = [
    ...new Set(issues.map((issue) => issue.reporter_id).filter(Boolean)),
  ];

  const usersResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reporterIds],
  );

  const userMap = usersResult.rows.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as Record<number, User>,
  );

  let result = issues.map((issue) => {
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: userMap[issue.reporter_id] || null,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  if (type) {
    result = result.filter((r1) => r1.type === type);
  }

  if (status) {
    result = result.filter((r1) => r1.status === status);
  }

  return result;
};

const getIssueByIdHandler = async (query: any) => {
  const { id } = query;
  const issueData = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    Number(id),
  ]);

  if (issueData.rows.length === 0) {
    throw new Error(`No issue found with id: ${id} `);
  }

  const issue: IIssues = issueData.rows[0];
  const userData = await pool.query(`SELECT * FROM users WHERE id = $1`, [
    issue.reporter_id,
  ]);

  const user: User = userData.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

const updateIssueHandler = async (query: any, updatePayload: IIssuePayload) => {
  const { title, description, type, status } = updatePayload;
  const { id } = query;

  const result = await pool.query(
    `UPDATE issues
      SET title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      status = COALESCE($4, status),
      updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `,
    [title, description, type, status, id],
  );

  return result.rows[0];
};

const deleteIssueHandler = async (id: number) => {
  const result = await pool.query(`DELETE FROM issues where id = $1`, [id]);
  return result.rows[0];
};

export const issueService = {
  createIssuesHandler,
  getAllIssuesHandler,
  getIssueByIdHandler,
  updateIssueHandler,
  deleteIssueHandler,
};
