# Skills Inventory & Team Staffing Plan
## City of Bowie ADA Compliance Project

**Document Version**: 1.0  
**Last Updated**: 2025-12-11  
**Purpose**: Define required expertise, roles, and staffing strategy

---

## EXECUTIVE SUMMARY

This document outlines the skills, expertise, and team composition required to successfully deliver ADA Title II compliance services to the City of Bowie. It includes:

1. **Skills Matrix** - Technical and domain expertise required
2. **Role Definitions** - Specific responsibilities by role
3. **Staffing Model** - Full-time, part-time, contractor mix
4. **Training & Development** - How to upskill team members
5. **Hiring Priorities** - If roles need to be filled

**Key Finding**: This project requires a **hybrid team** of specialists (accessibility experts, developers, trainers) supported by generalists (project managers, QA). No single person has all required skills.

---

## PART 1: SKILLS MATRIX

### Core Competency Categories

#### A. Technical Skills (Web & Development)
| Skill | Proficiency Level | Priority | Used In |
|-------|-------------------|----------|---------|
| HTML5 Semantic Markup | Advanced | Critical | Phase 1 (Website) |
| CSS (Color Contrast, Visual Design) | Intermediate | High | Phase 1 (Website) |
| JavaScript (DOM Manipulation, Events) | Intermediate | High | Phase 1 (Website) |
| ARIA (Accessible Rich Internet Applications) | Advanced | Critical | Phase 1 (Website) |
| Node.js | Intermediate | Medium | Phase 5 (Dashboard) |
| Power BI Development | Advanced | Critical | Phase 5 (Dashboard) |
| SQL / Data Modeling | Intermediate | Medium | Phase 5 (Dashboard) |
| Power Automate / Azure Functions | Intermediate | Medium | Phase 5 (Automation) |
| Git / Version Control | Basic | Low | All Phases |

#### B. Accessibility Domain Expertise
| Skill | Proficiency Level | Priority | Used In |
|-------|-------------------|----------|---------|
| WCAG 2.1 AA Standards | Expert | Critical | All Phases |
| Section 508 Compliance | Advanced | High | All Phases |
| Assistive Technology Testing (Screen Readers) | Advanced | Critical | Phase 1, 3 |
| Keyboard Navigation Testing | Advanced | Critical | Phase 1, 3 |
| PDF/UA (PDF Accessibility) | Advanced | Critical | Phase 2 (Documents) |
| Document Remediation | Advanced | Critical | Phase 2 (Documents) |
| Accessibility Auditing Methodology | Expert | Critical | Phase 1, 3 |
| Legal/Regulatory Knowledge (ADA Title II) | Intermediate | Medium | Phase 6 (Policy) |

#### C. Tools & Platforms
| Tool | Proficiency Level | Priority | Used In |
|------|-------------------|----------|---------|
| Pa11y (Command-Line Scanner) | Intermediate | Critical | Phase 0, 1, 5 |
| Axe DevTools | Advanced | Critical | Phase 1 |
| WAVE (WebAIM) | Intermediate | Medium | Phase 1 |
| Adobe Acrobat Pro (Accessibility Features) | Advanced | Critical | Phase 2 |
| CommonLook PDF | Intermediate | Medium | Phase 2 (if needed) |
| PAC 2021 (PDF Validator) | Basic | Medium | Phase 2 |
| NVDA Screen Reader | Advanced | Critical | Phase 1, 3 |
| JAWS Screen Reader | Intermediate | Low | Phase 1, 3 |
| CivicPlus CMS | Basic | Medium | Phase 1 |
| Microsoft Office (Accessibility Features) | Intermediate | High | Phase 2, 4 |
| SharePoint Administration | Intermediate | Medium | Phase 2, 4 |
| Laserfiche (API Integration) | Basic | Low | Phase 2 |

#### D. Soft Skills & Domain Knowledge
| Skill | Proficiency Level | Priority | Used In |
|-------|-------------------|----------|---------|
| Government/Public Sector Experience | Intermediate | High | All Phases |
| Client Communication | Advanced | Critical | All Phases |
| Training & Facilitation | Advanced | Critical | Phase 4 (Training) |
| Technical Writing | Intermediate | High | All Phases |
| Project Management | Advanced | Critical | All Phases |
| Change Management | Intermediate | Medium | Phase 4, 6 |
| Vendor Negotiation | Intermediate | Medium | Phase 3 (Vendors) |
| Policy Development | Intermediate | Medium | Phase 6 (Governance) |

---

## PART 2: ROLE DEFINITIONS

### Role 1: Project Manager / Meta Agent
**FTE**: 0.25-0.5 (10-20 hours/week)  
**Duration**: Entire project (12-18 months)

**Responsibilities**:
- Overall project oversight and coordination
- Client communication (primary liaison with Todd)
- Timeline and budget management
- Risk management
- Stakeholder management
- Resource allocation
- Quality assurance
- Deliverable sign-off

**Required Skills**:
- Project management (PMP or equivalent)
- Government sector experience
- Accessibility domain knowledge (intermediate)
- Client relationship management
- Budget management
- Risk management

**AI Assistance**: Project planning, status reporting, risk identification

**Ideal Candidate**:
- 5+ years project management experience
- Prior government consulting
- Accessibility project experience preferred (but not required)

---

### Role 2: Web Accessibility Specialist / Lead Auditor
**FTE**: 0.5-0.75 (20-30 hours/week)  
**Duration**: Phase 1 (Months 1-4), Phase 3 (Months 6-8), Ongoing (quarterly audits)

**Responsibilities**:
- Website accessibility audits (manual + automated)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing
- ARIA validation
- Vendor platform testing (Munis, ActiveNet)
- Remediation recommendations
- VPAT reviews
- Training development (technical accessibility topics)

**Required Skills**:
- **CRITICAL**: WCAG 2.1 AA expert-level knowledge
- Assistive technology proficiency (NVDA, JAWS)
- HTML5, CSS, JavaScript (read and debug code)
- ARIA implementation
- Axe DevTools, Pa11y, WAVE
- Keyboard navigation testing
- Accessibility audit methodology

**AI Assistance**: Code review, remediation suggestions, training content generation

**Ideal Candidate**:
- IAAP Certified (WAS or CPWA certification)
- 3+ years accessibility testing experience
- Government or public sector experience preferred
- Can articulate technical issues to non-technical audiences

**Hiring Priority**: HIGH (This is the core specialized role)

---

### Role 3: Front-End Developer (Web Remediation)
**FTE**: 0.25-0.5 (10-20 hours/week)  
**Duration**: Phase 1 (Months 2-4), Ad-hoc support ongoing

**Responsibilities**:
- Implement accessibility fixes in HTML/CSS/JavaScript
- CivicPlus CMS customization
- Template updates
- Focus management and keyboard navigation
- Form validation
- ARIA attribute implementation
- Code review for accessibility

**Required Skills**:
- HTML5 semantic markup (advanced)
- CSS (including color contrast, focus indicators)
- JavaScript (DOM manipulation, event handling)
- ARIA (intermediate to advanced)
- CMS experience (CivicPlus or similar)
- Git version control
- Accessibility coding best practices

**AI Assistance**: Code generation, debugging, ARIA patterns

**Ideal Candidate**:
- 3+ years front-end development experience
- Prior accessibility remediation work
- Familiarity with government CMSs
- Comfortable working with legacy code

**Hiring Priority**: MEDIUM (Could be contractor or freelancer)

---

### Role 4: Document Remediation Specialist
**FTE**: 0.5-1.0 (20-40 hours/week, volume-dependent)  
**Duration**: Phase 2 (Months 4-8), potentially longer if document volume high

**Responsibilities**:
- PDF accessibility remediation (tagging, alt text, reading order)
- Adobe Acrobat Pro proficiency
- Document inventory and prioritization
- PAC 2021 validation
- Microsoft Office accessible templates
- Document quality assurance
- Staff training on document accessibility

**Required Skills**:
- **CRITICAL**: Adobe Acrobat Pro accessibility features (expert)
- PDF/UA (ISO 14289) standards
- CommonLook PDF (if needed for complex docs)
- Microsoft Office accessibility features
- Document structure (headings, lists, tables)
- Alt text best practices
- OCR (Optical Character Recognition) for scanned docs

**AI Assistance**: Alt text generation, quality checks, batch scripting

**Ideal Candidate**:
- 2+ years PDF remediation experience
- High attention to detail
- Can handle repetitive tasks with quality consistency
- Prior work with government documents (forms, reports, etc.)

**Hiring Priority**: MEDIUM-HIGH (Volume-dependent, could be contractor)

---

### Role 5: Training Developer / Facilitator
**FTE**: 0.25-0.5 (10-20 hours/week)  
**Duration**: Phase 4 (Months 6-10), Annual refreshers ongoing

**Responsibilities**:
- Curriculum development (4 training courses)
- Presentation materials (PowerPoint, handouts, videos)
- Facilitate live training sessions
- Record video modules
- Create quick reference guides
- SharePoint knowledge base setup
- Office hours support
- Accessibility Champions network facilitation

**Required Skills**:
- Instructional design
- Adult learning principles
- Training facilitation (live and virtual)
- Video production (Camtasia or similar)
- Technical writing (simplified for non-technical audiences)
- Microsoft Office (advanced)
- SharePoint (content management)
- Accessibility knowledge (intermediate)

**AI Assistance**: Slide content generation, quiz creation, script writing, FAQs

**Ideal Candidate**:
- 3+ years training development experience
- Government or public sector training preferred
- Comfortable with technical topics
- Engaging presentation style

**Hiring Priority**: MEDIUM (Could combine with Project Manager role if strong training skills)

---

### Role 6: Power BI Developer / Data Engineer
**FTE**: 0.25-0.5 (10-20 hours/week)  
**Duration**: Phase 5 (Months 4-6), Ongoing maintenance

**Responsibilities**:
- Dashboard requirements gathering
- Data model design
- Power BI report development
- Pa11y automation setup
- Power Automate workflow creation
- Azure Functions (if needed for complex automation)
- Dashboard testing and optimization
- User training (how to use dashboard)
- Ongoing maintenance and updates

**Required Skills**:
- **CRITICAL**: Power BI development (advanced)
- Data modeling (SQL, SharePoint lists, JSON)
- Power Automate
- Node.js (for Pa11y integration)
- Azure Functions (optional, for advanced automation)
- API integration (Laserfiche, CivicPlus if needed)
- Data visualization best practices
- User experience design

**AI Assistance**: DAX formula writing, automation scripting, troubleshooting

**Ideal Candidate**:
- 2+ years Power BI development experience
- Prior dashboard projects (ideally compliance monitoring)
- Microsoft 365 ecosystem familiarity
- Can translate business requirements to technical design

**Hiring Priority**: HIGH (Critical for recurring revenue model)

---

### Role 7: Vendor Manager / Compliance Analyst
**FTE**: 0.1-0.25 (4-10 hours/week)  
**Duration**: Phase 3 (Months 4-10), Annual reassessments ongoing

**Responsibilities**:
- Vendor inventory and identification
- VPAT request and review
- Contract analysis (accessibility clauses)
- Vendor compliance testing coordination
- Negotiation support (with Procurement)
- Remediation agreement tracking
- Vendor relationship management
- Compliance documentation

**Required Skills**:
- Vendor management
- Contract review
- Accessibility standards (WCAG, Section 508)
- VPAT analysis
- Negotiation
- Government procurement knowledge
- Stakeholder communication
- Project management

**AI Assistance**: VPAT analysis, contract language generation, compliance gap reports

**Ideal Candidate**:
- 3+ years vendor or contract management
- Government procurement experience
- Accessibility knowledge (intermediate)
- Diplomatic communication style

**Hiring Priority**: LOW (Could combine with Project Manager role)

---

### Role 8: QA Tester / Accessibility Validator
**FTE**: 0.1-0.25 (4-10 hours/week)  
**Duration**: All phases (spot testing), intensive during Phase 1 and 2

**Responsibilities**:
- Manual accessibility testing
- Keyboard navigation validation
- Screen reader validation (NVDA)
- Color contrast checks
- Document accessibility validation
- Issue documentation
- Regression testing (after fixes)
- User acceptance testing support

**Required Skills**:
- QA testing methodology
- Accessibility testing (intermediate)
- NVDA screen reader
- Keyboard navigation
- Bug reporting
- Attention to detail
- Assistive technology familiarity

**AI Assistance**: Test case generation, bug report writing

**Ideal Candidate**:
- 1-3 years QA testing experience
- Accessibility testing preferred
- Can work independently with minimal supervision
- Methodical and thorough

**Hiring Priority**: LOW (Could be contractor or part-time)

---

### Role 9: SharePoint Administrator (City of Bowie Liaison)
**FTE**: 0.1 (4 hours/week)  
**Duration**: Phase 2 (Months 7-8), Ad-hoc support ongoing

**Responsibilities**:
- SharePoint site setup (document migration)
- Information Architecture design
- Metadata configuration
- Version control and approval workflows
- Permissions and access controls
- Compliance Center setup (if E5 license)
- Training City staff on SharePoint

**Required Skills**:
- SharePoint Online administration
- Microsoft 365 ecosystem
- Information Architecture
- Governance (retention policies, compliance)
- User training
- Accessibility features in SharePoint

**AI Assistance**: Site structure design, workflow configuration, training materials

**Ideal Candidate**:
- City of Bowie IT staff (leverage existing resource)
- OR external SharePoint consultant (short-term engagement)

**Hiring Priority**: LOW (Likely already exists on City IT team)

---

### Role 10: Policy Writer / Governance Consultant
**FTE**: 0.1 (4 hours/week)  
**Duration**: Phase 6 (Months 10-12)

**Responsibilities**:
- Accessibility policy development
- Web content publishing policy
- Document publishing policy
- Vendor procurement policy
- Governance charter
- Role descriptions (Accessibility Coordinator, Steering Committee)
- Legal review coordination
- Executive presentations (policy approval)

**Required Skills**:
- Policy writing
- Government policy experience
- Accessibility compliance knowledge
- Legal/regulatory writing
- Stakeholder communication
- Change management

**AI Assistance**: Policy drafting, template generation, legal language review

**Ideal Candidate**:
- 3+ years policy development experience
- Government or public sector experience
- Accessibility policy experience preferred
- Strong writing skills

**Hiring Priority**: LOW (Could be contracted for short-term engagement)

---

## PART 3: STAFFING MODEL

### Option A: Small Specialized Team (RECOMMENDED)
**Total Headcount**: 3-4 core team + 2-3 specialists as needed

**Core Team (Internal / Full Project)**:
1. **Project Manager** (0.25-0.5 FTE) - You or dedicated PM
2. **Web Accessibility Specialist** (0.5-0.75 FTE) - MUST HIRE if not in-house
3. **Power BI Developer** (0.25-0.5 FTE) - Contract or hire

**Specialist Team (Contract / Phase-Specific)**:
4. **Document Remediation Specialist** (0.5-1.0 FTE) - Contract for Phase 2
5. **Training Developer** (0.25-0.5 FTE) - Contract or combine with PM
6. **Front-End Developer** (0.25-0.5 FTE) - Contract as needed

**As-Needed / Minimal**:
- Vendor Manager (combine with PM)
- QA Tester (contract, part-time)
- Policy Writer (contract, short-term)
- SharePoint Admin (City IT staff)

**Total Cost (Labor)**:
- Core team: $80,000-120,000 (blended rates)
- Specialists: $30,000-50,000 (phase-specific)
- **Total**: $110,000-170,000 (matches pricing tiers)

**Pros**:
- Lean and efficient
- Flexibility to scale up/down
- Lower overhead
- Easier to manage

**Cons**:
- Dependent on key individuals
- Limited bench strength
- May need to extend timeline if capacity constrained

---

### Option B: Larger Generalist Team
**Total Headcount**: 5-6 people, more generalist skillsets

**Team Composition**:
1. Project Manager
2. 2-3 Accessibility Consultants (generalists with broad skills)
3. 1 Developer (full-stack)
4. 1 Training/Communications specialist

**Pros**:
- More redundancy
- Cross-training opportunities
- Can handle multiple clients simultaneously

**Cons**:
- Higher cost
- May lack deep expertise in specific areas (PDF remediation, Power BI)
- More coordination overhead

**Recommendation**: NOT ideal for this project (overkill for mid-size city)

---

### Option C: You + AI Agents + Contractors (INNOVATIVE)
**Total Headcount**: 1 core (you) + AI tools + 2-3 contractors

**Core**:
- You = Project Manager + Meta Agent

**AI-Assisted Roles** (You + AI):
- Accessibility auditing (you do manual testing, AI assists with code review)
- Training content development (AI generates slides, you refine)
- Policy writing (AI drafts, you review)
- Dashboard development (AI generates Power BI DAX, you test)

**Contract Specialists**:
- Document remediation specialist (high-volume, repetitive work)
- Front-end developer (code implementation)
- Power BI expert (dashboard build, if you lack skills)

**Pros**:
- **LOWEST COST** (maximize AI leverage)
- High flexibility
- You control quality and client relationship

**Cons**:
- High dependency on you (burnout risk)
- AI limitations (still needs human validation)
- Slower than dedicated team (if you're juggling other projects)

**Recommendation**: Viable if this is your only major project, but risky if you have other commitments

---

## PART 4: SKILL GAP ANALYSIS & TRAINING

### If You're the Primary Delivery Team

**Your Strengths** (Based on conversation):
- Strategic thinking
- AI integration
- Technical aptitude
- Business development

**Likely Gaps** (Assumptions, adjust as needed):
1. **WCAG 2.1 AA Deep Expertise**
   - **Solution**: IAAP Certification (WAS or CPWA)
   - **Timeline**: 2-3 months self-study
   - **Cost**: $500-1,000 (exam + study materials)
   - **Priority**: HIGH

2. **Screen Reader Proficiency (NVDA, JAWS)**
   - **Solution**: Hands-on practice (2-4 weeks)
   - **Resources**: WebAIM tutorials, Deque University
   - **Cost**: Free (NVDA), $95/month (JAWS)
   - **Priority**: HIGH

3. **Adobe Acrobat Pro Accessibility Features**
   - **Solution**: LinkedIn Learning or Udemy course
   - **Timeline**: 1 week
   - **Cost**: $30-50
   - **Priority**: MEDIUM (or hire specialist)

4. **Power BI Development**
   - **Solution**: Microsoft Learn + hands-on project
   - **Timeline**: 2-4 weeks
   - **Cost**: Free (Microsoft Learn)
   - **Priority**: HIGH (if you want to build dashboard yourself)

5. **Government Sector Communication/Norms**
   - **Solution**: Research, observe, adapt communication style
   - **Timeline**: Ongoing
   - **Cost**: Free
   - **Priority**: MEDIUM

### Recommended Learning Path (If Building Skills)

**Weeks 1-2: Accessibility Foundations**
- [ ] WCAG 2.1 AA full read-through (W3C documentation)
- [ ] Section 508 standards review (section508.gov)
- [ ] Install and practice with NVDA screen reader (2 hours/day)
- [ ] Complete keyboard navigation testing practice
- [ ] Axe DevTools certification (free, online)

**Weeks 3-4: Technical Skills**
- [ ] Power BI dashboard tutorial (Microsoft Learn)
- [ ] Pa11y command-line tool setup and practice
- [ ] Adobe Acrobat Pro accessibility features (LinkedIn Learning)
- [ ] Build sample accessible website (hands-on)

**Weeks 5-6: Certification + Practice**
- [ ] IAAP WAS (Web Accessibility Specialist) exam prep
- [ ] Take IAAP WAS exam
- [ ] Conduct full audit of sample website (build portfolio)

**Week 7-8: Proposal Prep**
- [ ] Build proof-of-concept scanner (this week!)
- [ ] Scan real websites, document findings
- [ ] Create proposal materials

**Total Time Investment**: 80-120 hours (2-3 months part-time)  
**Total Cost**: $500-1,500 (certification + tools)

---

## PART 5: HIRING PRIORITIES (If Building a Team)

### Immediate Hires (Before Contract Signed)
**None** - Wait until contract secured (reduces risk)

### Month 1 Hires (After Contract Signed)
1. **Web Accessibility Specialist** (If you don't have certification)
   - **Why**: Core expertise, cannot compromise on quality
   - **Where to Find**:
     - IAAP job board
     - LinkedIn (search "CPWA" or "WAS certification")
     - Accessibility consultancies (contract-to-hire)
   - **Salary**: $70,000-110,000/year (or $60-90/hour contract)

2. **Power BI Developer** (If you don't have skills)
   - **Why**: Critical for recurring revenue model
   - **Where to Find**:
     - Upwork, Toptal (freelance platforms)
     - Microsoft partner network
     - LinkedIn
   - **Rate**: $75-125/hour (contract) or $80,000-100,000/year

### Month 3 Hires (As Needed)
3. **Document Remediation Specialist**
   - **Why**: High-volume, specialized work
   - **Where to Find**:
     - Freelance platforms (Upwork, Fiverr)
     - Accessibility consultancies (subcontract)
     - Hire directly (if volume justifies)
   - **Rate**: $40-70/hour (contract)

### Optional Hires (Phase-Dependent)
4. **Training Developer** - Contract or combine with PM role
5. **Front-End Developer** - Contract as needed for remediation
6. **QA Tester** - Contract, part-time

---

## PART 6: SUBCONTRACTING STRATEGY

### When to Subcontract vs. Hire
**Subcontract**:
- Specialized short-term work (document remediation, policy writing)
- Skills you don't have and don't want to build
- Work that fluctuates (can scale up/down)
- Testing and QA (lower-risk tasks)

**Hire (Employee or Long-Term Contractor)**:
- Core expertise (web accessibility specialist)
- Client-facing roles (project manager)
- Recurring work (dashboard management, ongoing audits)
- IP/quality control (dashboard code, training materials)

### Recommended Subcontractors to Pre-Identify

1. **Document Remediation Firm**
   - Example: Able Docs, 3Play Media, etc.
   - Pre-negotiate rates
   - Backup if volume exceeds capacity

2. **Accessibility Audit Firm** (Backup/Overflow)
   - Example: Deque, Level Access, etc.
   - For VPAT validation or second opinion

3. **Power BI Freelancer**
   - Identify 2-3 developers
   - Test with small project before City of Bowie

4. **Training Video Producer**
   - Local videographer
   - For high-quality training modules

---

## PART 7: TEAM COMMUNICATION & COLLABORATION

### Tools
- **Project Management**: Microsoft Planner or Project (City has M365)
- **Communication**: Microsoft Teams (City uses this)
- **Documentation**: SharePoint (City-facing) + Notion/Confluence (internal)
- **Code**: GitHub (private repo for scanner/dashboard code)
- **Time Tracking**: Toggl or Harvest (for billing)

### Meeting Cadence
- **Weekly Client Check-In** (30 min with Todd)
- **Weekly Team Standup** (30 min internal)
- **Monthly Steering Committee** (1 hour with City leadership)
- **Quarterly Executive Review** (1 hour, post-implementation)

---

## SUMMARY & RECOMMENDATIONS

### Critical Skills to Have In-House
1. **WCAG 2.1 AA Expertise** - Cannot compromise
2. **Screen Reader Testing** - Manual validation required
3. **Power BI Development** - Recurring revenue depends on this
4. **Project Management** - Client relationship critical

### Skills You Can Outsource
1. **Document Remediation** - High-volume, repetitive (good for contractors)
2. **Front-End Development** - Remediation coding (contractor fine)
3. **Training Development** - Can use templates and AI assistance
4. **Policy Writing** - Short-term engagement

### If You're Solo + AI-Assisted
**Invest in learning**:
1. IAAP WAS Certification (2-3 months, $500-1,000)
2. Power BI skills (1 month, free)
3. NVDA proficiency (2 weeks, free)

**Subcontract**:
- Document remediation (if volume >500 docs)
- Power BI dashboard build (if you don't have time to learn)
- Front-end coding (if you're not developer)

**Use AI for**:
- Training content generation
- Policy drafting
- Code review and suggestions
- Alt text generation (validate manually)
- Dashboard DAX formulas

---

**Document Status**: COMPLETE  
**Next Action**: Assess your current skillset, decide build vs. hire strategy  
**Owner**: You  
**Date**: 2025-12-11
