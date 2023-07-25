import os
import sys
import _env

os.environ["OPENAI_API_KEY"]=_env.APIKEY

#query = sys.argv[1]
#print(query)

#from langchain.document_loaders import TextLoader
from langchain.document_loaders import DirectoryLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI

#loader = TextLoader('algos.txt')
loader = DirectoryLoader(".",glob='*.txt')
docs = loader.load()
#print(docs[0].page_content)

index = VectorstoreIndexCreator().from_loaders([loader])
query = "give me a 1 line description of A*"; # "explain quicksort"
print(index.query(query)); #, llm=ChatOpenAI()))




