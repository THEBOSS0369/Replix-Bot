#!/bin/bash

# TechFlow Knowledge Base Setup Script
# This script seeds the database with comprehensive test data

echo "🚀 Setting up TechFlow Knowledge Base..."
echo ""

# Check if we're using Supabase or local Postgres
if command -v psql &> /dev/null; then
    echo "📊 Detected PostgreSQL - Using local database"
    echo "Running seed script..."
    psql -d repllix -f scripts/seed-knowledge-base.sql
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Knowledge base seeded successfully!"
        echo ""
        echo "📚 Added 15 comprehensive articles about TechFlow:"
        echo "   - Getting Started & Onboarding"
        echo "   - Pricing & Plans"
        echo "   - Account Management"
        echo "   - Team & Workspace Management"
        echo "   - Projects & Task Management"
        echo "   - Notifications & Communication"
        echo "   - Integrations"
        echo "   - Mobile App Guide"
        echo "   - Security & Privacy"
        echo "   - Troubleshooting & FAQ"
        echo "   - Keyboard Shortcuts"
        echo "   - API Documentation"
        echo "   - Refund Policy"
        echo "   - Templates & Automation"
        echo "   - Reports & Analytics"
        echo ""
        echo "🎯 Ready to test! Try asking the agent questions like:"
        echo "   - 'How much does TechFlow cost?'"
        echo "   - 'How do I invite team members?'"
        echo "   - 'What integrations do you support?'"
        echo "   - 'Can I get a refund?'"
        echo "   - 'How do I set up automation?'"
    else
        echo "❌ Error seeding database. Please check the error message above."
        exit 1
    fi
else
    echo "⚠️  PostgreSQL not found. Using Supabase..."
    echo ""
    echo "To seed Supabase knowledge base:"
    echo "1. Go to your Supabase project dashboard"
    echo "2. Click 'SQL Editor' in the sidebar"
    echo "3. Create a new query"
    echo "4. Copy and paste the contents of: scripts/seed-knowledge-base.sql"
    echo "5. Click 'Run'"
    echo ""
    echo "Or use the Supabase CLI:"
    echo "  supabase db push --db-url 'your-supabase-connection-string' < scripts/seed-knowledge-base.sql"
fi
