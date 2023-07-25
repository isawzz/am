require("dotenv/config");
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ apiKey: process.env.API_KEY, });
const openai = new OpenAIApi(config);

const { TextLoader } = require("langchain/document_loaders/fs/text");

const { PDFLoader } = require("langchain/document_loaders/fs/pdf");


async function start(){
  const loader = new PDFLoader("algos.pdf");
  const docs = await loader.load();

  // const loader = new TextLoader("simple.txt");
  // const docs = await loader.load();
  console.log('docs:\n"'+ docs[0].pageContent +'"')
  console.log(typeof docs[0].pageContent); //YES!
}

start();













