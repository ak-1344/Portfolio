#!/bin/bash
# SEO Testing Script

echo "🔍 SEO Testing Script"
echo "===================="
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Dev server is not running. Please start it with: pnpm dev"
    exit 1
fi

echo "✅ Dev server is running"
echo ""

# Test robots.txt
echo "📋 Testing robots.txt..."
if curl -s http://localhost:3000/robots.txt | grep -q "User-agent"; then
    echo "✅ robots.txt is accessible"
else
    echo "❌ robots.txt is not accessible"
fi
echo ""

# Test sitemap
echo "🗺️  Testing sitemap.xml..."
if curl -s http://localhost:3000/sitemap.xml | grep -q "urlset"; then
    echo "✅ sitemap.xml is accessible"
else
    echo "❌ sitemap.xml is not accessible"
fi
echo ""

# Test manifest
echo "📱 Testing manifest.json..."
if curl -s http://localhost:3000/manifest.json | grep -q "name"; then
    echo "✅ manifest.json is accessible"
else
    echo "❌ manifest.json is not accessible"
fi
echo ""

# Test homepage meta tags
echo "🏠 Testing homepage meta tags..."
HOMEPAGE=$(curl -s http://localhost:3000)
if echo "$HOMEPAGE" | grep -q "og:title"; then
    echo "✅ Open Graph tags found"
else
    echo "❌ Open Graph tags not found"
fi

if echo "$HOMEPAGE" | grep -q "twitter:card"; then
    echo "✅ Twitter Card tags found"
else
    echo "❌ Twitter Card tags not found"
fi

if echo "$HOMEPAGE" | grep -q "application/ld+json"; then
    echo "✅ Structured data (JSON-LD) found"
else
    echo "❌ Structured data not found"
fi
echo ""

echo "🎉 SEO Testing Complete!"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm build' to test production build"
echo "2. Deploy to Vercel"
echo "3. Submit sitemap to Google Search Console"
echo "4. Test with Google Rich Results Test"
echo "5. Test with PageSpeed Insights"
