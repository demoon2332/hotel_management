import axios from 'axios';
import { useMemo } from 'react';
// const BASE_URL = 'http://localhost:8085';
// const BASE_URL = 'https://mcode-be-git-master-demoon2332s-projects.vercel.app';
const BASE_URL = 'https://mcode-be.vercel.app';


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});