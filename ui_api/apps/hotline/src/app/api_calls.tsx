import _axios, { AxiosRequestConfig } from 'axios';
import { Role } from './helpers/types';

const POST = 'POST';
const GET = 'GET';

const _axiosInstance = _axios.create({ baseURL: 'http://localhost:3333/api' });
type RetObj = 'data' | 'obj' | 'res';
const returner = (response: any, retObj: RetObj) => (retObj === 'res' ? response : retObj === 'data' ? response.data : { data: response.data });
const axios = async (axiosRequest: AxiosRequestConfig, retObj: RetObj = 'data') => {
  try {
    const _retObj = await _axiosInstance({ method: GET, ...axiosRequest });

    return returner(_retObj, retObj);
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};

// session
export const sendMessage = (role: Role, newMessage: string, name: string): Promise<string> => axios({ url: '/session/message', method: POST, data: { newMessage, role, name } });
export const getDashboardInfo = (name: string) => axios({ url: '/session/dashboard', params: { name } });