import axios from 'axios';
import { FormData } from '../store/slices/formSlice';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Mock API call to simulate form submission
export const submitForm = async (formData: FormData): Promise<ApiResponse> => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Using JSONPlaceholder as a mock API
    const response = await api.post('/posts', {
      title: 'Form Submission',
      body: JSON.stringify(formData),
      userId: 1,
    });

    // Simulate successful response
    return {
      success: true,
      message: 'Form submitted successfully!',
      data: {
        id: response.data.id,
        submittedAt: new Date().toISOString(),
        formData: formData,
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Failed to submit form. Please try again.',
    };
  }
};

// Alternative using fetch
export const submitFormWithFetch = async (formData: FormData): Promise<ApiResponse> => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Form Submission',
        body: JSON.stringify(formData),
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return {
      success: true,
      message: 'Form submitted successfully!',
      data: {
        id: data.id,
        submittedAt: new Date().toISOString(),
        formData: formData,
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Failed to submit form. Please try again.',
    };
  }
};

export default api;
