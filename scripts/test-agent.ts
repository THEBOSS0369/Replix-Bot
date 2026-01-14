import { createAgent } from '../src/agent';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function testAgent() {
  console.log('🧪 Testing Agent...\n');

  try {
    // Create agent
    const agent = createAgent();
    console.log('✅ Agent created successfully\n');

    // Test parameters
    const testUserId = process.env.TEST_USER_ID || 'YOUR_TEST_USER_ID'; // Replace with real user ID
    const sessionId = uuidv4();
    
    console.log(`Session ID: ${sessionId}\n`);

    // Test 1: Simple greeting
    console.log('Test 1: Simple greeting');
    console.log('User: Hello!');
    
    const response1 = await agent.process(
      'Hello!',
      sessionId,
      testUserId,
      'web'
    );
    
    console.log(`Agent: ${response1.message}\n`);

    // Test 2: Question that might need KB
    console.log('Test 2: Question');
    console.log('User: How do I reset my password?');
    
    const response2 = await agent.process(
      'How do I reset my password?',
      sessionId,
      testUserId,
      'web'
    );
    
    console.log(`Agent: ${response2.message}`);
    console.log(`KB Used: ${response2.metadata?.kb_used}\n`);

    // Test 3: Follow-up
    console.log('Test 3: Follow-up');
    console.log('User: Can you explain that again?');
    
    const response3 = await agent.process(
      'Can you explain that again?',
      sessionId,
      testUserId,
      'web'
    );
    
    console.log(`Agent: ${response3.message}\n`);

    console.log('✅ All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
testAgent();
