# Professional Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, education, and contact information. This website is designed to be deployed on AWS using S3 for static website hosting and CloudFront for global content delivery.

🌐 Live S3 Website
https://maddy-portfolio-website-2025.s3.ap-south-2.amazonaws.com/index.html

## 📁 Project Structure

```
portfolio-website/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality

## ☁️ AWS Deployment

This portfolio is designed to be deployed on AWS. See the [AWS Deployment Guide](AWS_DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions.

### Quick Deployment Steps:

1. **Create S3 Bucket**: Create a bucket with public read access
2. **Enable Static Website Hosting**: Configure the bucket for static website hosting
3. **Upload Files**: Upload all website files to the S3 bucket
4. **Configure CloudFront** (Optional): Set up CloudFront distribution for CDN
5. **Set Bucket Policy**: Configure proper IAM permissions for public access


## 🔒 Security Best Practices

When deploying to AWS:

1. **Bucket Policy**: Use least-privilege access
2. **HTTPS**: Always use CloudFront with SSL/TLS certificate
3. **Versioning**: Enable S3 versioning for backup
4. **Monitoring**: Set up CloudWatch alarms
5. **Cost Optimization**: Use S3 lifecycle policies if needed

## 📊 AWS Services Used

- **Amazon S3**: Static website hosting
- **Amazon CloudFront**: Content delivery network (CDN)
- **AWS IAM**: Access management and bucket policies
- **Route 53** (Optional): Custom domain management

## 🐛 Troubleshooting

### Website not loading after deployment

- Check S3 bucket policy allows public read access
- Verify static website hosting is enabled
- Check CloudFront distribution status
- Verify index document is set to `index.html`

### Styles not loading

- Ensure `styles.css` is uploaded to S3
- Check file paths are correct (case-sensitive)
- Clear browser cache

### JavaScript not working

- Check browser console for errors
- Verify `script.js` is uploaded to S3
- Ensure JavaScript is enabled in browser

## 👤 Author

MadCloud - Cloud Professional




