# City of Bowie ADA Compliance Scanner

**Proof-of-Concept Website Accessibility Auditor**

A Node.js-based tool that scans websites for WCAG 2.1 AA compliance issues using Pa11y and the Axe accessibility engine.

---

## Features

- ✅ Automated WCAG 2.1 AA compliance scanning
- ✅ Beautiful HTML report with visualizations
- ✅ JSON output for integration with dashboards
- ✅ Command-line interface
- ✅ Issue categorization (errors, warnings, notices)
- ✅ WCAG principle breakdown
- ✅ Top 10 most common issues

---

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Navigate to the scanner directory:**
   ```powershell
   cd C:\Users\Tran\Desktop\ada\tools\scanner
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

   This will install:
   - `pa11y` - Accessibility testing tool
   - `puppeteer` - Headless browser for testing
   - `cli-table3` - Terminal tables
   - `chalk` - Terminal colors

---

## Usage

### Basic Scan (Default: cityofbowie.org)

```powershell
npm run scan
```

or

```powershell
node scanner.js
```

### Scan a Specific URL

```powershell
node scanner.js https://example.com
```

### Examples

```powershell
# Scan City of Bowie website
node scanner.js https://www.cityofbowie.org

# Scan a specific page
node scanner.js https://www.cityofbowie.org/residents

# Scan another government site for comparison
node scanner.js https://www.maryland.gov
```

---

## Output

The scanner generates two reports in the `./reports` directory:

### 1. Terminal Output
- Summary statistics (total issues, errors, warnings)
- Issue breakdown by WCAG principle
- Top 10 most common issues
- Color-coded for easy reading

### 2. JSON Report
- `reports/scan-[timestamp].json`
- Machine-readable format
- Can be imported into Power BI or other dashboards
- Contains full issue details

### 3. HTML Report
- `reports/scan-[timestamp].html`
- Beautiful, visual report
- Open in any browser
- Includes:
  - Summary statistics
  - Critical errors section
  - Warnings section
  - Code snippets showing issues
  - Responsive design

---

## Understanding the Output

### Issue Types

- **Errors** (🚨): Critical WCAG violations that must be fixed
- **Warnings** (⚠️): Potential issues that should be reviewed
- **Notices** (ℹ️): Best practices or potential improvements

### WCAG Principles

Issues are categorized by the four WCAG principles:

1. **Perceivable**: Content must be presentable to users
   - Missing alt text on images
   - Color contrast issues
   - Text alternatives

2. **Operable**: Interface must be operable
   - Keyboard navigation
   - Link and button accessibility
   - Focus management

3. **Understandable**: Information must be understandable
   - Form labels
   - Language attributes
   - Heading structure

4. **Robust**: Content must be robust for assistive technologies
   - ARIA attributes
   - Semantic markup
   - Valid HTML

---

## Common Issues Detected

The scanner typically finds:

- Missing alt text on images (`img-alt`)
- Color contrast failures (`color-contrast`)
- Missing form labels (`label`)
- Heading structure issues (`heading-order`)
- ARIA attribute errors (`aria-*`)
- Link accessibility (`link-name`)
- Button accessibility (`button-name`)
- Landmark roles (`region`, `main`, `nav`)

---

## Troubleshooting

### Error: "Cannot find module 'pa11y'"

**Solution**: Run `npm install`

### Error: "Failed to launch the browser process"

**Solution**: Puppeteer may need additional setup on Windows

Try:
```powershell
npm install puppeteer --ignore-scripts
npx puppeteer browsers install chrome
```

### Error: "Timeout exceeded"

**Solution**: The website may be slow. Increase timeout in `scanner.js`:

```javascript
const scanOptions = {
  timeout: 60000, // Increase to 60 seconds
  // ...
};
```

### Error: "ENOTFOUND" or "ECONNREFUSED"

**Solution**: 
- Check your internet connection
- Verify the URL is correct and accessible
- Check if the website is behind VPN/firewall

---

## Limitations

### What This Tool DOES

✅ Automated WCAG 2.1 AA checks  
✅ Detects ~30-40% of accessibility issues  
✅ Identifies low-hanging fruit (alt text, contrast, ARIA)  
✅ Fast and repeatable  

### What This Tool DOES NOT

❌ Manual testing (keyboard navigation, screen readers)  
❌ Context-dependent issues (meaningful alt text vs. generic)  
❌ User experience testing  
❌ Dynamic content testing (may miss JavaScript-heavy apps)  
❌ Replace human expertise  

### Important Note

Automated tools like this scanner can only detect **30-40% of accessibility issues**. Manual testing with screen readers (NVDA, JAWS) and keyboard navigation is **required** for true WCAG 2.1 AA compliance.

**Use this tool for:**
- Initial audits
- Continuous monitoring
- Regression testing
- Identifying obvious issues

**Still need human experts for:**
- Manual testing
- Complex ARIA validation
- User experience assessment
- Final compliance certification

---

## Integration with Power BI

The JSON output can be imported into Power BI for dashboards:

1. **Save scans to a shared location** (OneDrive, Azure Blob Storage)
2. **Create Power Automate flow** to parse JSON
3. **Import into Power BI dataset**
4. **Create visualizations:**
   - Compliance score over time (line chart)
   - Issues by type (pie chart)
   - Top pages with issues (bar chart)
   - Error trend (area chart)

See `../dashboard/` directory for Power BI template (coming soon).

---

## Customization

### Change WCAG Standard

Edit `scanner.js`:

```javascript
const WCAG_STANDARD = 'WCAG2AA';  // Default
// OR
const WCAG_STANDARD = 'WCAG2AAA'; // Stricter
// OR
const WCAG_STANDARD = 'WCAG2A';   // Minimum
```

### Add More Pages

To scan multiple pages, modify the script or create a loop:

```javascript
const pages = [
  'https://www.cityofbowie.org',
  'https://www.cityofbowie.org/residents',
  'https://www.cityofbowie.org/government',
  // Add more pages
];

for (const page of pages) {
  await scanWebsite(page);
}
```

### Change Output Directory

Edit `scanner.js`:

```javascript
const reportDir = './reports'; // Change this
```

---

## For Demo/Presentation

### Best Practices

1. **Run scan before meeting** (save time)
   ```powershell
   node scanner.js https://www.cityofbowie.org
   ```

2. **Have HTML report ready** (open in browser tab)
   - Navigate to `reports/` folder
   - Open most recent `.html` file
   - Bookmark for quick access

3. **Practice the demo** (30 seconds)
   - Show terminal output (live scan)
   - Switch to HTML report
   - Highlight 2-3 specific issues

4. **Prepare talking points:**
   - "This scanner runs automatically—no manual work"
   - "Here are [X] issues we found on your website"
   - "This is what we'll monitor 24/7 with the dashboard"

---

## Technical Details

### Technology Stack

- **Pa11y**: Accessibility testing library
- **Axe-core**: Accessibility rules engine (by Deque Systems)
- **Puppeteer**: Headless Chrome for rendering pages
- **Node.js**: Runtime environment
- **CLI Table**: Terminal tables
- **Chalk**: Terminal colors

### How It Works

1. **Launch headless Chrome** via Puppeteer
2. **Load target URL** and wait for page load
3. **Inject Axe-core engine** into page
4. **Run WCAG 2.1 AA ruleset** against DOM
5. **Collect issues** (errors, warnings, notices)
6. **Generate reports** (terminal, JSON, HTML)
7. **Close browser** and exit

### Performance

- **Scan time**: 30-60 seconds per page (depends on page complexity)
- **Memory usage**: ~200-300 MB (Puppeteer + Chrome)
- **CPU usage**: Moderate (headless browser rendering)

---

## Future Enhancements

Potential improvements for v2.0:

- [ ] Multi-page scanning (sitemap integration)
- [ ] Comparison reports (before/after)
- [ ] Scheduled scans (cron job integration)
- [ ] Email alerts (critical issues)
- [ ] PDF report generation
- [ ] Dashboard integration (direct Power BI push)
- [ ] Screenshot capture (visual proof)
- [ ] CI/CD integration (GitHub Actions, Azure DevOps)

---

## License

MIT License - Free for commercial and personal use

---

## Support

For questions or issues:
- **Email**: [Your email]
- **Phone**: [Your phone]
- **GitHub**: [Your GitHub repo, if applicable]

---

## Credits

Built using:
- [Pa11y](https://pa11y.org/) by Team Pa11y
- [Axe-core](https://github.com/dequelabs/axe-core) by Deque Systems
- [Puppeteer](https://pptr.dev/) by Google Chrome team

---

**Last Updated**: 2025-12-11  
**Version**: 1.0.0  
**Status**: Proof-of-Concept (Ready for Demo)
