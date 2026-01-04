# Product Hunt Visual Assets Guide

## 🎨 Required Assets Checklist

- [ ] Product Icon (240x240px)
- [ ] Gallery Image 1: Hero/Cover (required)
- [ ] Gallery Image 2: Dashboard Overview
- [ ] Gallery Image 3: Change Detection Detail
- [ ] Gallery Image 4: Alert Configuration
- [ ] Gallery Image 5: Historical Timeline
- [ ] Gallery Image 6: Pricing Page
- [ ] Demo GIF (optional but highly recommended)

---

## 📐 Technical Specifications

### Product Icon
- **Size:** 240x240px minimum (PNG)
- **Format:** PNG with transparent background
- **File size:** Under 500KB
- **What to use:** Your logo (lightning bolt icon from the site)

### Gallery Images
- **Recommended size:** 1920x1080px (16:9 ratio)
- **Minimum size:** 1200x675px
- **Format:** PNG or JPEG
- **File size:** Under 5MB each
- **Quantity:** 5-8 images recommended

### Demo GIF
- **Max size:** 25MB
- **Format:** GIF or MP4
- **Duration:** 10-15 seconds
- **Recommended dimensions:** 1280x720px or 1920x1080px

---

## 📸 Screenshot Capture Instructions

### Tools You'll Need
- **macOS:** Cmd + Shift + 4 (or use CleanShot X for better quality)
- **Windows:** Snipping Tool or Greenshot
- **Chrome Extension:** Awesome Screenshot (for full-page captures)

### Pre-Screenshot Setup
1. **Clear browser cache** to ensure clean state
2. **Use incognito/private mode** for no extensions
3. **Set browser zoom to 100%**
4. **Use browser window size:** 1920x1080px
5. **Hide bookmarks bar**
6. **Use light mode** (better for PH visibility)

---

## 🖼️ Image 1: Hero/Cover (REQUIRED)

**Purpose:** First impression - show the main value proposition

**What to Capture:**
- Navigate to: `https://www.apishift.site`
- Scroll to the "Demo/Screenshot Section" (lines 129-194 in page.tsx)
- This shows the terminal with breaking change detection

**Screenshot Instructions:**
1. Open homepage in incognito mode
2. Scroll to terminal demo section
3. Make sure full terminal is visible including:
   - macOS-style window buttons (red, yellow, green)
   - "Breaking change detected" header
   - Before/After JSON comparison
   - Impact analysis box
   - Notification badges (Slack, Email, PagerDuty)
4. Capture entire section with some padding above/below

**Annotations to Add (use Figma, Canva, or Photoshop):**
- Add arrow pointing to "amount" field with text: "Field moved → Instant alert"
- Highlight the severity "CRITICAL" in red
- Add subtle glow around notification badges

**File name:** `01-hero-terminal-demo.png`

---

## 🖼️ Image 2: Dashboard Overview

**Purpose:** Show the main interface where users spend time

**What to Capture:**
- Navigate to: `https://www.apishift.site/dashboard` (when logged in)
- Or create a mockup showing:
  - List of 4-5 APIs being monitored
  - Status indicators (green checkmarks for healthy, red for changes detected)
  - Last checked timestamps
  - Quick stats at top (Total APIs, Active Monitors, Changes This Week)

**Screenshot Instructions:**
1. If you have a staging/demo account:
   - Log in to dashboard
   - Add 4-5 sample APIs with different names:
     - Stripe Payment API
     - SendGrid Email API
     - Twilio SMS API
     - Shopify Products API
     - Internal Auth Service
   - Capture the overview screen

2. If not, create a Figma mockup showing:
   - Clean table/card layout
   - API names with logos/icons
   - Status badges
   - "View Changes" buttons

**Annotations:**
- Add callout: "Monitor unlimited third-party APIs"
- Highlight one API with status: "Last checked: 2 minutes ago ✓"

**File name:** `02-dashboard-overview.png`

---

## 🖼️ Image 3: Change Detection Detail

**Purpose:** Show the core feature - detailed schema diff

**What to Capture:**
- A detailed view of a detected change showing:
  - Side-by-side JSON comparison
  - Visual diff highlighting (red for removed, green for added)
  - Severity badge
  - Timestamp
  - Affected fields list

**Screenshot Instructions:**
1. Navigate to a change detail page (if available in your app)
2. Or create a mockup showing:

```
┌─────────────────────────────────────────────────────┐
│ Change Detected - Stripe Payment API                │
│ 🔴 CRITICAL                                         │
│ Detected: Jan 5, 2026 at 2:34 PM                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Before (v1.2.0)          After (v1.2.1)           │
│  ───────────────          ────────────────          │
│  {                        {                         │
│    "id": "tx_123",          "id": "tx_123",        │
│ -  "amount": 2999,         "payment_details": {    │
│    "currency": "usd"    +    "amount": 2999,       │
│  }                       +    "currency": "usd"    │
│                             },                      │
│                          }                          │
│                                                      │
│  Breaking Changes:                                  │
│  • Field "amount" moved to "payment_details.amount"│
│  • Field "currency" moved to nested object         │
│                                                      │
│  Impact: HIGH                                       │
│  All consumers parsing response.amount will fail    │
└─────────────────────────────────────────────────────┘
```

**Annotations:**
- Arrow pointing to moved field: "Precise field-level tracking"
- Highlight severity badge

**File name:** `03-change-detail-diff.png`

---

## 🖼️ Image 4: Alert Configuration

**Purpose:** Show how easy it is to set up notifications

**What to Capture:**
- Alert/notification settings page showing:
  - Multiple channel options (Email, Slack, Discord, Webhooks)
  - Toggle switches for enabling/disabling
  - Slack integration UI
  - Test alert button

**Screenshot Instructions:**
1. Navigate to settings/notifications page
2. Or create mockup showing:

```
┌─────────────────────────────────────┐
│ Notification Settings                │
├─────────────────────────────────────┤
│                                      │
│ ✉️ Email Alerts          [ON]       │
│   your@email.com                    │
│   Send for: Critical, High          │
│                                      │
│ 💬 Slack Integration    [ON]        │
│   #api-monitoring                   │
│   Connected to: Your Workspace      │
│   [Test Alert]                      │
│                                      │
│ 📢 Discord Webhook      [OFF]       │
│   [Connect Discord]                 │
│                                      │
│ 🔗 Custom Webhook       [OFF]       │
│   [Add Webhook URL]                 │
│                                      │
│ 🚨 PagerDuty           [OFF]        │
│   [Connect PagerDuty]               │
│                                      │
└─────────────────────────────────────┘
```

**Annotations:**
- Callout: "Multi-channel alerts in seconds"
- Arrow to Slack showing: "One-click integration"

**File name:** `04-alert-configuration.png`

---

## 🖼️ Image 5: Historical Timeline

**Purpose:** Show the value of historical tracking

**What to Capture:**
- Timeline view showing multiple changes over time:
  - Change events listed chronologically
  - Color-coded by severity
  - Expandable to see details
  - Filter options (by severity, date range)

**Screenshot Instructions:**
1. Create a mockup showing a timeline like:

```
┌──────────────────────────────────────────────┐
│ Change History - Stripe Payment API          │
│                                               │
│ Filter: [All Severities ▼] [Last 30 Days ▼] │
├──────────────────────────────────────────────┤
│                                               │
│ Jan 5, 2026                                  │
│ ├─ 🔴 CRITICAL                               │
│ │  Field "amount" moved to nested object     │
│ │  2:34 PM                                   │
│ │  [View Details]                            │
│ │                                             │
│ Jan 3, 2026                                  │
│ ├─ 🟡 MEDIUM                                 │
│ │  New field "metadata" added                │
│ │  10:15 AM                                  │
│ │  [View Details]                            │
│ │                                             │
│ Dec 28, 2025                                 │
│ ├─ 🟢 LOW                                    │
│ │  Field "description" max length increased  │
│ │  3:22 PM                                   │
│ │  [View Details]                            │
│                                               │
└──────────────────────────────────────────────┘
```

**Annotations:**
- "Complete audit trail"
- "90-day history retention"

**File name:** `05-historical-timeline.png`

---

## 🖼️ Image 6: Pricing Page

**Purpose:** Show transparent pricing and free plan

**What to Capture:**
- Navigate to: `https://www.apishift.site/pricing`
- Capture the entire pricing section with all three tiers visible

**Screenshot Instructions:**
1. Open pricing page
2. Capture all pricing tiers in one screen:
   - Free tier (highlighted as "FREE")
   - Pro tier ($29/month)
   - Team tier ($99/month)
3. Make sure feature comparison is visible

**Annotations:**
- Arrow pointing to Free plan: "Start free forever"
- Highlight "No credit card required"

**File name:** `06-pricing-page.png`

---

## 🎬 Demo GIF Creation Guide

**Purpose:** Show the product in action - most engaging asset

### Recommended Flow (10-15 seconds total)

**Scene 1: Add API (2-3 seconds)**
- Show clicking "Add API" button
- Form appears with fields:
  - API Name: "Stripe Payment API"
  - Endpoint: "https://api.stripe.com/v1/charges"
  - Method: POST
- Click "Add and Monitor"

**Scene 2: Monitoring Active (2 seconds)**
- Dashboard shows new API with status: "Monitoring..."
- Check interval: "Every 15 minutes"
- Green checkmark appears: "Healthy ✓"

**Scene 3: Change Detected (3 seconds)**
- Screen animates to show alert appearing
- Red banner: "🔴 CRITICAL change detected!"
- Click on alert to view details

**Scene 4: View Diff (4 seconds)**
- Side-by-side JSON comparison
- Highlight the changed field
- Show severity: CRITICAL
- Show notification sent: "Slack notified ✓"

**Scene 5: Alert Received (2 seconds)**
- Show Slack notification appearing on screen
- Message reads: "⚠️ API Change Alert: Stripe Payment API - CRITICAL"

### Tools for Creating GIF

**Option 1: ScreenToGif (Windows - Free)**
1. Download from https://www.screentogif.com/
2. Click "Recorder"
3. Position recorder over browser window
4. Record the flow above
5. Edit in built-in editor (trim, add text overlays)
6. Export as GIF (optimize to < 25MB)

**Option 2: Kap (macOS - Free)**
1. Download from https://getkap.co/
2. Select recording area
3. Record flow
4. Export as GIF or MP4

**Option 3: LICEcap (Cross-platform - Free)**
1. Download from https://www.cockos.com/licecap/
2. Position frame over recording area
3. Record
4. Save as GIF

**Option 4: Loom (Record as video, convert to GIF)**
1. Record with Loom
2. Download MP4
3. Convert to GIF using https://ezgif.com/video-to-gif

### GIF Optimization Tips
- Keep it short (10-15 seconds max)
- Reduce frame rate to 15-20 fps
- Use 720p or 1080p resolution
- Compress to under 10MB if possible (PH limit is 25MB)
- Add subtle cursor highlight so viewers follow action
- Use browser zoom of 100% or 110% for clarity

---

## 🎨 Design Polish Tips

### Before Taking Screenshots:
1. **Clean up browser**
   - Hide bookmarks bar
   - Close unnecessary tabs
   - Use incognito mode

2. **Use consistent styling**
   - Same browser for all screenshots
   - Same theme (light mode recommended)
   - Same zoom level (100%)

3. **Add sample data that looks real**
   - Use real API names (Stripe, Twilio, SendGrid)
   - Use realistic timestamps
   - Make numbers believable (not all zeros or 999s)

### After Taking Screenshots:
1. **Add annotations using:**
   - Figma (free tier)
   - Canva (free tier)
   - Photoshop
   - Sketch
   - Cleanshot X (macOS)

2. **Annotation best practices:**
   - Use arrows to point out key features
   - Add short text callouts (max 5 words)
   - Use brand colors (your primary color for highlights)
   - Keep it clean - don't over-annotate
   - Use drop shadows on callouts for depth

3. **Consistency:**
   - Same annotation style across all images
   - Same font family
   - Same arrow style
   - Same color scheme

---

## 📋 Asset Export Checklist

Before uploading to Product Hunt:

- [ ] All images are correct dimensions (1920x1080 or similar)
- [ ] All images are under 5MB each
- [ ] Product icon is 240x240px PNG with transparency
- [ ] GIF is under 25MB
- [ ] GIF demonstrates core flow clearly
- [ ] All text in images is readable
- [ ] Screenshots use consistent browser/theme
- [ ] No personal/sensitive data visible
- [ ] Company logos (Stripe, etc.) used respectfully
- [ ] All files named clearly (01-hero.png, 02-dashboard.png, etc.)

---

## 🎯 Image Upload Order on Product Hunt

When uploading to Product Hunt, order matters:

1. **Image 1:** Hero/Terminal Demo (this shows first)
2. **GIF:** Demo of product in action (auto-plays)
3. **Image 2:** Dashboard Overview
4. **Image 3:** Change Detection Detail
5. **Image 4:** Alert Configuration
6. **Image 5:** Historical Timeline
7. **Image 6:** Pricing Page

The first image and GIF are most important - they show in the main Product Hunt feed!

---

## 💡 Pro Tips

1. **Show real brands:** Using logos like Stripe, Twilio makes it relatable
2. **Show the problem AND solution:** Before/after is powerful
3. **Use motion:** GIFs get 2x more engagement than static images
4. **Add context:** Small text annotations help viewers understand
5. **Mobile responsiveness:** Consider one screenshot showing mobile view
6. **Keep it simple:** Don't try to show everything in one image

---

## ✅ Final Quality Check

Before submitting to Product Hunt, ask yourself:

- [ ] Does image 1 immediately show what the product does?
- [ ] Is the GIF smooth and easy to follow?
- [ ] Can someone understand the value in 5 seconds?
- [ ] Are all screenshots high resolution and crisp?
- [ ] Is there a clear visual progression through the gallery?
- [ ] Would I click "Get it" based on these visuals alone?

---

**Need help with design?** Consider:
- Hiring a designer on Fiverr ($20-50 for PH assets)
- Using Canva templates for Product Hunt
- Asking in Product Hunt's Ship community for feedback

Good luck with your assets! 🎨

---

**Last Updated:** 2026-01-05
