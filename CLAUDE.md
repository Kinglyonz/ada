# CLAUDE.md - Project Memory System
**Last Updated**: 2025-12-11

---

## PROJECT OVERVIEW

**Client**: City of Bowie, Maryland  
**Primary Contact**: Todd, Director of Communications  
**Project**: ADA Title II Compliance Consulting Services  
**Deadline**: April 24, 2026 (federal mandate)  
**Meeting Date**: Week of December 16-20, 2025

---

## STRATEGIC DECISIONS MADE

### Agent Architecture Strategy (Hybrid Approach)
**Decision**: Use human team members as "agents" with AI assistance + autonomous tools  
**Rationale**:
- Government consulting requires human accountability
- Liability and complex decisions need human judgment
- Client expects expert consultants, not just AI
- BUT: Tools we build (scanner, dashboard) should be autonomous

**Our "Agent" Team Structure**:
1. **Meta Agent** (You) - Oversee entire project
2. **Website Auditor** - Human using AI-powered scanning tools
3. **Document Remediation Specialist** - Human using Adobe/CommonLook + AI assistance
4. **Training Developer** - Human creating custom training materials
5. **Dashboard Developer** - Build Power BI + automation systems

**Autonomous Components**:
- Pa11y scanner (runs automatically)
- Power BI dashboard (auto-updates)
- Alert systems (trigger without human intervention)
- Recurring scans (scheduled automation)

---

## KEY INSIGHTS FROM DISCOVERY

### Client's Existing Tools (Leverage, Don't Replace)
- **Laserfiche Cloud** - Document management system
- **CivicPlus CMS** - Website platform (has limited built-in checker)
- **Adobe Acrobat Pro** - Available via CD-ROM subscription
- **Microsoft 365** - OneDrive, SharePoint (underutilized - strategic opportunity)
- **Internal File Servers** - Legacy storage (VPN access only)

### Strategic Positioning
- Todd wants to modernize toward OneDrive/SharePoint
- Opportunity: Position SharePoint as "compliant by default" repository
- Don't oversell new software - use what they have, add what they need
- Differentiation: Bring live demo scanner to proposal meeting

### Competition
- Likely competitors bring PowerPoints and proposals
- Our advantage: Live scanner showing real issues on their website
- Proves capability before contract signed

---

## TECHNICAL DECISIONS

### Primary Automated Scanner: Axe DevTools + Pa11y
**Why**:
- Axe is industry standard (Deque Systems)
- Pa11y is free, open-source, perfect for automation
- Node.js based (easy to script and integrate)
- Can build proof-of-concept quickly

### Dashboard: Custom Power BI (Recommended over SaaS)
**Why**:
- Client already has Microsoft 365
- Familiar interface for city staff
- We control it (no vendor lock-in)
- **Recurring revenue opportunity**: $2,000-4,000/month management subscription
- SiteImprove/Monsido cost $20K-50K/year (too expensive for mid-size city)

### Manual Testing Still Required
- Automated tools catch 30-40% of issues
- Keyboard navigation testing (manual)
- Screen reader testing (NVDA, VoiceOver)
- Real user experience validation

---

## DELIVERABLES ROADMAP

### Phase 0: Proof-of-Concept (This Week)
- [x] Tech stack analysis document (tech-stack.md)
- [ ] Working scanner (Pa11y + Node.js)
- [ ] HTML report with visualizations
- [ ] Demo ready for Todd meeting

### Phase 1: Website Compliance (Months 1-4)
- Comprehensive accessibility audit
- Remediation of critical issues
- WCAG 2.1 AA compliance
- Staff training on web authoring

### Phase 2: Document Remediation (Months 3-8)
- Laserfiche inventory
- Prioritize public-facing documents
- PDF remediation (Adobe Acrobat Pro)
- Accessible templates for Office/SharePoint

### Phase 3: Monitoring Dashboard (Months 4-6)
- Power BI development
- Integrate Pa11y automation
- Training completion tracking
- Vendor compliance status

### Phase 4: Governance & Sustainability (Months 6-12)
- Policy development
- Training program (ongoing)
- Vendor assessment framework
- Quarterly audits (recurring revenue)

---

## COST MODEL

### One-Time Investment (Our Side)
- CommonLook PDF: $300-1,000 (if needed)
- JAWS License: $1,000 (if needed)
- Axe API: $1,000-5,000/year (if needed)
- Training development: $6,000-15,000
- Dashboard development: $4,000-12,000
- **Total**: $12,300-34,000

### Recurring Revenue (Client Pays)
- Power BI Pro licenses: $200-500/month
- Dashboard management subscription: $2,000-4,000/month
- Quarterly audits: TBD (scope dependent)
- Annual training refreshers: TBD
- **Total**: $2,400-4,800/month or $28.8K-57.6K/year

### Pricing Strategy
- **Tier 1** (Essential): Custom dashboard + website scanning
- **Tier 2** (Recommended): Add document remediation + training
- **Tier 3** (Comprehensive): Add enterprise monitoring (SiteImprove comparison)

---

## OPEN QUESTIONS / RESEARCH NEEDED

### Document Volume
- **Question**: How many PDFs in Laserfiche?
- **Impact**: Determines if we need Equidox ($5K-20K/year) for batch processing
- **Action**: Ask Todd for inventory count

### Third-Party Vendors
- **Question**: Full list of vendors (Munis, ActiveNet, others?)
- **Action**: Request VPATs from all vendors
- **Risk**: Vendors may not be compliant - contractual language needed

### Budget Constraints
- **Question**: What's Todd's budget for this project?
- **Impact**: Determines tier selection
- **Strategy**: Lead with Tier 2, show ROI vs. lawsuit costs

### Internal Resources
- **Question**: Who on City staff will be ongoing accessibility champions?
- **Impact**: Sustainability of compliance
- **Action**: Identify 2-3 staff for intensive training

---

## FILES CREATED

### Research Documents
- `research/project-context.md` - Initial project notes
- `research/tech-stack.md` - Complete technology analysis (DONE)
- `research/viability-analysis.md` - Business case analysis

### Tools
- `tools/scanner/package.json` - Node.js dependencies
- `tools/scanner/scanner.js` - Pa11y scanner script (IN PROGRESS)

### Pending Documents
- `research/ada-compliance-roadmap.md` - PRD with phases, timeline, deliverables
- `research/skills-inventory.md` - Staffing requirements by phase
- `research/agent-architecture.md` - Team structure and responsibilities
- `research/proposal-framework.md` - Presentation template for Todd

---

## NEXT ACTIONS

### Immediate (This Week)
1. ✅ Complete CLAUDE.md (this file)
2. [ ] Finish scanner.js implementation
3. [ ] Create HTML report template with Chart.js
4. [ ] Test scanner on cityofbowie.org
5. [ ] Create ADA Compliance Roadmap (PRD)
6. [ ] Build skills inventory
7. [ ] Document agent architecture
8. [ ] Create proposal framework

### Pre-Meeting (Week of Dec 16-20)
1. [ ] Run full scan of cityofbowie.org
2. [ ] Generate professional report
3. [ ] Prepare demo script
4. [ ] Create 1-page executive summary
5. [ ] Prepare pricing tiers

### Meeting Deliverables
- Live scanner demonstration
- Report showing actual City of Bowie issues
- Roadmap presentation
- Pricing proposal (3 tiers)
- References/credentials

---

## COMPETITIVE ADVANTAGES

1. **Live Demo** - Not just promises, working software
2. **Immediate Value** - Give them useful data before contract signed
3. **Hybrid Approach** - Human expertise + AI efficiency
4. **No Vendor Lock-In** - Use their existing tools + custom dashboard
5. **Recurring Revenue Model** - Ongoing monitoring, not just one-time audit
6. **Government Experience** - Frame as compliance expert, not just tech vendor

---

## REMINDERS FOR CLAUDE

- **Client wants modernization**: Position SharePoint/OneDrive strategically
- **Don't oversell tools**: Maximize existing Adobe/Office investments
- **Prove before proposing**: Scanner demo is critical differentiator
- **Think recurring revenue**: Dashboard subscription, quarterly audits, training refreshers
- **April 2026 deadline**: Create urgency, but don't fear-monger
- **Government client**: Emphasize accountability, documentation, human oversight
- **Build autonomous tools**: Scanner and dashboard run without constant human intervention

---

**Status**: Active Development  
**Phase**: Pre-Proposal / Proof-of-Concept  
**Confidence Level**: High - Strong product-market fit, clear differentiation strategy
