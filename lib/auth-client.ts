"use server";
import { isAdmin as authIsAdmin } from "./auth";

export async function isAdmin() {
  return await authIsAdmin();
}
