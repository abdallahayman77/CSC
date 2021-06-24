import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://csc-msa.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchCourses = () => API.get('/courses');
export const createCourse = (newCourse) => API.post('/courses', newCourse);
export const updateCourse = (id, updatedCourse) => API.patch(`/courses/${id}`, updatedCourse);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export const fetchJobs = () => API.get('/jobs');
export const createJob = (newJob) => API.post('/jobs', newJob);