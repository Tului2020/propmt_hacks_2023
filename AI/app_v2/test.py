import streamlit as st
from langchain_config import LangchainEngine

chain = LangchainEngine()

class App:
    def __call__(self):
        self.main()

    def main(self):
        with st.form('Enter message to start chatting'):
            inp = st.text_area("Type Message", "Hello, how are you?")
            submitted = st.form_submit_button("Submit")
            if submitted:
                st.write(self.send_message(inp))

    def send_message(self, message: str):
        return chain.conversation.predict(input=message)

if __name__ == '__main__':
    app = App()
    app()