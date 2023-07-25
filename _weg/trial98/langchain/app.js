require("dotenv/config");
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ apiKey: process.env.API_KEY, });
const openai = new OpenAIApi(config);

const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");


async function start() {
  const loader = new PDFLoader("algos.pdf");
  const data = await loader.load();

  //console.log('docs:\n"'+ data[0].pageContent +'"'); console.log(typeof data[0].pageContent); //YES!
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings({ apiKey: process.env.API_KEY, });

  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
}

start();













