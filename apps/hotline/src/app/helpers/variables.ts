export const LOCAL_STORE = 'psiops';
export const getLocallyAuthed = () => localStorage.getItem(LOCAL_STORE) || '';
export const setLocallyAuthed = (name: string) => localStorage.setItem(LOCAL_STORE, name);

