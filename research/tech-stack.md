# ADA Compliance Tech Stack Analysis
## City of Bowie - Tool Selection & Justification

---

## EXECUTIVE SUMMARY

This document defines the complete technology stack for delivering ADA Title II compliance services to the City of Bowie. It includes both existing client tools (to be leveraged) and new tools (we introduce) across five domains:

1. **Website Accessibility Auditing**
2. **Document Remediation**
3. **Monitoring & Dashboards**
4. **Training & Governance**
5. **Project Management**

---

## PART 1: CLIENT'S EXISTING TOOLS (Leverage These)

### Document Management Systems

#### Laserfiche Cloud
**Purpose**: Primary document management system
**Current Usage**: Public and internal documents
**Accessibility Capabilities**: None built-in
**Our Integration**:
- API access for document inventory
- Automated tagging of remediated documents
- Metadata fields for compliance status
**Cost to Client**: Already owned
**Recommendation**: Keep for DMS, add governance layer

#### Internal File Servers
**Purpose**: Legacy document storage
**Current Usage**: Heavy staff usage, VPN-only access
**Accessibility Capabilities**: None
**Our Integration**:
- PowerShell scripts for inventory
- Identify public-facing documents
- Migration candidates to OneDrive
**Cost to Client**: Already owned
**Recommendation**: Audit → prioritize → migrate over time

#### OneDrive / SharePoint Online (Microsoft 365)
**Purpose**: Modern document storage and collaboration
**Current Usage**: Underutilized (Todd wants to expand)
**Accessibility Capabilities**: Excellent
- Built-in accessibility checkers
- Version control
- Compliance center for governance
- Retention policies
**Our Integration**:
- Position as "compliant by default" repository
- Create accessible templates
- Set up Information Architecture
**Cost to Client**: Already owned (E3/E5 license assumed)
**Recommendation**: ⭐ PRIMARY STRATEGIC DIRECTION

---

### Web Content Management

#### CivicPlus CMS
**Purpose**: City website platform
**Current Usage**: www.cityofbowie.org
**Accessibility Capabilities**: Limited
- Built-in checker scans CivicPlus modules only
- Does NOT scan third-party links
- Does NOT validate external content
- Provides countdown to 2026 deadline
**Our Integration**:
- Supplement with comprehensive scanning
- Train Communications team on CivicPlus tools
- Document limitations clearly
**Cost to Client**: Already owned
**Recommendation**: Use their tools + add our scanning layer

**Documentation**: https://www.civicplus.com/web-accessibility-software/

---

### Productivity & Remediation Tools

#### Adobe Acrobat Pro
**Purpose**: PDF creation and editing
**Current Usage**: Available to staff via CD-ROM subscription
**Accessibility Capabilities**: Excellent (if trained)
- Preflight accessibility checker
- Auto-tagging
- Manual remediation tools
- Color contrast checker
**Our Integration**:
- Train staff on accessibility features
- Create remediation workflows
- Build templates
**Cost to Client**: Already owned
**Recommendation**: Core remediation tool for staff

#### Microsoft Office Suite
**Purpose**: Document creation
**Current Usage**: Word, PowerPoint, Outlook
**Accessibility Capabilities**: Good
- Built-in accessibility checkers (Review tab)
- "Check Accessibility" feature
- Alt text prompts
**Our Integration**:
- Enable checkers by default (IT policy)
- Create accessible templates
- Train on accessible authoring
**Cost to Client**: Already owned
**Recommendation**: Primary authoring environment

---

## PART 2: TOOLS WE INTRODUCE

### Website Accessibility Auditing (Automated)

#### Axe DevTools (Primary Automated Scanner)
**Purpose**: WCAG 2.1 AA compliance testing
**Technology**: Browser extension + API
**Capabilities**:
- Scans HTML, CSS, JavaScript
- Identifies ARIA issues
- Checks color contrast
- Validates semantic structure
- 30-40% of issues (automated only)
**Integration**: CI/CD pipelines, manual testing
**Cost**: Free browser extension, $1,000-5,000/year for API (if needed)
**Recommendation**: ⭐ PRIMARY AUTOMATED TESTING TOOL

**Why Axe over competitors**:
- Industry standard (Deque Systems)
- Chrome & Firefox extensions
- API for automation
- Active development
- Strong ARIA support

#### WAVE (WebAIM) - Supplemental
**Purpose**: Visual accessibility feedback
**Technology**: Browser extension + web service
**Capabilities**:
- Visual overlay showing errors
- Color-coded issue severity
- Explains each issue
- Great for training
**Integration**: Training materials, spot checks
**Cost**: Free for manual use, $50/month for API
**Recommendation**: Training and quick validation

#### Pa11y - Command Line Scanner
**Purpose**: Automated bulk testing
**Technology**: Node.js command-line tool
**Capabilities**:
- Scan multiple pages automatically
- JSON output for dashboards
- Sitemap integration
- Headless browser testing
**Integration**: Our proof-of-concept dashboard, CI/CD
**Cost**: Free (open source)
**Recommendation**: ⭐ BUILD POC SCANNER WITH THIS

**Why build with Pa11y**:
- Free and open source
- Easy to automate (Node.js)
- Integrates with dashboard
- Scriptable for recurring scans
- Perfect for demo at proposal meeting

---

### Website Accessibility Auditing (Manual)

#### Keyboard Navigation Testing
**Purpose**: Validate non-mouse usability
**Technology**: Manual (Tab, Enter, Spacebar, Arrow keys)
**Capabilities**: Tests real user experience
**Cost**: Free (manual labor)
**Recommendation**: Required for true compliance (automated can't catch this)

#### Screen Reader Testing
**Purpose**: Validate assistive technology compatibility
**Technology**:
- **NVDA** (Windows, free)
- **JAWS** (Windows, $1,000+ license)
- **VoiceOver** (macOS, built-in)
**Cost**: $0-1,000 depending on OS
**Recommendation**: NVDA for most testing, VoiceOver if Mac available

#### Lighthouse (Chrome DevTools)
**Purpose**: Built-in accessibility audit
**Technology**: Chrome browser (built-in)
**Capabilities**:
- Quick accessibility score
- Performance metrics
- Best practices
**Cost**: Free
**Recommendation**: Quick checks, not comprehensive

---

### Document Remediation (PDF)

#### Adobe Acrobat Pro (Already Owned)
**Purpose**: Primary PDF remediation
**Capabilities**: See above (they already have this)
**Cost**: Already owned
**Recommendation**: Core tool for staff

#### CommonLook PDF (Professional Remediation)
**Purpose**: Advanced PDF accessibility
**Technology**: Desktop application (Windows)
**Capabilities**:
- More powerful than Acrobat alone
- Batch processing
- Compliance reports
- Math equations, complex tables
**Cost**: $495-995/license (perpetual) or $295-595/year (subscription)
**Recommendation**: For complex documents or if Adobe proves insufficient

**When to use**: Complex government forms, financial reports, large tables

#### PAC 2021 (PDF Accessibility Checker)
**Purpose**: Validation and compliance testing
**Technology**: Desktop application (Windows/Mac)
**Capabilities**:
- ISO 14289 (PDF/UA) compliance checking
- Free
- Industry standard validator
**Cost**: Free
**Recommendation**: ⭐ VALIDATION TOOL (run after remediation)

#### Equidox (Batch PDF Remediation)
**Purpose**: Large-scale document processing
**Technology**: Cloud-based service
**Capabilities**:
- Upload hundreds of PDFs
- Automated + human-assisted remediation
- Workflow management
**Cost**: $5,000-20,000/year (volume-based)
**Recommendation**: Only if document volume >1,000 PDFs (TBD after inventory)

**Decision point**: Wait until we know Laserfiche volume

---

### Monitoring Dashboard (CRITICAL DELIVERABLE)

#### Option 1: Custom Power BI Dashboard (RECOMMENDED)
**Purpose**: Continuous compliance monitoring for City of Bowie
**Technology**: Microsoft Power BI (they already have M365)
**Capabilities**:
- Real-time compliance scoring
- Website error tracking (integrate with Pa11y scans)
- Document compliance status (manual data entry or API)
- Training completion metrics
- Vendor status tracking
- Executive summary views
- Drill-down to specific issues
- Mobile app access
**Data Sources**:
- Pa11y scan results (automated website testing)
- Manual audit data (Excel/database)
- Laserfiche metadata (via API)
- SharePoint lists (training records)
**Cost to Build**: 40-80 hours development ($4,000-12,000 one-time)
**Cost to Client**: $200-500/month for Power BI Pro licenses (2-5 users)
**Recurring Revenue**: $2,000-4,000/month dashboard management subscription

**Why Power BI**:
- Client already has Microsoft 365
- Familiar interface for city staff
- Mobile apps for leadership
- Integrates with their ecosystem
- We control it (not SaaS vendor lock-in)
- **Recurring revenue opportunity**

**Competitive Advantage**: This differentiates us from audit-only competitors

---

#### Option 2: SiteImprove (SaaS Alternative)
**Purpose**: Enterprise accessibility monitoring
**Technology**: Cloud-based SaaS
**Capabilities**:
- Automated website scanning
- Accessibility scoring
- Content quality insights
- SEO and analytics
- Training modules
**Cost**: $20,000-50,000/year (estimate for mid-size city)
**Pros**: Turnkey solution, mature product, dedicated support
**Cons**: Expensive, vendor lock-in, less customizable
**Recommendation**: Present as option, but position Power BI as better fit

---

#### Option 3: Monsido (SaaS Alternative)
**Purpose**: Website governance platform
**Technology**: Cloud-based SaaS
**Capabilities**:
- Accessibility monitoring
- Content quality
- Readability analysis
- Policy compliance
**Cost**: $15,000-40,000/year (estimate)
**Pros**: Slightly cheaper than SiteImprove, good UI
**Cons**: Still expensive, vendor lock-in
**Recommendation**: Present as option if they reject custom dashboard

---

### Proof-of-Concept Scanner (Build This Week)

#### What We're Building
**Technology Stack**:
- **Backend**: Node.js + Pa11y
- **Frontend**: Simple HTML/CSS/JavaScript
- **Visualization**: Chart.js for graphs
- **Target**: Scan www.cityofbowie.org

**Features**:
1. Input: URL to scan
2. Output:
   - Total issues found
   - Critical vs. warnings
   - Issue breakdown (missing alt text, color contrast, ARIA, etc.)
   - Specific page examples
   - Visual report (graphs)
3. Exportable report (PDF or HTML)

**Purpose**:
- Demo at Todd meeting
- Prove capability
- Show real City of Bowie issues
- Sell the need for comprehensive solution

**Build Time**: 4-8 hours (we do this this week)
**Cost**: $0 (uses free open-source tools)
**Impact**: 🚀 HIGH - Differentiates proposal, proves competence

---

### Training & Governance Tools

#### WCAG QuickRef Guide
**Purpose**: Reference for accessibility standards
**Technology**: Website (https://www.w3.org/WAI/WCAG21/quickref/?levels=aa)
**Cost**: Free
**Recommendation**: Bookmark for all staff

#### Section 508 Government Resources
**Purpose**: Federal compliance guidance
**Technology**: Website (https://www.section508.gov/)
**Cost**: Free
**Recommendation**: Training curriculum basis

#### Custom Training Materials (We Create)
**Purpose**: City of Bowie-specific training
**Technology**:
- PowerPoint presentations
- Video recordings (Camtasia or similar)
- PDF checklists
- SharePoint site (knowledge base)
**Cost to Build**: 60-100 hours ($6,000-15,000)
**Recommendation**: Core deliverable, reusable across departments

---

### Vendor Assessment Tools

#### VPAT (Voluntary Product Accessibility Template)
**Purpose**: Standardized accessibility conformance report
**Technology**: PDF document (vendor provides)
**Process**:
1. Request VPAT from Munis, ActiveNet, all vendors
2. Review against WCAG 2.1 AA
3. Document gaps
4. Recommend contractual language
**Cost**: Free (vendor provides)
**Recommendation**: Essential for third-party risk assessment

#### Manual Vendor Testing
**Purpose**: Validate VPAT claims
**Technology**: Screen readers, keyboard testing
**Cost**: Labor only
**Recommendation**: Spot-check critical vendors (Munis, ActiveNet)

---

## PART 3: PROJECT MANAGEMENT & DELIVERY TOOLS

### Documentation & Collaboration
- **Notion** or **Confluence**: Project documentation, knowledge base
- **Microsoft Teams**: Client communication (they already use)
- **SharePoint**: Document sharing with City
- **Lucidchart** or **Visio**: Workflow diagrams, architecture

### Project Tracking
- **Microsoft Planner** or **Project**: Timeline, milestones
- **Excel/Google Sheets**: Budget tracking, inventory logs

### Version Control
- **Git + GitHub/Azure DevOps**: Code for dashboard, scripts
- **OneDrive**: Document version control

---

## COST SUMMARY

### One-Time Costs (We Invest)
| Tool | Cost | Purpose |
|------|------|---------|
| CommonLook PDF (if needed) | $300-1,000 | Advanced PDF remediation |
| JAWS License (if needed) | $1,000 | Screen reader testing |
| Axe API (if needed) | $1,000-5,000/year | Automated testing at scale |
| Training development | $6,000-15,000 | Custom materials |
| Dashboard development | $4,000-12,000 | Power BI build |
| **Total** | **$12,300-34,000** | **Our initial investment** |

### Ongoing Costs (Client Pays)
| Tool | Cost | Purpose |
|------|------|---------|
| Power BI Pro Licenses | $200-500/month | Dashboard access |
| Dashboard management subscription | $2,000-4,000/month | Our recurring service |
| Optional: SiteImprove (if chosen) | $20K-50K/year | Enterprise monitoring |
| **Total** | **$2,400-4,800/month** or **$28.8K-57.6K/year** | **Recurring revenue** |

---

## RECOMMENDATIONS

### Immediate Next Steps

1. **✅ Build Proof-of-Concept Scanner This Week**
   - Use Pa11y + Node.js
   - Scan cityofbowie.org
   - Create visual report
   - Demo at proposal meeting

2. **Propose Tiered Approach**
   - **Tier 1** (Essential): Custom Power BI dashboard + website scanning
   - **Tier 2** (Recommended): Add document remediation + training
   - **Tier 3** (Comprehensive): Add SiteImprove for comparison

3. **Leverage Existing Tools**
   - Don't oversell new software
   - Maximize Adobe Acrobat, Office, OneDrive
   - Position as "use what you have, add what you need"

4. **Recurring Revenue Model**
   - Dashboard subscription (monitoring + updates)
   - Quarterly audits
   - Annual training refreshers
   - Vendor reassessments

---

**Document Status**: Complete
**Next Action**: Build proof-of-concept scanner
**Owner**: Your Team
**Date**: 2025-12-11
