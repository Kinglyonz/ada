# CLAUDE.md - ADA Title II Compliance Project Memory
## City of Bowie - Project Intelligence System

---

## PROJECT IDENTITY

**Project Name**: City of Bowie ADA Title II Compliance Program
**One-Line Description**: Comprehensive accessibility compliance implementation for a Maryland municipality facing federal deadline
**Mission**: Enable City of Bowie to achieve full ADA Title II compliance (WCAG 2.1 AA) by April 24, 2026, while building sustainable governance processes
**Success Criteria**:
- Pass federal ADA audit if conducted
- Zero accessibility complaints
- All public-facing content WCAG 2.1 AA compliant
- Staff trained and self-sufficient
- Monitoring dashboard operational
- Recurring service contract secured

**Full Context**: See [research/project-context.md](../research/project-context.md)
**Viability Analysis**: See [research/viability-analysis.md](../research/viability-analysis.md)

---

## CRITICAL DEADLINE

**April 24, 2026** - Federal ADA Title II compliance deadline (NON-NEGOTIABLE)

**Time Remaining**: 16 months from December 2025
**Project Duration**: 12-15 months (allows 1-4 month buffer)
**Next Decision Point**: Meeting with Todd (Early January 2026)

---

## TECHNICAL CONTEXT

### Current Tech Stack (Client-Owned)

#### Document Management
- **Laserfiche Cloud** (Primary DMS)
  - Recently migrated from on-premise
  - Public and internal documents
  - No built-in accessibility validation
  - API available for integration

- **Internal File Servers**
  - Windows file shares
  - VPN-only access
  - Heavy staff usage
  - No governance
  - **Risk**: Contains unknown volume of inaccessible documents

- **OneDrive/SharePoint Online** (Microsoft 365)
  - Currently underutilized
  - Todd (IT Lead) wants migration here
  - Better governance capabilities
  - Supports accessibility workflows
  - **Opportunity**: Position as modern, compliant repository

#### Web Content Management
- **CivicPlus CMS**
  - Powers www.cityofbowie.org
  - Managed by Communications (Sonya), NOT IT
  - Has built-in accessibility checker (LIMITED SCOPE)
  - **Critical Limitation**: Only scans CivicPlus modules
  - Does NOT scan third-party links or external systems
  - **Client misconception**: They think this solves most problems (it doesn't)

#### Third-Party Systems (Linked from Website)
- **Munis** (Tyler Technologies) - Finance system
- **ActiveNet** - Parks & Recreation management
- **Alert Bowie** (notification system)
- Unknown other vendor platforms
- **Risk**: Accessibility status unknown, limited leverage over vendors

#### Productivity Tools
- **Adobe Acrobat Pro** (CD-ROM subscription)
  - Available to staff
  - No training on accessibility features
  - No standardized remediation process

- **Microsoft Office Suite**
  - Word, PowerPoint, Outlook
  - Built-in accessibility checkers (underutilized)
  - No templates or guidelines

### Tech Stack We Will Introduce

#### Website Accessibility Auditing
- **WAVE** (WebAIM) - Visual accessibility checker
- **Axe DevTools** - Automated WCAG testing
- **Pa11y** - Command-line testing for CI/CD
- **Lighthouse** (Chrome DevTools) - Built-in auditing
- **Manual testing** - Keyboard navigation, screen readers

#### Document Remediation
- **CommonLook PDF** - Professional PDF remediation
- **Equidox** - Batch PDF processing (if volume warrants)
- **PAC 2021** - PDF accessibility validation
- Adobe Acrobat Pro Preflight - They already own this

#### Monitoring & Reporting
- **SiteImprove** or **Monsido** (SaaS options for large-scale monitoring)
- **Custom Power BI Dashboard** (preferred - recurring revenue opportunity)
  - Integration with website scanners
  - Document compliance tracking
  - Training completion metrics
  - Vendor status reporting
  - Executive summary views

#### Governance & Training
- WCAG 2.1 AA standard documentation
- Section 508 compliance guides
- Custom training materials (we create)
- Accessibility checklists and templates
- Department-specific workflows

---

## KEY ARCHITECTURAL DECISIONS

### 1. Phased Implementation Approach
**Decision**: Prioritize public-facing content first, then internal systems
**Rationale**: ADA Title II focuses on public access; manage risk by addressing highest-exposure items
**Impact**: Website and public documents are Phase 1, internal portals Phase 2

### 2. Hybrid Remediation Model
**Decision**: Train staff + provide direct remediation services
**Rationale**: Staff must maintain compliance post-project, but need jumpstart on backlog
**Impact**: We remediate high-priority items while training progresses in parallel

### 3. Dashboard-Centric Monitoring
**Decision**: Build custom Power BI dashboard vs. pure SaaS subscription
**Rationale**: Custom solution = differentiation, recurring revenue, integration flexibility
**Impact**: Requires development time but creates ongoing engagement

### 4. OneDrive Migration as Compliance Opportunity
**Decision**: Position OneDrive as the accessible document repository
**Rationale**: Aligns with Todd's goals + provides governance + supports WCAG workflows
**Impact**: Broader project scope, but solves multiple problems simultaneously

### 5. Vendor Assessment vs. Remediation
**Decision**: Assess and document vendor gaps, not remediate third-party systems
**Rationale**: City has limited leverage; focus on what we control
**Impact**: Document risk, push for VPATs, recommend contractual language for future

---

## CODING STANDARDS & CONVENTIONS

### Accessibility Standards
- **Primary Standard**: WCAG 2.1 Level AA
- **Legal Basis**: ADA Title II → Section 508 → WCAG 2.1
- **Testing Approach**: Automated + Manual (automated catches ~30-40%, manual required)

### Document Standards
- **PDFs**:
  - Tagged structure (H1-H6 hierarchy)
  - Alt text for all images
  - Logical reading order
  - Minimum 3:1 color contrast (4.5:1 for small text)
  - Embedded fonts
  - Searchable text (no scanned images without OCR)

- **Word Documents**:
  - Use built-in styles (Heading 1, Heading 2, etc.)
  - Alt text for images
  - Accessible tables (header rows marked)
  - Meaningful hyperlink text (not "click here")

- **PowerPoint**:
  - Slide titles
  - Alt text for visuals
  - Reading order verification
  - Sufficient color contrast

### Web Standards
- **HTML**: Semantic markup (header, nav, main, footer)
- **ARIA**: Only when HTML semantics insufficient
- **Headings**: Single H1, logical hierarchy
- **Links**: Descriptive text, focus indicators
- **Images**: Alt text (decorative = alt="")
- **Forms**: Labels associated with inputs
- **Color**: Not sole method of conveying information
- **Keyboard**: All functionality accessible without mouse

---

## CURRENT STATE

### What Has Been Built So Far
- ✅ Initial meeting conducted (Todd, Sonya, IT team)
- ✅ Client understands mandate and deadline
- ✅ Context engineering system initiated (this document)
- ✅ Viability analysis completed (9.5/10 project rating)
- ✅ Project context documented

### What Is Currently In Progress
- 🔄 Pre-proposal research and planning
- 🔄 Tool evaluation and selection
- 🔄 Methodology development using context engineering principles
- 🔄 Financial modeling and pricing strategy

### Known Issues & Technical Debt
- ⚠️ Document volume unknown (Laserfiche + file servers)
- ⚠️ CivicPlus gives false sense of compliance coverage
- ⚠️ Third-party vendor accessibility status unknown
- ⚠️ No staff training program exists
- ⚠️ No governance process in place
- ⚠️ Communications manages website (IT has limited control)
- ⚠️ Timeline pressure (16 months for large organization)

---

## AGENT INSTRUCTIONS

### How Should Claude Approach This Project?

1. **Prioritize Compliance Over Perfection**
   - Goal is WCAG 2.1 AA compliance by April 2026
   - Perfect design is secondary to functional accessibility
   - Document "won't fix" items clearly (e.g., vendor limitations)

2. **Think in Terms of Governance, Not Just Fixes**
   - Don't just remediate documents → create templates and processes
   - Don't just fix website → train staff to maintain it
   - Sustainability matters (city must operate independently post-project)

3. **Respect Organizational Structure**
   - IT (Todd) is sponsor, but Communications (Sonya) manages website
   - Recommendations must work politically, not just technically
   - Multiple departments affected (Finance, Parks & Rec, etc.)

4. **Be Realistic About Vendor Constraints**
   - Third-party systems (Munis, ActiveNet) may not be fully accessible
   - City has limited leverage over large vendors
   - Document gaps, recommend alternatives, but don't promise fixes we can't deliver

5. **Recurring Revenue Mindset**
   - This isn't one-and-done
   - Position dashboard, audits, and training as ongoing services
   - Build relationships, not just deliverables

### Questions Claude Should Ask Before Making Changes

1. **Does this action directly support April 2026 compliance?**
   - If no → defer or eliminate
   - If yes → prioritize

2. **Can city staff maintain this post-project?**
   - If no → reconsider approach
   - If yes → document training requirements

3. **Does this require vendor cooperation?**
   - If yes → identify fallback plan
   - If vendor critical path → flag risk early

4. **Is this a quick win or long-term foundation?**
   - Balance both: quick wins build momentum, foundations ensure sustainability

5. **Does this create scope creep?**
   - If beyond ADA compliance → separate proposal or phase

### What Should Claude NEVER Do Without Explicit Approval?

1. ❌ Promise full remediation of all historical documents without volume analysis
2. ❌ Guarantee third-party vendor compliance
3. ❌ Commit to fixing internal systems not visible to public (unless scoped)
4. ❌ Bypass Communications department on website changes
5. ❌ Recommend expensive enterprise tools without ROI justification
6. ❌ Suggest "overlay" solutions (AudioEye, AccessiBe) - controversial and insufficient
7. ❌ Overpromise timeline (16 months is tight for large org)

---

## FILE STRUCTURE MAP

```
ada/
├── .claude/
│   └── CLAUDE.md                 ← This file (project memory)
│
├── research/                     ← Discovery and planning documents
│   ├── project-context.md        ← Client background, ecosystem, meeting notes
│   ├── viability-analysis.md     ← Go/no-go analysis (COMPLETED - 9.5/10)
│   ├── tech-stack.md             ← Tool selection and justification (NEXT)
│   ├── PRD.md                    ← ADA Compliance Roadmap (core deliverable)
│   ├── skills.md                 ← Required capabilities for delivery
│   ├── agents.md                 ← Team structure / subagent architecture
│   └── roadmap.md                ← Execution timeline and milestones
│
├── proposal/                     ← Client-facing documents (TO BE CREATED)
│   ├── executive-summary.md
│   ├── gap-analysis-framework.md
│   ├── compliance-roadmap.md     ← Based on PRD
│   ├── training-program.md
│   ├── dashboard-concept.md
│   ├── pricing.md
│   └── case-studies.md
│
├── deliverables/                 ← Actual project work products (POST-CONTRACT)
│   ├── audit-reports/
│   ├── remediated-documents/
│   ├── training-materials/
│   ├── templates/
│   └── dashboard/
│
└── reference/                    ← Standards, guides, vendor docs
    ├── wcag-2.1-aa.md
    ├── section-508.md
    ├── civicplus-docs/
    └── vendor-vpats/
```

### Key Directories and Their Purposes
- **research/**: Internal planning, not client-facing (yet)
- **proposal/**: Polished documents for Todd's review
- **deliverables/**: Post-contract work products
- **reference/**: Standards and external documentation

### Important Files
- **CLAUDE.md** (this file): Persistent memory across all sessions
- **project-context.md**: Meeting notes and client ecosystem
- **viability-analysis.md**: Why this project is worth pursuing
- **PRD.md**: The compliance roadmap (becomes client deliverable)

### Naming Conventions
- Use lowercase with hyphens (kebab-case)
- Markdown for all documentation
- Date-stamp time-sensitive documents (e.g., audit-report-2026-01-15.md)
- Version control for client deliverables (v1, v2, final)

---

## EXTERNAL DEPENDENCIES

### Third-Party Services (Current)
- **CivicPlus** (CMS & hosting)
  - Purpose: City website platform
  - Contact: Through Communications (Sonya)
  - Accessibility tool: Built-in, limited scope
  - Documentation: https://www.civicplus.com/web-accessibility-software/

- **Tyler Technologies** (Munis)
  - Purpose: Finance/ERP system
  - Contact: Unknown
  - Accessibility status: Unknown (VPAT needed)
  - Documentation: Request from city procurement

- **ActiveNet**
  - Purpose: Parks & Recreation management
  - Contact: Unknown
  - Accessibility status: Unknown (VPAT needed)
  - Documentation: Request from city

- **Microsoft 365**
  - Purpose: Productivity suite, OneDrive, SharePoint
  - License: City has E3 or E5 (assumption based on OneDrive mention)
  - Accessibility tools: Built-in Office checkers
  - Documentation: https://www.microsoft.com/en-us/accessibility

- **Laserfiche Cloud**
  - Purpose: Document management system
  - Migration: Recently moved to cloud
  - API: Available for integration
  - Accessibility: No built-in validation

### Third-Party Services (We Will Introduce)
- **WAVE** (WebAIM) - Free web accessibility checker
- **Axe DevTools** - Browser extension and API
- **Pa11y** - Open-source, command-line testing
- **CommonLook** - PDF remediation (license required)
- **SiteImprove** or **Monsido** - Optional SaaS monitoring (if not custom dashboard)

### API Keys & Environment Variables Needed
- `CIVICPLUS_API_KEY` - If API access granted
- `LASERFICHE_API_TOKEN` - For document inventory automation
- `SITEIMPROVE_API_KEY` - If using their service
- `POWERBI_EMBED_TOKEN` - For dashboard deployment
- `AZURE_TENANT_ID` - If integrating with city's Microsoft 365

(Store in `.env` file, NEVER commit to version control)

### Links to Relevant Documentation
- **WCAG 2.1 AA**: https://www.w3.org/WAI/WCAG21/quickref/?levels=aa
- **Section 508**: https://www.section508.gov/
- **ADA Title II**: https://www.ada.gov/resources/title-ii-primer/
- **CivicPlus Accessibility**: https://www.civicplus.com/web-accessibility-software/
- **WebAIM WAVE**: https://wave.webaim.org/
- **Deque Axe**: https://www.deque.com/axe/
- **Adobe Accessibility**: https://www.adobe.com/accessibility.html
- **Microsoft Accessibility**: https://www.microsoft.com/en-us/accessibility

---

## USER AVATAR REMINDER

### Who We're Building For

**Primary**: City of Bowie leadership (Todd, Sonya, City Manager)
- **Motivation**: Avoid federal penalties, lawsuits, and bad press
- **Fear**: Non-compliance by April 2026, overwhelming staff, unknown costs
- **Success**: Pass audit, no complaints, staff self-sufficient, budget predictable

**Secondary**: City staff (content creators, department admins)
- **Motivation**: Do their jobs without new burdens
- **Fear**: Complex tools, time-consuming processes, getting blamed for failures
- **Success**: Simple tools, clear checklists, training that sticks

**Tertiary**: City residents (especially those with disabilities)
- **Motivation**: Access government services and information
- **Need**: Website works with screen readers, documents are readable, forms are navigable
- **Success**: Seamless experience, no accommodation requests needed

### Key UX Principles for This Audience

1. **Simplicity Over Features**
   - Staff are not accessibility experts
   - Tools must be intuitive
   - Checklists > memorization

2. **Visibility of Progress**
   - Dashboard shows green/yellow/red status
   - Leadership needs confidence
   - Staff need to see impact of their work

3. **Minimal Disruption**
   - Fit into existing workflows (Adobe, Office, CivicPlus)
   - Don't force wholesale platform changes
   - Incrementally improve

4. **Risk Mitigation**
   - Emphasize legal protection
   - Frame as insurance, not cost
   - Show other cities being sued

5. **Empowerment**
   - Position staff as champions, not bottlenecks
   - Celebrate quick wins
   - Create department-specific heroes

---

## PROJECT RISKS & MITIGATION

### High-Priority Risks

**Risk**: Document volume overwhelming (10K+ PDFs in Laserfiche/file servers)
**Mitigation**:
- Inventory first (automated scripts)
- Prioritize public-facing documents
- Batch remediation tools (Equidox)
- Phased approach (critical → important → nice-to-have)

**Risk**: Third-party vendors (Munis, ActiveNet) not compliant
**Mitigation**:
- Request VPATs immediately
- Document gaps in compliance report
- Recommend contractual language for future RFPs
- Provide workarounds (accessible alternatives, phone support)

**Risk**: Timeline slippage (16 months is tight)
**Mitigation**:
- Build 1-4 month buffer into plan
- Prioritize ruthlessly (public-facing only if needed)
- Escalation path to city leadership
- Monthly steering committee meetings

**Risk**: Staff resistance to new workflows
**Mitigation**:
- Executive sponsorship (Todd champions it)
- Department-specific training (not one-size-fits-all)
- Champions program (identify early adopters)
- Gamification (leaderboard of compliant departments)

**Risk**: Scope creep (client asks for internal systems, redesigns, etc.)
**Mitigation**:
- Fixed-scope phases with change order process
- Clear "out of scope" section in proposal
- Document all requests, price separately
- Recurring service model handles post-2026 work

---

## DECISION LOG

### Major Decisions Made

**2025-12-11**: Project viability confirmed (9.5/10 rating)
**Reasoning**: Federal mandate, client request, technical feasibility, recurring revenue potential
**Impact**: Proceed to proposal phase

**2025-12-11**: Adopt context engineering methodology from Dr. Ernesto Lee article
**Reasoning**: Systematic approach, AI-assisted delivery, proven framework
**Impact**: Structured research → roadmap → execution process

**2025-12-11**: Prioritize custom dashboard over pure SaaS monitoring
**Reasoning**: Differentiation, recurring revenue, integration flexibility
**Impact**: Requires development but creates competitive advantage

### Decisions Pending

- **Tool Selection**: SiteImprove vs. Monsido vs. custom solution (evaluate both)
- **Pricing Model**: Fixed-price phases vs. time-and-materials (depends on risk tolerance)
- **Remediation Approach**: Full-service vs. train-and-support (depends on budget)
- **OneDrive Migration**: Include in ADA project or separate engagement? (ask Todd)

---

## SUCCESS METRICS

### Compliance Metrics (Objective)
- 100% of public-facing web pages pass WCAG 2.1 AA automated tests
- 0 critical accessibility errors on website
- 100% of public PDFs properly tagged and accessible
- 90%+ staff pass accessibility knowledge assessment
- Dashboard operational with live data
- 100% of third-party vendors assessed (VPATs collected)

### Business Metrics (Our Firm)
- Contract value: $130K-235K (initial project)
- Recurring revenue: $54K-90K/year (subscription secured)
- Project delivered before April 2026 deadline
- Client testimonial obtained
- Case study published
- 2+ referrals from this project (other municipalities)

### City Outcomes (Their Success)
- Pass external ADA audit (if conducted)
- Zero accessibility-related complaints or lawsuits
- Staff can create accessible content independently
- Governance processes documented and operational
- Continuous monitoring system live
- Budget predictability for accessibility maintenance

---

## COMPETITIVE INTELLIGENCE

### Known Competitors
- **SiteImprove** (enterprise SaaS) - Expensive, comprehensive
- **Deque Systems** (Axe products) - Testing-focused
- **Level Access** (consulting) - High-end, Fortune 500 focus
- **AudioEye** (overlay solution) - Controversial, insufficient
- **Local accessibility consultants** - Varies by region

### Our Differentiation
1. We understand their specific ecosystem (CivicPlus, Laserfiche, etc.)
2. Comprehensive approach (not just auditing)
3. Pragmatic use of existing tools (Adobe, Office)
4. OneDrive migration alignment
5. Recurring partnership model
6. Local/regional presence (implied)

### Pricing Intelligence
- Enterprise SaaS (SiteImprove): $20K-50K/year (monitoring only)
- Full-service consulting: $150K-300K (large municipalities)
- Our positioning: Mid-market sweet spot with ongoing relationship

---

## NEXT STEPS

### Before Todd Meeting (Early January 2026)
- [ ] Complete tech stack analysis
- [ ] Draft ADA Compliance Roadmap (PRD)
- [ ] Create skills inventory
- [ ] Design agent architecture
- [ ] Build proposal framework
- [ ] Create dashboard mockup
- [ ] Research pricing and benchmarks
- [ ] Prepare case studies

### At Todd Meeting
- [ ] Present comprehensive proposal
- [ ] Demo dashboard concept
- [ ] Provide pricing options (tiered)
- [ ] Discuss timeline and milestones
- [ ] Confirm budget authority
- [ ] Establish decision timeline
- [ ] Identify project sponsor

### Post-Contract Award
- [ ] Kick off discovery phase
- [ ] Conduct full audit
- [ ] Inventory documents
- [ ] Assess vendor systems
- [ ] Begin training development
- [ ] Initiate dashboard build

---

## NOTES FOR FUTURE SESSIONS

### Context Preservation
- This file (CLAUDE.md) persists across all sessions
- Reference this file at start of each work session
- Update "CURRENT STATE" section as project progresses
- Add new decisions to DECISION LOG
- Flag new risks as discovered

### Communication Style
- Client prefers: Direct, realistic, no sugarcoating
- They respect: Expertise, thoroughness, honesty about risks
- Avoid: Overselling, jargon without explanation, vague timelines

### Key Relationships
- **Todd** (IT) = Decision maker, technical champion
- **Sonya** (Communications) = Website owner, must be included
- **City Manager** = Ultimate authority (likely), budget approval

---

**Last Updated**: 2025-12-11
**Next Review**: After tech stack and roadmap completion
**Document Owner**: Your Team
**Project Status**: Pre-proposal research phase

---

_This memory file is Claude Code's persistent context for the City of Bowie ADA Title II Compliance project. It will be referenced at the start of every session to maintain continuity and ensure consistent, informed decision-making throughout the engagement._
