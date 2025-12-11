#!/usr/bin/env node

/**
 * City of Bowie ADA Compliance Scanner
 * Proof-of-Concept Website Accessibility Auditor
 *
 * This tool scans websites for WCAG 2.1 AA compliance issues
 * Built for proposal demonstration to City of Bowie IT leadership
 */

const pa11y = require('pa11y');
const Table = require('cli-table3');
const chalk = require('chalk');
const fs = require('fs');

// Configuration
const TARGET_URL = process.argv[2] || 'https://www.cityofbowie.org';
const WCAG_STANDARD = 'WCAG2AA';

console.log(chalk.blue.bold('\n🔍 City of Bowie ADA Compliance Scanner'));
console.log(chalk.blue('================================================\n'));
console.log(chalk.gray(`Target: ${TARGET_URL}`));
console.log(chalk.gray(`Standard: ${WCAG_STANDARD}`));
console.log(chalk.gray(`Timestamp: ${new Date().toISOString()}\n`));

// Scanner configuration
const scanOptions = {
  standard: WCAG_STANDARD,
  runners: ['axe'], // Using axe-core engine (industry standard)
  includeNotices: false,
  includeWarnings: true,
  timeout: 30000,
  wait: 1000,
  chromeLaunchConfig: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

/**
 * Main scanning function
 */
async function scanWebsite(url) {
  console.log(chalk.yellow('⏳ Scanning website... This may take 30-60 seconds.\n'));

  try {
    const results = await pa11y(url, scanOptions);

    // Process results
    const summary = {
      url: results.pageUrl,
      title: results.documentTitle,
      total: results.issues.length,
      errors: results.issues.filter(i => i.type === 'error').length,
      warnings: results.issues.filter(i => i.type === 'warning').length,
      notices: results.issues.filter(i => i.type === 'notice').length,
      timestamp: new Date().toISOString()
    };

    // Display results
    displaySummary(summary);
    displayIssueBreakdown(results.issues);
    displayTopIssues(results.issues);

    // Save report
    saveReport(results, summary);

    // Return for further processing
    return { results, summary };

  } catch (error) {
    console.error(chalk.red('\n❌ Scan failed:'), error.message);
    console.error(chalk.gray('\nTroubleshooting:'));
    console.error(chalk.gray('- Check that the URL is accessible'));
    console.error(chalk.gray('- Verify internet connection'));
    console.error(chalk.gray('- Try running: npm install\n'));
    process.exit(1);
  }
}

/**
 * Display summary statistics
 */
function displaySummary(summary) {
  console.log(chalk.green.bold('✅ Scan Complete\n'));

  const summaryTable = new Table({
    head: [chalk.cyan('Metric'), chalk.cyan('Value')],
    colWidths: [30, 50]
  });

  summaryTable.push(
    ['Page Title', summary.title || 'N/A'],
    ['URL', summary.url],
    ['Total Issues Found', chalk.yellow.bold(summary.total)],
    ['Errors (Critical)', chalk.red.bold(summary.errors)],
    ['Warnings', chalk.yellow.bold(summary.warnings)],
    ['Notices', chalk.gray(summary.notices)]
  );

  console.log(summaryTable.toString());
  console.log('');
}

/**
 * Display issue breakdown by type
 */
function displayIssueBreakdown(issues) {
  console.log(chalk.cyan.bold('📊 Issue Breakdown by WCAG Principle:\n'));

  // Categorize issues by WCAG principle
  const categories = {
    'Perceivable': 0,        // Images, contrast, alt text
    'Operable': 0,          // Keyboard, navigation
    'Understandable': 0,    // Readable, predictable
    'Robust': 0,            // Compatible with assistive tech
    'Other': 0
  };

  issues.forEach(issue => {
    const code = issue.code.toUpperCase();
    if (code.includes('IMAGE') || code.includes('CONTRAST') || code.includes('COLOR') || code.includes('TEXT')) {
      categories['Perceivable']++;
    } else if (code.includes('LINK') || code.includes('BUTTON') || code.includes('FOCUS') || code.includes('KEYBOARD')) {
      categories['Operable']++;
    } else if (code.includes('LABEL') || code.includes('LANG') || code.includes('HEADING')) {
      categories['Understandable']++;
    } else if (code.includes('ARIA') || code.includes('ROLE') || code.includes('MARKUP')) {
      categories['Robust']++;
    } else {
      categories['Other']++;
    }
  });

  const breakdownTable = new Table({
    head: [chalk.cyan('WCAG Principle'), chalk.cyan('Issues Found'), chalk.cyan('Percentage')],
    colWidths: [25, 15, 15]
  });

  Object.entries(categories).forEach(([principle, count]) => {
    if (count > 0) {
      const percentage = ((count / issues.length) * 100).toFixed(1);
      breakdownTable.push([
        principle,
        chalk.yellow(count),
        `${percentage}%`
      ]);
    }
  });

  console.log(breakdownTable.toString());
  console.log('');
}

/**
 * Display top 10 most common issues
 */
function displayTopIssues(issues) {
  console.log(chalk.cyan.bold('🔝 Top 10 Most Common Issues:\n'));

  // Count occurrences of each issue type
  const issueCounts = {};
  issues.forEach(issue => {
    const key = issue.code;
    issueCounts[key] = issueCounts[key] || { count: 0, message: issue.message, type: issue.type };
    issueCounts[key].count++;
  });

  // Sort by count and take top 10
  const topIssues = Object.entries(issueCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  const topTable = new Table({
    head: [chalk.cyan('#'), chalk.cyan('Issue Code'), chalk.cyan('Count'), chalk.cyan('Type')],
    colWidths: [5, 40, 10, 12]
  });

  topIssues.forEach(([code, data], index) => {
    const typeColor = data.type === 'error' ? chalk.red : chalk.yellow;
    topTable.push([
      index + 1,
      chalk.gray(code),
      chalk.yellow.bold(data.count),
      typeColor(data.type)
    ]);
  });

  console.log(topTable.toString());
  console.log('');
}

/**
 * Save detailed report to JSON and HTML
 */
function saveReport(results, summary) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const reportDir = './reports';

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  // Save JSON report
  const jsonFile = `${reportDir}/scan-${timestamp}.json`;
  fs.writeFileSync(jsonFile, JSON.stringify({ summary, results }, null, 2));
  console.log(chalk.green(`📄 JSON report saved: ${jsonFile}`));

  // Generate HTML report
  const htmlFile = `${reportDir}/scan-${timestamp}.html`;
  const htmlReport = generateHTMLReport(results, summary);
  fs.writeFileSync(htmlFile, htmlReport);
  console.log(chalk.green(`📄 HTML report saved: ${htmlFile}`));

  console.log('');
}

/**
 * Generate HTML report
 */
function generateHTMLReport(results, summary) {
  const errors = results.issues.filter(i => i.type === 'error');
  const warnings = results.issues.filter(i => i.type === 'warning');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADA Compliance Scan Report - ${summary.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      color: #333;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .header p {
      font-size: 14px;
      opacity: 0.9;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 40px;
      background: #f8f9fa;
    }
    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-4px);
    }
    .stat-card .number {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .stat-card .label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .stat-card.total .number { color: #667eea; }
    .stat-card.errors .number { color: #f56565; }
    .stat-card.warnings .number { color: #ed8936; }
    .stat-card.notices .number { color: #48bb78; }
    .section {
      padding: 40px;
    }
    .section h2 {
      font-size: 24px;
      margin-bottom: 24px;
      color: #2d3748;
      border-bottom: 3px solid #667eea;
      padding-bottom: 12px;
    }
    .issue {
      background: #f8f9fa;
      padding: 20px;
      margin-bottom: 16px;
      border-radius: 8px;
      border-left: 4px solid #cbd5e0;
    }
    .issue.error {
      border-left-color: #f56565;
      background: #fff5f5;
    }
    .issue.warning {
      border-left-color: #ed8936;
      background: #fffaf0;
    }
    .issue-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .issue-type {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .issue-type.error {
      background: #f56565;
      color: white;
    }
    .issue-type.warning {
      background: #ed8936;
      color: white;
    }
    .issue-code {
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #666;
    }
    .issue-message {
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .issue-context {
      background: white;
      padding: 12px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #4a5568;
      overflow-x: auto;
    }
    .footer {
      background: #2d3748;
      color: white;
      padding: 24px 40px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔍 ADA Compliance Scan Report</h1>
      <p>${summary.url}</p>
      <p>Scanned: ${new Date(summary.timestamp).toLocaleString()}</p>
    </div>

    <div class="summary">
      <div class="stat-card total">
        <div class="number">${summary.total}</div>
        <div class="label">Total Issues</div>
      </div>
      <div class="stat-card errors">
        <div class="number">${summary.errors}</div>
        <div class="label">Errors</div>
      </div>
      <div class="stat-card warnings">
        <div class="number">${summary.warnings}</div>
        <div class="label">Warnings</div>
      </div>
      <div class="stat-card notices">
        <div class="number">${summary.notices}</div>
        <div class="label">Notices</div>
      </div>
    </div>

    ${errors.length > 0 ? `
    <div class="section">
      <h2>🚨 Critical Errors (${errors.length})</h2>
      ${errors.slice(0, 20).map(issue => `
        <div class="issue error">
          <div class="issue-header">
            <span class="issue-type error">Error</span>
            <span class="issue-code">${issue.code}</span>
          </div>
          <div class="issue-message">${issue.message}</div>
          <div class="issue-context">${escapeHtml(issue.context)}</div>
        </div>
      `).join('')}
      ${errors.length > 20 ? `<p style="text-align: center; color: #666; margin-top: 20px;">... and ${errors.length - 20} more errors</p>` : ''}
    </div>
    ` : ''}

    ${warnings.length > 0 ? `
    <div class="section">
      <h2>⚠️ Warnings (${warnings.length})</h2>
      ${warnings.slice(0, 10).map(issue => `
        <div class="issue warning">
          <div class="issue-header">
            <span class="issue-type warning">Warning</span>
            <span class="issue-code">${issue.code}</span>
          </div>
          <div class="issue-message">${issue.message}</div>
          <div class="issue-context">${escapeHtml(issue.context)}</div>
        </div>
      `).join('')}
      ${warnings.length > 10 ? `<p style="text-align: center; color: #666; margin-top: 20px;">... and ${warnings.length - 10} more warnings</p>` : ''}
    </div>
    ` : ''}

    <div class="footer">
      <p>Generated by City of Bowie ADA Compliance Scanner</p>
      <p style="margin-top: 8px;">Proof-of-Concept Tool | WCAG 2.1 AA Standard</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Escape HTML for safe display
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Run the scanner
(async () => {
  try {
    await scanWebsite(TARGET_URL);

    console.log(chalk.green.bold('✨ Scan complete!\n'));
    console.log(chalk.cyan('💡 Next Steps:'));
    console.log(chalk.gray('   1. Review the HTML report in your browser'));
    console.log(chalk.gray('   2. Identify high-priority issues'));
    console.log(chalk.gray('   3. Plan remediation strategy\n'));

  } catch (error) {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
  }
})();
