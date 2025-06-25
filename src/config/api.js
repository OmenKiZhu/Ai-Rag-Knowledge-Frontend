// API 基础配置
export const API_BASE_URL = 'http://localhost:8090';
export const DEFAULT_MODEL = 'deepseek-r1:1.5b';

// API 端点
export const API_ENDPOINTS = {
    GENERATE: '/api/v1/ollama/generate',
    GENERATE_STREAM: '/api/v1/ollama/generate_stream'
};