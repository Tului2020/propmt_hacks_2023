export interface UserInfo {
  name: string;
  phone: string;
}

export const LOCAL_STORE = 'psiops';
export const getLocallyAuthed = (): UserInfo => JSON.parse(localStorage.getItem(LOCAL_STORE) || '{}');
export const setLocallyAuthed = (name: string, phone: string) => localStorage.setItem(LOCAL_STORE, JSON.stringify({ name, phone }));
export const isBot = (role: string) => botRoles.includes(role);

const botRoles = ['assistant', 'system'];
