from typing import Any, Dict
from agent_config import TaskConfig
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.memory import VectorStoreRetrieverMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
import faiss
from langchain.docstore import InMemoryDocstore
from langchain.vectorstores import FAISS



class LangchainEngine(TaskConfig):
    def __init__(
            self, 
            embedding_dim: int=1536, 
            top_k: int=5, 
            openai_params: Dict[str, Any] = {
                'temperature': 0.8,
                'max_tokens': 500, 
                'model_name': 'gpt-3.5-turbo',
                'openai_api_key': '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'
            }, 
            verbose: bool=True
        ):
        self.index = faiss.IndexFlatL2(embedding_dim)
        self.embedding_fn = OpenAIEmbeddings(
            openai_api_key='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'
        ).embed_query
        self.vectorstore = FAISS(self.embedding_fn, self.index, InMemoryDocstore({}), {})
        self.retriever = self.vectorstore.as_retriever(search_kwargs=dict(k=top_k))
        self.memory = VectorStoreRetrieverMemory(retriever=self.retriever)
        self.LLM = OpenAI(**openai_params)
        self.prompt = PromptTemplate(
            input_variables=['history', 'input'],
            template = self.identity
        )
        self.conversation = ConversationChain(
            llm=self.LLM,
            prompt=self.prompt,
            memory=self.memory,
            verbose=verbose,
        )
