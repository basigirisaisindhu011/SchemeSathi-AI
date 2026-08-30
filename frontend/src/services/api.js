import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-inject JWT token into authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
  },
  register: async (email, password, fullName) => {
    const res = await api.post('/api/auth/register', { email, password, fullName });
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getProfile: async () => {
    const res = await api.get('/api/auth/me');
    return res.data;
  },
  updateProfile: async (profileData) => {
    const res = await api.put('/api/auth/profile', profileData);
    return res.data;
  },
};

export const updateProfile = authService.updateProfile;

export const schemeService = {
  getSchemes: async (stateId, categoryId) => {
    let url = '/api/schemes';
    const params = [];
    if (stateId) params.push(`stateId=${stateId}`);
    if (categoryId) params.push(`categoryId=${categoryId}`);
    if (params.length) url += `?${params.join('&')}`;
    
    const res = await api.get(url);
    return res.data;
  },
  getSchemeById: async (id) => {
    const res = await api.get(`/api/schemes/${id}`);
    return res.data;
  },
  getRecommendations: async () => {
    const res = await api.get('/api/schemes/my-recommendations');
    return res.data;
  },
  getAiRecommendations: async () => {
    const res = await api.get('/api/recommendations');
    return res.data;
  },
  getStates: async () => {
    const res = await api.get('/api/schemes/states');
    return res.data;
  },
  getDistricts: async (stateId) => {
    const res = await api.get(`/api/schemes/districts?stateId=${stateId}`);
    return res.data;
  },
  getCategories: async () => {
    const res = await api.get('/api/schemes/categories');
    return res.data;
  },
  createScheme: async (schemeData) => {
    const res = await api.post('/api/schemes/admin', schemeData);
    return res.data;
  },
  updateScheme: async (id, schemeData) => {
    const res = await api.put(`/api/schemes/admin/${id}`, schemeData);
    return res.data;
  },
  deleteScheme: async (id) => {
    const res = await api.delete(`/api/schemes/admin/${id}`);
    return res.data;
  },
};

export const applicationService = {
  apply: async (schemeId) => {
    const res = await api.post(`/api/applications/apply/${schemeId}`);
    return res.data;
  },
  getMyApplications: async () => {
    const res = await api.get('/api/applications/my-applications');
    return res.data;
  },
  getAllApplicationsAdmin: async () => {
    const res = await api.get('/api/applications/admin/all');
    return res.data;
  },
  updateStatusAdmin: async (id, status, remarks) => {
    const res = await api.put(`/api/applications/admin/${id}/status`, { status, remarks });
    return res.data;
  },
  updateTracker: async (id, trackerData) => {
    const res = await api.put(`/api/applications/update-tracker/${id}`, trackerData);
    return res.data;
  },
};

export const ocrService = {
  uploadDoc: async (file, documentName) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', documentName);
    const res = await api.post('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  getMyDocs: async () => {
    const res = await api.get('/api/documents');
    return res.data;
  },
  deleteDoc: async (id) => {
    const res = await api.delete(`/api/documents/${id}`);
    return res.data;
  },
};

export const chatService = {
  sendMessage: async (message, language) => {
    const res = await api.post('/api/chat/send', { message, language });
    return res.data;
  },
  getHistory: async () => {
    const res = await api.get('/api/chat/history');
    return res.data;
  },
};

export default api;
