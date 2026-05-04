// lib/ai-builder.js

export async function generateFromPrompt(prompt, previousCode = null) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 800));

  const lower = prompt.toLowerCase();
  let html = "";

  // If we are refining previous code, we can append/modify (simplified mock)
  if (previousCode) {
    // We'll just prepend a comment indicating refinement, and maybe tweak a style
    html = previousCode.replace(
      "</style>",
      `/* Refined: ${prompt} */\n</style>`
    );
    // Add a simple alert or something to show refinement worked
    html = html.replace(
      "</body>",
      `<script>console.log("Refined with: ${prompt}")</script></body>`
    );
    return html;
  }

  // === Fresh generation based on prompt keywords ===
  if (
    lower.includes("portfolio") ||
    lower.includes("dark portfolio") ||
    lower.includes("personal site")
  ) {
    html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-900 text-white">
  <nav class="flex justify-between items-center p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My Portfolio</h1>
    <div class="space-x-4">
      <a href="#" class="hover:text-blue-400">Home</a>
      <a href="#" class="hover:text-blue-400">Projects</a>
      <a href="#" class="hover:text-blue-400">Contact</a>
    </div>
  </nav>
  <header class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-4">Hi, I'm <span class="text-blue-400">Alex</span></h2>
      <p class="text-xl text-gray-300 mb-8">Full‑stack developer & designer</p>
      <a href="#" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition">View Projects</a>
    </div>
  </header>
  <section class="max-w-6xl mx-auto py-20 px-4">
    <h3 class="text-3xl font-bold mb-10 text-center">Featured Projects</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
        <div class="h-40 bg-gray-700 rounded-xl mb-4"></div>
        <h4 class="text-xl font-semibold mb-2">Project One</h4>
        <p class="text-gray-400">A beautiful landing page built with React and Tailwind.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
        <div class="h-40 bg-gray-700 rounded-xl mb-4"></div>
        <h4 class="text-xl font-semibold mb-2">Project Two</h4>
        <p class="text-gray-400">An e‑commerce dashboard with real‑time analytics.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
        <div class="h-40 bg-gray-700 rounded-xl mb-4"></div>
        <h4 class="text-xl font-semibold mb-2">Project Three</h4>
        <p class="text-gray-400">A mobile‑first blog template with dark mode.</p>
      </div>
    </div>
  </section>
  <footer class="text-center py-8 text-gray-500 border-t border-gray-800">
    © ${new Date().getFullYear()} Alex. All rights reserved.
  </footer>
</body>
</html>`;
  } else if (lower.includes("landing") || lower.includes("saas") || lower.includes("product")) {
    html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900">
  <nav class="flex justify-between items-center p-6 max-w-7xl mx-auto">
    <div class="text-2xl font-bold text-blue-600">YourBrand</div>
    <div class="space-x-6 text-sm font-medium">
      <a href="#" class="hover:text-blue-600">Features</a>
      <a href="#" class="hover:text-blue-600">Pricing</a>
      <a href="#" class="hover:text-blue-600">Contact</a>
    </div>
  </nav>
  <section class="max-w-4xl mx-auto text-center py-24 px-4">
    <h1 class="text-5xl md:text-7xl font-extrabold mb-6">Build faster with AI</h1>
    <p class="text-xl text-gray-600 mb-10">Our platform helps you create stunning websites in minutes, not days.</p>
    <div class="flex justify-center gap-4">
      <a href="#" class="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">Get Started Free</a>
      <a href="#" class="px-8 py-3 border border-gray-300 rounded-full font-semibold hover:border-blue-400 transition">Learn More</a>
    </div>
  </section>
  <section class="bg-gray-50 py-20 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-2xl shadow-sm text-center">
        <div class="text-4xl mb-4">⚡</div>
        <h3 class="text-2xl font-bold mb-2">Lightning Fast</h3>
        <p class="text-gray-600">Get your website up and running in seconds.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-sm text-center">
        <div class="text-4xl mb-4">🎨</div>
        <h3 class="text-2xl font-bold mb-2">Beautiful by Default</h3>
        <p class="text-gray-600">Eye‑catching designs without a designer.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl shadow-sm text-center">
        <div class="text-4xl mb-4">🔒</div>
        <h3 class="text-2xl font-bold mb-2">Secure</h3>
        <p class="text-gray-600">Enterprise‑grade security built‑in.</p>
      </div>
    </div>
  </section>
  <footer class="bg-gray-100 text-center py-6 text-gray-500">
    © ${new Date().getFullYear()} YourBrand. All rights reserved.
  </footer>
</body>
</html>`;
  } else if (lower.includes("blog")) {
    html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-900">
  <nav class="bg-white shadow-sm p-6 flex justify-between max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold text-blue-600">MyBlog</h1>
    <div class="space-x-4 text-sm">
      <a href="#" class="hover:text-blue-600">Home</a>
      <a href="#" class="hover:text-blue-600">Categories</a>
      <a href="#" class="hover:text-blue-600">About</a>
    </div>
  </nav>
  <main class="max-w-4xl mx-auto py-12 px-4">
    <h2 class="text-4xl font-extrabold mb-8">Latest Posts</h2>
    <div class="grid gap-8">
      <article class="bg-white p-6 rounded-2xl shadow-sm">
        <h3 class="text-2xl font-bold mb-2">Getting Started with Tailwind CSS</h3>
        <p class="text-gray-600 mb-4">Learn how to build modern interfaces quickly using utility‑first CSS.</p>
        <a href="#" class="text-blue-600 font-medium">Read more →</a>
      </article>
      <article class="bg-white p-6 rounded-2xl shadow-sm">
        <h3 class="text-2xl font-bold mb-2">Why Next.js is the Future of Web Development</h3>
        <p class="text-gray-600 mb-4">Server‑side rendering, static generation, and more – without the headache.</p>
        <a href="#" class="text-blue-600 font-medium">Read more →</a>
      </article>
      <article class="bg-white p-6 rounded-2xl shadow-sm">
        <h3 class="text-2xl font-bold mb-2">Building an API with Next.js Route Handlers</h3>
        <p class="text-gray-600 mb-4">A step‑by‑step guide to creating powerful backend endpoints.</p>
        <a href="#" class="text-blue-600 font-medium">Read more →</a>
      </article>
    </div>
  </main>
  <footer class="text-center py-8 text-gray-500 border-t border-gray-200">
    © ${new Date().getFullYear()} MyBlog.
  </footer>
</body>
</html>`;
  } else if (lower.includes("dashboard") || lower.includes("admin")) {
    html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-900 flex">
  <aside class="w-64 bg-white h-screen p-6 shadow-lg hidden md:block">
    <h2 class="text-2xl font-bold text-blue-600 mb-8">Admin</h2>
    <nav class="space-y-2 text-sm">
      <a href="#" class="block py-2 px-4 bg-blue-50 text-blue-700 rounded-lg">Dashboard</a>
      <a href="#" class="block py-2 px-4 hover:bg-gray-50 rounded-lg">Users</a>
      <a href="#" class="block py-2 px-4 hover:bg-gray-50 rounded-lg">Analytics</a>
      <a href="#" class="block py-2 px-4 hover:bg-gray-50 rounded-lg">Settings</a>
    </nav>
  </aside>
  <main class="flex-1 p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard Overview</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-xl shadow-sm">
        <p class="text-gray-500 text-sm">Total Users</p>
        <p class="text-3xl font-bold">2,340</p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm">
        <p class="text-gray-500 text-sm">Revenue</p>
        <p class="text-3xl font-bold">$12,500</p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm">
        <p class="text-gray-500 text-sm">Projects</p>
        <p class="text-3xl font-bold">87</p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm">
        <p class="text-gray-500 text-sm">Tasks</p>
        <p class="text-3xl font-bold">245</p>
      </div>
    </div>
  </main>
</body>
</html>`;
  } else if (lower.includes("e‑commerce") || lower.includes("product card")) {
    html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Card</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white max-w-sm rounded-2xl shadow-lg p-6">
    <img src="https://via.placeholder.com/300" alt="Product" class="w-full h-48 object-cover rounded-xl mb-4">
    <h2 class="text-2xl font-bold mb-2">Wireless Headphones</h2>
    <p class="text-gray-600 text-sm mb-4">High‑quality sound with active noise cancellation.</p>
    <div class="flex items-center justify-between">
      <span class="text-2xl font-bold text-blue-600">$149</span>
      <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Add to Cart</button>
    </div>
  </div>
</body>
</html>`;
  } else {
    // Default: generic landing page
    html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900">
  <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 text-center">
    <h1 class="text-5xl font-extrabold mb-4">Welcome to Your Site</h1>
    <p class="text-xl opacity-90">This is a place where amazing things can happen.</p>
  </header>
  <section class="py-16 px-4 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">About</h2>
    <p class="text-gray-600 leading-relaxed">This is a fully responsive, clean HTML page built with Tailwind CSS. Swap the content with your own and deploy instantly.</p>
  </section>
  <footer class="text-center py-8 text-gray-400 border-t border-gray-100">
    © ${new Date().getFullYear()}
  </footer>
</body>
</html>`;
  }

  return html.trim();
}