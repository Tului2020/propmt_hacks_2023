from app.agent_config import TaskConfig as CFG
from transformers import pipeline

emotions = pipeline(
    "text-classification", 
    model="j-hartmann/emotion-english-distilroberta-base", 
    return_all_scores=True
)

class TaskManager:
        
    def whoami(self):
        return CFG.identity
    
    def chat_summary(self, history):
        prompt = CFG.chat_summary
        for chat in history:
            prompt += chat['role'] + ': ' + chat['content'] + '\n'
        return prompt
    
    def risk_assessment(self, history):
        prompt = CFG.risk_assessment
        for chat in history:
            prompt += chat['role'] + ': ' + chat['content'] + '\n'
        return prompt
    
    def intervention_check(self, user_input):
        prompt = CFG.intervention + user_input['role'] + ': ' + user_input['content'] + '\n'
        return prompt
    
    def emotion_classification(self, history):
        emo = []
        for chat in history:
            emo.extend(emotions(chat['content']))

        # dfs = []
        # for item in emo:
        #     dfs.append(pd.DataFrame(item))

        # df = pd.concat(dfs)
        # df_mean = df.groupby('label')['score'].mean().reset_index(name='score')

        return emo
        







