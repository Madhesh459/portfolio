# How to Open Your Website on Mobile Phone

This guide explains different ways to access your portfolio website on a mobile phone.

## 📱 Method 1: If Already Deployed on AWS

If your website is already deployed on AWS S3/CloudFront:

### Steps:
1. **Get your website URL:**
   - **CloudFront URL**: `https://your-distribution-id.cloudfront.net`
   - **S3 Website URL**: `http://your-bucket-name.s3-website-region.amazonaws.com`
   - Check your AWS Console → CloudFront or S3 → Static website hosting

2. **Open on your phone:**
   - Open any mobile browser (Chrome, Safari, Firefox)
   - Type or paste the URL in the address bar
   - Press Enter/Go
   - Your website will load!

3. **Share the link:**
   - You can share this URL with anyone
   - It works on any device, anywhere in the world

---

## 🏠 Method 2: Test Locally on Your Phone (Same Wi-Fi Network)

If you want to test the website on your phone before deploying:

### Step 1: Start a Local Server on Your Computer

**Option A: Using Python (Recommended)**
```bash
# Navigate to your project folder
cd C:\portfolio-website

# Start server (Python 3)
python -m http.server 8000

# Or if you have Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js**
```bash
# Install http-server globally (one time only)
npm install -g http-server

# Navigate to your project folder
cd C:\portfolio-website

# Start server
http-server -p 8000
```

**Option C: Using PHP**
```bash
# Navigate to your project folder
cd C:\portfolio-website

# Start server
php -S localhost:8000
```

### Step 2: Find Your Computer's IP Address

**On Windows:**
1. Open Command Prompt or PowerShell
2. Type: `ipconfig`
3. Look for **"IPv4 Address"** under your active network adapter
   - Example: `192.168.1.100` or `192.168.0.50`

**On Mac/Linux:**
```bash
# Mac
ipconfig getifaddr en0

# Linux
hostname -I
```

### Step 3: Connect Your Phone to the Same Wi-Fi

- Make sure your phone is connected to the **same Wi-Fi network** as your computer

### Step 4: Open Website on Your Phone

1. Open a browser on your phone (Chrome, Safari, etc.)
2. Type in the address bar:
   ```
   http://YOUR-IP-ADDRESS:8000
   ```
   Example: `http://192.168.1.100:8000`
3. Press Go/Enter
4. Your website should load!

### Troubleshooting Local Access:

**If it doesn't work:**
- ✅ Check firewall: Windows Firewall might be blocking the connection
  - Go to Windows Defender Firewall → Allow an app → Check Python/Node.js
- ✅ Verify same network: Both devices must be on the same Wi-Fi
- ✅ Check IP address: Make sure you're using the correct IP
- ✅ Try different port: Use `8000`, `3000`, or `8080`
- ✅ Check server is running: You should see server logs in your terminal

---

## 📲 Method 3: Using ngrok (Access from Anywhere)

If you want to access your local website from your phone even when not on the same network:

### Steps:
1. **Install ngrok:**
   - Download from [ngrok.com](https://ngrok.com)
   - Or use: `npm install -g ngrok`

2. **Start your local server:**
   ```bash
   python -m http.server 8000
   ```

3. **In a new terminal, start ngrok:**
   ```bash
   ngrok http 8000
   ```

4. **Copy the ngrok URL:**
   - You'll see something like: `https://abc123.ngrok.io`
   - Copy this URL

5. **Open on your phone:**
   - Open the ngrok URL in your phone's browser
   - Works from anywhere, even on mobile data!

**Note:** Free ngrok URLs expire after a few hours. For permanent access, deploy to AWS.

---

## 🔍 Quick Test Checklist

- [ ] Website loads on mobile browser
- [ ] Navigation menu works (hamburger menu on mobile)
- [ ] All sections are visible and readable
- [ ] Images/icons display correctly
- [ ] Links work properly
- [ ] Contact form is accessible
- [ ] Text is readable without zooming
- [ ] Buttons are easy to tap

---

## 💡 Tips for Mobile Testing

1. **Use Browser DevTools:**
   - On desktop: Press F12 → Toggle device toolbar
   - Test different screen sizes (iPhone, Android, Tablet)

2. **Test on Real Devices:**
   - Always test on actual phones for best results
   - Different browsers may render differently

3. **Check Responsive Design:**
   - Your website should adapt to mobile screens
   - Navigation should show hamburger menu on mobile
   - Text should be readable without zooming

4. **Performance:**
   - Mobile networks can be slower
   - Test loading speed on mobile data

---

## 🚀 Recommended: Deploy to AWS

For the best mobile experience and permanent access:
- Follow the `AWS_DEPLOYMENT_GUIDE.md`
- Get a permanent URL that works everywhere
- Faster loading with CloudFront CDN
- Professional and shareable

---

## ❓ Common Issues

**Q: Can't access from phone on same network**
- Check Windows Firewall settings
- Verify both devices on same Wi-Fi
- Try disabling firewall temporarily to test

**Q: Website looks broken on mobile**
- Check browser console for errors
- Verify all CSS/JS files are loading
- Clear browser cache

**Q: Slow loading on mobile**
- Optimize images (compress before uploading)
- Use CloudFront CDN for faster delivery
- Minimize CSS/JS file sizes

---

**Need help?** Check the main `README.md` or `AWS_DEPLOYMENT_GUIDE.md` for more details.


