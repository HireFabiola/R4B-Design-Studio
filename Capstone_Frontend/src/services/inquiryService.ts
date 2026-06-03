import apiClient from "../api/apiClients";
import type { Inquiry } from "../types/Inquiry";

// GET all inquiries
export const getInquiries = async (): Promise<
    Inquiry[]
> => {
    const response =
        await apiClient.get<Inquiry[]>(
            "/inquiries"
        );

    return response.data;
}; 