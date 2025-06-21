// frontend/src/config/envConfig.ts
const envConfig = {
    baseApi: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api',
};

export default envConfig;