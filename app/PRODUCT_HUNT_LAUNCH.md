# Product Hunt Launch Guide - APIShift

## 📋 Quick Launch Checklist

- [ ] Create Product Hunt account (if you don't have one)
- [ ] Prepare all assets (screenshots, GIF, logo)
- [ ] Write maker's first comment
- [ ] Schedule launch for Tuesday-Thursday, 12:01 AM PST
- [ ] Notify team and supporters 24 hours before
- [ ] Prepare response templates
- [ ] Set up monitoring for comments/questions
- [ ] Have team ready to upvote and comment within first hour

---

## 🎯 Product Hunt Submission Details

### Tagline (60 characters max)
**Primary Option:**
```
Catch breaking API changes before they break production
```
(57 characters)

**Alternative Options:**
```
Real-time API monitoring that prevents production disasters
```
(59 characters)

```
Stop API changes from breaking your app in production
```
(54 characters)

### Short Description (260 characters max)
```
APIShift monitors your APIs in real-time and alerts you instantly when schemas change. Prevent production disasters by catching breaking changes before your customers do. From payment gateways to auth systems, never miss a critical API update again.
```
(254 characters)

### Full Description

```markdown
## The Problem
Third-party API changes break production apps every day. A payment provider updates their response structure without notice. Your checkout breaks. Customers complain. Revenue is lost.

## The Solution
APIShift monitors your critical APIs 24/7, detecting schema changes within minutes. Get instant alerts through Slack, email, or webhooks when something changes.

## Key Features
✅ Real-time schema diff detection
✅ Multi-channel alerts (Slack, Email, Discord, PagerDuty)
✅ Historical change tracking with snapshot comparisons
✅ Severity classification (CRITICAL, HIGH, MEDIUM, LOW)
✅ Support for REST, GraphQL, and gRPC APIs
✅ Team collaboration with shared dashboards

## Perfect For
- SaaS companies using third-party APIs
- E-commerce sites with payment/shipping integrations
- Microservices teams managing internal APIs
- Developers who've been burned by API changes before

## Pricing
- Free Plan: 3 APIs, hourly monitoring
- Pro ($29/mo): 10 APIs, 15-minute checks
- Team ($99/mo): 50 APIs, 5-minute checks
- Enterprise: Custom everything

Stop breaking changes from breaking your app. Start monitoring free today.
```

### Topics/Categories (Choose 5)
1. Developer Tools
2. API
3. Monitoring
4. SaaS
5. Productivity

---

## 🖼️ Visual Assets Needed

### 1. Product Icon/Logo
- **Size:** 240x240px minimum
- **Format:** PNG with transparent background
- **What to show:** APIShift logo (lightning bolt icon)

### 2. Gallery Images (Recommended: 5-8 images)

**Image 1: Hero/Cover (Required)**
- Screenshot of the live demo section from homepage
- Shows: Terminal with breaking change detection
- Highlight: Before/After JSON comparison with alerts

**Image 2: Dashboard Overview**
- Screenshot of `/dashboard` page
- Shows: Multiple APIs being monitored with status indicators
- Highlight: Clean, intuitive interface

**Image 3: Change Detection Detail**
- Screenshot of a change detail view
- Shows: Detailed diff with severity classification
- Highlight: Visual schema comparison

**Image 4: Alert Configuration**
- Screenshot of notification settings
- Shows: Multiple alert channels (Slack, Email, Webhooks)
- Highlight: Easy integration setup

**Image 5: Historical Changes**
- Screenshot of change history timeline
- Shows: All changes for an API over time
- Highlight: Complete audit trail

**Image 6: Pricing Page**
- Screenshot of `/pricing` page
- Shows: Clear pricing tiers
- Highlight: Free plan available

### 3. Demo GIF (Highly Recommended)
**Duration:** 10-15 seconds
**What to show:**
1. API endpoint being added (2s)
2. Initial snapshot being taken (2s)
3. Simulated API change (3s)
4. Alert notification appearing (3s)
5. Viewing the detailed diff (3s)

**Tool Recommendations:**
- ScreenToGif (Windows)
- Kap (macOS)
- Peek (Linux)
- LICEcap (Cross-platform)

---

## 💬 Maker's First Comment Template

Post this within 5 minutes of launch:

```
Hey Product Hunt! 👋

I'm [Your Name], maker of APIShift.

I built this because I've been burned too many times by surprise API changes. Last year, a payment provider changed their response structure without notice. Our checkout broke for 3 hours before we noticed. Cost us thousands in lost revenue and customer trust.

Turns out this happens ALL THE TIME:
- Stripe updates their API
- Twilio changes their response format
- Your internal microservice team pushes a breaking change
- A third-party shipping API adds required fields

APIShift solves this by:
✅ Monitoring APIs every 5-60 minutes
✅ Detecting ANY schema change (fields added/removed/changed)
✅ Alerting you instantly via Slack/Email/PagerDuty
✅ Showing you exactly what changed with visual diffs

## What makes it different?
Unlike basic uptime monitors, we do DEEP schema analysis. We catch:
- Field renames (amount → payment_details.amount)
- Type changes (string → number)
- Required field additions
- Nested object restructuring
- Array structure changes

## How it works:
1. Add your API endpoint (30 seconds)
2. We take initial snapshot
3. Monitor on your schedule (every 5 min to every hour)
4. Get alerted when ANYTHING changes
5. Review detailed before/after comparison

## Free Plan:
- 3 APIs monitored
- Hourly checks
- Email alerts
- 7-day history
- No credit card required

Perfect for side projects and testing it out!

## What I'd love feedback on:
- What other integrations would you like? (GitHub, Jira, Teams?)
- Would you find a "public API monitoring" page useful? (Monitor Stripe, Twilio, etc. for everyone)
- What pricing makes sense to you?

Happy to answer any questions! 🚀

Try it free: https://www.apishift.site
```

---

## 🎯 Launch Strategy

### Best Time to Launch
- **Days:** Tuesday, Wednesday, or Thursday
- **Time:** 12:01 AM PST (very beginning of the day)
- **Why:** Maximum 24-hour visibility, avoids weekend low traffic
- **Avoid:** Mondays (people catching up), Fridays (weekend prep), actual weekends

### Pre-Launch (1 week before)
- [ ] Join Product Hunt and engage with other launches
- [ ] Build karma by commenting/upvoting on other products
- [ ] Identify potential "Hunter" (someone with PH following to submit your product)
- [ ] Prepare email list announcement
- [ ] Create social media posts (Twitter, LinkedIn)
- [ ] Notify team members to be ready

### Pre-Launch (24 hours before)
- [ ] Send email to supporters: "We're launching tomorrow, would love your support!"
- [ ] Post on social media about tomorrow's launch
- [ ] Have all assets ready and uploaded
- [ ] Brief team on response strategy
- [ ] Prepare Q&A document for common questions

### Launch Day - First Hour (CRITICAL)
- [ ] Submit product at 12:01 AM PST
- [ ] Post maker's first comment immediately
- [ ] Share launch link with team
- [ ] Team upvotes and comments (within 15 minutes)
- [ ] Share on Twitter, LinkedIn, Facebook
- [ ] Email your list with launch announcement
- [ ] Post in relevant Slack/Discord communities (without spam)
- [ ] Respond to EVERY comment within 10 minutes

### Launch Day - Throughout Day
- [ ] Check Product Hunt every 30 minutes
- [ ] Respond to all comments/questions quickly (< 15 min)
- [ ] Share updates on social media
- [ ] Engage with people who upvoted (check their profiles, follow them)
- [ ] Monitor analytics to see traffic spike
- [ ] Screenshot milestone moments (100 upvotes, #1 of the day, etc.)

### Post-Launch (Next Day)
- [ ] Thank everyone in a final comment
- [ ] Share results on social media
- [ ] Follow up with engaged users via email
- [ ] Analyze what worked/didn't work
- [ ] Continue engaging with late comments

---

## 💡 Response Templates

### For General Praise
```
Thanks so much! 🙏 Really appreciate the support. Let me know if you have any questions about how it works!
```

### For Questions About Pricing
```
Great question! The free plan is truly free forever - 3 APIs with hourly monitoring.

For production use cases, Pro ($29/mo) gets you 10 APIs with 15-minute checks. Most teams find this is the sweet spot.

Happy to discuss custom plans if you need more! What's your use case?
```

### For Feature Requests
```
Love this idea! 🎯 We're building our roadmap based on user feedback.

Mind if I ask - what's your specific use case for this? Would help us prioritize correctly.

Also, feel free to drop your email and I'll notify you when we ship it!
```

### For Comparison Questions ("How is this different from X?")
```
Great question! Here's how we differ from [competitor]:

1. [Key difference 1]
2. [Key difference 2]
3. [Key difference 3]

We focus specifically on schema change detection, not just uptime. Think of us as "git diff" for APIs.

Happy to chat more if you want to dive deeper!
```

### For Technical Questions
```
Great technical question! [Detailed answer]

We use [technology/approach] to ensure [benefit].

Want to see it in action? The free plan is a great way to test drive it: https://www.apishift.site

Or I can set up a quick call to show you exactly how it works!
```

### For Skepticism/Concerns
```
Totally valid concern! Let me address this:

[Specific answer to their concern]

We built this because we've experienced [pain point] firsthand.

Happy to show you a demo or answer any other questions you have!
```

---

## 📊 Success Metrics

### Great Launch
- 200+ upvotes
- Top 5 product of the day
- 50+ comments
- 10+ sign-ups from PH traffic

### Amazing Launch
- 400+ upvotes
- #1 product of the day
- 100+ comments
- 30+ sign-ups
- Featured in PH newsletter

### Goals
- [ ] Get Product of the Day badge
- [ ] Reach top 3
- [ ] Get 300+ upvotes
- [ ] Convert 20+ sign-ups from PH
- [ ] Get 50+ comments/engagement
- [ ] Get featured in PH weekly newsletter

---

## 🔗 Links to Include

Everywhere you post, include:
- **Website:** https://www.apishift.site
- **Product Hunt:** [URL after launch]
- **Twitter:** [Your Twitter handle]
- **Demo:** Link to blog post "5 Real Cases Where API Changes Broke Production" for context

---

## 📱 Social Media Posts

### Twitter Launch Thread

**Tweet 1:**
```
🚀 We just launched APIShift on @ProductHunt!

Stop API changes from breaking your production app.

Real-time monitoring + instant alerts when any API schema changes.

We're live NOW 👉 [PH link]

Would love your support! 🙏
```

**Tweet 2:**
```
Why we built this:

Last year, a payment API changed their response structure without notice.

Our checkout broke. 3 hours of downtime. Thousands in lost revenue.

Never again.

APIShift monitors APIs 24/7 and alerts you the MOMENT something changes.
```

**Tweet 3:**
```
How it works:

1️⃣ Add API endpoint (30 sec)
2️⃣ We take snapshot
3️⃣ Monitor every 5-60 min
4️⃣ Get alerted on changes
5️⃣ Review before/after diff

Free plan: 3 APIs, no credit card

Try it: https://www.apishift.site
```

### LinkedIn Post
```
Excited to share what we've been building! 🚀

APIShift just launched on Product Hunt - real-time API monitoring that catches breaking changes before they break production.

The Problem:
Third-party APIs change without notice. Payment providers update response structures. Auth systems rename fields. Your app breaks. Customers complain.

The Solution:
APIShift monitors critical APIs 24/7, detecting schema changes within minutes. Get instant Slack/email alerts when something changes.

Key Features:
✅ Deep schema diff analysis
✅ Multi-channel alerts (Slack, Email, PagerDuty)
✅ Historical tracking with snapshots
✅ Severity classification
✅ Support for REST, GraphQL, gRPC

Perfect for SaaS companies, e-commerce sites, and microservices teams.

Free plan available - 3 APIs with hourly monitoring. No credit card required.

Check it out and let me know what you think! 👇
https://www.apishift.site

[Link to Product Hunt launch]

#APIMonitoring #DevTools #SaaS #ProductLaunch
```

---

## ❓ FAQ - Prepare Answers

### Q: How is this different from uptime monitoring?
**A:** Uptime monitors check if your API is responding (200 OK). We check if the SCHEMA changed. Your API can be "up" but return completely different data that breaks your app. We catch those changes.

### Q: What about false positives?
**A:** We use smart diffing algorithms and let you set severity thresholds. You can configure what types of changes trigger alerts (e.g., only CRITICAL and HIGH). Field additions are usually LOW severity, field removals are CRITICAL.

### Q: Do you store our API responses?
**A:** We store only the schema structure (field names, types, nesting), not the actual data values. All credentials are encrypted at rest. SOC 2 compliant.

### Q: Can I monitor GraphQL/gRPC?
**A:** Yes! We support REST, GraphQL, and gRPC. Each has specialized schema detection.

### Q: What if the API requires authentication?
**A:** You can configure headers (API keys, Bearer tokens) and we'll include them in monitoring requests. All credentials encrypted.

### Q: How fast do you detect changes?
**A:** Free plan: hourly checks. Pro: every 15 minutes. Team: every 5 minutes. Enterprise: every minute. Detection happens within one check interval.

### Q: Can I try before paying?
**A:** Absolutely! Free plan includes 3 APIs with hourly monitoring forever. No credit card required.

### Q: Do you offer refunds?
**A:** Yes, 30-day money-back guarantee on all paid plans. No questions asked.

---

## 🎁 Special Product Hunt Offer (Optional)

Consider offering a special discount for Product Hunt users:

```
🎉 Product Hunt Special: 40% off first 3 months!

Use code: PRODUCTHUNT40

Valid for 72 hours only.
```

Add this to your maker's comment and responses.

---

## 📈 Post-Launch Action Items

After the launch:

1. **Send Thank You Email** to supporters
2. **Write Medium/Blog Post** about the launch experience
3. **Share Results** on Twitter/LinkedIn (transparency builds trust)
4. **Follow Up** with engaged users who didn't sign up
5. **Analyze Traffic** - which PH users signed up? what did they say?
6. **Update Roadmap** based on feedback received
7. **Apply for PH Badges** (Golden Kitty nominations, etc.)

---

## 🚀 You've Got This!

Product Hunt can be a great source of early users and feedback. Key success factors:

1. **Be Present:** Respond to every comment quickly
2. **Be Genuine:** People can tell when you care
3. **Be Helpful:** Answer questions thoroughly
4. **Show Personality:** Don't be a robot, be human
5. **Follow Up:** The launch day is just the beginning

Good luck! 🎯

---

**Last Updated:** 2026-01-05
**Launch Checklist Owner:** [Your Name]
**Target Launch Date:** [TBD - Pick a Tuesday/Wednesday/Thursday]
