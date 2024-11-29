export interface Course {
    courseId: string;
    name: string;
    description: string;
    image: string;
    field: string; // The field of study (e.g., Computer Science, Mathematics)
    trainerId: string; // The ID of the trainer
    accepted: string; // Could be a status like 'accepted' or 'pending'
    chapters: string[]; // List of chapters in the course
  }
  