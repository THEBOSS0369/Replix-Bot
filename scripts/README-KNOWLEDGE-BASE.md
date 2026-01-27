# TechFlow Knowledge Base - Test Data

This directory contains comprehensive test data for the Repllix AI Agent knowledge base.

## What's Included

**15 Detailed Knowledge Base Articles** about TechFlow, a fictional project management SaaS:

1. **Getting Started** - Onboarding guide for new users
2. **Pricing Plans** - Free, Pro ($12/user/mo), Enterprise pricing details
3. **Account Management** - Profile, security, password, data export
4. **Team & Workspace Management** - Roles, permissions, invitations
5. **Projects & Task Management** - Views, templates, task features
6. **Notifications** - In-app, email, push notification settings
7. **Integrations** - Slack, GitHub, Google Drive, Zapier, etc.
8. **Mobile App** - iOS/Android features and shortcuts
9. **Security & Privacy** - Encryption, compliance, authentication
10. **Troubleshooting** - Common issues and solutions
11. **Keyboard Shortcuts** - Speed up your workflow
12. **API Documentation** - REST API endpoints (Enterprise only)
13. **Refund Policy** - Cancellation and refund information
14. **Templates & Automation** - Project templates and workflow automation
15. **Reports & Analytics** - Performance metrics and dashboards

## Quick Setup

### Option 1: Automated Script (Recommended)

```bash
./scripts/setup-test-kb.sh
```

### Option 2: Manual Setup

#### For Local PostgreSQL:
```bash
psql -d repllix -f scripts/seed-knowledge-base.sql
```

#### For Supabase:
1. Go to your Supabase dashboard
2. Click **SQL Editor**
3. Create a new query
4. Copy the contents of `scripts/seed-knowledge-base.sql`
5. Paste and click **Run**

## Testing the Agent

Once the knowledge base is seeded, try asking these questions:

### Pricing & Billing
- "How much does TechFlow cost?"
- "What's included in the Pro plan?"
- "Can I get a refund if I cancel?"
- "How do I upgrade my account?"

### Features & How-To
- "How do I invite team members?"
- "What integrations does TechFlow support?"
- "How do I create a project template?"
- "Can I use TechFlow on my phone?"

### Technical Questions
- "Is my data secure?"
- "Do you have an API?"
- "What keyboard shortcuts are available?"
- "How do I set up automation?"

### Support Questions
- "I can't log in, what should I do?"
- "My tasks aren't syncing, help!"
- "How do I export my data?"
- "What happens if I delete my account?"

## Company Profile

The test data sets up:
- **Company Name**: TechFlow
- **Brand Tone**: Friendly
- **User ID**: `00000000-0000-0000-0000-000000000001`

## Customization

To modify the test data:
1. Edit `scripts/seed-knowledge-base.sql`
2. Change company name, articles, or content
3. Re-run the setup script

## Clearing Test Data

To remove all test knowledge base articles:

```sql
DELETE FROM knowledge_base WHERE user_id = '00000000-0000-0000-0000-000000000001';
```

## Next Steps

1. Run the setup script
2. Start your dev server: `npm run dev`
3. Open the agent test chat
4. Ask questions and see how the agent responds!

The agent will automatically search the knowledge base when it detects questions and provide context-aware answers based on TechFlow's documentation.

---

**Happy Testing!** 🎉
