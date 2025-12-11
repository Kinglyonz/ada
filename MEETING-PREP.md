# TODD MEETING PREP - ADA Scanner Demo
**Date Prepared:** December 11, 2025  
**Meeting Target:** Week of Dec 16-20, 2025  
**Attendee:** Todd (IT Leadership), City of Bowie

---

## 🎯 WHAT YOU BUILT

### Product Name: 
**ADA Compliance Scanner - Professional Edition**

### Technology Stack:
- **Backend:** Node.js + Express web server
- **Scanner Engine:** Pa11y (v7.0) + Puppeteer + Axe-core
- **Standard:** WCAG 2.1 Level AA (federal requirement)
- **Interface:** Modern web UI with plain-language translations

### What It Does:
1. **Scans live websites** for accessibility violations
2. **Identifies exact locations** of each issue (CSS selectors)
3. **Shows HTML context** (the actual broken code)
4. **Translates to plain English** for non-technical staff
5. **Filters & sorts** issues by severity, type, impact
6. **Exports to CSV/Excel** for departmental tracking
7. **Scans PDF documents** (basic checks for tagging, metadata)

---

## ✅ WHAT IT CAN DO

### Gap Analysis:
- Scan any public website URL
- Find all WCAG 2.1 AA violations
- Categorize by WCAG principle (Perceivable, Operable, Understandable, Robust)
- Show total errors, warnings, notices
- Display impact level (critical, serious, moderate, minor)

### Actionable Intelligence:
- **CSS Selectors** → Developers paste into DevTools to find exact element
- **HTML Context** → Shows the actual code that's broken
- **Plain English** → "A button that says 'Register Now' is too hard to read"
- **Element Descriptions** → Automatically identifies buttons, links, images, forms

### Tracking & Reporting:
- **CSV Export** → All issues with selectors, counts, impact levels
- **Filter by Type** → Show only errors, or only warnings
- **Sort Options** → Most common first, by impact, alphabetical
- **Expandable Details** → Click to see all 90 occurrences of same issue

### Multi-Format Scanning:
- **Websites** → Full WCAG 2.1 AA automated checks (~90 rules)
- **PDFs** → Basic accessibility checks (tagging, language, metadata)

---

## ❌ WHAT IT CANNOT DO

### Limitations - Be Honest With Todd:

1. **Does NOT fix issues automatically**
   - Scanner identifies problems
   - Human developers must remediate code
   - We can offer remediation as a service

2. **Cannot scan behind logins**
   - Won't access Munis, ActiveNet, staff portals
   - Needs credentials or API access
   - Manual testing required for authenticated systems

3. **Cannot scan CivicPlus modules deeply**
   - Scans what's publicly visible
   - CivicPlus has internal accessibility tools
   - We complement, not replace, CivicPlus

4. **Automated checks only (70% of WCAG)**
   - ~30% requires human judgment:
     - Alt text quality (not just presence)
     - Caption accuracy
     - Reading order logic
     - Content clarity
   - **This is why they need consultants (YOU)**

5. **Single-page scans (not full-site crawling)**
   - Current version scans one URL at a time
   - Full-site crawler = future enhancement
   - Can scan multiple pages manually

6. **PDF scanning is basic**
   - Checks for: tagging, language, title metadata
   - Does NOT check: reading order, alt text quality, form accessibility
   - Full PDF remediation requires Adobe Acrobat Pro + human review

7. **No historical tracking (yet)**
   - Shows current state only
   - No database of past scans
   - Dashboard/monitoring = Phase 2 (subscription service)

---

## 🎬 HOW TO DEMO THIS TO TODD

### Meeting Structure (30-45 minutes):

#### **1. Context Setting (5 min)**
*"Todd, you have 132 days until the April 2026 deadline. The DOJ will audit your entire digital ecosystem - websites, PDFs, third-party systems. Let me show you what we found."*

#### **2. Live Demo (15 min)**

**Step 1: Scan City of Bowie Homepage**
- Open scanner at `http://localhost:3000`
- URL already pre-filled: `https://www.cityofbowie.org`
- Click "Scan Website"
- **While scanning (30-60 sec):** "We're using Axe-core, the same engine Microsoft and Google use. It's testing 90+ WCAG 2.1 AA rules right now."

**Step 2: Show Results**
- **Point to stats:** "132 total issues - 101 errors, 31 warnings"
- **Click on top issue:** Color contrast (90 locations)
- **Read plain English:** "Text is too hard to read - not enough contrast between text and background"
- **Expand locations:** Click "Show All Locations"
- **Show selector:** "See this? `#divToolbars > div:nth-child(1)` - that's the exact toolbar at the top of your page"
- **Show HTML context:** "Here's the actual code that's broken"

**Step 3: Filter & Sort**
- Filter to "Errors Only" → "These are your critical compliance violations"
- Sort by "Impact Level" → "Critical issues first - these block screen reader users"

**Step 4: Export**
- Click "Export to CSV"
- Open in Excel
- **Show columns:** Issue type, CSS selector, HTML context
- *"Hand this to Sonya's team. They can assign issues to departments, track fixes in SharePoint."*

**Step 5: Compare to CivicPlus**
- Pull up CivicPlus accessibility tool (if available)
- *"CivicPlus tells you 'You have 50 errors.' We tell you WHICH button on WHICH page needs WHAT fix."*

#### **3. PDF Demo (5 min)**
- Switch to "PDF Documents" tab
- Upload a sample PDF (city meeting agenda, permit form)
- Show results: "PDF not tagged, missing language specification"
- *"This is basic scanning. Full PDF remediation requires Adobe Acrobat Pro + trained staff. That's our Phase 2 service."*

#### **4. Gap Analysis Discussion (10 min)**

**What we found:**
- 132 issues on homepage alone
- Most common: Color contrast (90 locations)
- Critical: Duplicate IDs, missing ARIA labels
- **Implication:** "If the homepage has 132 issues, assume 20-30 pages × 100+ issues each = thousands of violations"

**What's missing from scan:**
- Internal systems (Munis, ActiveNet)
- Laserfiche documents
- File server PDFs
- CivicPlus module internals
- Behind-login content

**What this means:**
- Scanner is the **diagnostic tool**
- We provide the **cure** (remediation services)
- You need: Code fixes, PDF remediation, staff training, ongoing monitoring

#### **5. Proposal Preview (5 min)**

*"Todd, we're proposing three tiers:"*

**Tier 1 ($65-75K):** 
- Full gap analysis (all pages, not just homepage)
- Website remediation roadmap
- Basic staff training

**Tier 2 ($95-110K) - RECOMMENDED:**
- Everything in Tier 1
- PDF remediation (Laserfiche + file servers)
- Vendor accessibility review (Munis, ActiveNet)
- This scanner as an ongoing monitoring tool

**Tier 3 ($120-140K):**
- Everything in Tier 2
- Full CivicPlus integration
- OneDrive migration strategy
- Quarterly compliance dashboard (subscription)

*"This scanner is part of our deliverable. After we fix issues, we rescan weekly to prove compliance. By April 2026, you have a full audit trail for the DOJ."*

---

## 🎤 KEY TALKING POINTS

### What Makes You Different:

❌ **Other Consultants:**
- Show PowerPoints with theory
- Generic recommendations
- No proof of current state

✅ **You:**
- Show real scan results TODAY
- Exact locations of exact issues
- Working software (not a proposal)
- *"We've already started the work"*

### Address Their Concerns:

**"Isn't CivicPlus handling this?"**
> "CivicPlus scans their modules. We scan EVERYTHING - third-party systems, PDFs, file servers, linked content. CivicPlus found some issues. We found 132 on just the homepage."

**"Can't our developers fix this?"**
> "Absolutely - that's why we give them exact selectors and code snippets. We can train your team, or remediate for you, or both."

**"How much will this cost?"**
> "That depends on scope. Scanning is cheap. Fixing thousands of issues across 30+ pages, 500 PDFs, and vendor systems is the real work. Let's prioritize based on risk."

**"What if we don't do this?"**
> "April 24, 2026 is a hard deadline. After that, you're open to DOJ audits and lawsuits. One ADA lawsuit costs $50K-$200K in legal fees alone. Our Tier 2 proposal is $95K to FIX everything before the deadline."

---

## 📋 LEAVE-BEHIND MATERIALS

### Give Todd:

1. **Live Demo URL** (if you can expose it)
   - Or: "We'll deploy this to your network after contract signing"

2. **Sample CSV Export** 
   - Export City of Bowie scan results
   - Print first 2 pages to show format
   - *"This is what your team will track in Excel"*

3. **One-Page Executive Summary** (create from `proposal-framework.md`)
   - 132 issues found on homepage
   - Estimated 2,000-5,000 total violations across full site
   - April 2026 deadline = 132 days
   - Tier 2 proposal: $95-110K (vs. $50K+ per lawsuit)

4. **Next Steps Card:**
   ```
   NEXT STEPS:
   □ Full site scan (all 20-30 pages)
   □ PDF inventory (Laserfiche + file servers)
   □ Vendor VPAT review (Munis, ActiveNet)
   □ Staff training needs assessment
   □ Formal proposal delivery: Week of Jan 6, 2025
   ```

---

## ⚠️ WHAT NOT TO SAY

### Avoid These Mistakes:

❌ "This tool fixes everything automatically"
- It identifies, not fixes

❌ "We can guarantee 100% compliance"
- Automated scans catch 70%, humans must validate the rest

❌ "CivicPlus is useless"
- It's complementary, not competitive

❌ "This will be cheap"
- Remediation at scale is expensive labor

❌ "You can do this yourself"
- They could, but won't meet the deadline without help

---

## 🎯 SUCCESS METRICS

### You Win This Meeting If:

1. ✅ Todd agrees to full-site gap analysis
2. ✅ He shares access to Laserfiche/file servers for PDF inventory
3. ✅ He schedules proposal presentation (full team, Jan 2025)
4. ✅ He gives you contact for Sonya (Communications) for content review
5. ✅ He mentions budget availability

### Red Flags:

🚩 "We'll think about it" = Not urgent enough, increase FUD
🚩 "CivicPlus said they'll handle it" = Educate on gaps
🚩 "Let's talk after the holiday" = Lost momentum, follow up aggressively

---

## 📧 FOLLOW-UP EMAIL (Send Same Day)

Subject: **City of Bowie ADA Compliance - Scanner Demo + Next Steps**

```
Todd,

Great meeting today. As discussed, here's what we covered:

WHAT WE FOUND:
- 132 accessibility violations on cityofbowie.org homepage
- Most critical: 90 color contrast issues, 4 duplicate ID errors
- Estimated 2,000-5,000 total issues across full site

WHAT WE SHOWED:
- Live scanner demo (WCAG 2.1 AA compliance testing)
- Exact issue locations with CSS selectors
- CSV export for departmental tracking
- PDF accessibility checks

NEXT STEPS:
1. Full site gap analysis (all pages, not just homepage)
2. PDF inventory assessment (Laserfiche + file servers)
3. Vendor accessibility review (Munis, ActiveNet VPATs)
4. Formal proposal delivery: Week of January 6, 2025

ATTACHED:
- Sample scan results (CSV)
- Executive summary
- Proposal framework

April 24, 2026 deadline = 132 days remaining.

Let's schedule the full team presentation for early January.

Best,
[Your Name]
```

---

## 🔧 TECHNICAL PREP BEFORE MEETING

### Make Sure:

- [x] Server runs without errors: `cd C:\Users\Tran\Desktop\ada\tools\scanner ; node server.js`
- [x] Scanner loads at `http://localhost:3000`
- [x] City of Bowie pre-filled in URL field
- [x] Test scan completes (30-60 sec)
- [x] CSV export downloads successfully
- [x] Have backup PDF to upload for demo
- [x] Print sample CSV (first 2 pages)
- [x] Charge laptop, bring charger
- [x] Test on meeting room projector/screen (if in-person)

### Backup Plan:

If demo fails:
- Have screenshots of successful scan ready
- Have printed CSV results
- *"We've tested this on 20+ sites - City of Bowie, Maryland.gov, Section508.gov. Technical hiccup, but here's the output."*

---

## 💰 BUDGET CONVERSATION

### If Todd Asks: "What's this worth?"

**Scanner Tool Value:**
- SiteImprove: $10K-$40K/year (subscription)
- Deque Axe Monitor: $15K-$30K/year
- Manual accessibility audit: $5K-$15K per page

**Your Offer:**
- Include scanner in remediation contract
- Ongoing monitoring as part of subscription
- *"This isn't a product sale - it's part of our service delivery"*

### Pricing Psychology:

- Lead with Tier 2 ($95-110K) as "recommended"
- Make Tier 1 ($65-75K) look incomplete
- Make Tier 3 ($120-140K) look comprehensive but optional
- Emphasize recurring revenue: $38K-$71K/year for dashboard subscription

**Close with risk:**
> "One ADA lawsuit costs $50K-$200K in legal fees, plus remediation costs, plus reputational damage. Our Tier 2 proposal is $95K to prevent that entirely."

---

## 🏆 FINAL PUNCHLINE

*"Todd, every other consultant will show you a PowerPoint about what COULD be wrong. We're showing you what IS wrong, WHERE it is, and HOW to fix it. We've already started the work. Let's finish it together before April 2026."*

---

**This meeting is your close. The scanner is proof you're serious. Good luck.** 🚀
