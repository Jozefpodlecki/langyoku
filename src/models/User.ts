export interface User {
    id: number;
    displayName: string;
    language: {
        id: number;
        name: string;
        url: string;
    }
}