import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';

export async function getAdminSession() {
  try {
    const session = await getAuth().api.getSession({
      headers: await headers(),
    });
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== 'admin') {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/login?next=/admin');
  }
  return session;
}
