-- Comprehensive Knowledge Base for TechFlow - A Project Management SaaS
-- This provides extensive test data for the Repllix AI Agent

-- Clear existing test data (optional - remove if you want to keep existing)
-- DELETE FROM knowledge_base WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- Update company profile
UPDATE profiles 
SET company_name = 'TechFlow', brand_tone = 'friendly'
WHERE id = '00000000-0000-0000-0000-000000000001';

-- ============================================
-- KNOWLEDGE BASE ARTICLES
-- ============================================

INSERT INTO knowledge_base (user_id, title, content) VALUES

-- 1. GETTING STARTED & ONBOARDING
('00000000-0000-0000-0000-000000000001', 'Getting Started with TechFlow', 
'Welcome to TechFlow! We''re excited to have you on board. 

TechFlow is a modern project management platform designed to help teams collaborate efficiently and get work done faster.

**First Steps:**
1. Complete your profile by clicking on your avatar in the top right corner
2. Create your first workspace or join an existing one using an invite link
3. Set up your first project and invite team members
4. Start creating tasks and organizing your work

**Key Features to Explore:**
- Task Management: Create, assign, and track tasks
- Team Collaboration: Real-time chat, comments, and file sharing
- Timeline View: Visualize project schedules with our Gantt-style timeline
- Dashboards: Track progress with customizable analytics
- Integrations: Connect with Slack, Google Drive, GitHub, and more

**Need Help?**
Our support team is available 24/7 via live chat or email at support@techflow.io. We also have video tutorials in the Help Center.'),

-- 2. PRICING & PLANS
('00000000-0000-0000-0000-000000000001', 'Pricing Plans and Billing',
'TechFlow offers flexible pricing to suit teams of all sizes.

**FREE PLAN - $0/month**
Perfect for small teams getting started
- Up to 5 team members
- 3 projects
- 100 tasks per project
- 1GB file storage
- Basic integrations
- Email support

**PRO PLAN - $12/user/month** (Most Popular!)
For growing teams that need more power
- Unlimited team members
- Unlimited projects and tasks
- 50GB file storage per user
- Advanced integrations (Slack, GitHub, Jira)
- Priority email & chat support
- Custom fields and workflows
- Timeline and Gantt charts
- Advanced reporting and analytics

**ENTERPRISE PLAN - Custom Pricing**
For large organizations with specific needs
- Everything in Pro, plus:
- Unlimited storage
- Dedicated account manager
- Custom integrations and API access
- Advanced security (SSO, 2FA, audit logs)
- Service Level Agreement (SLA)
- On-premise deployment option
- Phone support

**Billing Information:**
- All plans are billed monthly or annually (save 20% with annual billing)
- You can upgrade, downgrade, or cancel anytime
- We accept all major credit cards, PayPal, and wire transfer (Enterprise only)
- All prices are in USD
- Free 14-day trial available for Pro plan (no credit card required)

**How to Change Plans:**
Go to Settings > Billing > Change Plan. Your new plan takes effect immediately, and we''ll prorate the charges.'),

-- 3. ACCOUNT MANAGEMENT
('00000000-0000-0000-0000-000000000001', 'Managing Your Account',
'**Account Settings:**
Access your account settings by clicking your profile picture > Settings.

**Profile Information:**
- Update your name, email, profile picture
- Set your timezone and language preferences
- Configure notification preferences
- Set your work hours and availability status

**Password & Security:**
- Change your password anytime in Security settings
- Enable Two-Factor Authentication (2FA) for added security
- View active sessions and revoke access from unknown devices
- Download your account data (GDPR compliant)

**Email Preferences:**
Control what emails you receive:
- Task assignments and mentions
- Project updates and deadlines
- Weekly summaries
- Marketing and product updates

**Deleting Your Account:**
If you need to delete your account:
1. Go to Settings > Account > Delete Account
2. You''ll need to confirm by entering your password
3. All your personal data will be permanently deleted within 30 days
4. Note: If you''re the workspace owner, you must transfer ownership first

**Data Export:**
You can export all your data anytime:
- Go to Settings > Data & Privacy > Export Data
- We''ll email you a ZIP file within 24 hours
- Includes all your tasks, comments, files, and activity'),

-- 4. TEAM & WORKSPACE MANAGEMENT
('00000000-0000-0000-0000-000000000001', 'Managing Teams and Workspaces',
'**What is a Workspace?**
A workspace is your team''s shared environment where all your projects live. Each workspace has its own members, projects, and settings.

**Creating a Workspace:**
1. Click the workspace dropdown in the top left
2. Select "Create New Workspace"
3. Enter a name and optionally add a description
4. Invite team members via email

**Inviting Team Members:**
1. Go to Workspace Settings > Members
2. Click "Invite Members"
3. Enter email addresses (comma-separated for multiple)
4. Assign roles: Admin, Member, or Guest
5. Send invitations

**User Roles & Permissions:**

**Admin:**
- Full access to all workspace features
- Can add/remove members
- Can manage billing and subscription
- Can delete workspace

**Member:**
- Can create and manage projects
- Can invite guests to specific projects
- Cannot manage workspace settings or billing

**Guest:**
- Limited access to specific projects they''re invited to
- Can view and comment on tasks
- Cannot create new projects
- Perfect for clients or external collaborators

**Workspace Settings:**
- Customize workspace name, icon, and description
- Set default project templates
- Configure integrations for the entire workspace
- Set up custom fields and statuses
- Manage workspace-wide labels and tags'),

-- 5. PROJECTS & TASK MANAGEMENT
('00000000-0000-0000-0000-000000000001', 'Creating and Managing Projects',
'**Creating a Project:**
1. Click "+ New Project" in the sidebar
2. Choose a template or start from scratch
3. Add project name, description, and cover image
4. Set project visibility (public or private)
5. Invite project members

**Project Templates:**
We offer templates for common workflows:
- Software Development (with sprints and backlogs)
- Marketing Campaign
- Product Launch
- Event Planning
- Content Calendar
- Sales Pipeline

**Project Views:**
Switch between different views to see your work differently:

**List View:**
- Traditional task list organized by sections
- Great for sequential workflows
- Drag and drop to reorder

**Board View:**
- Kanban-style columns
- Perfect for visualizing workflow stages
- Move tasks between columns as they progress

**Timeline View (Pro):**
- Gantt-style timeline
- See task dependencies and critical path
- Identify scheduling conflicts

**Calendar View:**
- Monthly or weekly calendar
- See tasks by due date
- Drag to reschedule

**Dashboard View (Pro):**
- High-level project overview
- Progress charts and metrics
- Workload distribution

**Managing Tasks:**
- Create tasks with title, description, assignee, due date
- Add subtasks for complex work
- Set priority levels (Low, Medium, High, Urgent)
- Add labels and tags for organization
- Attach files up to 100MB each
- @mention team members in comments
- Set recurring tasks (daily, weekly, monthly)'),

-- 6. NOTIFICATIONS & COMMUNICATION
('00000000-0000-0000-0000-000000000001', 'Notifications and Communication',
'**Notification Types:**

**In-App Notifications:**
- Red badge shows unread count
- Click the bell icon to view all notifications
- Mark as read or snooze for later

**Email Notifications:**
You''ll receive emails for:
- Task assignments
- @mentions in comments
- Task due date reminders (24 hours before)
- Project invitations
- Status updates

**Push Notifications (Mobile App):**
- Get instant alerts on your phone
- Customize what triggers a push notification
- Quiet hours to avoid notifications during off-hours

**Notification Settings:**
Go to Settings > Notifications to control:
- Which events trigger notifications
- Email vs push preferences
- Notification frequency (instant, hourly digest, daily digest)
- Do Not Disturb schedule

**Comments & Mentions:**
- Use @username to notify specific people
- Use @team to notify entire team
- Comments support markdown formatting
- Edit or delete your comments anytime
- React with emojis to comments

**Real-Time Collaboration:**
- See who''s viewing the same project (live presence)
- See typing indicators in comments
- Changes sync instantly across all devices'),

-- 7. INTEGRATIONS
('00000000-0000-0000-0000-000000000001', 'Integrations and Connections',
'TechFlow connects with your favorite tools to streamline your workflow.

**Available Integrations:**

**Communication:**
- **Slack**: Get task notifications in Slack channels, create tasks from Slack messages
- **Microsoft Teams**: Similar to Slack integration
- **Discord**: Task updates in Discord channels (Beta)

**File Storage:**
- **Google Drive**: Attach files directly from Drive, auto-sync uploads
- **Dropbox**: Link Dropbox files to tasks
- **OneDrive**: Microsoft cloud storage integration

**Development:**
- **GitHub**: Link commits and PRs to tasks, auto-update task status
- **GitLab**: Similar to GitHub integration
- **Jira**: Two-way sync with Jira issues (Enterprise only)

**Calendar:**
- **Google Calendar**: Sync task due dates to your calendar
- **Outlook Calendar**: Microsoft calendar integration
- **iCal**: Export to any calendar app

**Time Tracking:**
- **Toggl**: Track time directly on tasks
- **Harvest**: Time and expense tracking

**Other Tools:**
- **Zapier**: Connect with 3,000+ apps (Pro and Enterprise)
- **Webhooks**: Custom integrations via webhooks (Enterprise)
- **API**: Full REST API access (Enterprise)

**Setting Up Integrations:**
1. Go to Workspace Settings > Integrations
2. Find the app you want to connect
3. Click "Connect" and authorize access
4. Configure integration settings
5. Done! The integration is now active

**Troubleshooting:**
- Make sure you''re an Admin to set up workspace integrations
- Some integrations require Pro or Enterprise plans
- If an integration isn''t working, try disconnecting and reconnecting
- Check our Status Page for any service disruptions'),

-- 8. MOBILE APP
('00000000-0000-0000-0000-000000000001', 'Mobile App Guide',
'**TechFlow Mobile Apps:**
Available for iOS (iPhone/iPad) and Android devices.

**Download:**
- iOS: Search "TechFlow" in the App Store
- Android: Search "TechFlow" in Google Play Store
- Or visit techflow.io/mobile to get direct download links

**Mobile Features:**
- Access all your workspaces and projects
- Create, edit, and complete tasks on the go
- Add comments and file attachments
- Receive push notifications
- Offline mode: View tasks without internet (Pro only)
- Voice notes: Record audio notes for tasks
- Camera: Take photos and attach directly to tasks

**Mobile-Specific Features:**
- Quick Add: Shake your phone to quickly create a task
- Widget: Add TechFlow widget to your home screen for quick access
- Siri Shortcuts (iOS): "Hey Siri, add task to TechFlow"
- Dark Mode: Automatic or manual toggle

**Syncing:**
- All changes sync instantly when online
- Offline changes will sync when you reconnect
- Pull down to manually refresh

**Mobile Settings:**
- Enable biometric login (Face ID, Touch ID, fingerprint)
- Configure push notification preferences
- Set default workspace for quick add
- Manage offline storage'),

-- 9. SECURITY & PRIVACY
('00000000-0000-0000-0000-000000000001', 'Security and Privacy',
'At TechFlow, we take your security and privacy seriously.

**Data Security:**
- All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
- Hosted on AWS with SOC 2 Type II certified infrastructure
- Regular security audits by third-party firms
- Automated daily backups with 30-day retention
- 99.9% uptime SLA (Enterprise plan)

**Authentication:**
- Strong password requirements (min 12 characters)
- Two-Factor Authentication (2FA) available
- Single Sign-On (SSO) via Google, Microsoft, Okta (Enterprise)
- Session timeout after 30 days of inactivity

**Privacy:**
- We never sell your data to third parties
- GDPR, CCPA, and HIPAA compliant
- Data residency options (EU, US, Asia-Pacific)
- You own your data - export or delete anytime

**Access Controls:**
- Role-based permissions (Admin, Member, Guest)
- Project-level privacy settings
- IP whitelisting (Enterprise)
- Audit logs for compliance (Enterprise)

**Data Deletion:**
- Deleted items go to trash for 30 days
- Permanently delete from trash if needed
- Account deletion: 30-day grace period

**Reporting Security Issues:**
If you discover a security vulnerability:
- Email security@techflow.io
- We have a bug bounty program
- We''ll respond within 24 hours'),

-- 10. TROUBLESHOOTING & FAQ
('00000000-0000-0000-0000-000000000001', 'Common Issues and Solutions',
'**Login Issues:**

**Can''t remember password:**
- Click "Forgot Password" on login page
- Enter your email
- Check your email for reset link
- If you don''t receive it, check spam folder

**Two-Factor Authentication not working:**
- Make sure your device clock is accurate
- Try regenerating backup codes
- Contact support if still stuck

**Performance Issues:**

**App loading slowly:**
- Clear your browser cache and cookies
- Try a different browser (we recommend Chrome or Firefox)
- Disable browser extensions temporarily
- Check your internet connection

**Tasks not syncing:**
- Refresh the page (Cmd/Ctrl + R)
- Check if you''re offline
- Try logging out and back in
- Contact support if problem persists

**File Upload Issues:**

**Can''t upload files:**
- Check file size (max 100MB per file)
- Verify you haven''t reached storage limit
- Try a different file format
- Ensure stable internet connection

**Notification Issues:**

**Not receiving notifications:**
- Check notification settings in your profile
- Verify email isn''t going to spam
- For mobile: Check app notification permissions in phone settings
- Try turning notifications off and on again

**Billing Problems:**

**Payment declined:**
- Verify card details are correct
- Check if card has expired
- Ensure sufficient funds
- Try a different payment method
- Contact your bank - they might be blocking the charge

**Still Need Help?**
- Live Chat: Click the chat bubble (bottom right)
- Email: support@techflow.io
- Help Center: help.techflow.io
- Community Forum: community.techflow.io
- Response time: Usually within 2 hours'),

-- 11. KEYBOARD SHORTCUTS
('00000000-0000-0000-0000-000000000001', 'Keyboard Shortcuts',
'Work faster with keyboard shortcuts!

**Global Shortcuts:**
- `Cmd/Ctrl + K`: Quick search/command palette
- `C`: Create new task
- `P`: Create new project
- `I`: Open inbox/notifications
- `/`: Focus search bar
- `?`: Show all shortcuts

**Task Management:**
- `Enter`: Create new task
- `Cmd/Ctrl + Enter`: Complete task
- `E`: Edit selected task
- `Delete`: Delete selected task
- `Cmd/Ctrl + D`: Duplicate task
- `Tab`: Indent task (make subtask)
- `Shift + Tab`: Outdent task

**Navigation:**
- `↑↓`: Move between tasks
- `→`: Expand task
- `←`: Collapse task
- `Cmd/Ctrl + ↑`: Move task up
- `Cmd/Ctrl + ↓`: Move task down

**Views:**
- `Cmd/Ctrl + 1`: List view
- `Cmd/Ctrl + 2`: Board view
- `Cmd/Ctrl + 3`: Timeline view
- `Cmd/Ctrl + 4`: Calendar view

**Text Formatting (in comments):**
- `Cmd/Ctrl + B`: Bold
- `Cmd/Ctrl + I`: Italic
- `Cmd/Ctrl + K`: Insert link
- `@`: Mention someone
- `#`: Reference task

**Other:**
- `Cmd/Ctrl + Z`: Undo
- `Cmd/Ctrl + Shift + Z`: Redo
- `Esc`: Close modal/dialog
- `F`: Toggle full screen'),

-- 12. API DOCUMENTATION
('00000000-0000-0000-0000-000000000001', 'API Access and Documentation',
'**TechFlow REST API** (Enterprise Plan Only)

**Getting Started:**
- Generate API key: Settings > Developer > API Keys
- Base URL: `https://api.techflow.io/v1`
- Authentication: Bearer token in Authorization header
- Rate limits: 5,000 requests/hour

**Example Request:**
```
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.techflow.io/v1/tasks
```

**Available Endpoints:**

**Tasks:**
- `GET /tasks` - List all tasks
- `POST /tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

**Projects:**
- `GET /projects` - List all projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project details
- `PATCH /projects/:id` - Update project

**Workspaces:**
- `GET /workspaces` - List workspaces
- `GET /workspaces/:id/members` - List members

**Webhooks:**
Configure webhooks to receive real-time events:
- task.created
- task.updated
- task.completed
- task.deleted
- project.created

**Full Documentation:**
Visit developers.techflow.io for complete API reference, code examples, and SDKs (JavaScript, Python, Ruby).'),

-- 13. REFUND POLICY
('00000000-0000-0000-0000-000000000001', 'Refund and Cancellation Policy',
'**Free Trial:**
- 14-day free trial for Pro plan
- No credit card required
- Full access to all Pro features
- Automatically expires if not converted

**Cancellation:**
You can cancel your subscription anytime:
- Go to Settings > Billing > Cancel Subscription
- Your plan remains active until the end of billing period
- You can continue using TechFlow until then
- No cancellation fees

**Refunds:**

**Monthly Plans:**
- No refunds on monthly subscriptions
- Cancel anytime to avoid next month''s charge
- Access continues until end of paid period

**Annual Plans:**
- Full refund if canceled within 30 days of purchase
- After 30 days: Prorated refund for unused months
- Request refund via Settings > Billing > Request Refund

**How Long Do Refunds Take:**
- Refunds are processed within 5-7 business days
- Funds appear in your account based on your bank (usually 3-5 days)

**Downgrading:**
- Downgrade anytime from Pro to Free
- Changes take effect at next billing cycle
- Prorated credits applied to your account

**Data After Cancellation:**
- Free plan: Keep all data (with Free plan limits)
- Paid plan cancelled: Data retained for 90 days
- Account deleted: Data permanently deleted after 30 days

**Questions?**
Contact billing@techflow.io or chat with our support team.'),

-- 14. TEMPLATES & AUTOMATION
('00000000-0000-0000-0000-000000000001', 'Project Templates and Automation',
'**Using Project Templates:**

**Built-in Templates:**
We provide templates for common use cases:
- Agile Sprint Planning
- Marketing Campaign
- Product Launch
- Event Planning
- Content Calendar
- Sales Pipeline
- Bug Tracking
- Onboarding Checklist

**Creating Custom Templates:**
1. Set up a project exactly how you want it
2. Click Project Menu > Save as Template
3. Name your template
4. Choose what to include (tasks, sections, assignees, due dates)
5. Template is now available for reuse

**Task Automation (Pro Plan):**

**Rules:**
Create custom automation rules:
- When task is completed → Move to "Done" section
- When task is assigned to me → Send notification
- When due date is tomorrow → Change priority to High
- When task is moved to "In Review" → Assign to manager

**Setting Up Rules:**
1. Go to Project Settings > Automation
2. Click "Create Rule"
3. Set trigger: When [event] happens
4. Set action: Do [action]
5. Save and activate

**Recurring Tasks:**
Set tasks to repeat automatically:
- Daily: "Check emails"
- Weekly: "Team standup meeting"
- Monthly: "Send invoice"
- Custom: Every 2 weeks on Monday

**Workflow Automation Examples:**

**Bug Triage:**
- Trigger: New task in "Bugs" project
- Action: Automatically assign to QA lead, add "needs-triage" label

**Content Publishing:**
- Trigger: Task moved to "Published"
- Action: Create follow-up task for social media promotion

**Escalation:**
- Trigger: Task overdue by 3 days
- Action: Escalate to project manager, change priority to Urgent'),

-- 15. REPORTS & ANALYTICS
('00000000-0000-0000-0000-000000000001', 'Reports and Analytics',
'**Available Reports (Pro and Enterprise):**

**Project Overview:**
- Task completion rate
- Tasks by status (To Do, In Progress, Done)
- Overdue tasks
- Upcoming deadlines
- Project velocity (tasks completed over time)

**Team Performance:**
- Workload distribution (tasks per team member)
- Individual completion rates
- Average task completion time
- Active vs completed tasks per person

**Time Tracking:**
- Time spent per project
- Time spent per task
- Team member time logs
- Billable vs non-billable hours

**Custom Reports:**
Create custom reports by:
1. Go to Analytics > Custom Reports
2. Select metrics to track
3. Choose filters (date range, team members, projects)
4. Save report for future use
5. Schedule email delivery (daily/weekly/monthly)

**Exporting Data:**
- Export to CSV or Excel
- Share reports via link
- Schedule automated email reports
- Connect to BI tools via API (Enterprise)

**Dashboard Widgets:**
Add widgets to your project dashboard:
- Burndown chart
- Task completion trend
- Team workload chart
- Priority distribution
- Label distribution
- Custom metric widgets

**Insights (Enterprise):**
AI-powered insights:
- Identify bottlenecks in workflow
- Predict project completion dates
- Flag at-risk tasks
- Suggest resource reallocation');

-- Success message
SELECT 'Knowledge base seeded successfully! TechFlow is ready for testing.' AS status;
