import { z } from 'zod';

export const candidateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  education: z.object({
    qualification: z.enum(['10th', '12th', 'ITI', 'Diploma', 'Graduation'], {
      message: 'Please select your qualification'
    }),
    course: z.string().min(1, 'Please enter your course/stream'),
    specialization: z.string().min(1, 'Please enter your specialization'),
  }),
  location: z.object({
    state: z.string().min(1, 'Please select your state'),
    district: z.string().min(1, 'Please select your district'),
  }),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  interests: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  preferredSectors: z.array(z.string()).min(1, 'Please select at least one preferred sector'),
  isRural: z.boolean(),
  digitalLiteracy: z.enum(['low', 'medium', 'high']),
});

export type CandidateProfileForm = z.infer<typeof candidateProfileSchema>;
