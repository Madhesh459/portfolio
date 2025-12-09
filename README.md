# Professional Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, education, and contact information. This website is designed to be deployed on AWS using S3 for static website hosting and CloudFront for global content delivery.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Sections Included**:
  - Hero/Home section with introduction
  - About Me section
  - Skills section with categorized skills
  - Projects section showcasing portfolio work
  - Education section with timeline
  - Contact section with form and social links
- **Interactive Elements**: Smooth scrolling, mobile navigation, form handling, and hover effects
- **Performance Optimized**: Lightweight code with minimal dependencies

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
- **Font Awesome**: Icons (loaded via CDN)

## 📋 Prerequisites

Before deploying to AWS, ensure you have:

1. An AWS account
2. AWS CLI installed and configured (optional, for command-line deployment)
3. Basic knowledge of AWS S3 and CloudFront services

## 🚀 Local Development

To view the website locally:

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
4. Navigate to `http://localhost:8000` in your browser

## ☁️ AWS Deployment

This portfolio is designed to be deployed on AWS. See the [AWS Deployment Guide](AWS_DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions.

### Quick Deployment Steps:

1. **Create S3 Bucket**: Create a bucket with public read access
2. **Enable Static Website Hosting**: Configure the bucket for static website hosting
3. **Upload Files**: Upload all website files to the S3 bucket
4. **Configure CloudFront** (Optional): Set up CloudFront distribution for CDN
5. **Set Bucket Policy**: Configure proper IAM permissions for public access

## 📝 Customization

### Personal Information

Update the following in `index.html`:

- **Name**: Replace "Your Name" in the hero section
- **Email**: Update contact email address
- **Phone**: Update phone number
- **Location**: Update location information
- **Social Links**: Add your actual social media profile URLs
- **About Me**: Customize the about section text
- **Projects**: Update project details, links, and descriptions
- **Education**: Update education history
- **Skills**: Modify skills to match your expertise

### Styling

Customize colors in `styles.css` by modifying CSS variables:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --secondary-color: #1e40af;  /* Secondary color */
    --accent-color: #3b82f6;     /* Accent color */
    /* ... more variables */
}
```

### Adding Projects

To add more projects, copy the project card structure in the Projects section:

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-icon-name"></i>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fab fa-github"></i> GitHub</a>
            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
        </div>
    </div>
</div>
```

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

## 📄 License

This project is open source and available for personal and commercial use.

## 👤 Author

Your Name - Cloud Professional

## 🙏 Acknowledgments

- Font Awesome for icons
- AWS for cloud hosting services
- Modern web design principles and best practices

---

**Note**: Remember to update all placeholder content with your actual information before deploying!

