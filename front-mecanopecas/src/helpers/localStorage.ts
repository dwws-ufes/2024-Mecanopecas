export function getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
}

export function setTokenOnLocalStorage(token: string): void {
    localStorage.setItem('token', token);
}

export function removeTokenFromLocalStorage(): void {
    localStorage.removeItem('token');
}

export function getRoleFromLocalStorage(): string | null {
    return localStorage.getItem('role');
}

export function setRoleOnLocalStorage(role: string): void {
    localStorage.setItem('role', role);
}

export function removeRoleFromLocalStorage(): void {
    localStorage.removeItem('role');
}