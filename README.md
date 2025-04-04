# Portfolio Website

A responsive portfolio website template built with HTML, CSS, and JavaScript.

## Features

- Responsive design (mobile-first approach)
- Dark/light mode toggle with preference saving
- Project showcase with modal popups
- Skills section with progress bars
- Resume page with PDF viewer
- Contact information with social media links
- SEO optimized with meta tags and structured data
- Accessibility features (ARIA labels, keyboard navigation)

## Structure

```
/portfolio/
│
├── index.html          # Home page
├── about.html          # About me page
├── projects.html       # Projects showcase
├── skills.html         # Skills list
├── resume.html         # Resume/CV
├── contact.html        # Contact information
│
├── css/
│   └── styles.css      # Main stylesheet
│
├── js/
│   └── scripts.js      # JavaScript functionality
│
├── assets/
│   ├── images/         # Image files
│   │   ├── hero-bg.jpg
│   │   ├── profile.jpg
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   └── project3.jpg
│   │
│   └── resume.pdf      # Downloadable resume
│
├── robots.txt          # For search engines
├── sitemap.xml         # Site structure for SEO
└── README.md           # This file
```

## Getting Started

1. Clone the repository or download the files.
2. Replace placeholder images in `assets/images/` with your own images.
3. Replace the placeholder resume.pdf with your actual resume.
4. Customize the HTML files with your own information, projects, and skills.
5. Update the social media links with your own profiles.

## Customization

### Changing Colors

The color scheme can be modified in the `css/styles.css` file. Look for the CSS variables in the `:root` selector to change the light theme colors and in the `[data-theme="dark"]` selector for dark theme colors.

### Adding Projects

To add a new project:

1. Add a new project card in the `projects.html` file.
2. Create a corresponding modal for the project details.
3. Add the project image to the `assets/images/` directory.

### Social Media Links

Update the social media links in the `contact.html` file and in the footer section of all pages.

## Deployment

You can deploy this website using GitHub Pages:

1. Push your code to a GitHub repository.
2. Go to repository Settings > Pages.
3. Select the branch you want to deploy (usually `main`).
4. Your site will be published at `https://yourusername.github.io/repository-name/`.

For a custom domain:

1. Add your domain in the GitHub Pages settings.
2. Create a CNAME file in the root directory with your domain name.
3. Update your DNS records according to GitHub's instructions.

## Browser Support

This template is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

Feel free to use and modify this template for your personal portfolio.

## Credits

- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography (if used) 