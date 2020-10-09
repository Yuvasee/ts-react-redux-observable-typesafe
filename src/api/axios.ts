import axios from 'axios';

const instance = axios.create();

// instance.defaults.headers.common['Authorization'] = `Session ${sessionId}`;
// instance.defaults.headers.common['x-uid'] = userId;
// instance.defaults.headers.common['x-pid'] = profileId;

// instance.defaults.baseURL = env.API_BASE_URL;

export default instance;
