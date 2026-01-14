# NPM Scripts to Add

Add this script to your `package.json`:

```json
{
  "scripts": {
    "test:agent": "tsx scripts/test-agent.ts"
  }
}
```

Make sure `tsx` is installed as a dev dependency:
```bash
npm install -D tsx
```

## Usage

After setting up your `.env.local` file with the required environment variables:

```bash
npm run test:agent
```

This will run the agent test script with three test scenarios.
