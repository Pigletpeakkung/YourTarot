// netlify-deploy.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class NetlifyDeployWithSEO {
    constructor() {
        this.siteUrl = 'https://pegearts.com';
        this.requiredFiles = [
            'index.html',
            'robots.txt',
            'sitemap.xml',
            'netlify.toml',
            '_redirects'
        ];
    }

    async deploy() {
        console.log('🚀 Starting SEO-optimized Netlify deployment...');
        
        try {
            // Step 1: Validate required files
            this.validateRequiredFiles();
            
            // Step 2: Run SEO checks
            await this.runSEOChecks();
            
            // Step 3: Generate sitemap
            this.generateSitemap();
            
            // Step 4: Validate HTML
            this.validateHTML();
            
            // Step 5: Deploy to Netlify
            await this.deployToNetlify();
            
            // Step 6: Post-deployment checks
            await this.postDeploymentChecks();
            
            console.log('✅ Deployment completed successfully!');
            
        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            process.exit(1);
        }
    }

    validateRequiredFiles() {
        console.log('📋 Validating required files...');
        
        const missingFiles = this.requiredFiles.filter(file => 
            !fs.existsSync(path.join(process.cwd(), file))
        );
        
        if (missingFiles.length > 0) {
            throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
        }
        
        console.log('✅ All required files present');
    }

    async runSEOChecks() {
        console.log('🔍 Running SEO checks...');
        
        const htmlContent = fs.readFileSync('index.html', 'utf8');
        
        // Check for essential SEO elements
        const seoChecks = [
            { name: 'Meta description', regex: /<meta name="description"/ },
            { name: 'Open Graph tags', regex: /<meta property="og:/ },
            { name: 'Twitter Card tags', regex: /<meta property="twitter:/ },
            { name: 'Structured data', regex: /<script type="application\/ld\+json">/ },
            { name: 'Title tag', regex: /<title>/ },
            { name: 'Canonical URL', regex: /<link rel="canonical"/ },
            { name: 'Viewport meta', regex: /<meta name="viewport"/ }
        ];
        
        const failedChecks = seoChecks.filter(check => 
            !check.regex.test(htmlContent)
        );
        
        if (failedChecks.length > 0) {
            console.warn('⚠️  SEO warnings:', failedChecks.map(c => c.name).join(', '));
        } else {
            console.log('✅ All SEO checks passed');
        }
    }

    generateSitemap() {
        console.log('🗺️  Generating sitemap...');
        
        const currentDate = new Date().toISOString();
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${this.siteUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${this.siteUrl}/#about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${this.siteUrl}/#services</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${this.siteUrl}/#portfolio</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${this.siteUrl}/#testimonials</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${this.siteUrl}/#contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>`;
        
        fs.writeFileSync('sitemap.xml', sitemap);
        console.log('✅ Sitemap generated');
    }

    validateHTML() {
        console.log('🔍 Validating HTML...');
        
        try {
            // Basic HTML validation
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            
            // Check for unclosed tags
            const openTags = htmlContent.match(/<[^\/][^>]*>/g) || [];
            const closeTags = htmlContent.match(/<\/[^>]*>/g) || [];
            
            if (openTags.length !== closeTags.length) {
                console.warn('⚠️  HTML validation warning: Potential unclosed tags');
            } else {
                console.log('✅ HTML validation passed');
            }
            
        } catch (error) {
            console.warn('⚠️  HTML validation skipped:', error.message);
        }
    }

    async deployToNetlify() {
        console.log('🚀 Deploying to Netlify...');
        
        try {
            const deployCommand = 'netlify deploy --prod --dir=. --message="SEO-optimized deployment"';
            execSync(deployCommand, { stdio: 'inherit' });
            console.log('✅ Netlify deployment successful');
            
        } catch (error) {
            throw new Error(`Netlify deployment failed: ${error.message}`);
        }
    }

    async postDeploymentChecks() {
        console.log('🔍 Running post-deployment checks...');
        
        // Submit sitemap to search engines
        try {
            const sitemapUrl = `${this.siteUrl}/sitemap.xml`;
            
            console.log('📤 Submitting sitemap to search engines...');
            
            // Google
            execSync(`curl -X POST "https://www.google.com/ping?sitemap=${sitemapUrl}"`, 
                { stdio: 'pipe' });
            console.log('✅ Sitemap submitted to Google');
            
            // Bing
            execSync(`curl -X POST "https://www.bing.com/ping?sitemap=${sitemapUrl}"`, 
                { stdio: 'pipe' });
            console.log('✅ Sitemap submitted to Bing');
            
        } catch (error) {
            console.warn('⚠️  Sitemap submission failed:', error.message);
        }
        
        // Display helpful links
        console.log('\n📊 Performance and SEO monitoring:');
        console.log(`🔍 Google PageSpeed: https://pagespeed.web.dev/analysis/https-pegearts-com/`);
        console.log(`🔍 GTmetrix: https://gtmetrix.com/reports/pegearts.com`);
        console.log(`🔍 Search Console: https://search.google.com/search-console`);
        console.log(`🔍 Your site: ${this.siteUrl}`);
    }
}

// Run deployment
if (require.main === module) {
    const deployer = new NetlifyDeployWithSEO();
    deployer.deploy();
}

module.exports = NetlifyDeployWithSEO;
