/* eslint-disable max-len */
import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers';
import RedisService from '../services/RedisService';
import { SendMessageBody } from '../helpers/validators';
import AIService from '../services/AIService';
import { Role } from '../helpers/types';

@JsonController('/session')
export default class SessionController {
  private redisService = new RedisService();
  private aiService = new AIService();

  @Post('/message')
  public async sendMessage(@Body() { role, newMessage, name }: SendMessageBody): Promise<string> {
    const conversationHistory = await this.redisService.addToChatHistory(role, name, newMessage);
    const responseContent = await this.aiService.relaySendMessage(conversationHistory);
    this.redisService.addToChatHistory(Role.assistant, name, responseContent);
    this.aiService.interventionCheck({ role, content: newMessage, name });
    return responseContent;
  }

  @Get('/dashboard')
  public async getDashboardInfo(@QueryParam('name') name: string): Promise<any> {
    const conversationHistory = await this.redisService.getChatHistory(name);

    return [
      '\nSummary:\n- User, [Name] is feeling depressed and suicidal. \n- User initially states they are feeling better, but then continues to express suicidal thoughts. \n- Assistant encouraged user to seek professional help and reminded user that their life is valuable and things can get better. \n- Assistant offered user the resource of speaking to a professional counselor immediately.',
      '\nHigh Risk: John has expressed an inclination to harm themselves by stating his desire to kill himself. During the conversation, he reiterated this feeling multiple times. It is important to take his threats seriously and take immediate steps to mitigate any potential risks.',
      [
        [
          {
            label: 'anger',
            score: 0.0040207733400166035
          },
          {
            label: 'disgust',
            score: 0.013037186115980148
          },
          {
            label: 'fear',
            score: 0.03603736311197281
          },
          {
            label: 'joy',
            score: 0.09913647174835205
          },
          {
            label: 'neutral',
            score: 0.5502731204032898
          },
          {
            label: 'sadness',
            score: 0.2359306514263153
          },
          {
            label: 'surprise',
            score: 0.061564475297927856
          }
        ],
        [
          {
            label: 'anger',
            score: 0.003106464399024844
          },
          {
            label: 'disgust',
            score: 0.0020627211779356003
          },
          {
            label: 'fear',
            score: 0.91478031873703
          },
          {
            label: 'joy',
            score: 0.005913335829973221
          },
          {
            label: 'neutral',
            score: 0.06496324390172958
          },
          {
            label: 'sadness',
            score: 0.0062685757875442505
          },
          {
            label: 'surprise',
            score: 0.002905334811657667
          }
        ],
        [
          {
            label: 'anger',
            score: 0.025625186040997505
          },
          {
            label: 'disgust',
            score: 0.09668941050767899
          },
          {
            label: 'fear',
            score: 0.6357298493385315
          },
          {
            label: 'joy',
            score: 0.0016360044246539474
          },
          {
            label: 'neutral',
            score: 0.14191822707653046
          },
          {
            label: 'sadness',
            score: 0.023656005039811134
          },
          {
            label: 'surprise',
            score: 0.07474532723426819
          }
        ],
        [
          {
            label: 'anger',
            score: 0.0018832915229722857
          },
          {
            label: 'disgust',
            score: 0.008724926970899105
          },
          {
            label: 'fear',
            score: 0.0462675504386425
          },
          {
            label: 'joy',
            score: 0.0024865162558853626
          },
          {
            label: 'neutral',
            score: 0.04093370586633682
          },
          {
            label: 'sadness',
            score: 0.8964953422546387
          },
          {
            label: 'surprise',
            score: 0.0032087021972984076
          }
        ]
      ]
    ];

    // return Promise.all([
    //   this.aiService.getChatSummary(conversationHistory),
    //   this.aiService.getRiskAssessment(conversationHistory),
    //   this.aiService.getEmotionClassification(conversationHistory),
    // ]);
  }
}
