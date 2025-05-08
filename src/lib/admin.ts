export const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID;

export function isAdmin(uid: string | undefined | null): boolean {
  return !!uid && uid === ADMIN_UID;
} 