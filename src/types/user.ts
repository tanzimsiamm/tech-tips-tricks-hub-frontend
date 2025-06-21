// frontend/src/types/user.ts
// Frontend representation of TMembership from backend
export type IMembershipFrontend = {
    takenDate: string; // From backend, will be ISO string
    exp: string;       // From backend, will be ISO string
    package: {
        name: string;
        price: number;
    };
};

// Frontend representation of populated user data (e.g., in followers/following arrays)
export type IPopulatedUserFrontend = {
    _id: string;
    name: string;
    email: string;
    image?: string;
};

// Frontend representation of the full user profile from backend API (TUserProfileResponse)
export interface IUserFrontend {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    image: string;
    coverImg?: string;
    memberShip?: IMembershipFrontend | null;
    followers?: IPopulatedUserFrontend[];
    following?: IPopulatedUserFrontend[];
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
}