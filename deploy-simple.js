// deploy-simple.js
const { execSync } = require('child_process');
const fs = require('fs');

function deploy() {
    console.log('🚀 Starting simplified Netlify deployment...');
    
    try {
        // Step 1: Check if required files exist
        const requiredFiles = ['index.html', 'robots.txt', 'sitemap.xml'];
        const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
        
        if (missingFiles.length > 0) {
            console.warn('⚠️  Missing files:', missingFiles.join(', '));
            console.log('📝 Creating missing files...');
            
            // Create robots.txt if missing
            if (!fs.existsSync('robots.txt')) {
                fs.writeFileSync('robots.txt', `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://pegearts.com/sitemap.xml
Host: https://pegearts.com
`);
            }
            
            // Create sitemap.xml if missing
            if (!fs.existsSync('sitemap.xml')) {
                const currentDate = new Date().toISOString();
                fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://pegearts.com/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://pegearts.com/#about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://pegearts.com/#services</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://pegearts.com/#portfolio</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://pegearts.com/#testimonials</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://pegearts.com/#contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>
`);
            }
        }
        
        // Step 2: Deploy to Netlify
        console.log('🚀 Deploying to Netlify...');
        execSync('netlify deploy --prod --dir=. --message="Cultural Bridge Builder deployment"', { stdio: 'inherit' });
        
        console.log('✅ Deployment completed successfully!');
        console.log('🌐 Your site is live at: https://pegearts.com');
        console.log('📊 Check performance at: https://pagespeed.web.dev/analysis/https-pegearts-com/');
        
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

deploy();
