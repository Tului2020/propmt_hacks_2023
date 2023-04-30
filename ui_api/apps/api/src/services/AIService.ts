import { Service } from 'typedi';
import _axios, { AxiosRequestConfig } from 'axios';
import { History } from '../helpers/types';
const _axiosInstance = _axios.create({ baseURL: 'http://ai:8888' });

const POST = 'POST';

type RetObj = 'data' | 'obj' | 'res';
const returner = (response: any, retObj: RetObj) => (retObj === 'res' ? response : retObj === 'data' ? response.data : { data: response.data });
const axios = async (axiosRequest: AxiosRequestConfig, retObj: RetObj = 'data') => {
  try {
    const _retObj = await _axiosInstance({ method: POST, ...axiosRequest });

    return returner(_retObj, retObj);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const assessmentFilter = (conversationHistory: History[]) => conversationHistory
  .filter(({ role }) => role !== 'system')
  .map(({ role, content, name }) => ({ content, role: role === 'assistant' ? role : name }));


@Service()
export default class AIService {
  public async relaySendMessage(conversationHistory: History[]): Promise<string> {
    return axios({ url: '/closet_ai', data: { messages: conversationHistory } });
  }

  public async interventionCheck(message: History): Promise<boolean> {
    const intervention = await axios({ url: '/intervention_check', data: { message } });
    return intervention === '<|intervene|>';
  }

  public async getChatSummary(conversationHistory: History[]): Promise<string> {
    return axios({ url: '/chat_summary', data: { history: assessmentFilter(conversationHistory) } });
  }

  public async getRiskAssessment(conversationHistory: History[]): Promise<string> {
    return axios({ url: '/risk_assessment', data: { history: assessmentFilter(conversationHistory) } });
  }

  public async getEmotionClassification(conversationHistory: History[]): Promise<string> {
    return axios({ url: '/emotion_classification', data: { history: conversationHistory.filter(({ role }) => role !== 'user') } });
  }

}