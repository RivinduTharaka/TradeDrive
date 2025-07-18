// utils/api.js

// export const API_BASE_URL = "http://192.168.12.195:5000/api";
// export const API_HOST = "http://192.168.12.195:5000"; // Static content base

export const API_BASE_URL = "https://testingapi.cbiz365.com/api";
export const API_HOST = "https://testingapi.cbiz365.com"; // Static content base

export const API_ENDPOINTS = {
  articles: `${API_BASE_URL}/articles`,
  publishedArticles: `${API_BASE_URL}/articles/published`,
  contactUs: `${API_BASE_URL}/contactus/`,
  booking: `${API_BASE_URL}/bookings/web`,
  testimonials: `${API_BASE_URL}/testimonials`,
  publishedTestimonials: `${API_BASE_URL}/testimonials/published`,
  b2bResponses: `${API_BASE_URL}/b2b-responses`,
  csrfToken: `${API_BASE_URL}/csrf-token`,
  enabledGallery: `${API_BASE_URL}/gallery/enabled`, // ✅ New endpoint
};
