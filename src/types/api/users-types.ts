// Types
import type { Address } from '@/types/api/index-types';

export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
};
