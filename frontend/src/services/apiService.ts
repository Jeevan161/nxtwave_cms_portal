const BASE_URL = 'http://127.0.0.1:8000/api';

export type Environment = 'beta' | 'gamma' | 'prod';

export interface Course {
  id: number;
  course_id: string;
  course_name: string;
  duration: string;
  description: string;
  multimedia_url: string;
  course_category: string;
}

export interface CoursesResponse {
  courses: Course[];
  total_courses: number;
}

export interface AddCoursePayload {
  course_id: string;
  portal: Environment;
}

// GET /api/{env}/courses/
export const fetchCourses = async (env: Environment): Promise<CoursesResponse> => {
  const response = await fetch(`${BASE_URL}/${env}/courses/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// POST /api/{env}/courses/proxy/
export const addCourse = async (env: Environment, payload: AddCoursePayload): Promise<unknown> => {
  const response = await fetch(`${BASE_URL}/${env}/courses/proxy/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to add course: ${response.status} ${response.statusText}`);
  }
  return response.json();
};