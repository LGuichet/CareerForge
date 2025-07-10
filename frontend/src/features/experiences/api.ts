// features/experiences/api.ts
import { z } from "zod";

// Zod Schema for validation (will be used in the form later)
export const experienceSchema = z.object({
  id: z.string().optional(),
  jobTitle: z.string().min(2, "Job title is required"),
  companyName: z.string().min(2, "Company name is required"),
  description: z.string().min(10, "Description must be at least 10 characters").optional().or(z.literal('')),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"], // a specific field for the error
});

// Type derived from the Zod schema
export type Experience = z.infer<typeof experienceSchema>;

// Raw type from the API (dates are strings)
export interface RawExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  description: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
}

// --- MOCK BACKEND ---

let mockExperiences: RawExperience[] = [
  {
    id: 'exp1',
    jobTitle: 'Frontend Developer',
    companyName: 'Tech Solutions Inc.',
    description: 'Developed and maintained web applications using React and TypeScript.',
    startDate: '2021-01-15T00:00:00.000Z',
    endDate: '2022-06-30T00:00:00.000Z',
  },
  {
    id: 'exp2',
    jobTitle: 'Senior Frontend Engineer',
    companyName: 'Innovatech',
    description: 'Led the frontend team and architected a new design system.',
    startDate: '2022-08-01T00:00:00.000Z',
    endDate: '2024-03-31T00:00:00.000Z',
  },
];

// Mock API call to fetch experiences
export const fetchExperiences = async (): Promise<RawExperience[]> => {
  console.log("API: Fetching experiences...");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return JSON.parse(JSON.stringify(mockExperiences)); // Return a deep copy
};

// Mock API call to create an experience
export const createExperience = async (data: Omit<Experience, 'id'>): Promise<RawExperience> => {
    console.log("API: Creating experience...", data);
    await new Promise(resolve => setTimeout(resolve, 700));
    const newExperience: RawExperience = {
        ...data,
        id: `exp${Date.now()}`,
        description: data.description || '',
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
    };
    mockExperiences.push(newExperience);
    mockExperiences.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    return newExperience;
}

// Mock API call to update an experience
export const updateExperience = async (data: Experience): Promise<RawExperience> => {
    console.log("API: Updating experience...", data);
    await new Promise(resolve => setTimeout(resolve, 700));
    const index = mockExperiences.findIndex(e => e.id === data.id);
    if (index === -1) throw new Error("Experience not found");

    const updatedExperience: RawExperience = {
        ...data,
        id: data.id!,
        description: data.description || '',
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
    }
    mockExperiences[index] = updatedExperience;
    mockExperiences.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    return updatedExperience;
}