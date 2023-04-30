import { Service } from 'typedi';
import _axios, { AxiosRequestConfig } from 'axios';
import { History } from '../helpers/types';
const _axiosInstance = _axios.create({ baseURL: 'http://ai:8888' });

const POST = 'POST';
const GET = 'GET';

type RetObj = 'data' | 'obj' | 'res';
const returner = (response: any, retObj: RetObj) => (retObj === 'res' ? response : retObj === 'data' ? response.data : { data: response.data });
const axios = async (axiosRequest: AxiosRequestConfig, retObj: RetObj = 'data') => {
  try {
    const _retObj = await _axiosInstance({ method: GET, ...axiosRequest });

    return returner(_retObj, retObj);
  } catch (err: any) {
    throw new Error(err.message);
  }
};


@Service()
export default class AIService {
  public async relaySendMessage(conversationHistory: History[]): Promise<string> {
    return axios({ url: '/closet_ai', method: POST, data: { messages: conversationHistory } });
  }

  public async relayInterventionCheck(message: History): Promise<void> {
    console.log(await axios({ url: '/intervention_check', method: POST, data: { message } }));
  }

}