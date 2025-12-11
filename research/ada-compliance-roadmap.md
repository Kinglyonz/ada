# ADA Title II Compliance Roadmap
## City of Bowie Implementation Plan (PRD)

**Document Version**: 1.0  
**Last Updated**: 2025-12-11  
**Project Timeline**: 12-18 months  
**Compliance Deadline**: April 24, 2026

---

## EXECUTIVE SUMMARY

This Product Requirements Document (PRD) outlines a comprehensive approach to achieving and maintaining ADA Title II compliance for the City of Bowie. The project addresses federal mandate requirements while establishing sustainable governance practices that extend beyond the 2026 deadline.

**Key Objectives**:
1. Website accessibility (WCAG 2.1 AA compliance)
2. Document remediation (PDFs, Office documents)
3. Third-party vendor compliance assessment
4. Staff training and capability building
5. Continuous monitoring infrastructure
6. Policy and governance framework

**Success Metrics**:
- 0 critical accessibility violations on public-facing web properties
- 100% of public documents meet WCAG 2.1 AA standards
- All staff trained on accessible content creation
- Automated monitoring dashboard operational
- Vendor compliance contracts in place
- Defensible compliance documentation for DOJ audit

---

## PHASE 0: PROOF-OF-CONCEPT & PLANNING (Week of Dec 16, 2025)

### Objectives
Demonstrate technical capability and secure project approval

### Deliverables
1. **Live Scanner Demonstration**
   - Working Node.js/Pa11y scanner
   - Scan of www.cityofbowie.org
   - Visual HTML report with issue breakdown
   - Specific examples of violations

2. **Project Proposal**
   - This roadmap document
   - Pricing tiers (Essential, Recommended, Comprehensive)
   - Timeline with milestones
   - Team credentials

3. **Immediate Value**
   - Actual accessibility issues identified on City website
   - Prioritized remediation list
   - Quick wins for Communications team

### Timeline
- **Week 1**: Build scanner, generate report
- **Week 2**: Meeting with Todd and stakeholders
- **Week 3**: Contract negotiation

### Resources Required
- 1 technical lead (scanner development)
- 1 business development (proposal/presentation)
- 4-8 hours development time
- $0 software costs (open-source tools)

### Success Criteria
✅ Scanner demonstrates real issues on City website  
✅ Todd approves project to move forward  
✅ Contract signed for Phase 1

---

## PHASE 1: WEBSITE ACCESSIBILITY AUDIT & REMEDIATION (Months 1-4)

### Objectives
Achieve WCAG 2.1 AA compliance for primary web properties

### Scope
**Primary Sites**:
- www.cityofbowie.org (main city website)
- Subdomains (if applicable)
- CivicPlus CMS modules
- Embedded third-party content

**Exclusions** (Handle in Phase 3):
- Munis (Tyler Technologies)
- ActiveNet (third-party vendor platforms)

### Deliverables

#### Month 1: Comprehensive Audit
- **Automated Scanning**
  - Pa11y full site crawl
  - Axe DevTools validation
  - WAVE supplemental testing
  - Lighthouse scoring
  
- **Manual Testing**
  - Keyboard navigation (all interactive elements)
  - Screen reader testing (NVDA + VoiceOver)
  - Color contrast validation
  - Form accessibility
  - Focus management
  
- **Deliverable**: 100-page audit report
  - Executive summary
  - Issue prioritization (Critical, High, Medium, Low)
  - Page-by-page findings
  - Remediation recommendations
  - Estimated LOE (level of effort)

#### Month 2-3: Remediation Implementation
- **Critical Issues** (WCAG Level A violations)
  - Missing alt text on images
  - Keyboard traps
  - Form labels
  - Color contrast failures
  - Heading structure
  
- **High Priority** (WCAG Level AA violations)
  - ARIA implementation
  - Skip navigation links
  - Focus indicators
  - Error identification
  - Consistent navigation
  
- **CivicPlus CMS Training**
  - Train Communications team on built-in accessibility checker
  - Document limitations of CivicPlus tools
  - Establish workflow for new content
  
- **Deliverable**: Remediated website code
  - HTML/CSS updates
  - JavaScript fixes
  - Template modifications
  - CMS configuration

#### Month 4: Validation & Documentation
- **Re-testing**
  - Automated scans (verify 0 critical violations)
  - Manual validation
  - User acceptance testing with assistive tech users (if possible)
  
- **Documentation**
  - Accessibility Statement (public-facing)
  - Remediation log (for DOJ audit trail)
  - Before/after metrics
  - Maintenance guide for Communications team
  
- **Deliverable**: Compliance certification package

### Resources Required
- **Team**:
  - 1 web accessibility specialist (120-160 hours)
  - 1 front-end developer (80-120 hours)
  - 1 QA tester (40 hours)
  - City Communications team (20 hours - SME input)

- **Tools**:
  - Axe DevTools (free browser extension)
  - Pa11y (free)
  - NVDA screen reader (free)
  - Chrome Lighthouse (free)

- **Budget**: $15,000-25,000 (labor + contingency)

### Success Criteria
✅ 0 WCAG Level A violations  
✅ 0 WCAG Level AA critical violations  
✅ Website passes automated Pa11y scans  
✅ Keyboard navigation fully functional  
✅ Screen reader compatible  
✅ Accessibility Statement published

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| CivicPlus platform limitations | High | Document workarounds, escalate to CivicPlus support |
| Third-party embeds (YouTube, etc.) | Medium | Provide accessible alternatives, captions required |
| Legacy content volume | Medium | Prioritize high-traffic pages first |
| Staff capacity constraints | Low | Provide detailed documentation, recorded training |

---

## PHASE 2: DOCUMENT REMEDIATION (Months 3-8)

### Objectives
Ensure all public-facing documents meet accessibility standards

### Scope
**Document Repositories**:
- Laserfiche Cloud (primary DMS)
- Internal file servers (legacy storage)
- Website downloads (PDFs, Word docs, presentations)
- Forms and applications

**Document Types**:
- PDFs (forms, reports, meeting minutes, policies)
- Microsoft Word documents
- PowerPoint presentations
- Excel spreadsheets (if public-facing)

### Deliverables

#### Month 3: Document Inventory & Prioritization
- **Inventory Process**
  - Laserfiche API integration (automated cataloging)
  - File server PowerShell scan
  - Website link extraction
  - Metadata tagging (public vs. internal)
  
- **Prioritization Matrix**
  - **Tier 1** (Immediate): Legal notices, forms, ADA-sensitive content
  - **Tier 2** (High): Meeting minutes, policies, reports
  - **Tier 3** (Medium): Historical documents, newsletters
  - **Tier 4** (Low): Internal-only, archive candidates
  
- **Deliverable**: Inventory spreadsheet
  - Document name, location, type, size
  - Priority tier
  - Current accessibility status (pass/fail/unknown)
  - Estimated remediation effort

#### Month 4-6: PDF Remediation
- **Remediation Workflow**
  - Adobe Acrobat Pro (primary tool - City already owns)
  - CommonLook PDF (if complex documents require)
  - PAC 2021 validation (free compliance checker)
  
- **Standards Applied**
  - PDF/UA (ISO 14289)
  - WCAG 2.1 AA
  - Section 508 requirements
  
- **Remediation Tasks**
  - Document structure (headings, lists, tables)
  - Tag order and reading flow
  - Alternative text for images/graphics
  - Form field labels
  - Color contrast
  - Bookmarks for navigation
  
- **Volume Estimate**:
  - Assumption: 500-2,000 documents (to be confirmed)
  - Processing rate: 5-10 simple docs/day or 1-2 complex docs/day
  - Consider Equidox for batch processing if >1,000 docs
  
- **Deliverable**: Remediated PDF library
  - Tagged and compliant PDFs
  - Quality assurance log
  - Remediation notes (for complex docs)

#### Month 5-7: Office Document Templates & Training
- **Accessible Templates**
  - Microsoft Word templates (letters, reports, memos)
  - PowerPoint templates (presentations)
  - Excel templates (if applicable)
  - Outlook email signatures
  
- **Template Features**
  - Built-in heading styles
  - Alt text placeholders
  - Color contrast compliance
  - Accessibility checker enabled by default
  
- **Staff Training** (See Phase 4 for full training program)
  - "Accessible Document Authoring" workshop
  - How to use Adobe Acrobat Pro accessibility features
  - Microsoft Office accessibility checker
  - Best practices for PDFs (when to use vs. HTML)
  
- **Deliverable**: Template library + training materials

#### Month 8: Migration to SharePoint/OneDrive
- **Strategic Goal**: Position SharePoint as "compliant by default" repository
  
- **Migration Plan**
  - Identify Tier 1 documents for migration
  - Convert PDFs to HTML/Word where appropriate
  - Set up SharePoint Information Architecture
  - Configure metadata and search
  - Enable version control and approval workflows
  
- **Governance Setup**
  - Retention policies
  - Access controls
  - Compliance Center configuration (if E5 license)
  
- **Deliverable**: Migrated document library with governance

### Resources Required
- **Team**:
  - 1 document remediation specialist (200-400 hours, volume-dependent)
  - 1 SharePoint administrator (40-60 hours)
  - 1 training developer (60 hours)
  - City staff (10-20 hours - review and approval)

- **Tools**:
  - Adobe Acrobat Pro (City already owns)
  - PAC 2021 (free)
  - CommonLook PDF: $300-1,000 (if needed)
  - Equidox: $5,000-20,000/year (only if volume >1,000 docs)

- **Budget**: $20,000-50,000 (volume-dependent)

### Success Criteria
✅ 100% of Tier 1 documents remediated  
✅ 80% of Tier 2 documents remediated  
✅ Accessible templates deployed  
✅ Staff trained on accessible authoring  
✅ SharePoint migration pilot successful

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Document volume exceeds estimate | High | Prioritize ruthlessly, consider Equidox, ask for deadline extension |
| Complex scanned PDFs (OCR required) | Medium | Recreate from source files when possible, manual typing if necessary |
| Legacy formats (WordPerfect, etc.) | Low | Convert to modern formats, assess if still relevant |
| Staff resistance to new workflows | Medium | Executive sponsorship (Todd), emphasize legal requirement |

---

## PHASE 3: THIRD-PARTY VENDOR ASSESSMENT (Months 4-10)

### Objectives
Ensure all contracted vendors meet accessibility requirements

### Scope
**Known Vendors**:
- **Munis** (Tyler Technologies) - Financial/HR system
- **ActiveNet** - Recreation management
- **CivicPlus** - Website CMS
- Additional vendors (to be identified by City)

**Assessment Areas**:
- VPAT (Voluntary Product Accessibility Template) review
- Live platform testing
- Contract language review
- Remediation roadmap (if non-compliant)

### Deliverables

#### Month 4-5: Vendor Identification & VPAT Collection
- **Vendor Inventory**
  - All software vendors with public-facing interfaces
  - Internal systems used by staff with disabilities
  - Mobile apps
  - Kiosks or public terminals
  
- **VPAT Requests**
  - Formal letter to each vendor
  - Request VPAT 2.5 (latest version)
  - Request WCAG 2.1 AA conformance report
  - 30-day response deadline
  
- **Deliverable**: Vendor inventory + VPAT library

#### Month 6-8: Vendor Compliance Testing
- **Testing Protocol**
  - Review VPAT claims
  - Manual testing with screen reader
  - Keyboard navigation testing
  - Form completion testing
  - Document accessibility (if vendor provides downloads)
  
- **Per-Vendor Reports**
  - VPAT analysis
  - Gap identification
  - Risk assessment (legal exposure)
  - Remediation recommendations
  
- **Priority Vendors** (Test First):
  1. **Munis** - Critical (financial, HR, public payment portal)
  2. **ActiveNet** - High (public recreation registration)
  3. **CivicPlus** - High (website platform)
  
- **Deliverable**: Vendor compliance scorecard

#### Month 8-10: Contract Remediation & Negotiations
- **Contract Review**
  - Identify accessibility clauses (or lack thereof)
  - Assess leverage (renewal timing, contract value)
  
- **Negotiation Strategy**
  - **Compliant vendors**: Add accessibility SLA to renewal
  - **Non-compliant vendors**: Demand remediation timeline or switch vendors
  - **Partially compliant**: Phased compliance plan
  
- **Model Contract Language**
  - WCAG 2.1 AA requirement
  - Annual VPAT updates
  - Remediation timeline for new issues
  - Indemnification clause (vendor liable for violations)
  - Right to audit
  
- **Deliverable**: Updated vendor contracts + remediation agreements

### Resources Required
- **Team**:
  - 1 accessibility specialist (80-120 hours)
  - 1 contract/legal liaison (40 hours)
  - City Procurement (20 hours)
  - Vendor representatives (coordination time)

- **Tools**:
  - NVDA screen reader (free)
  - Manual testing protocols
  - VPAT templates

- **Budget**: $8,000-15,000 (labor, minimal software costs)

### Success Criteria
✅ 100% of vendors provide VPATs  
✅ Critical vendors (Munis, ActiveNet) tested  
✅ Non-compliant vendors have remediation plans  
✅ Contract language updated for accessibility  
✅ City has audit trail for DOJ compliance

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Vendor refusal to provide VPAT | High | Legal pressure, escalate to executive level, consider vendor switch |
| Vendor non-compliance with no remediation plan | High | Document for legal defense, explore alternative vendors |
| Contract renewal not until 2027+ | Medium | Negotiate amendment, document good-faith effort |
| Small vendors lack resources for compliance | Low | Provide technical assistance, accept phased approach |

---

## PHASE 4: TRAINING & CAPABILITY BUILDING (Months 6-12)

### Objectives
Build internal expertise to sustain compliance beyond initial project

### Scope
**Target Audiences**:
- Communications team (website content)
- All staff (document authoring)
- IT department (technical implementation)
- Leadership (governance and policy)
- HR (hiring and accommodations)

**Training Modalities**:
- Live workshops (in-person or virtual)
- Recorded video modules (on-demand)
- Quick reference guides (PDF/SharePoint)
- Office hours (ongoing support)

### Deliverables

#### Month 6-8: Training Materials Development
- **Course 1: Accessible Web Content Authoring** (Communications Team)
  - Duration: 3 hours (live workshop)
  - Topics:
    - WCAG 2.1 AA overview
    - CivicPlus accessibility features
    - Alt text best practices
    - Semantic HTML
    - Color contrast
    - Keyboard navigation
    - Testing with screen readers
  - Hands-on exercises
  - Certification quiz
  
- **Course 2: Accessible Document Creation** (All Staff)
  - Duration: 2 hours (live workshop)
  - Topics:
    - When to use PDF vs. Word vs. HTML
    - Microsoft Office accessibility checker
    - Heading styles
    - Alt text for images
    - Accessible tables
    - Color contrast
    - Adobe Acrobat Pro basics
  - Hands-on exercises
  - Job aids (1-page quick reference)
  
- **Course 3: Technical Accessibility Implementation** (IT Staff)
  - Duration: 4 hours (live workshop)
  - Topics:
    - ARIA attributes
    - Semantic HTML5
    - Focus management
    - Form validation
    - Testing tools (Pa11y, Axe, WAVE)
    - Remediation techniques
  - Code examples
  - Testing lab
  
- **Course 4: Accessibility Governance & Policy** (Leadership)
  - Duration: 1 hour (executive briefing)
  - Topics:
    - ADA Title II requirements
    - Legal risks and case studies
    - Governance framework
    - Budget and resource planning
    - Vendor management
  - Q&A session
  - Policy template
  
- **Deliverable**: Training curriculum (PowerPoint, videos, handouts)

#### Month 9-10: Training Delivery
- **Rollout Plan**
  - Week 1: Communications team (Course 1)
  - Week 2: IT team (Course 3)
  - Week 3-6: All-staff sessions (Course 2) - multiple sessions
  - Week 7: Leadership briefing (Course 4)
  
- **Attendance Tracking**
  - SharePoint list or LMS (Learning Management System)
  - Completion certificates
  - Quiz scores (if applicable)
  
- **Deliverable**: Trained staff + attendance records

#### Month 11-12: Knowledge Base & Ongoing Support
- **SharePoint Accessibility Hub**
  - Training videos (on-demand)
  - Quick reference guides
  - FAQ
  - Contact form for accessibility questions
  - Remediation request workflow
  
- **Office Hours**
  - Weekly 1-hour drop-in sessions (first 6 months)
  - Monthly sessions (ongoing)
  - Email support
  
- **Accessibility Champions Network**
  - Identify 2-3 staff per department
  - Advanced training
  - Peer support network
  - Quarterly meetings
  
- **Deliverable**: Self-service knowledge base + support structure

### Resources Required
- **Team**:
  - 1 training developer (60-100 hours)
  - 1 accessibility SME (instructor) (40-60 hours)
  - 1 videographer (if producing video modules) (20 hours)
  - City staff (training attendance - 2-4 hours per person)

- **Tools**:
  - PowerPoint (City already owns)
  - Camtasia or similar (screen recording) - $300
  - SharePoint (City already owns)
  - Zoom (for remote training) - City likely has

- **Budget**: $10,000-20,000 (labor + video production)

### Success Criteria
✅ 90% of Communications team trained (Course 1)  
✅ 100% of IT team trained (Course 3)  
✅ 75% of all staff trained (Course 2)  
✅ Leadership briefing completed (Course 4)  
✅ Knowledge base operational  
✅ Accessibility Champions identified

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low attendance / staff prioritization | Medium | Executive mandate, make training mandatory, schedule during work hours |
| Training doesn't stick (compliance drift) | High | Refresher training annually, integrate into onboarding, Champions network |
| Complex topics overwhelm non-technical staff | Medium | Simplify, focus on practical tasks, provide job aids |
| Turnover (trained staff leave) | Low | Record sessions, make training part of onboarding |

---

## PHASE 5: MONITORING DASHBOARD & AUTOMATION (Months 4-6, Parallel with Other Phases)

### Objectives
Establish continuous monitoring infrastructure to sustain compliance

### Scope
**Dashboard Functions**:
- Real-time website compliance monitoring
- Document compliance tracking
- Vendor compliance status
- Training completion metrics
- Issue tracking and remediation workflow
- Executive reporting

**Technical Architecture**:
- **Backend**: Pa11y automated scans (Node.js)
- **Data Storage**: Azure SQL or SharePoint lists
- **Frontend**: Microsoft Power BI
- **Automation**: Power Automate or Azure Functions
- **Alerting**: Email notifications for critical issues

### Deliverables

#### Month 4: Requirements & Design
- **Stakeholder Interviews**
  - Todd (Communications Director) - operational needs
  - IT Director - technical requirements
  - City Manager - executive summary needs
  - Procurement - vendor tracking
  
- **Dashboard Wireframes**
  - Executive summary view (high-level KPIs)
  - Website compliance view (page-level detail)
  - Document compliance view (inventory status)
  - Vendor compliance view (scorecard)
  - Training view (completion rates by department)
  
- **Data Model Design**
  - Website scan results table
  - Document inventory table
  - Vendor compliance table
  - Training records table
  - Issue tracking table
  
- **Deliverable**: Requirements document + wireframes

#### Month 5: Dashboard Development
- **Power BI Report Development**
  - Connect to data sources (Pa11y output, SharePoint lists, manual data entry)
  - Create visualizations:
    - Compliance score trend (line chart)
    - Issues by severity (pie chart)
    - Top 10 problematic pages (bar chart)
    - Document remediation progress (gauge)
    - Vendor compliance status (matrix)
    - Training completion (funnel chart)
  - Implement drill-down functionality
  - Apply City of Bowie branding
  
- **Automation Setup**
  - Pa11y scheduled scans (daily or weekly)
  - Power Automate flow to import Pa11y results
  - Email alerts for new critical issues
  - Monthly executive summary email
  
- **Deliverable**: Functional Power BI dashboard + automation

#### Month 6: Testing & Deployment
- **User Acceptance Testing**
  - Todd and Communications team test dashboard
  - IT tests automation
  - City Manager tests executive summary
  
- **Training on Dashboard Usage**
  - How to read reports
  - How to drill down into issues
  - How to export data
  - How to request changes
  
- **Go-Live**
  - Deploy to production
  - Grant Power BI licenses to key users (2-5 people)
  - Schedule recurring scans
  - Enable alerting
  
- **Deliverable**: Production dashboard + user training

### Resources Required
- **Team**:
  - 1 Power BI developer (40-80 hours)
  - 1 automation engineer (20-40 hours)
  - 1 UI/UX designer (16 hours - wireframes)
  - City IT (10 hours - infrastructure support)

- **Tools**:
  - Power BI Pro licenses: $10/user/month (2-5 users) = $20-50/month
  - Azure subscription (if using Azure Functions): $50-200/month
  - Pa11y (free)
  - Power Automate (included with M365)

- **Budget**: 
  - **One-time**: $6,000-12,000 (development)
  - **Recurring**: $200-500/month (Power BI licenses + infrastructure)

### Success Criteria
✅ Dashboard visualizes all key compliance metrics  
✅ Automated scans run on schedule (0 manual intervention)  
✅ Alerts trigger for critical issues  
✅ Executive summary report delivered monthly  
✅ Todd and team can self-serve data  
✅ Mobile access functional (Power BI app)

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Pa11y scans miss dynamic content | Medium | Supplement with manual testing, document limitations |
| Data quality issues (manual entry errors) | Low | Validation rules, dropdown menus, periodic audits |
| Dashboard overload (too much data) | Low | Phased rollout, hide complexity behind drill-downs |
| Lack of engagement (dashboard not used) | Medium | Executive sponsorship, embed in recurring meetings |

---

## PHASE 6: POLICY & GOVERNANCE (Months 10-12)

### Objectives
Institutionalize accessibility practices for long-term compliance

### Deliverables

#### Month 10-11: Policy Development
- **Accessibility Policy Document**
  - Commitment statement
  - Scope (web, documents, facilities, services)
  - Roles and responsibilities
  - Standards (WCAG 2.1 AA)
  - Procurement requirements
  - Complaint process
  - Review and update cycle
  
- **Web Content Publishing Policy**
  - Accessibility requirements for all new content
  - Review and approval workflow
  - Testing requirements before publish
  - Remediation timeline for existing content
  
- **Document Publishing Policy**
  - Accessible formats required (HTML preferred, tagged PDFs)
  - Template usage mandatory
  - Accessibility checklist before distribution
  - Exemption process (historical archives, etc.)
  
- **Vendor Procurement Policy**
  - Accessibility requirements in RFPs
  - VPAT review process
  - Contract language requirements
  - Vendor remediation expectations
  
- **Deliverable**: Policy manual (approved by City leadership)

#### Month 11-12: Governance Structure
- **Accessibility Steering Committee**
  - Chair: Todd (or Communications Director)
  - Members: IT, HR, Procurement, Legal, Communications
  - Frequency: Quarterly meetings
  - Responsibilities:
    - Review compliance metrics
    - Approve policy changes
    - Allocate resources
    - Escalate issues
  
- **Accessibility Coordinator** (Designated Role)
  - Day-to-day compliance management
  - Training coordination
  - Vendor liaison
  - Issue triage
  - Reporting to Steering Committee
  
- **Accessibility Champions Network** (See Phase 4)
  - Departmental representatives
  - Peer support
  - Issue identification
  
- **Deliverable**: Governance charter + role descriptions

#### Month 12: Compliance Documentation Package
- **For DOJ Audit / Legal Defense**
  - Accessibility policy
  - Compliance roadmap (this document)
  - Audit reports (before/after)
  - Remediation logs
  - Training records
  - Vendor VPATs and contracts
  - Dashboard screenshots (proof of monitoring)
  - Public Accessibility Statement
  
- **Deliverable**: Compliance binder (physical + digital)

### Resources Required
- **Team**:
  - 1 policy writer (40 hours)
  - City Legal (review) (10 hours)
  - City leadership (approval) (5 hours)

- **Tools**: Word, SharePoint

- **Budget**: $4,000-6,000 (labor)

### Success Criteria
✅ Accessibility policy approved by City Council or City Manager  
✅ Governance structure established with named roles  
✅ Quarterly Steering Committee meetings scheduled  
✅ Compliance documentation package complete  
✅ Public Accessibility Statement published

---

## ONGOING: MAINTENANCE & CONTINUOUS IMPROVEMENT (Post-Month 12)

### Objectives
Sustain compliance beyond April 2026 deadline

### Recurring Activities

#### Quarterly Audits
- **Scope**: Sample pages + new content
- **Method**: Automated scans + manual testing
- **Deliverable**: Quarterly compliance report
- **Cost**: $2,000-4,000 per audit

#### Annual Training Refreshers
- **Audience**: All staff (2-hour refresher)
- **Topics**: Policy updates, common mistakes, new tools
- **Cost**: $3,000-5,000 annually

#### Dashboard Management Subscription
- **Services Included**:
  - Dashboard updates (new metrics, bug fixes)
  - Pa11y automation maintenance
  - Power BI license management
  - Monthly executive reports
  - Technical support (email + office hours)
- **Cost**: $2,000-4,000/month

#### Vendor Reassessments
- **Frequency**: Annually or at contract renewal
- **Activities**: VPAT review, re-testing if major updates
- **Cost**: $1,000-2,000 per vendor

#### New Content Review
- **Process**: Sample 10% of new website pages and documents quarterly
- **Method**: Automated scans + manual review
- **Cost**: Included in quarterly audits

#### Policy Review
- **Frequency**: Annually
- **Activities**: Update for new WCAG versions, legal changes
- **Cost**: $1,000-2,000 annually

### Recurring Revenue Model (For Your Business)
- **Dashboard subscription**: $2,000-4,000/month
- **Quarterly audits**: $8,000-16,000/year (4 audits)
- **Annual training**: $3,000-5,000/year
- **Vendor reassessments**: $3,000-6,000/year (3 vendors)
- **Ad-hoc support**: $150-200/hour (as needed)
- **Total**: $38,000-71,000/year recurring revenue

---

## TIMELINE SUMMARY

```
Month 0 (Dec 2025):  [Phase 0] Proof-of-concept + proposal
Month 1-4:           [Phase 1] Website audit + remediation
Month 3-8:           [Phase 2] Document remediation
Month 4-10:          [Phase 3] Vendor assessment
Month 4-6:           [Phase 5] Dashboard development
Month 6-12:          [Phase 4] Training program
Month 10-12:         [Phase 6] Policy & governance
Month 12+:           [Ongoing] Maintenance & continuous improvement
```

**April 24, 2026**: Federal deadline (Month 16-17 if starting January 2026)  
**Buffer**: 4-5 months for unexpected delays

---

## BUDGET SUMMARY

### One-Time Costs (Months 1-12)
| Phase | Low Estimate | High Estimate |
|-------|--------------|---------------|
| Phase 0: POC | $0 | $1,000 |
| Phase 1: Website | $15,000 | $25,000 |
| Phase 2: Documents | $20,000 | $50,000 |
| Phase 3: Vendors | $8,000 | $15,000 |
| Phase 4: Training | $10,000 | $20,000 |
| Phase 5: Dashboard | $6,000 | $12,000 |
| Phase 6: Policy | $4,000 | $6,000 |
| **Total** | **$63,000** | **$129,000** |

### Pricing Tiers (For Proposal)
- **Tier 1 (Essential)**: $65,000-75,000
  - Website remediation + dashboard + basic training
  - Meets minimum compliance
  
- **Tier 2 (Recommended)**: $95,000-110,000
  - All of Tier 1
  - Document remediation
  - Comprehensive training
  - Vendor assessment
  - **Best value**
  
- **Tier 3 (Comprehensive)**: $120,000-140,000
  - All of Tier 2
  - Add SiteImprove for comparison/validation
  - Advanced dashboard features
  - Executive coaching
  - White-glove service

### Recurring Costs (Annual, Post-Implementation)
- **Dashboard subscription**: $24,000-48,000/year
- **Quarterly audits**: $8,000-16,000/year
- **Training refreshers**: $3,000-5,000/year
- **Vendor reassessments**: $3,000-6,000/year
- **Total**: $38,000-75,000/year

---

## RISK REGISTER

### High-Impact Risks

| Risk | Probability | Impact | Mitigation Strategy | Owner |
|------|-------------|--------|---------------------|-------|
| April 2026 deadline missed | Low | Critical | Start immediately, buffer built into timeline, prioritize ruthlessly | Project Manager |
| Laserfiche document volume >2,000 | Medium | High | Early inventory, consider Equidox, prioritize Tier 1 only | Document Specialist |
| Vendor (Munis) non-compliant with no remediation plan | Medium | High | Document for legal defense, explore alternatives, negotiate contract amendment | Vendor Manager |
| Staff turnover mid-project | Low | Medium | Document everything, record training, cross-train team | All |
| Budget overruns | Low | Medium | Phased pricing, change order process, contingency fund | Business Manager |

### Medium-Impact Risks

| Risk | Probability | Impact | Mitigation Strategy | Owner |
|------|-------------|--------|---------------------|-------|
| CivicPlus platform limitations | Medium | Medium | Document workarounds, engage CivicPlus support, prepare for CMS migration if necessary | Web Specialist |
| Training attendance low | Medium | Medium | Executive mandate, make training mandatory, multiple session options | Training Coordinator |
| Dashboard not used by staff | Low | Medium | Executive sponsorship, embed in meetings, provide training | Dashboard Developer |
| Compliance drift post-implementation | Medium | Medium | Governance structure, Accessibility Coordinator role, recurring audits | City Leadership |

---

## SUCCESS METRICS (KPIs)

### Compliance Metrics
- **Website**: 0 WCAG Level A violations, <5 WCAG Level AA violations
- **Documents**: 100% of Tier 1 docs remediated, 80% of Tier 2
- **Vendors**: 100% VPATs collected, critical vendors tested
- **Training**: 90% staff completion rate

### Operational Metrics
- **Dashboard uptime**: 99%+
- **Scan frequency**: Weekly automated scans
- **Issue resolution time**: Critical issues <7 days, high priority <30 days
- **Support response time**: <24 hours for email inquiries

### Business Metrics (For Your Firm)
- **Customer satisfaction**: 8+/10 survey score
- **Contract renewal rate**: 90%+ (recurring services)
- **Referral rate**: 2+ referrals from City of Bowie within 12 months
- **Profit margin**: 30-40%

---

## DECISION POINTS

### Decision 1: Tier Selection (Week of Dec 16, 2025)
**Options**: Tier 1 (Essential) / Tier 2 (Recommended) / Tier 3 (Comprehensive)  
**Recommendation**: Tier 2 (best value, comprehensive coverage)  
**Decision Maker**: Todd + City Manager  
**Factors**: Budget, risk tolerance, desire for thoroughness

### Decision 2: Dashboard Platform (Month 4)
**Options**: Custom Power BI / SiteImprove / Monsido  
**Recommendation**: Custom Power BI (cost-effective, flexible, recurring revenue)  
**Decision Maker**: Todd + IT Director  
**Factors**: Cost, integration with M365, customization needs

### Decision 3: Document Processing Approach (Month 3)
**Options**: Manual remediation / Equidox batch processing  
**Recommendation**: Start manual, add Equidox only if volume >1,000 docs  
**Decision Maker**: Project Manager + Todd  
**Factors**: Document volume from inventory, budget availability

### Decision 4: Vendor Strategy for Non-Compliant Vendors (Month 8)
**Options**: Demand remediation / Accept risk and document / Switch vendors  
**Recommendation**: Depends on vendor criticality and leverage  
**Decision Maker**: City Manager + Legal + Procurement  
**Factors**: Contract renewal timing, alternative vendor availability, cost of switching

---

## APPENDICES

### Appendix A: WCAG 2.1 AA Quick Reference
(Include 1-page summary of key success criteria)

### Appendix B: Sample Accessibility Statement
(Include template for City of Bowie website)

### Appendix C: Vendor VPAT Request Letter Template
(Include formal request letter)

### Appendix D: Accessible Document Checklist
(Include 1-page checklist for staff)

### Appendix E: Pa11y Configuration File
(Include technical documentation)

### Appendix F: Power BI Dashboard Screenshots
(Include mockups/wireframes)

---

**Document Status**: COMPLETE  
**Approval Required**: Todd (Communications Director) + City Manager  
**Next Review Date**: Post-contract signing  
**Questions**: Contact project team

---

**End of Roadmap**
