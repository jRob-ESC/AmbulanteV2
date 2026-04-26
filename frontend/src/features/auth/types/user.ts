export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imgUrl: string | null;
    isAvailable: boolean;
    isVendor: boolean;
    isMobileVendor: boolean | null;
}