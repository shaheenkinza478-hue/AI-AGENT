"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── All template categories & prompts ───
const categories = [
  {
    id: "ecommerce",
    label: "E-Commerce",
    emoji: "🛍️",
    color: "from-orange-500 to-pink-500",
    lightColor: "bg-orange-50 border-orange-200 text-orange-700",
    templates: [
      {
        name: "Fashion Store",
        desc: "Trendy clothing & accessories shop with product grid, filters, and cart",
        tags: ["Products", "Cart", "Filters"],
        prompt:
          "Build a professional fashion ecommerce store called 'StyleHub' with a sticky navbar with cart icon, hero banner with promotional offer, 6 category cards (Women, Men, Kids, Shoes, Bags, Accessories) with hover effects, a product grid of 12 items with images from picsum.photos, prices, discount badges, star ratings, and Add to Cart buttons, a Flash Sale countdown timer section, benefits bar (Free Shipping, Easy Returns, Secure Payment), newsletter signup, and a complete footer with social links.",
      },
      {
        name: "Electronics Shop",
        desc: "Tech products store with deals, categories and product cards",
        tags: ["Tech", "Deals", "Reviews"],
        prompt:
          "Create a premium electronics ecommerce website called 'TechZone' with dark navy and electric blue color scheme. Include: sticky header with search bar, cart and wishlist icons; a hero section with 'Mega Sale Up to 50% Off' banner; category grid (Phones, Laptops, TVs, Audio, Gaming, Cameras); product cards with specs, prices, ratings and Add to Cart; Best Sellers horizontal scroll section; Brand logos section (Apple, Samsung, Sony, LG); a comparison feature callout; and a full footer.",
      },
      {
        name: "Grocery & Food",
        desc: "Fresh produce and grocery delivery store",
        tags: ["Fresh", "Delivery", "Organic"],
        prompt:
          "Design a modern grocery delivery website called 'FreshMart' with a green and white color scheme. Features: sticky navbar with location selector and cart; hero with 'Same Day Delivery' CTA; category pills (Fruits, Vegetables, Dairy, Bakery, Meat, Beverages); product grid with quantity selectors and freshness badges; Today's Deals section with countdown timers; loyalty program banner; customer reviews section; delivery zones map placeholder; and footer with app download buttons.",
      },
      {
        name: "Jewellery Boutique",
        desc: "Luxury jewellery store with elegant design and product showcase",
        tags: ["Luxury", "Gold", "Gifts"],
        prompt:
          "Create an elegant luxury jewellery ecommerce website called 'Lumière' with gold and cream color palette. Include: minimal sticky nav with logo; full-screen hero with 'Crafted for Eternity' tagline; collection grid (Rings, Necklaces, Earrings, Bracelets, Wedding); product cards with 360-view badges, gold pricing; New Collection showcase; customer testimonials with photos; gift wrapping service callout; size guide modal button; and a sophisticated footer.",
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    emoji: "🎨",
    color: "from-purple-500 to-indigo-600",
    lightColor: "bg-purple-50 border-purple-200 text-purple-700",
    templates: [
      {
        name: "Developer Portfolio",
        desc: "Clean, dark portfolio for a full-stack developer with projects & skills",
        tags: ["Dark Mode", "Code", "Projects"],
        prompt:
          "Build a stunning dark-mode developer portfolio for 'Alex Chen — Full Stack Developer'. Use a dark gray and electric blue theme with monospace font accents. Sections: animated hero with typing effect showing roles (React Developer / Node.js / UI Designer); skills grid with progress bars (JavaScript, React, Node.js, Python, SQL, AWS); featured projects grid (6 cards) with tech stack tags, GitHub and Live links; work experience timeline; GitHub stats section; a contact form with social links; and a minimal footer.",
      },
      {
        name: "Photographer Portfolio",
        desc: "Visual-first portfolio with masonry gallery and booking form",
        tags: ["Gallery", "Masonry", "Booking"],
        prompt:
          "Create a breathtaking photographer portfolio website for 'Sofia Ray Photography'. Use a black and white minimal theme with gold accents. Include: full-screen hero with parallax image; services section (Weddings, Portraits, Commercial, Events) with hover overlays; masonry photo gallery with lightbox effect using picsum.photos images in different sizes; client testimonials with photos; Instagram-style recent work grid; packages & pricing cards; a booking contact form; and an elegant footer.",
      },
      {
        name: "Designer Portfolio",
        desc: "Creative agency-style portfolio for a UI/UX designer",
        tags: ["Creative", "UI/UX", "Case Studies"],
        prompt:
          "Design a creative UI/UX designer portfolio for 'Maya Studio'. Use a bold white background with vibrant pink-to-purple gradients and large typography. Include: oversized hero with mouse-following cursor effect; selected work case studies grid (6 projects) with before/after previews; design process section (Research → Design → Test → Launch); tools & skills section with colorful icons (Figma, Adobe XD, Protopie, Framer); client logos carousel; awards and recognition section; a stylish contact CTA section; and footer.",
      },
      {
        name: "Freelancer Profile",
        desc: "Professional freelance profile with services, rates and testimonials",
        tags: ["Services", "Rates", "Hire Me"],
        prompt:
          "Create a professional freelancer profile website for 'James Wilson — Content & Marketing Strategist'. Use a clean white and teal color scheme. Sections: professional hero with availability badge (Open to Work); services offered cards (Content Writing, SEO, Social Media, Email Campaigns, Brand Strategy); portfolio samples with industry tags; client logos (trust badges); detailed pricing packages (Basic / Pro / Premium); LinkedIn-style testimonials; FAQ accordion; and a prominent 'Hire Me' CTA with contact form.",
      },
    ],
  },
  {
    id: "saas",
    label: "SaaS / Startup",
    emoji: "🚀",
    color: "from-blue-500 to-cyan-500",
    lightColor: "bg-blue-50 border-blue-200 text-blue-700",
    templates: [
      {
        name: "SaaS Landing Page",
        desc: "Modern product landing page with features, pricing & social proof",
        tags: ["Pricing", "Features", "CTA"],
        prompt:
          "Build a high-converting SaaS landing page for 'FlowDesk — The All-in-One Productivity Suite'. Use a blue to purple gradient brand. Include: sticky header with nav links and 'Start Free Trial' CTA button; bold hero with product screenshot mockup; animated stats bar (10K+ users, 99.9% uptime, 4.9/5 rating); features section with icon cards and screenshots; how it works (3-step process with illustrations); social proof logos (companies using it); pricing table with 3 tiers (Free/Pro/Enterprise) with highlighted recommended plan; FAQ accordion; comparison table vs competitors; and a final conversion CTA section.",
      },
      {
        name: "AI Product Page",
        desc: "Futuristic AI tool landing page with demo and waitlist",
        tags: ["AI", "Waitlist", "Demo"],
        prompt:
          "Create a cutting-edge AI product landing page for 'NeuralChat — AI-Powered Customer Support'. Use a dark theme with neon green and purple gradients. Include: fullscreen hero with animated gradient background and 'Join 50,000+ businesses' social proof; live demo chat widget mockup; features with animated cards (Instant Responses, Multi-Language, CRM Integration, Analytics); integration logos grid; ROI calculator section; pricing plans with monthly/annual toggle; trusted by logos; case study callout with metrics; and a waitlist signup form with countdown to launch.",
      },
      {
        name: "Mobile App Landing",
        desc: "App store style landing page with screenshots and download CTAs",
        tags: ["Mobile", "App Store", "Screenshots"],
        prompt:
          "Design a stunning mobile app landing page for 'ZenTrack — Habit & Wellness Tracker'. Use a soft purple and mint green theme. Include: hero with phone mockup showing app screenshot; app store download badges (iOS and Android); key features with phone screenshots in a scrolling showcase; user statistics (2M+ downloads, 4.8 App Store rating); testimonials with user photos and app store reviews; feature comparison with competitors; subscription plans; press mentions section (TechCrunch, Product Hunt badges); and footer with social links.",
      },
      {
        name: "Agency Website",
        desc: "Full digital agency website with services, work samples and team",
        tags: ["Agency", "Services", "Team"],
        prompt:
          "Create a premium digital agency website for 'Orbit Agency — We Build Digital Experiences'. Use a bold black background with vibrant yellow and white accents. Include: cinematic fullscreen hero with video background placeholder; services section (Brand Strategy, Web Design, Mobile Development, SEO, Social Media, PPC); selected work portfolio (6 case studies) with industry tags and results metrics; client logos marquee; team section with photos from picsum.photos and roles; process timeline (Discovery → Strategy → Design → Launch → Growth); pricing packages; testimonials with company info; and a strong footer.",
      },
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    emoji: "🍽️",
    color: "from-red-500 to-orange-500",
    lightColor: "bg-red-50 border-red-200 text-red-700",
    templates: [
      {
        name: "Fine Dining Restaurant",
        desc: "Elegant restaurant website with menu, chef showcase and reservations",
        tags: ["Menu", "Booking", "Chef"],
        prompt:
          "Build a sophisticated fine dining restaurant website for 'Maison Dubois — French Cuisine'. Use deep burgundy, gold and cream colors. Include: cinematic hero with background image; online reservation form (date, time, guests); chef's story section with photo; full interactive menu with tabs (Starters, Mains, Desserts, Wine) and dish cards with photos from picsum.photos, descriptions, prices; private dining room section; gallery grid of restaurant ambiance; awards and press mentions; customer reviews; Google Maps placeholder; and footer with opening hours.",
      },
      {
        name: "Fast Food Chain",
        desc: "Energetic fast food website with menu items and order online",
        tags: ["Order Online", "Menu", "Delivery"],
        prompt:
          "Design a vibrant fast food website for 'BurgerBlast — Burgers & More'. Use bold red and yellow colors with high energy. Include: fullscreen hero with 'Order Now — Free Delivery Today' CTA; popular menu grid with large food photos from picsum.photos, prices and calorie counts; combo deals section with savings badges; online ordering flow mockup; loyalty points program; restaurant locations with map; nutritional info toggle; app download section; Instagram food photos grid; and footer.",
      },
      {
        name: "Café & Coffee Shop",
        desc: "Cozy coffee shop with menu, loyalty program and ambiance gallery",
        tags: ["Coffee", "Menu", "Cozy"],
        prompt:
          "Create a warm and cozy coffee shop website for 'Bean & Brew Café'. Use warm brown, cream and terracotta colors with a hand-crafted feel. Include: welcoming hero with morning atmosphere photo; menu tabs (Hot Drinks, Cold Brew, Pastries, Sandwiches, Seasonal) with item cards, prices and 'Add to Order' buttons; loyalty stamp card program; 'Our Story' section with founder photos; morning routine blog posts (3 cards); cozy gallery of the café space; events section (Open Mic, Art Nights); gift cards section; and warm footer.",
      },
    ],
  },
  {
    id: "health",
    label: "Health & Fitness",
    emoji: "💪",
    color: "from-green-500 to-teal-500",
    lightColor: "bg-green-50 border-green-200 text-green-700",
    templates: [
      {
        name: "Gym & Fitness Center",
        desc: "Energetic gym website with classes, trainers and membership plans",
        tags: ["Classes", "Trainers", "Plans"],
        prompt:
          "Build a high-energy gym website for 'IronForge Fitness'. Use dark charcoal, electric yellow and white colors. Include: dramatic hero with gym background image and 'Transform Your Body' headline; membership plans (Basic/Pro/Elite) with feature lists; class schedule grid (Monday-Sunday) with class types, times and trainer names; trainer profiles section (6 trainers) with photos from picsum.photos, specialties and certifications; before/after transformation photos section; gym equipment and facilities gallery; free trial CTA section; member reviews; location with hours; and footer.",
      },
      {
        name: "Yoga Studio",
        desc: "Peaceful yoga studio with class types, schedule and online booking",
        tags: ["Classes", "Booking", "Wellness"],
        prompt:
          "Create a calming yoga studio website for 'Lotus Flow Yoga'. Use soft sage green, warm white and lavender colors. Include: serene hero with yoga pose illustration; class types (Hatha, Vinyasa, Restorative, Prenatal, Kids) with descriptions and difficulty levels; weekly class schedule in a clean table; instructor profiles with photos, certifications and teaching style; pricing (Drop-In / Monthly / Annual / Online); online class booking form; wellness blog posts (3 articles); member spotlights; meditation resources section; and a peaceful footer.",
      },
      {
        name: "Health Clinic",
        desc: "Professional medical clinic website with services and appointments",
        tags: ["Medical", "Appointments", "Doctors"],
        prompt:
          "Design a trustworthy medical clinic website for 'CareFirst Health Clinic'. Use clean white, navy blue and light teal colors. Include: professional hero with 'Your Health, Our Priority' message and appointment booking CTA; departments grid (General Medicine, Pediatrics, Cardiology, Dentistry, Orthopedics, Dermatology); doctor profiles with photos from picsum.photos, qualifications and availability; appointment booking form; patient portal login section; insurance accepted logos; health blog (3 articles); testimonials from patients; location map placeholder; emergency contact bar; and a professional footer.",
      },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    emoji: "🏠",
    color: "from-slate-600 to-blue-700",
    lightColor: "bg-slate-50 border-slate-200 text-slate-700",
    templates: [
      {
        name: "Real Estate Agency",
        desc: "Full agency website with property listings, search and agents",
        tags: ["Listings", "Search", "Agents"],
        prompt:
          "Build a premium real estate agency website for 'Premier Estates'. Use a clean white and navy blue design with gold accents. Include: hero with full-screen property image and property search bar (location, type, price range, beds); featured properties grid (8 listings) with photos from picsum.photos, prices, bed/bath/sqft details, and status badges (For Sale / New / Sold); property types section (Apartment, Villa, Commercial, Land); top agents section with photos and listings count; market statistics section; client testimonials; neighborhood guide; mortgage calculator widget; and a full footer.",
      },
      {
        name: "Luxury Property",
        desc: "Ultra-premium luxury property showcase with virtual tours",
        tags: ["Luxury", "Virtual Tour", "Exclusive"],
        prompt:
          "Create an ultra-luxury property website for 'Elysian Properties'. Use a black and gold minimal theme with large photography. Include: full-screen video hero with 'Exclusively Curated Properties' headline; featured listing showcase (large card with 4 photos, description, price, and 'Request Private Viewing' CTA); collection grid of 6 luxury properties with premium amenities; 360° virtual tour section placeholder; investment insights section; concierge services; developer/builder profile; testimonials from HNI clients; exclusive events section; and an elegant footer.",
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    emoji: "📚",
    color: "from-yellow-500 to-orange-500",
    lightColor: "bg-yellow-50 border-yellow-200 text-yellow-700",
    templates: [
      {
        name: "Online Course Platform",
        desc: "Course marketplace with categories, instructors and enrollment",
        tags: ["Courses", "Instructors", "Enroll"],
        prompt:
          "Build an online learning platform website for 'LearnSphere'. Use a bright white with blue and yellow accents. Include: hero with search bar 'What do you want to learn today?'; category pills (Development, Design, Business, Marketing, Photography, Music); featured courses grid (8 cards) with instructor photos from picsum.photos, course thumbnails, ratings, student count, price and bestseller badges; top instructors section; learning paths section; stats bar (50K+ courses, 2M students, 200+ instructors); student success stories; subscription plans; and a full footer.",
      },
      {
        name: "School Website",
        desc: "Professional school website with programs, faculty and admissions",
        tags: ["Admissions", "Faculty", "Programs"],
        prompt:
          "Create a professional school website for 'Horizon International School'. Use navy blue, white and gold colors. Include: inspiring hero with school building photo from picsum.photos; programs offered (Primary, Secondary, A-Levels, IB, Sports Academy); school achievements and rankings section; principal's message with photo; faculty highlights (8 teachers with photos, subjects, qualifications); campus facilities gallery (Library, Labs, Sports, Arts); upcoming events calendar; admissions process timeline; fee structure table; testimonials from parents; and footer with newsletter.",
      },
    ],
  },
];

// ─── Template Card ───
function TemplateCard({ template, categoryColor, onUse }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Gradient top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${categoryColor}`} />

      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">
          {template.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{template.desc}</p>

        {/* Prompt preview */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
          <p className="text-xs text-gray-400 font-medium mb-1">Prompt preview</p>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {template.prompt.slice(0, 120)}…
          </p>
        </div>

        <button
          onClick={() => onUse(template.prompt)}
          className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${categoryColor} text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Use This Template
        </button>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("ecommerce");

  const currentCategory = categories.find((c) => c.id === activeCategory);

  const handleUseTemplate = (prompt) => {
    router.push(`/builder?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 text-white py-20 px-4">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,85,247,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {categories.reduce((acc, c) => acc + c.templates.length, 0)} Ready-to-Use Templates
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
            Pick a Template,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build Instantly
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose from professionally crafted prompts across every industry. One click fills the builder — AI does the rest.
          </p>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-md`
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.templates.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates Grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center text-2xl shadow-lg`}
          >
            {currentCategory.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentCategory.label} Templates</h2>
            <p className="text-gray-500 text-sm">
              {currentCategory.templates.length} templates — click any card to start building
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentCategory.templates.map((template) => (
            <TemplateCard
              key={template.name}
              template={template}
              categoryColor={currentCategory.color}
              onUse={handleUseTemplate}
            />
          ))}
        </div>
      </section>

      {/* ── All Categories Overview ── */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Browse All Categories</h2>
          <p className="text-gray-500 text-center mb-10 text-sm">
            {categories.reduce((acc, c) => acc + c.templates.length, 0)} templates across{" "}
            {categories.length} industries
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow`}
                >
                  {cat.emoji}
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                  {cat.label}
                </span>
                <span className="text-xs text-gray-400">{cat.templates.length} templates</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-3xl font-bold mb-3">Don't see what you need?</h2>
        <p className="text-white/80 mb-7 max-w-xl mx-auto">
          Go to the Builder and describe your custom website in your own words — any language works.
        </p>
        <button
          onClick={() => router.push("/builder")}
          className="px-8 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
        >
          Open Builder →
        </button>
      </section>
    </div>
  );
}
