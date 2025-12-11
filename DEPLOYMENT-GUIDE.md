# ADA Scanner Deployment Guide

## 🚀 OPTION 1: Netlify (Recommended for Demo)

**Pros:**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Deploy in 5 minutes
- ✅ Good for demos/prototypes

**Cons:**
- ⚠️ Serverless functions have 10-second timeout (scans might fail on slow sites)
- ⚠️ Limited to 125K requests/month on free tier

### Steps:

1. **Install Netlify CLI**
   ```powershell
   npm install -g netlify-cli
   ```

2. **Initialize Git (if not already)**
   ```powershell
   cd C:\Users\Tran\Desktop\ada\tools\scanner
   git init
   git add .
   git commit -m "Initial ADA scanner deployment"
   ```

3. **Login to Netlify**
   ```powershell
   netlify login
   ```

4. **Create Serverless Functions** (required for scanning API)
   
   Create folder:
   ```powershell
   New-Item -ItemType Directory -Path netlify/functions -Force
   ```
   
   Then I'll create the scan function for you.

5. **Deploy**
   ```powershell
   netlify deploy --prod
   ```

6. **Get Your URL**
   - Netlify will give you: `https://your-site-name.netlify.app`
   - Share this with Todd!

---

## 🚀 OPTION 2: Vercel (Similar to Netlify)

**Pros:**
- ✅ Free tier
- ✅ Longer function timeouts (60 seconds)
- ✅ Better for Node.js apps

**Cons:**
- ⚠️ Requires more configuration

### Steps:

1. **Install Vercel CLI**
   ```powershell
   npm install -g vercel
   ```

2. **Deploy**
   ```powershell
   cd C:\Users\Tran\Desktop\ada\tools\scanner
   vercel
   ```

3. **Follow prompts, get URL**

---

## 🚀 OPTION 3: Heroku (Best for Full Scanner)

**Pros:**
- ✅ Runs full Node.js server (no timeout issues)
- ✅ Free tier available
- ✅ Perfect for your scanner

**Cons:**
- ⚠️ Free tier sleeps after 30 min inactivity (30-second wake-up time)
- ⚠️ Requires credit card for verification

### Steps:

1. **Install Heroku CLI**
   - Download: https://devcenter.heroku.com/articles/heroku-cli

2. **Login**
   ```powershell
   heroku login
   ```

3. **Create app**
   ```powershell
   cd C:\Users\Tran\Desktop\ada\tools\scanner
   heroku create rusgroup-ada-scanner
   ```

4. **Add Procfile** (I'll create this for you)

5. **Deploy**
   ```powershell
   git push heroku main
   ```

6. **Get URL**
   - `https://rusgroup-ada-scanner.herokuapp.com`

---

## 🚀 OPTION 4: DigitalOcean App Platform (Production Quality)

**Pros:**
- ✅ No timeouts
- ✅ Professional hosting
- ✅ $5/month (can cancel anytime)

**Cons:**
- ⚠️ Not free
- ⚠️ Requires credit card

### Steps:

1. Go to: https://cloud.digitalocean.com/apps
2. Connect GitHub repo
3. Auto-deploys on push
4. Get URL: `https://rusgroup-ada-scanner.ondigitalocean.app`

---

## 🚀 OPTION 5: Railway (Developer Favorite)

**Pros:**
- ✅ $5 free credit/month
- ✅ No timeout issues
- ✅ Very easy deployment

**Cons:**
- ⚠️ Requires GitHub connection

### Steps:

1. Push code to GitHub
2. Go to: https://railway.app
3. "New Project" → "Deploy from GitHub"
4. Select your repo
5. Get URL: `https://rusgroup-ada-scanner.up.railway.app`

---

## 📋 MY RECOMMENDATION FOR TODD DEMO

**Use Heroku (Option 3)** because:

1. ✅ No function timeouts (scans can take 60+ seconds)
2. ✅ Free tier works fine for demos
3. ✅ Custom domain support
4. ✅ Professional URL
5. ✅ You can upgrade to paid later for production

**After you win the contract**, migrate to:
- DigitalOcean ($5-10/month) for production
- Or host on City of Bowie's network (most secure)

---

## 🎯 FASTEST OPTION FOR RIGHT NOW

**Netlify + Serverless Functions** (5 minutes):

I can set this up for you right now. It will work for most sites, but very slow sites might timeout. For the Todd demo, this is perfect.

Want me to create the Netlify serverless function files?

---

## ⚠️ IMPORTANT NOTES

### What Changes for Online Deployment:

1. **No localhost** - Server runs in the cloud
2. **HTTPS required** - Automatically provided
3. **Environment variables** - Set in hosting dashboard
4. **Uploads folder** - Use temp storage (Netlify/Vercel handle this)
5. **Port binding** - Use `process.env.PORT || 3000`

### Security Considerations:

- ❌ **Don't deploy to public internet long-term** (anyone can use it)
- ✅ **Add password protection** after demo
- ✅ **Rate limiting** to prevent abuse
- ✅ **Analytics** to track usage

For Todd demo: Public is fine for 1-2 weeks, then add auth.

---

## 🔒 OPTION 6: Password-Protected (After Demo)

Add basic auth to prevent public access:

```javascript
// Add to server.js
const basicAuth = require('express-basic-auth');

app.use(basicAuth({
  users: { 'todd': 'cityofbowie2026' },
  challenge: true
}));
```

Deploy with password → Only Todd's team can access.

---

## NEXT STEP?

Tell me which option you want and I'll set it up right now:

1. **Netlify** (fastest, 5 min)
2. **Heroku** (best for scanner, 10 min)
3. **Railway** (easiest, 5 min if you have GitHub)
