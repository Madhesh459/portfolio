# AWS Deployment Guide

Complete step-by-step guide to deploy your portfolio website on AWS using S3 and CloudFront.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create S3 Bucket](#step-1-create-s3-bucket)
3. [Step 2: Configure Bucket for Static Website Hosting](#step-2-configure-bucket-for-static-website-hosting)
4. [Step 3: Set Bucket Policy](#step-3-set-bucket-policy)
5. [Step 4: Upload Website Files](#step-4-upload-website-files)
6. [Step 5: Configure CloudFront Distribution](#step-5-configure-cloudfront-distribution)
7. [Step 6: Test Your Website](#step-6-test-your-website)
8. [Optional: Custom Domain Setup](#optional-custom-domain-setup)
9. [Cost Optimization](#cost-optimization)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- AWS Account (create one at [aws.amazon.com](https://aws.amazon.com))
- Portfolio website files ready (index.html, styles.css, script.js)
- Basic understanding of AWS Console

---

## Step 1: Create S3 Bucket

### 1.1 Navigate to S3 Console

1. Log in to AWS Console
2. Search for "S3" in the services search bar
3. Click on "S3" service

### 1.2 Create New Bucket

1. Click **"Create bucket"** button
2. **Bucket name**: Choose a unique name (e.g., `my-portfolio-website-2024`)
   - Must be globally unique
   - Use lowercase letters, numbers, and hyphens only
   - Note: Bucket names cannot be changed later
3. **AWS Region**: Select a region close to your users (e.g., `us-east-1`)
4. **Object Ownership**: Select **"ACLs disabled (recommended)"**
5. **Block Public Access settings**: 
   - ⚠️ **Uncheck** "Block all public access" (we need public access for website)
   - Acknowledge the warning
6. **Bucket Versioning**: Enable (recommended for backup)
7. **Default encryption**: Enable (recommended)
8. Click **"Create bucket"**

### 📸 Screenshot Tip
Take a screenshot of your bucket creation settings for documentation.

---

## Step 2: Configure Bucket for Static Website Hosting

### 2.1 Enable Static Website Hosting

1. Click on your newly created bucket
2. Go to **"Properties"** tab
3. Scroll down to **"Static website hosting"**
4. Click **"Edit"**
5. Select **"Enable"**
6. Configure:
   - **Index document**: `index.html`
   - **Error document**: `index.html` (for SPA-like behavior)
7. Click **"Save changes"**

### 2.2 Note Your Website Endpoint

After enabling, you'll see:
- **Bucket website endpoint**: `http://your-bucket-name.s3-website-region.amazonaws.com`
- Save this URL - you'll need it later

### 📸 Screenshot Tip
Capture the static website hosting configuration and endpoint URL.

---

## Step 3: Set Bucket Policy

### 3.1 Create Bucket Policy

1. Go to **"Permissions"** tab
2. Scroll to **"Bucket policy"**
3. Click **"Edit"**
4. Click **"Policy generator"** (or paste JSON directly)

### 3.2 Policy JSON

Replace `YOUR-BUCKET-NAME` with your actual bucket name:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

### 3.3 Apply Policy

1. Paste the JSON (with your bucket name)
2. Click **"Save changes"**

### 📸 Screenshot Tip
Screenshot the bucket policy configuration.

---

## Step 4: Upload Website Files

### 4.1 Upload Files via Console

1. Go to **"Objects"** tab in your bucket
2. Click **"Upload"**
3. Click **"Add files"** or drag and drop:
   - `index.html`
   - `styles.css`
   - `script.js`
4. **Important**: Under "Permissions", ensure:
   - Public read access is granted (if not already set via bucket policy)
5. Click **"Upload"**

### 4.2 Verify File Permissions

1. After upload, click on each file
2. Go to **"Permissions"** tab
3. Ensure **"Public read access"** is enabled

### 4.3 Alternative: AWS CLI Upload

If you have AWS CLI configured:

```bash
aws s3 sync . s3://YOUR-BUCKET-NAME --exclude "*.md" --exclude ".git/*"
```

### 📸 Screenshot Tip
Capture the uploaded files list and permissions.

---

## Step 5: Configure CloudFront Distribution

### 5.1 Create CloudFront Distribution

1. Go to **CloudFront** service in AWS Console
2. Click **"Create distribution"**

### 5.2 Origin Settings

1. **Origin domain**: 
   - Select your S3 bucket (NOT the website endpoint)
   - Format: `your-bucket-name.s3.amazonaws.com`
2. **Origin path**: Leave blank
3. **Name**: Auto-generated (or customize)
4. **Origin access**: 
   - Select **"Origin access control settings (recommended)"**
   - Click **"Create control setting"**:
     - Name: `portfolio-oac`
     - Signing behavior: `Sign requests`
     - Origin type: `S3`
     - Click **"Create"**
   - Select the created OAC

### 5.3 Default Cache Behavior

1. **Viewer protocol policy**: **"Redirect HTTP to HTTPS"** (recommended)
2. **Allowed HTTP methods**: **"GET, HEAD"** (sufficient for static site)
3. **Cache policy**: **"CachingOptimized"** or **"CachingDisabled"** (for development)
4. **Compress objects automatically**: **Yes** (recommended)

### 5.4 Distribution Settings

1. **Price class**: Select based on your needs (e.g., "Use only North America and Europe")
2. **Alternate domain names (CNAMEs)**: Leave blank (unless using custom domain)
3. **Custom SSL certificate**: Default (or upload your own if using custom domain)
4. **Default root object**: `index.html`
5. **Web Application Firewall (WAF)**: Optional (for additional security)

### 5.5 Create Distribution

1. Review all settings
2. Click **"Create distribution"**
3. Wait 10-15 minutes for deployment (status will show "Deployed")

### 5.6 Update S3 Bucket Policy for CloudFront

After creating CloudFront distribution:

1. Go back to your S3 bucket → **Permissions** → **Bucket policy**
2. Update the policy to allow CloudFront OAC:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT-ID:distribution/DISTRIBUTION-ID"
                }
            }
        }
    ]
}
```

Replace:
- `YOUR-BUCKET-NAME` with your bucket name
- `ACCOUNT-ID` with your AWS account ID
- `DISTRIBUTION-ID` with your CloudFront distribution ID

### 5.7 Get Your CloudFront URL

After deployment:
- **Distribution domain name**: `d1234567890abc.cloudfront.net`
- This is your website URL!

### 📸 Screenshot Tip
Capture CloudFront distribution settings, status, and domain name.

---

## Step 6: Test Your Website

### 6.1 Test S3 Website Endpoint

1. Open the S3 website endpoint in a browser:
   - `http://your-bucket-name.s3-website-region.amazonaws.com`
2. Verify all pages load correctly
3. Check that CSS and JavaScript are working

### 6.2 Test CloudFront Distribution

1. Open CloudFront URL:
   - `https://d1234567890abc.cloudfront.net`
2. Test from different locations (if possible)
3. Verify HTTPS is working
4. Check page load speed

### 6.3 Browser Testing

Test on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### 📸 Screenshot Tip
Take screenshots of your live website on different devices/browsers.

---

## Optional: Custom Domain Setup

### 7.1 Prerequisites

- Own a domain name (e.g., from Route 53, GoDaddy, Namecheap)
- Access to domain DNS settings

### 7.2 Request SSL Certificate

1. Go to **AWS Certificate Manager (ACM)**
2. Request a public certificate
3. Add your domain (e.g., `www.yourdomain.com` and `yourdomain.com`)
4. Validate via DNS or email
5. Wait for certificate to be issued

### 7.3 Update CloudFront Distribution

1. Go to CloudFront distribution
2. Click **"Edit"**
3. **Alternate domain names (CNAMEs)**: Add your domain
4. **Custom SSL certificate**: Select your ACM certificate
5. Save changes

### 7.4 Update DNS Records

In your domain registrar's DNS settings:

**Type**: CNAME
**Name**: `www` (or `@` for root domain)
**Value**: Your CloudFront distribution domain name

Example:
```
www.yourdomain.com → d1234567890abc.cloudfront.net
```

### 7.5 Wait for Propagation

- DNS changes can take 24-48 hours
- Use tools like `dig` or online DNS checkers to verify

---

## Cost Optimization

### Estimated Monthly Costs

- **S3 Storage**: ~$0.023 per GB (first 50 TB)
- **S3 Requests**: ~$0.0004 per 1,000 GET requests
- **CloudFront**: ~$0.085 per GB data transfer (first 10 TB)
- **Total**: Typically **<$1/month** for low-traffic portfolio

### Cost Optimization Tips

1. **S3 Lifecycle Policies**: Move old versions to cheaper storage
2. **CloudFront Caching**: Use appropriate cache policies
3. **Compression**: Enable CloudFront compression
4. **Monitor Usage**: Set up billing alerts
5. **Remove Unused Resources**: Delete old distributions/buckets

### Set Up Billing Alerts

1. Go to **AWS Billing & Cost Management**
2. Set up **"Budgets"**
3. Create budget alert (e.g., $5/month)

---

## Troubleshooting

### Issue: Website shows "Access Denied"

**Solution**:
- Check bucket policy allows public read
- Verify CloudFront OAC is configured correctly
- Check file permissions in S3

### Issue: CSS/JS not loading

**Solution**:
- Verify all files are uploaded
- Check file paths are correct (case-sensitive)
- Clear browser cache
- Check CloudFront cache (invalidate if needed)

### Issue: CloudFront shows "403 Forbidden"

**Solution**:
- Update S3 bucket policy for CloudFront OAC
- Verify origin access control is configured
- Check distribution status is "Deployed"

### Issue: Changes not reflecting

**Solution**:
- CloudFront caches content
- Invalidate cache: CloudFront → Distribution → Invalidations → Create invalidation
- Enter `/*` to invalidate all files
- Wait 5-10 minutes

### Issue: HTTPS not working

**Solution**:
- Ensure CloudFront viewer protocol policy is set correctly
- Check SSL certificate is valid (if using custom domain)
- Verify DNS records are correct

---

## Security Best Practices

1. ✅ **Use HTTPS**: Always use CloudFront with HTTPS
2. ✅ **Least Privilege**: Only grant necessary permissions
3. ✅ **Versioning**: Enable S3 versioning for backups
4. ✅ **Monitoring**: Enable CloudWatch logging
5. ✅ **WAF**: Consider Web Application Firewall for production
6. ✅ **Regular Updates**: Keep website content updated

---

## Maintenance

### Regular Tasks

1. **Update Content**: Keep portfolio information current
2. **Monitor Costs**: Check AWS billing dashboard monthly
3. **Test Website**: Regularly test from different locations
4. **Backup**: S3 versioning provides automatic backups
5. **Security**: Review bucket policies periodically

### Updating Website

1. Make changes to local files
2. Upload updated files to S3
3. Invalidate CloudFront cache (if needed)
4. Test changes

---

## Documentation Checklist

Before posting on LinkedIn, ensure you have screenshots of:

- [ ] S3 bucket creation
- [ ] Static website hosting configuration
- [ ] Bucket policy
- [ ] Uploaded files in S3
- [ ] CloudFront distribution settings
- [ ] CloudFront distribution status (Deployed)
- [ ] Live website (S3 endpoint)
- [ ] Live website (CloudFront URL)
- [ ] Website on mobile device
- [ ] AWS billing/cost dashboard

---

## Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Free Tier](https://aws.amazon.com/free/)

---

## Support

If you encounter issues:

1. Check AWS documentation
2. Review AWS forums
3. Check CloudWatch logs
4. Verify all steps were followed correctly

---

**Congratulations!** 🎉 Your portfolio is now live on AWS!

Remember to:
- Update placeholder content with your information
- Test thoroughly before sharing
- Monitor costs and usage
- Keep your portfolio updated

Good luck with your cloud journey! 🚀

