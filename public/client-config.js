/**
 * ADA Compliance Scanner - Client Configuration
 * 
 * This file defines the specific branding and settings for the client.
 * For white-labeling:
 * 1. Create a new branch for the client (e.g., client/my-agency)
 * 2. Modify this file with the client's branding
 * 3. Commit changes to that branch
 */

window.CLIENT_CONFIG = {
    // Identity
    companyName: "City of Bowie",
    appName: "ADA Compliance Scanner",
    appTagline: "Professional Compliance Intelligence",

    // Branding
    logoUrl: null, // Set to URL string to override default text logo
    favicon: "favicon.ico",

    // Theme Colors (Overrides CSS variables)
    // Leave null to use default theme
    theme: {
        light: {
            primary: "#0284c7", // Blue
            secondary: "#334155" // Slate
        },
        dark: {
            primary: "#38bdf8", // Sky Blue
            secondary: "#94a3b8" // Slate Light
        }
    },

    // Feature Flags
    features: {
        enableDocumentScanner: true,
        enableSiteMap: true
    },

    // Support Contact
    supportEmail: "support@example.com"
};
