# Agent Architecture & Team Structure
## City of Bowie ADA Compliance Project

**Document Version**: 1.0  
**Last Updated**: 2025-12-11  
**Purpose**: Define the hybrid human-AI team structure and autonomous tools

---

## EXECUTIVE SUMMARY

This project uses a **HYBRID AGENT ARCHITECTURE**:

1. **Human Agents** (Consultants with AI Assistance)
   - Expert decision-making
   - Client-facing accountability
   - Complex judgment calls
   - Legal/liability responsibility

2. **Autonomous Tools** (AI/Automation)
   - Scanning and monitoring (Pa11y)
   - Dashboard updates (Power BI + automation)
   - Alert systems (trigger without human intervention)
   - Reporting (automated generation)

**Critical Distinction**:
- **Service = Human** (City of Bowie is paying for expert consulting)
- **Tools = Autonomous** (Scanner and dashboard run automatically)

This addresses your question: **"SHOULD THEY BE AGENTS THIS WAY OR THE SDK ONES THAT ARE AUTONOMOUS?"**

**Answer**: BOTH. Human agents for consulting services + autonomous tools for continuous monitoring.

---

## PART 1: ARCHITECTURE OVERVIEW

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         TIER 1: META AGENT                      │
│                    (Human Project Manager)                      │
│                                                                 │
│  Responsibilities:                                              │
│  - Strategic oversight                                          │
│  - Client relationship (Todd)                                   │
│  - Resource allocation                                          │
│  - Quality control                                              │
│  - Risk management                                              │
│                                                                 │
│  AI Assistance: Project planning, status reports, risk analysis │
└─────────────────────────────────────────────────────────────────┘
                              ↓ Orchestrates
┌─────────────────────────────────────────────────────────────────┐
│                    TIER 2: HUMAN AGENTS                         │
│                 (Specialist Team Members)                       │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ Web Accessibility│  │ Document         │  │ Training     │ │
│  │ Specialist       │  │ Remediation      │  │ Developer    │ │
│  │                  │  │ Specialist       │  │              │ │
│  │ + AI Assistant   │  │ + AI Assistant   │  │ + AI Assistant│ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ Power BI         │  │ Vendor Manager   │                   │
│  │ Developer        │  │ / Compliance     │                   │
│  │                  │  │ Analyst          │                   │
│  │ + AI Assistant   │  │ + AI Assistant   │                   │
│  └──────────────────┘  └──────────────────┘                   │
│                                                                 │
│  Responsibilities:                                              │
│  - Execute specialized tasks                                    │
│  - Manual validation and judgment                               │
│  - Client-facing deliverables                                   │
│  - Training and knowledge transfer                              │
│                                                                 │
│  AI Assistance: Code generation, content creation, analysis     │
└─────────────────────────────────────────────────────────────────┘
                              ↓ Uses
┌─────────────────────────────────────────────────────────────────┐
│                  TIER 3: AUTONOMOUS TOOLS                       │
│                   (Software & Automation)                       │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ Pa11y Scanner    │  │ Power BI         │  │ Alert System │ │
│  │ (Autonomous)     │  │ Dashboard        │  │ (Automated)  │ │
│  │                  │  │ (Auto-Update)    │  │              │ │
│  │ - Scheduled scans│  │ - Live data      │  │ - Email      │ │
│  │ - JSON output    │  │ - No human       │  │   triggers   │ │
│  │ - No human       │  │   intervention   │  │ - Slack/Teams│ │
│  │   intervention   │  │                  │  │   webhooks   │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ Axe DevTools     │  │ Power Automate   │                   │
│  │ (Human-Initiated)│  │ Workflows        │                   │
│  │                  │  │ (Autonomous)     │                   │
│  │ - Browser        │  │                  │                   │
│  │   extension      │  │ - Data import    │                   │
│  │ - Manual testing │  │ - Report gen     │                   │
│  └──────────────────┘  └──────────────────┘                   │
│                                                                 │
│  Responsibilities:                                              │
│  - Continuous monitoring                                        │
│  - Automated data collection                                    │
│  - Scheduled reporting                                          │
│  - Alert generation                                             │
│                                                                 │
│  Human Oversight: Meta Agent reviews outputs, validates alerts │
└─────────────────────────────────────────────────────────────────┘
```

---

## PART 2: AGENT DEFINITIONS

### Meta Agent: Project Manager (Human)
**Agent Type**: Human with AI Assistance  
**Autonomy Level**: High (makes all strategic decisions)  
**AI Tools Used**: Claude, GitHub Copilot (project planning), ChatGPT (communication drafting)

**Capabilities**:
- Client relationship management
- Strategic planning
- Budget and timeline management
- Quality assurance
- Risk identification and mitigation
- Team coordination

**Decision Authority**:
- Approve deliverables before client review
- Allocate resources
- Adjust project scope
- Escalate issues to client

**AI Assistance Examples**:
- Generate status reports (AI drafts, human reviews)
- Analyze risks (AI identifies patterns, human decides mitigation)
- Draft client communications (AI writes, human edits)
- Create project plans (AI suggests tasks, human finalizes)

**Why Human (Not Autonomous)**:
- Client expects human accountability
- Complex judgment calls (scope changes, budget decisions)
- Relationship building requires empathy
- Legal liability requires human signature

---

### Agent 1: Web Accessibility Specialist (Human)
**Agent Type**: Human with AI Assistance  
**Autonomy Level**: High (expert in domain)  
**AI Tools Used**: Axe DevTools, Pa11y, Claude (code review), GitHub Copilot

**Capabilities**:
- Conduct manual accessibility audits
- Screen reader testing (NVDA, JAWS)
- Keyboard navigation validation
- ARIA implementation review
- Remediation recommendations
- VPAT analysis

**Decision Authority**:
- Determine severity of accessibility issues
- Recommend remediation approach
- Approve fixes as compliant
- Train City staff on accessibility

**AI Assistance Examples**:
- Automated scanning (Pa11y, Axe) - AI flags issues, human validates
- Code review - AI suggests fixes, human verifies
- ARIA patterns - AI recommends implementation, human tests
- Documentation - AI generates reports, human reviews

**Why Human (Not Autonomous)**:
- Manual testing cannot be automated (screen readers, keyboard)
- Context matters (automated tools have false positives)
- Judgment calls (severity, prioritization)
- Training requires human interaction

---

### Agent 2: Document Remediation Specialist (Human)
**Agent Type**: Human with AI Assistance  
**Autonomy Level**: Medium (repetitive work, but requires judgment)  
**AI Tools Used**: Adobe Acrobat Pro, AI alt text generators, Claude (quality review)

**Capabilities**:
- PDF tagging and structure
- Alt text creation
- Reading order fixes
- Color contrast remediation
- Form field labeling
- Quality validation (PAC 2021)

**Decision Authority**:
- Determine document priority (if time constrained)
- Decide when to recreate vs. remediate
- Approve documents as compliant
- Flag complex documents for escalation

**AI Assistance Examples**:
- Alt text generation - AI suggests descriptions, human validates and refines
- Batch scripting - AI generates Acrobat JavaScript, human tests
- Quality checks - AI flags potential issues, human validates
- Documentation - AI logs changes, human reviews

**Why Human (Not Autonomous)**:
- Alt text requires context and judgment (decorative vs. informative)
- Complex tables and forms need human structure decisions
- OCR errors require human correction
- Quality cannot be fully automated

---

### Agent 3: Training Developer (Human)
**Agent Type**: Human with AI Assistance  
**Autonomy Level**: Medium (content creation, but requires domain expertise)  
**AI Tools Used**: Claude (content generation), ChatGPT (slide text), Camtasia (video editing)

**Capabilities**:
- Curriculum design
- Presentation development (slides, videos, handouts)
- Facilitate live training
- Create quick reference guides
- Build SharePoint knowledge base

**Decision Authority**:
- Design training curriculum
- Determine learning objectives
- Adapt content based on audience
- Assess trainee understanding

**AI Assistance Examples**:
- Slide content - AI generates text, human refines and adds examples
- Quiz creation - AI writes questions, human validates accuracy
- Video scripts - AI drafts, human edits for clarity and tone
- FAQs - AI compiles common questions, human answers

**Why Human (Not Autonomous)**:
- Adult learning requires empathy and adaptation
- Live training needs real-time responsiveness
- Complex topics need simplification (human skill)
- Facilitation cannot be automated

---

### Agent 4: Power BI Developer (Human)
**Agent Type**: Human with AI Assistance  
**Autonomy Level**: High (technical expert)  
**AI Tools Used**: GitHub Copilot (DAX formulas), Claude (debugging), Power Automate

**Capabilities**:
- Dashboard design and development
- Data modeling
- Power Automate workflow creation
- Pa11y integration
- Report optimization

**Decision Authority**:
- Design dashboard architecture
- Choose visualizations
- Optimize performance
- Approve dashboard for production

**AI Assistance Examples**:
- DAX formulas - AI generates, human tests
- Data model - AI suggests relationships, human validates
- Debugging - AI identifies issues, human fixes
- Documentation - AI generates technical docs, human reviews

**Why Human (Not Autonomous)**:
- Stakeholder requirements need interpretation
- Dashboard UX requires design thinking
- Performance optimization needs expertise
- Complex data relationships require validation

---

### Agent 5: Vendor Manager (Human)
**Agent Type**: Human with AI Assistance  
**Autonomy Level**: Medium (relationship and negotiation)  
**AI Tools Used**: Claude (VPAT analysis), ChatGPT (communication drafting)

**Capabilities**:
- Vendor identification and inventory
- VPAT request and review
- Contract analysis
- Negotiation support
- Compliance tracking

**Decision Authority**:
- Assess vendor compliance risk
- Recommend contract language
- Prioritize vendor remediation
- Escalate critical issues to City leadership

**AI Assistance Examples**:
- VPAT analysis - AI extracts key findings, human interprets
- Contract language - AI drafts accessibility clauses, human refines
- Compliance reports - AI generates gap analysis, human validates
- Communication - AI drafts vendor emails, human sends

**Why Human (Not Autonomous)**:
- Vendor relationships require diplomacy
- Negotiation cannot be automated
- Risk assessment requires business judgment
- Contractual changes need legal review (human)

---

## PART 3: AUTONOMOUS TOOLS (No Human in the Loop)

### Tool 1: Pa11y Scanner (Fully Autonomous)
**Purpose**: Continuous website accessibility monitoring  
**Technology**: Node.js command-line tool  
**Autonomy Level**: Full (once configured)

**Automated Workflow**:
1. **Trigger**: Scheduled (e.g., every Monday at 6 AM)
2. **Execution**: 
   - Scan cityofbowie.org (all pages or sample)
   - Run WCAG 2.1 AA ruleset
   - Generate JSON output with issues
3. **Output**: 
   - JSON file with errors, warnings, notices
   - Stored in Azure Blob Storage or SharePoint
4. **Notification**: 
   - If critical issues found → Send email alert to Meta Agent
   - If clean scan → Log result, no alert

**Human Oversight**:
- Meta Agent reviews alerts (does not run scans manually)
- Web Accessibility Specialist validates findings (spot checks)
- Dashboard displays trends (Power BI auto-updates from Pa11y data)

**No Human Required For**:
- Running scans
- Parsing results
- Storing data
- Triggering alerts

---

### Tool 2: Power BI Dashboard (Semi-Autonomous)
**Purpose**: Real-time compliance monitoring and reporting  
**Technology**: Microsoft Power BI + Power Automate  
**Autonomy Level**: High (auto-updates, but humans view and interpret)

**Automated Workflow**:
1. **Data Ingestion**: 
   - Power Automate flow imports Pa11y JSON (triggered after scan)
   - Parses JSON → Writes to SQL table or SharePoint list
2. **Dashboard Refresh**: 
   - Power BI dataset refreshes automatically (scheduled or triggered)
   - Visualizations update (no human clicks "refresh")
3. **Reporting**: 
   - Monthly executive summary generated automatically
   - Email sent to Todd and City Manager (Power Automate)
4. **Alerts**: 
   - If compliance score drops below threshold → Alert triggered
   - Email + Teams notification

**Human Oversight**:
- Todd and team **view** dashboard (interpret data)
- Meta Agent reviews trends and anomalies
- Power BI Developer maintains dashboard (fixes bugs, adds features)

**No Human Required For**:
- Data ingestion
- Dashboard refresh
- Report generation
- Alert triggers

---

### Tool 3: Power Automate Workflows (Fully Autonomous)
**Purpose**: Orchestrate automated tasks  
**Technology**: Microsoft Power Automate (included with M365)  
**Autonomy Level**: Full (once configured)

**Example Workflows**:

**Workflow A: Pa11y Data Import**
- **Trigger**: New JSON file in Azure Blob Storage
- **Actions**:
  1. Parse JSON file
  2. Extract issue data (type, severity, page URL)
  3. Write to SQL table or SharePoint list
  4. If critical issues found → Send email to Meta Agent
- **No human involved**

**Workflow B: Monthly Executive Report**
- **Trigger**: First Monday of each month at 8 AM
- **Actions**:
  1. Query Power BI dataset (compliance metrics)
  2. Generate PDF report (compliance score, trends, top issues)
  3. Email report to Todd and City Manager
- **No human involved**

**Workflow C: Document Remediation Tracking**
- **Trigger**: SharePoint list item updated (document status changed to "Remediated")
- **Actions**:
  1. Update Power BI dataset
  2. If milestone reached (e.g., 100 docs remediated) → Send celebration email
  3. Log to compliance documentation
- **No human involved**

---

### Tool 4: Axe DevTools (Human-Initiated, AI-Assisted)
**Purpose**: Browser-based accessibility testing  
**Technology**: Chrome/Firefox extension  
**Autonomy Level**: Low (human initiates, tool analyzes)

**Workflow**:
1. Human (Web Accessibility Specialist) opens website in browser
2. Clicks Axe DevTools extension
3. Tool scans page and highlights issues
4. Human reviews findings and determines next steps

**Why Not Fully Autonomous**:
- Best for targeted testing (specific pages or features)
- Complements Pa11y (which scans entire site)
- Human interpretation needed for context

---

### Tool 5: Adobe Acrobat Pro (Human-Operated, AI-Assisted)
**Purpose**: PDF accessibility remediation  
**Technology**: Desktop application  
**Autonomy Level**: Very Low (human does most work)

**AI Assistance**:
- **Auto-tagging**: Acrobat can auto-generate tags (AI feature)
- **Accessibility Checker**: Automated validation (flags issues)

**Why Not Fully Autonomous**:
- Auto-tagging accuracy is ~60-70% (human must fix)
- Alt text requires human judgment
- Reading order often needs manual adjustment
- Complex tables require human structure

**Future Potential**:
- Could build batch automation scripts (JavaScript in Acrobat)
- AI could generate alt text (human validates)
- But still requires human QA

---

## PART 4: DECISION MATRIX (Human vs. Autonomous)

| Task | Human | Autonomous | Why |
|------|-------|-----------|-----|
| **Website Scanning** | Review results | Pa11y runs automatically | Automation is faster, consistent |
| **Manual Screen Reader Testing** | Human | N/A | Cannot be automated |
| **Code Fixes (HTML/CSS)** | Human writes | AI suggests | AI can generate, human validates |
| **Dashboard Updates** | Human views | Power BI auto-refreshes | No manual refresh needed |
| **Client Meetings** | Human | N/A | Relationship building requires empathy |
| **Policy Writing** | Human approves | AI drafts | AI generates, human refines |
| **PDF Alt Text** | Human validates | AI suggests | AI can propose, human judges context |
| **Training Delivery** | Human facilitates | N/A | Live interaction required |
| **VPAT Analysis** | Human interprets | AI extracts data | AI finds patterns, human assesses risk |
| **Monthly Reports** | Human reviews | Power Automate generates | Automation saves time |
| **Issue Prioritization** | Human decides | AI ranks by severity | Human makes final call |
| **Budget Decisions** | Human | N/A | Requires business judgment |
| **Vendor Negotiation** | Human | N/A | Diplomacy requires human |

---

## PART 5: AI ASSISTANCE LAYERS (How AI Supports Human Agents)

### Layer 1: Autonomous Execution (No Human in Loop)
**Examples**:
- Pa11y scans run on schedule
- Dashboard data refreshes automatically
- Alerts trigger based on thresholds

**Human Role**: Oversight (review outputs periodically)

---

### Layer 2: AI Generation + Human Validation
**Examples**:
- AI writes code → Human tests and validates
- AI generates alt text → Human reviews and refines
- AI drafts policy → Human edits and approves
- AI creates training slides → Human adds examples and presents

**Human Role**: Quality control and context

---

### Layer 3: AI-Assisted Analysis + Human Decision
**Examples**:
- AI scans website, flags issues → Human prioritizes remediation
- AI analyzes VPAT → Human assesses vendor risk
- AI generates compliance report → Human interprets for client
- AI suggests budget allocation → Human makes final decision

**Human Role**: Judgment and decision-making

---

### Layer 4: Human-Led + AI Support
**Examples**:
- Human conducts screen reader test → AI documents findings
- Human facilitates training → AI generates follow-up materials
- Human negotiates with vendor → AI drafts contract language
- Human meets with client → AI summarizes meeting notes

**Human Role**: Primary work, AI assists with efficiency

---

## PART 6: WORKFLOW EXAMPLE (Website Audit)

### Scenario: Weekly Website Compliance Check

**Step 1: Autonomous Scan (No Human)**
- **Monday 6 AM**: Pa11y cron job runs
- Scans 50 pages on cityofbowie.org
- Generates JSON output with 23 issues found
- Uploads JSON to Azure Blob Storage

**Step 2: Autonomous Data Import (No Human)**
- **Monday 6:15 AM**: Power Automate workflow triggers
- Parses JSON, extracts issue data
- Writes to SQL table (compliance_issues)
- Dashboard dataset auto-refreshes

**Step 3: Autonomous Alert (If Needed)**
- **Monday 6:20 AM**: Power Automate checks thresholds
- If critical issues >5 → Send email to Meta Agent
- If no critical issues → Log result, no alert

**Step 4: Human Review (If Alert Sent)**
- **Monday 9 AM**: Meta Agent sees alert email
- Opens Power BI dashboard
- Reviews issue breakdown (5 critical, 18 warnings)
- Assigns to Web Accessibility Specialist

**Step 5: Human Analysis (Web Accessibility Specialist)**
- **Monday 10 AM**: Reviews Pa11y output
- Opens Axe DevTools for deeper analysis
- Tests with NVDA screen reader
- Determines 3 issues are false positives, 2 are real

**Step 6: Human + AI Remediation**
- **Monday 2 PM**: Web Accessibility Specialist identifies fixes needed
- AI (GitHub Copilot) suggests code fixes
- Human reviews, tests, and implements
- Commits code to GitHub
- Notifies CivicPlus to deploy

**Step 7: Human Validation**
- **Tuesday 10 AM**: Re-test with screen reader
- Confirm issues resolved
- Update compliance log (SharePoint)

**Step 8: Autonomous Next Scan**
- **Following Monday 6 AM**: Pa11y runs again
- Verifies issues are resolved
- No alert (clean scan)

**Total Human Time**: 4-6 hours (across 2 days)  
**Total Automation Time**: Continuous (no human labor)

---

## PART 7: SCALING STRATEGY (Post-City of Bowie)

### If You Want to Replicate for Other Clients

**What to Automate (Build Once, Reuse)**:
1. **Pa11y Scanner** (already building)
   - Configurable for any website URL
   - Reusable across clients
   
2. **Power BI Dashboard Template**
   - Clone for each client
   - Adjust branding and data sources
   
3. **Power Automate Workflows**
   - Template workflows
   - Connect to new client data sources

**What Stays Human (Client-Specific)**:
1. Manual testing (every website is different)
2. Client communication (relationship-specific)
3. Training (custom to organization)
4. Policy writing (organization-specific)

**Scaling Model**:
- **Client 1 (City of Bowie)**: Build everything (high investment)
- **Client 2-5**: Reuse tools, customize services (lower cost per client)
- **Client 6+**: Productize (SaaS model with human support tier)

---

## PART 8: AUTONOMOUS AI AGENTS (Future Consideration)

### Why NOT Fully Autonomous AI Agents (Yet)

**Limitations**:
1. **Liability**: Government clients need human accountability
2. **Judgment**: Accessibility requires context and empathy
3. **Relationships**: Clients want human experts, not chatbots
4. **Technology**: AI can't test screen readers or keyboard navigation
5. **Trust**: AI hallucinations are unacceptable in compliance work

### Where Autonomous Agents Could Work (Future)

**Candidate Tasks**:
1. **Continuous Monitoring**: AI agent monitors website 24/7, alerts humans
2. **Initial Triage**: AI agent categorizes issues (critical, high, medium, low)
3. **Code Generation**: AI agent generates fix candidates, human approves
4. **Documentation**: AI agent logs all changes, generates audit trail
5. **Chatbot Support**: AI agent answers basic questions from City staff

**Example: Autonomous Compliance Agent (v2.0)**
- **Agent Name**: "ADA Guardian"
- **Functionality**:
  - Monitors website continuously (not just weekly)
  - Detects new pages automatically
  - Generates fix PRs (pull requests) for simple issues
  - Notifies human agent for complex issues
  - Answers City staff questions via chat
- **Human Oversight**: 
  - Approve all code changes
  - Escalate complex issues
  - Quality control

**Timeline**: 6-12 months after City of Bowie project (proof of concept validated)

---

## SUMMARY & RECOMMENDATIONS

### For City of Bowie Project (Now)

**Use This Architecture**:
- **Human Agents**: Project Manager, Web Accessibility Specialist, Document Remediation Specialist, Training Developer, Power BI Developer
- **Autonomous Tools**: Pa11y scanner, Power BI dashboard, Power Automate workflows
- **AI Assistance**: GitHub Copilot, Claude, ChatGPT (supporting human agents)

**Why This Works**:
- Client gets expert human consultants (meets expectations)
- Automation reduces cost (recurring revenue profitable)
- Quality is high (human validation)
- Scalable (tools are reusable)

### Answering Your Question

**"SHOULD THEY BE AGENTS THIS WAY OR THE SDK ONES THAT ARE AUTONOMOUS?"**

**Answer**: 

**For CONSULTING SERVICES → Human Agents with AI Assistance**
- Client is buying expertise and accountability
- Complex decisions require human judgment
- Relationships matter

**For TOOLS YOU BUILD → Autonomous (SDK-style agents)**
- Scanner runs automatically (no human in loop)
- Dashboard updates automatically (no human clicks "refresh")
- Alerts trigger automatically (no human monitors 24/7)

**Best of Both Worlds**: Human expertise + autonomous tools = **Hybrid Architecture**

---

**Document Status**: COMPLETE  
**Next Action**: Build autonomous Pa11y scanner (proof-of-concept)  
**Owner**: You  
**Date**: 2025-12-11
