import axios from 'axios'

import { ENV_VARIABLES } from '@/lib/environment-variables'

export const axiosInstance = axios.create({
  baseURL: ENV_VARIABLES.BASE_URL,
})
