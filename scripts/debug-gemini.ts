import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { AI_CONFIG } from '../src/config/ai.config.js'; // Use .js extension for tsx execution or relative path if it wasn't compiled, let's just use direct import since we are using tsx

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('Error: VITE_GEMINI_API_KEY is not set in .env file');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel() {
  try {
    // Manually specifying the model to match what we just set in config, or we could import it. 
    // Let's test the specific model we just chose.
    const modelName = 'gemini-2.0-flash';
    console.log(`Testing model: ${modelName}...`);
    
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say "Hello, World!" if you can hear me.');
    const response = await result.response;
    console.log('Success! Response:', response.text());
    
  } catch (error: any) {
    console.error('Error testing model:', error.message);
    
    if (error.response) {
        console.error('Response status:', error.response.status);
    }
  }
}

testModel();
