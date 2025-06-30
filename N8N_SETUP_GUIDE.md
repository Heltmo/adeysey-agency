# 🔗 n8n Integration Setup Guide

## Complete Multi-Step Lead Capture + n8n Automation System

This guide shows you how to integrate your ADEYSEY MEDIA website with n8n for automated lead processing, CRM integration, and intelligent routing.

---

## 🏗️ **System Architecture**

```
Website Form → n8n Webhook → Lead Processing → CRM/Email/Slack
     ↓
Multi-Step Capture:
1. Email Collection
2. Phone Number (optional)
3. User Type Selection (Brand/Creator)
4. Creator Platform Details (if creator)
5. Automated n8n Processing
```

---

## 🚀 **Quick Setup (5 minutes)**

### **Step 1: Set Up n8n Instance**

**Option A: n8n Cloud (Recommended)**
1. Go to [n8n.cloud](https://n8n.cloud)
2. Create account and workspace
3. Get your webhook URL: `https://[your-workspace].app.n8n.cloud/webhook/`

**Option B: Self-Hosted**
```bash
# Docker setup
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

# Visit http://localhost:5678
```

### **Step 2: Import Workflows**

1. In n8n, go to **Workflows** → **Import from File**
2. Import both workflow files:
   - `n8n-workflows/brand-lead-automation.json`
   - `n8n-workflows/creator-lead-automation.json`

### **Step 3: Configure Environment Variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update with your n8n webhook URL:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-workspace.app.n8n.cloud/webhook/lead-capture
```

### **Step 4: Test Integration**

1. Visit your website with `?test=true`
2. Complete the lead capture form
3. Check n8n execution log for successful webhook receipt

---

## 📋 **Detailed Workflow Configurations**

### **🎯 Brand Lead Automation Workflow**

**Webhook Endpoint:** `/webhook/lead-capture`

**Flow:**
```
Lead Capture → Validate Brand Type → Enrich Data → HubSpot CRM → Calendly Booking → Welcome Email → Slack Alert → Response
```

**Required Integrations:**
- **HubSpot CRM**: Contact creation and lead tracking
- **Calendly API**: Automatic booking link generation
- **Email Service**: Welcome email with booking link
- **Slack**: Sales team notifications

**Key Features:**
- ✅ Lead scoring based on email domain, phone, A/B variant
- ✅ Business email detection (auto-higher priority)
- ✅ Automatic calendar booking link generation
- ✅ CRM integration with lead enrichment
- ✅ Real-time sales team notifications

### **🎨 Creator Lead Automation Workflow**

**Webhook Endpoint:** `/webhook/creator-intake`

**Flow:**
```
Creator Application → Validate Creator Type → Score & Qualify → Airtable Database → Auto-Approve/Review → Email → Slack → Response
```

**Required Integrations:**
- **Airtable**: Creator database and application tracking
- **Email Service**: Approval/review notifications
- **Slack**: Creator team notifications

**Key Features:**
- ✅ Creator scoring algorithm (platform count, followers, email quality)
- ✅ Auto-approval for high-scoring creators (80+ score)
- ✅ Tier assignment (Bronze, Silver, Gold, Platinum)
- ✅ Platform-specific follower analysis
- ✅ Referral source tracking

---

## 🔧 **Integration Setup Details**

### **HubSpot CRM Integration**

**Required for:** Brand leads
**Setup:**
1. Get HubSpot API key from [HubSpot Developer Portal](https://developers.hubspot.com/)
2. In n8n: **Settings** → **Credentials** → Add **HubSpot API**
3. Configure the "Add to HubSpot CRM" node

**Data Sent:**
- Email, Phone, Name
- Lead source, score, priority
- A/B test variant
- Custom properties for tracking

### **Calendly Integration**

**Required for:** Brand booking automation
**Setup:**
1. Get Calendly Personal Access Token from [Calendly Developer Portal](https://calendly.com/integrations/api_webhooks)
2. In n8n: **Settings** → **Credentials** → Add **HTTP Header Auth**
3. Configure Authorization header: `Bearer YOUR_TOKEN`

**Features:**
- Auto-generates personalized booking links
- Includes booking URL in welcome email
- Tracks booking completion

### **Airtable Integration**

**Required for:** Creator database
**Setup:**
1. Get Airtable API key from [Airtable Account](https://airtable.com/account)
2. Create base with "Creators" table
3. In n8n: Configure Airtable node with API key and base ID

**Table Structure:**
```
Creators Table:
- Name (Text)
- Email (Email)
- Phone (Phone)
- Platforms (Multiple select)
- Creator Score (Number)
- Tier (Single select: Bronze, Silver, Gold, Platinum)
- Status (Single select: Pending, Approved, Rejected)
- Total Followers (Number)
- Platform Count (Number)
- Referral Source (Text)
- A/B Variant (Text)
- Created At (Date)
```

### **Email Service Integration**

**Required for:** All email notifications
**Options:**

**Option A: Gmail SMTP**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**Option B: SendGrid**
```
SENDGRID_API_KEY=your_sendgrid_api_key
```

**Option C: Mailgun**
```
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_domain.com
```

### **Slack Integration**

**Required for:** Team notifications
**Setup:**
1. Create Slack app at [api.slack.com](https://api.slack.com)
2. Get webhook URL for your channel
3. Configure Slack nodes with webhook URL

**Notifications:**
- Brand leads → `#sales-leads` channel
- Creator applications → `#creator-applications` channel

---

## 📊 **Lead Scoring Algorithm**

### **Brand Lead Scoring:**
```javascript
Base Score: 0

Email Domain:
+ 30 points: Business email (not gmail/yahoo/hotmail)
+ 0 points: Personal email

Phone Provided:
+ 20 points: Phone number included

A/B Test Variant:
+ 15 points: ROI-focused headline
+ 10 points: Performance-focused headline
+ 5 points: Speed-focused headline
+ 0 points: Original headline

Priority Assignment:
- High Priority: 50+ points
- Medium Priority: 30-49 points
- Low Priority: 0-29 points
```

### **Creator Scoring Algorithm:**
```javascript
Base Score: 0

Follower Ranges (per platform):
+ 40 points: 10K-100K (Micro-influencer sweet spot)
+ 35 points: 100K-1M (Macro-influencer)
+ 30 points: 1K-10K (Nano-influencer)
+ 25 points: 1M+ (Mega-influencer)

Platform Diversity:
+ 20 points: 3+ platforms
+ 10 points: 2 platforms
+ 0 points: 1 platform

Email Quality:
+ 10 points: Business email

Phone Provided:
+ 15 points: Phone number included

Referral Source:
+ 15 points: Industry Event
+ 10 points: Friend/Colleague Referral
+ 5 points: Other sources

Tier Assignment:
- Platinum (80+ points): Auto-approve, premium opportunities
- Gold (60-79 points): Auto-approve, standard opportunities
- Silver (40-59 points): Manual review required
- Bronze (0-39 points): Manual review required
```

---

## 🧪 **Testing Your Integration**

### **Test Brand Lead Flow:**
```javascript
// Test payload
{
  "email": "john.doe@company.com",
  "phone": "+1-555-123-4567",
  "userType": "brand",
  "headlineVariant": "roi-focused",
  "source": "website",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Expected Results:**
1. ✅ HubSpot contact created
2. ✅ Calendly booking link generated
3. ✅ Welcome email sent with booking link
4. ✅ Slack notification to sales team
5. ✅ Success response returned

### **Test Creator Lead Flow:**
```javascript
// Test payload
{
  "email": "sarah.creator@gmail.com",
  "phone": "+1-555-987-6543",
  "userType": "creator",
  "name": "Sarah Johnson",
  "platforms": ["instagram", "tiktok"],
  "platformDetails": {
    "instagram": {
      "username": "@sarahjohnson",
      "followerCount": "10K - 100K (Micro-influencer)"
    },
    "tiktok": {
      "username": "@sarahjcreates",
      "followerCount": "10K - 100K (Micro-influencer)"
    }
  },
  "referralSource": "Friend/Colleague Referral",
  "source": "website"
}
```

**Expected Results:**
1. ✅ Creator scored: ~95 points (Platinum tier)
2. ✅ Auto-approved due to high score
3. ✅ Added to Airtable creator database
4. ✅ Approval email sent
5. ✅ Slack notification to creator team

---

## 🚨 **Troubleshooting**

### **Common Issues:**

**❌ Webhook not receiving data**
- Check CORS settings in n8n
- Verify webhook URL in environment variables
- Ensure webhook is activated in n8n

**❌ HubSpot integration failing**
- Verify API key has proper permissions
- Check HubSpot rate limits
- Ensure required fields are mapped correctly

**❌ Email not sending**
- Check SMTP credentials
- Verify email templates are valid HTML
- Check spam folders

**❌ Airtable errors**
- Verify base ID and table name
- Check API key permissions
- Ensure field names match exactly

### **Debug Mode:**

Add `?test=true&debug=true` to your website URL to see:
- Form completion times
- Data being sent to n8n
- Webhook response details
- Analytics events firing

---

## 📈 **Analytics & Monitoring**

### **Key Metrics to Track:**

**Lead Quality:**
- Lead score distribution
- Email domain types (business vs personal)
- Form completion rates by step
- A/B test variant performance

**Conversion Tracking:**
- Brand leads → Booking completion
- Creator applications → Approval rate
- Time from application to first brand match

**System Performance:**
- Webhook response times
- Email delivery rates
- CRM sync success rates
- Error rates by integration

### **n8n Monitoring:**

1. **Execution History**: Monitor workflow success/failure rates
2. **Error Logs**: Set up error notifications
3. **Performance**: Track execution times
4. **Alerts**: Configure Slack alerts for failed workflows

---

## 🔄 **Advanced Automations**

### **Follow-up Sequences:**

**Brand Follow-up (if no booking within 24h):**
```
Day 1: Reminder email with booking link
Day 3: Case study email with social proof
Day 7: Final follow-up with limited-time offer
```

**Creator Nurturing:**
```
Approved creators: Weekly brand opportunity emails
Pending creators: Application status updates
Rejected creators: Feedback and improvement tips
```

### **Lead Enrichment:**

**For Brands:**
- Company size lookup (via Clearbit/ZoomInfo)
- Industry classification
- Social media presence analysis

**For Creators:**
- Engagement rate calculation
- Audience demographics lookup
- Brand partnership history

---

## 🔐 **Security Best Practices**

1. **Environment Variables**: Never commit API keys to code
2. **Webhook Security**: Use HTTPS only, consider webhook signatures
3. **Data Privacy**: GDPR/CCPA compliance for user data
4. **Rate Limiting**: Implement to prevent abuse
5. **Error Handling**: Don't expose sensitive data in error messages

---

## 📞 **Support & Resources**

**n8n Resources:**
- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [Workflow Templates](https://n8n.io/workflows/)

**Integration Docs:**
- [HubSpot API](https://developers.hubspot.com/docs/api/overview)
- [Calendly API](https://calendly.com/integrations/api_webhooks)
- [Airtable API](https://airtable.com/developers/web/api/introduction)

**Need Help?**
- Add `?test=true&debug=true&admin=true` to your URL for full debug mode
- Check n8n execution logs for webhook details
- Verify environment variables are set correctly

---

🎉 **Your multi-step lead capture system with intelligent n8n automation is ready to convert and nurture leads automatically!**
