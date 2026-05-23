import type { UserRole } from "../../enums-types/enums";

export interface loginPayload {
  email: string;
  password: string;
}

export interface registerPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
