export interface EditProfileRequest {
    username: string;
    image_url: string;
    description: string;
    location: string;
    sellerType: 'fixed' | 'mobile';
    activeDays: string [];
    scheduleFrom: string; 
    scheduleTo: string;
}