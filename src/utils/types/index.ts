export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    annualRevenue: number;
    address?: Address | null;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    cep: string;
}