import { UserProfile } from '@/types/travel';

const SESSION_KEY = 'ai_travel_user_session';

/**
 * Retrieves the current logged in user session from localStorage
 */
export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    return JSON.parse(sessionStr) as UserProfile;
  } catch (err) {
    console.error('Error reading user session:', err);
    return null;
  }
}

/**
 * Saves user profile session to localStorage
 */
export function saveUserSession(user: { name: string; email: string }): UserProfile {
  const profile: UserProfile = {
    id: `usr_${Date.now()}`,
    name: user.name,
    email: user.email,
    memberSince: new Date().getFullYear().toString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    // Dispatch custom event to sync Navbar instantly across components
    window.dispatchEvent(new Event('user-session-changed'));
  }

  return profile;
}

/**
 * Logs out the current user session
 */
export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event('user-session-changed'));
  }
}
