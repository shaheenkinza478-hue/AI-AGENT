// lib/ai-builder.js

/**
 * ✦ AI Website Generator – Ultimate Pro ✦
 *
 * - Real AI via Groq (free) → unlimited creativity.
 * - Without API key: a smart NLP‑inspired engine that reads your prompt,
 *   extracts keywords, and builds a unique, custom website every time.
 * - Supports refinement (iterate on existing code).
 * - Generates Tailwind CSS + vanilla JS interactive pages.
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a world-class senior UI/UX designer and front-end developer. Your ONLY job is to output a COMPLETE, fully-working, single-file HTML website. No explanations. No markdown. Just raw HTML.

════════════════════════════════════════
ABSOLUTE RULES — NEVER VIOLATE THESE:
════════════════════════════════════════
1. Start your response with <!DOCTYPE html> — nothing before it.
2. End your response with </html> — nothing after it.
3. NEVER output markdown, code fences, backticks, or any text outside the HTML.
4. NEVER generate a "coming soon", "under construction", or placeholder page.
5. NEVER leave any section empty or with dummy placeholder text like "Lorem ipsum" or "Content here".
6. If the user mentions "multiple pages" or "5 pages", create ONE complete HTML file with JavaScript tab/section switching — do not create a coming-soon page.
7. The output must be a REAL, fully-built commercial website — not a demo or template skeleton.

════════════════════════════════════════
TECHNICAL STACK (always include all):
════════════════════════════════════════
- Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
- Tailwind custom config: <script>tailwind.config = { theme: { extend: { colors: { brand: '#your-color' } } } }</script>
- Google Fonts: Inter or Poppins
- Vanilla JS for: mobile menu toggle, smooth scroll, sticky header, cart counter, countdown timer, tab switching, accordion FAQ

════════════════════════════════════════
DESIGN STANDARDS (mandatory):
════════════════════════════════════════
- Hero: Full-width, bold headline (text-5xl/6xl), subheadline, 2 CTA buttons, gradient or image background
- Navbar: Sticky, logo, nav links, action icons, hamburger for mobile
- Cards: rounded-2xl, shadow-lg, hover:-translate-y-1 lift, smooth transitions
- Colors: Rich cohesive palette — gradients, accent colors, NOT just grays
- Spacing: py-20 or py-24 between sections
- Buttons: rounded-full or rounded-xl, px-8 py-3, gradient or solid, with hover state

════════════════════════════════════════
IMAGE REQUIREMENTS — READ CAREFULLY:
════════════════════════════════════════
Use ONLY this image format for every single <img> tag:
  https://picsum.photos/seed/[UNIQUE-WORD]/[WIDTH]/[HEIGHT]

RULES:
- Every image gets a DIFFERENT seed word so each image looks unique
- Never repeat the same seed word twice in one page
- Never use empty src, placeholder text, or broken URLs
- Always add: class="w-full h-full object-cover" loading="lazy" alt="description"
- Every img must also have: onerror="this.onerror=null;this.src='https://picsum.photos/400/300'"

SEED WORDS TO USE — pick from these per category (use each only once, vary them):

Fashion/Clothing products:
  Seeds: style1, dress2, jacket3, shoes4, handbag5, jeans6, coat7, sneakers8, outfit9, fashion10, clothing11, accessories12

Food/Restaurant dishes:
  Seeds: pasta1, burger2, pizza3, salad4, steak5, dessert6, sushi7, soup8, brunch9, appetizer10, entree11, cuisine12

Coffee/Café items:
  Seeds: latte1, espresso2, coldbrew3, croissant4, cake5, sandwich6, matcha7, mocha8, cappuccino9

Gym/Fitness:
  Seeds: weights1, yoga2, cardio3, trainer4, muscle5, workout6, training7, gym8, fitness9, athlete10

People/Portraits (for testimonials, team, profiles):
  Seeds: person1, avatar2, profile3, face4, portrait5, team6, staff7, member8, customer9, user10, coach11, agent12

Real Estate properties:
  Seeds: house1, apartment2, villa3, interior4, bedroom5, kitchen6, living7, property8, home9, realestate10

Tech/SaaS/Office:
  Seeds: laptop1, office2, dashboard3, meeting4, workspace5, startup6, code7, screen8, business9, tech10

Education:
  Seeds: study1, books2, classroom3, learning4, course5, lecture6, campus7, library8

Hero backgrounds (large, use 1400x700):
  Fashion hero: https://picsum.photos/seed/fashionhero/1400/700
  Food hero:    https://picsum.photos/seed/foodhero/1400/700
  Gym hero:     https://picsum.photos/seed/gymhero/1400/700
  Portfolio hero: https://picsum.photos/seed/portfoliohero/1400/700
  Real estate hero: https://picsum.photos/seed/househero/1400/700
  Coffee hero:  https://picsum.photos/seed/coffeehero/1400/700
  Tech hero:    https://picsum.photos/seed/techhero/1400/700
  Education hero: https://picsum.photos/seed/educationhero/1400/700

MANDATORY — include this <script> block just before </body> in every generated page:
<script>
  // Auto-repair any broken images
  document.querySelectorAll('img').forEach(function(img, i) {
    if (!img.src || img.src === window.location.href || img.src.endsWith('#') || img.src === '') {
      img.src = 'https://picsum.photos/seed/img' + (i + 1) + '/' + (img.width || 400) + '/' + (img.height || 300);
    }
    img.onerror = function() {
      this.onerror = null;
      this.src = 'https://picsum.photos/seed/repair' + i + '/400/300';
    };
  });
</script>
════════════════════════════════════════
FOR E-COMMERCE (when any shop/store/product/ecommerce/fashion/electronics/etc. is mentioned):
════════════════════════════════════════
MANDATORY sections:
1. Sticky navbar — logo, nav links (Home, Shop, About, Contact), search icon, wishlist icon, cart icon with badge showing item count
2. Hero banner — large promo message ("Summer Sale — Up to 60% Off"), 2 CTA buttons (Shop Now + Browse Categories), full-width background using picsum seed image (e.g. https://picsum.photos/seed/fashionhero/1400/700)
3. Category grid — 4-6 categories, each with a picsum seed image (use seeds: style1, dress2, jacket3, shoes4 etc.), category name, hover overlay with "Shop Now"
4. Product grid — EXACTLY 8 product cards, each with a DIFFERENT picsum seed image (seeds: outfit1, outfit2, outfit3... one per card), product name, original price (strikethrough), sale price in red, discount badge ("−30%"), star rating (★★★★☆ 4.5), "Add to Cart" button that increments cart counter
5. Flash Sale countdown timer — big section with red/orange gradient, animated timer showing HH:MM:SS counting down
6. Benefits bar — 4 icons: Free Shipping | Easy Returns | Secure Payment | 24/7 Support
7. Newsletter section — email input with Subscribe button
8. Footer — logo, 4 columns of links, social icons, payment icons (Visa, Mastercard, PayPal text)

FOR PORTFOLIO (when portfolio/freelancer/developer/designer/photographer/artist is mentioned):
MANDATORY sections:
1. Hero — name, role title with typing animation, 2 CTAs (View Work + Contact Me), background with picsum seed image (e.g. https://picsum.photos/seed/portfoliohero/1400/700)
2. About — profile photo using picsum seed (e.g. https://picsum.photos/seed/person1/400/400), bio paragraph, skills/tech stack badges
3. Projects grid — 6 project cards each with a DIFFERENT picsum seed image (seeds: project1, project2, project3, project4, project5, project6), name, tech tags, GitHub+Live links
4. Skills — progress bars or skill badges with percentages
5. Experience timeline
6. Testimonials — 3 client quotes each with a DIFFERENT picsum portrait seed (seeds: portrait1, portrait2, portrait3)
7. Contact form — name, email, message, send button

FOR SAAS/STARTUP (when saas/software/app/platform/tool is mentioned):
MANDATORY sections:
1. Hero — bold value proposition, picsum tech/dashboard image as mockup (e.g. https://picsum.photos/seed/techhero/1200/700), 2 CTAs (Start Free Trial + Watch Demo)
2. Social proof bar — company name logos
3. Features grid — 6 feature cards with icons and relevant picsum seed images (seeds: feature1, feature2, feature3, feature4, feature5, feature6)
4. How it works — 3-step process
5. Pricing — 3 tiers (Free/Pro/Enterprise) with features list, highlighted recommended plan, CTA buttons
6. Testimonials — 3+ each with a DIFFERENT picsum portrait seed (seeds: person1, person2, person3) and company names
7. FAQ accordion
8. Final CTA section

FOR RESTAURANT/FOOD (when restaurant/cafe/food/dining is mentioned):
MANDATORY sections:
1. Hero — full-width background using picsum food seed (e.g. https://picsum.photos/seed/foodhero/1400/700), restaurant name, tagline, "Reserve a Table" + "View Menu" CTAs
2. Menu — tabbed (Starters/Mains/Desserts/Drinks), each item with a DIFFERENT picsum food seed image (seeds: pasta1, burger2, pizza3, salad4, steak5, dessert6 etc.), name, description, price
3. About/Story section with picsum chef portrait (https://picsum.photos/seed/chef1/600/600)
4. Reservation form — date, time, guests, name, email
5. Gallery grid — 6 images each with a DIFFERENT picsum seed (seeds: gallery1, gallery2, gallery3, gallery4, gallery5, gallery6)
6. Testimonials
7. Location + hours

════════════════════════════════════════
JAVASCRIPT (always include):
════════════════════════════════════════
- Mobile hamburger menu toggle
- Smooth scroll for anchor links
- Cart counter increment on "Add to Cart" clicks (for ecommerce)
- Countdown timer (for flash sales)
- Tab switching for menus/pricing
- Sticky header class toggle on scroll

FINAL REMINDER: Output ONLY the raw HTML. No text before <!DOCTYPE html>. No text after </html>. Minimum 400 lines.`;

// Real AI call
async function realAIGenerate(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000); // 55s timeout

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 16000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);
    let html = data.choices[0].message.content;

    // ── Strip any markdown fences (```html ... ```) ──
    html = html.replace(/^```(?:html)?\s*/im, "").replace(/```\s*$/im, "").trim();

    // ── Extract the actual HTML document ──
    const doctypeIdx = html.search(/<!DOCTYPE\s+html/i);
    const htmlTagIdx = html.search(/<html[\s>]/i);
    const startIdx = doctypeIdx !== -1 ? doctypeIdx : htmlTagIdx !== -1 ? htmlTagIdx : 0;
    html = html.slice(startIdx);

    // ── Strip anything after </html> ──
    const endMatch = html.search(/<\/html>/i);
    if (endMatch !== -1) {
      html = html.slice(0, endMatch + 7);
    }

    return html.trim();
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

// ─────────────── Ultra‑smart fallback engine ───────────────
function fallbackGenerate(prompt, previousCode = null) {
  const lower = prompt.toLowerCase();

  // --- 1. Extract brand name ---
  const brandMatch = prompt.match(/(?:for|of|by|named|called|brand is|name is|create a|make a|build a)\s+([A-Za-z0-9\s&]+?)(?:\s*(?:website|site|page|\.|,|$))/i);
  const brand = brandMatch ? brandMatch[1].trim() : "YourBrand";

  // --- 2. Identify key topics / industry from prompt ---
  const topics = [];
  if (lower.includes("portfolio")) topics.push("portfolio");
  if (lower.includes("restaurant") || lower.includes("cafe") || lower.includes("food")) topics.push("restaurant");
  if (lower.includes("fitness") || lower.includes("gym")) topics.push("fitness");
  if (lower.includes("education") || lower.includes("school") || lower.includes("course")) topics.push("education");
  if (lower.includes("agency") || lower.includes("creative") || lower.includes("design")) topics.push("agency");
  if (lower.includes("event") || lower.includes("conference") || lower.includes("wedding")) topics.push("event");
  if (lower.includes("real estate") || lower.includes("property")) topics.push("realestate");
  if (lower.includes("music") || lower.includes("band") || lower.includes("artist")) topics.push("music");
  if (lower.includes("health") || lower.includes("medical") || lower.includes("clinic")) topics.push("health");
  if (lower.includes("legal") || lower.includes("lawyer") || lower.includes("attorney")) topics.push("legal");
  if (lower.includes("e‑commerce") || lower.includes("shop") || lower.includes("store")) topics.push("ecommerce");
  if (lower.includes("blog") || lower.includes("article")) topics.push("blog");
  if (lower.includes("saas") || lower.includes("software")) topics.push("saas");
  if (lower.includes("dark") || lower.includes("night mode")) topics.push("dark");

  // Pick the most relevant topic (first match) or default to generic
  const mainTopic = topics.length > 0 ? topics[0] : "generic";

  // --- 3. Design theme ---
  const isDark = lower.includes("dark") || mainTopic === "dark";
  const primaryColor = lower.includes("blue") ? "blue" :
                       lower.includes("purple") ? "purple" :
                       lower.includes("green") ? "green" :
                       lower.includes("red") ? "red" :
                       lower.includes("orange") ? "orange" :
                       "indigo";
  const colorMap = {
    blue:   { from: "from-blue-600",  to: "to-blue-800",  light: "bg-blue-100",  text: "text-blue-700" },
    purple: { from: "from-purple-600",to: "to-purple-800",light: "bg-purple-100",text: "text-purple-700" },
    green:  { from: "from-emerald-600",to: "to-emerald-800",light: "bg-emerald-100",text: "text-emerald-700" },
    red:    { from: "from-red-600",   to: "to-red-800",   light: "bg-red-100",   text: "text-red-700" },
    orange: { from: "from-orange-500",to: "to-orange-700",light: "bg-orange-100",text: "text-orange-700" },
    indigo: { from: "from-indigo-600",to: "to-indigo-800",light: "bg-indigo-100",text: "text-indigo-700" },
  };
  const colors = colorMap[primaryColor] || colorMap.indigo;

  const bg = isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const sectionBg = isDark ? "bg-gray-800" : "bg-gray-50";
  const cardBg = isDark ? "bg-gray-700" : "bg-white";
  const muted = isDark ? "text-gray-400" : "text-gray-600";

  // --- 4. Dynamic content generators ---
  const heroTitle = generateHeroTitle(mainTopic, brand, lower);
  const heroSubtitle = generateHeroSubtitle(mainTopic, brand, lower);
  const featureCards = generateFeatures(mainTopic, brand, lower);
  const aboutText = `We are a passionate team dedicated to delivering exceptional ${mainTopic === 'generic' ? 'services' : mainTopic} experiences. Our mission is to empower businesses and individuals with innovative tools and creative strategies.`;
  const testimonials = [
    { name: "Alex Johnson", quote: `${brand} exceeded our expectations. Truly professional!`, role: "CEO" },
    { name: "Sarah Chen", quote: `Working with ${brand} was a game changer.`, role: "Founder" },
    { name: "Mike Brown", quote: "Creative, fast, and extremely talented. 5 stars!", role: "Designer" },
  ];

  // Optional sections
  const showPricing = lower.includes("pricing") || lower.includes("price") || lower.includes("plan");
  const showTeam = lower.includes("team") || lower.includes("staff") || lower.includes("member");
  const showFAQ = lower.includes("faq") || lower.includes("question") || lower.includes("help");

  const pricingPlans = [
    { name: "Basic",   price: "$9",   features: ["Feature A", "Feature B", "Feature C"] },
    { name: "Pro",     price: "$29",  features: ["Everything in Basic", "Feature D", "Feature E"] },
    { name: "Enterprise", price: "Custom", features: ["All features", "Priority support", "SLA"] },
  ];
  const teamMembers = [
    { name: "Alice", role: "CEO", img: "https://picsum.photos/seed/person1/150/150" },
    { name: "Bob",   role: "CTO", img: "https://picsum.photos/seed/person2/150/150" },
    { name: "Carol", role: "Designer", img: "https://picsum.photos/seed/person3/150/150" },
  ];
  const faqItems = [
    { q: "What is the turnaround time?", a: "Typically 3‑5 business days depending on complexity." },
    { q: "Do you offer revisions?", a: "Yes, we include 2 free rounds of revisions." },
    { q: "How do I get started?", a: "Simply contact us via the form below!" },
  ];

  // --- 5. Assemble HTML ---
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brand}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; }
    .fade-in { animation: fadeIn 0.6s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body class="${bg}">
  <!-- Navigation -->
  <nav class="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto sticky top-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md">
    <span class="text-2xl font-extrabold bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent">${brand}</span>
    <div class="hidden md:flex space-x-6 ${muted} font-medium">
      <a href="#home" class="hover:${colors.text} transition-colors">Home</a>
      <a href="#features" class="hover:${colors.text} transition-colors">Features</a>
      <a href="#about" class="hover:${colors.text} transition-colors">About</a>
      ${showPricing ? '<a href="#pricing" class="hover:'+colors.text+' transition-colors">Pricing</a>' : ''}
      ${showTeam    ? '<a href="#team" class="hover:'+colors.text+' transition-colors">Team</a>' : ''}
      ${showFAQ     ? '<a href="#faq" class="hover:'+colors.text+' transition-colors">FAQ</a>' : ''}
      <a href="#contact" class="hover:${colors.text} transition-colors">Contact</a>
    </div>
    <button class="md:hidden text-2xl" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">☰</button>
    <div id="mobile-menu" class="hidden absolute top-full left-0 w-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4 flex flex-col space-y-3 md:hidden">
      <a href="#home" class="${muted}">Home</a>
      <a href="#features" class="${muted}">Features</a>
      <a href="#about" class="${muted}">About</a>
      ${showPricing ? '<a href="#pricing" class="'+muted+'">Pricing</a>' : ''}
      ${showTeam    ? '<a href="#team" class="'+muted+'">Team</a>' : ''}
      ${showFAQ     ? '<a href="#faq" class="'+muted+'">FAQ</a>' : ''}
      <a href="#contact" class="${muted}">Contact</a>
    </div>
  </nav>

  <!-- Hero -->
  <header id="home" class="bg-gradient-to-r ${colors.from} ${colors.to} text-white py-32 px-4 text-center fade-in">
    <h1 class="text-5xl md:text-7xl font-extrabold mb-6">${heroTitle}</h1>
    <p class="text-xl opacity-90 max-w-2xl mx-auto mb-8">${heroSubtitle}</p>
    <div class="flex justify-center gap-4">
      <a href="#contact" class="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition shadow-lg">Get Started</a>
      <a href="#features" class="px-8 py-3 border border-white rounded-full font-semibold hover:bg-white/10 transition">Learn More</a>
    </div>
  </header>

  <!-- Features -->
  <section id="features" class="py-20 px-4 ${sectionBg}">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12">What We Offer</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${featureCards.map(f => `
        <div class="${cardBg} p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center fade-in">
          <div class="text-4xl mb-4">${f.icon}</div>
          <h3 class="text-xl font-bold mb-2">${f.title}</h3>
          <p class="${muted}">${f.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold mb-6">About ${brand}</h2>
      <p class="text-lg ${muted} leading-relaxed">${aboutText}</p>
    </div>
  </section>

  ${showPricing ? `
  <!-- Pricing -->
  <section id="pricing" class="py-20 px-4 ${sectionBg}">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${pricingPlans.map(p => `
        <div class="${cardBg} p-8 rounded-2xl shadow-sm text-center">
          <h3 class="text-2xl font-bold mb-4">${p.name}</h3>
          <div class="text-4xl font-extrabold ${colors.text} mb-6">${p.price}<span class="text-lg font-normal ${muted}">/mo</span></div>
          <ul class="space-y-3 mb-6 ${muted}">
            ${p.features.map(f => `<li>✅ ${f}</li>`).join('')}
          </ul>
          <a href="#contact" class="block w-full py-3 bg-gradient-to-r ${colors.from} ${colors.to} text-white rounded-xl font-semibold hover:opacity-90 transition">Choose Plan</a>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${showTeam ? `
  <!-- Team -->
  <section id="team" class="py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-bold mb-12">Meet the Team</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${teamMembers.map(m => `
        <div class="${cardBg} p-6 rounded-2xl shadow-sm">
          <img src="${m.img}" alt="${m.name}" class="w-24 h-24 mx-auto rounded-full mb-4 object-cover">
          <h3 class="text-xl font-bold">${m.name}</h3>
          <p class="${muted}">${m.role}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Testimonials -->
  <section class="py-20 px-4 ${sectionBg}">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-bold mb-12">What Our Clients Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${testimonials.map(t => `
        <div class="${cardBg} p-8 rounded-2xl shadow-sm fade-in">
          <p class="italic ${muted} mb-4">"${t.quote}"</p>
          <div class="font-bold">${t.name}</div>
          <div class="text-sm ${muted}">${t.role}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${showFAQ ? `
  <!-- FAQ -->
  <section id="faq" class="py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div class="space-y-4">
        ${faqItems.map(f => `
        <div class="${cardBg} p-6 rounded-2xl shadow-sm">
          <h3 class="text-lg font-bold mb-2">${f.q}</h3>
          <p class="${muted}">${f.a}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Contact -->
  <section id="contact" class="py-20 px-4 bg-gradient-to-r ${colors.from} ${colors.to} text-white text-center">
    <h2 class="text-4xl font-bold mb-6">Let's Work Together</h2>
    <p class="text-xl opacity-90 mb-8 max-w-xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
    <form class="max-w-md mx-auto space-y-4">
      <input type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl text-gray-900" />
      <input type="email" placeholder="Your Email" class="w-full px-4 py-3 rounded-xl text-gray-900" />
      <textarea rows="3" placeholder="Your Message" class="w-full px-4 py-3 rounded-xl text-gray-900"></textarea>
      <button class="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition shadow-lg">Send Message</button>
    </form>
  </section>

  <!-- Footer -->
  <footer class="py-8 text-center ${muted} ${isDark ? 'bg-gray-950' : 'bg-gray-100'}">
    © ${new Date().getFullYear()} ${brand}. All rights reserved.
  </footer>

  <script>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>`;

  if (previousCode) {
    return html.replace('</body>', '<div class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50">✨ Refined</div></body>');
  }
  return html;
}

// ─── Dynamic content helpers ───

function generateHeroTitle(topic, brand, lower) {
  if (topic === "portfolio") return `Hi, I'm ${brand}`;
  if (topic === "restaurant") return `Welcome to ${brand}`;
  if (topic === "fitness") return `Transform Your Body at ${brand}`;
  if (topic === "education") return `Learn Without Limits at ${brand}`;
  if (topic === "agency") return `Creative Solutions by ${brand}`;
  if (topic === "event") return `Unforgettable Events with ${brand}`;
  if (topic === "realestate") return `Find Your Dream Home with ${brand}`;
  if (topic === "music") return `Feel the Rhythm with ${brand}`;
  if (topic === "health") return `Care You Can Trust – ${brand}`;
  if (topic === "legal") return `Justice Served by ${brand}`;
  if (topic === "ecommerce") return `Shop the Latest at ${brand}`;
  if (topic === "blog") return `Stories & Insights – ${brand}`;
  if (topic === "saas") return `Build Faster with ${brand}`;
  // Generic but dynamic
  const words = lower.split(/\s+/).filter(w => w.length > 3 && !["website","page","create","make","build","site"].includes(w));
  if (words.length > 0) {
    const theme = words[Math.floor(Math.random() * words.length)];
    return `Welcome to ${brand} – Your ${theme} destination`;
  }
  return `Welcome to ${brand}`;
}

function generateHeroSubtitle(topic, brand, lower) {
  if (topic === "portfolio") return "Full‑stack developer & designer crafting digital experiences.";
  if (topic === "restaurant") return "Exquisite dining crafted by world‑class chefs.";
  if (topic === "fitness") return "State‑of‑the‑art equipment and expert trainers.";
  if (topic === "education") return "Expert‑led courses, flexible learning.";
  if (topic === "agency") return "We design & build digital products that grow your brand.";
  if (topic === "event") return "From concept to execution, we make events magical.";
  if (topic === "realestate") return "Curated properties and dedicated agents.";
  if (topic === "music") return "Stream and discover music that moves you.";
  if (topic === "health") return "Compassionate healthcare for you and your family.";
  if (topic === "legal") return "Experienced attorneys protecting your rights.";
  if (topic === "ecommerce") return "Trending products delivered to your door.";
  if (topic === "blog") return "Thoughts on technology, design, and life.";
  if (topic === "saas") return "The all‑in‑one platform that scales with your business.";
  // Generic
  return "Your complete solution for modern digital experiences.";
}

function generateFeatures(topic, brand, lower) {
  const genericFeatures = [
    { icon: "✨", title: "Premium Quality", desc: "We deliver only the best" },
    { icon: "🔥", title: "Fast Turnaround", desc: "Quick results without compromise" },
    { icon: "💎", title: "24/7 Support", desc: "Always here to help" },
  ];

  const featureSets = {
    portfolio: [
      { icon: "🚀", title: "Web Development", desc: "React, Next.js, and Tailwind" },
      { icon: "🎨", title: "UI/UX Design", desc: "Figma, user research, prototyping" },
      { icon: "📱", title: "Mobile Apps", desc: "Cross‑platform with React Native" },
    ],
    restaurant: [
      { icon: "🍝", title: "Signature Dishes", desc: "Handcrafted pasta & seasonal specials" },
      { icon: "🍷", title: "Fine Wines", desc: "Curated selection from around the world" },
      { icon: "✨", title: "Private Events", desc: "Book our exclusive dining room" },
    ],
    fitness: [
      { icon: "🏋️", title: "Modern Equipment", desc: "Latest machines & free weights" },
      { icon: "🧘", title: "Yoga & Pilates", desc: "All‑level classes" },
      { icon: "📅", title: "Personal Training", desc: "Customized plans" },
    ],
    education: [
      { icon: "📚", title: "100+ Courses", desc: "From coding to creative arts" },
      { icon: "🎓", title: "Certificates", desc: "Earn recognized credentials" },
      { icon: "⏰", title: "Self‑Paced", desc: "Learn on your schedule" },
    ],
    agency: [
      { icon: "🎯", title: "Brand Strategy", desc: "Position your brand for success" },
      { icon: "💻", title: "Web Development", desc: "Custom websites and applications" },
      { icon: "📢", title: "Digital Marketing", desc: "Reach your audience effectively" },
    ],
    event: [
      { icon: "📅", title: "Online Registration", desc: "Seamless sign‑up and ticketing" },
      { icon: "🎤", title: "Speaker Management", desc: "Organize presenters and sessions" },
      { icon: "📊", title: "Analytics & Reporting", desc: "Track attendance and engagement" },
    ],
    realestate: [
      { icon: "🏡", title: "Curated Listings", desc: "Handpicked properties by experts" },
      { icon: "💰", title: "Instant Valuation", desc: "Find out what your home is worth" },
      { icon: "🤝", title: "Expert Agents", desc: "Dedicated support from start to finish" },
    ],
    music: [
      { icon: "🎧", title: "Discover Weekly", desc: "Personalized playlists every Monday" },
      { icon: "🎤", title: "Exclusive Releases", desc: "Hear new music before anyone else" },
      { icon: "📀", title: "High Quality Audio", desc: "Lossless streaming for audiophiles" },
    ],
    health: [
      { icon: "🩺", title: "Primary Care", desc: "Routine check‑ups and preventive medicine" },
      { icon: "🧬", title: "Specialists", desc: "Access to a wide range of doctors" },
      { icon: "💊", title: "Online Pharmacy", desc: "Prescriptions delivered to your door" },
    ],
    legal: [
      { icon: "⚖️", title: "Litigation", desc: "Strong representation in court" },
      { icon: "📄", title: "Contracts", desc: "Draft and review legal documents" },
      { icon: "🏛️", title: "Consultation", desc: "Free initial case evaluation" },
    ],
    ecommerce: [
      { icon: "🛍️", title: "Fast Shipping", desc: "Free delivery on orders over $50" },
      { icon: "💳", title: "Secure Payment", desc: "Multiple payment options with encryption" },
      { icon: "🔄", title: "Easy Returns", desc: "30‑day hassle‑free return policy" },
    ],
    blog: [
      { icon: "📖", title: "In‑depth Articles", desc: "Thoughtful long‑form content" },
      { icon: "💡", title: "Expert Tips", desc: "Actionable advice from industry leaders" },
      { icon: "🔮", title: "Future Trends", desc: "Stay ahead of the curve" },
    ],
    saas: [
      { icon: "⚡", title: "Lightning Fast", desc: "Optimized performance for your daily workflow" },
      { icon: "🔒", title: "Enterprise Security", desc: "Bank‑level encryption and data protection" },
      { icon: "📊", title: "Smart Analytics", desc: "Actionable insights to grow your business" },
    ],
    dark: [
      { icon: "🌙", title: "Dark Mode", desc: "Elegant dark theme across all sections" },
      { icon: "⚡", title: "Performance", desc: "Optimized for speed" },
      { icon: "✨", title: "Modern UI", desc: "Sleek design that stands out" },
    ],
  };

  // For generic, try to derive features from the prompt itself
  if (topic === "generic") {
    // Extract potential keywords
    const words = lower.replace(/[^a-zA-Z ]/g, "").split(/\s+/).filter(w => w.length > 3);
    const used = [];   // <-- fixed
    const featuresArr = [];
    // Find up to 3 meaningful words to create feature titles
    for (const word of words) {
      if (featuresArr.length >= 3) break;
      if (used.includes(word)) continue;
      used.push(word);
      const title = word.charAt(0).toUpperCase() + word.slice(1);
      featuresArr.push({ icon: "✨", title: title, desc: `We excel in ${word} services` });
    }
    // Fallback if not enough words
    while (featuresArr.length < 3) {
      const generic = [{ icon: "✨", title: "Quality", desc: "We deliver only the best" },
                       { icon: "🔥", title: "Speed", desc: "Fast turnaround" },
                       { icon: "💎", title: "Support", desc: "24/7 assistance" }];
      featuresArr.push(generic[featuresArr.length]);
    }
    return featuresArr;
  }

  return featureSets[topic] || genericFeatures;
}

// ── Main export ──
export async function generateFromPrompt(prompt, previousCode = null) {
  // If API key present, use real AI
  if (process.env.GROQ_API_KEY) {
    try {
      if (previousCode) {
        const refinePrompt = `Here is the existing HTML page:\n\`\`\`html\n${previousCode}\n\`\`\`\n\nApply this change request: "${prompt}"\n\nReturn the COMPLETE updated HTML page. Keep all existing sections and styling — only modify what was asked. Output ONLY raw HTML, no explanation.`;
        return await realAIGenerate(refinePrompt);
      }
      return await realAIGenerate(prompt);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
    }
  }
  // Ultra‑smart fallback
  return fallbackGenerate(prompt, previousCode);
}