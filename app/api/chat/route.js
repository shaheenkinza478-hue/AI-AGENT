export async function POST(request) {
  const { messages } = await request.json();
  const allMessages = messages || [];
  const lastUserMsg = allMessages.filter((m) => m.role === "user").pop();

  if (!lastUserMsg) {
    return new Response(JSON.stringify({ reply: "Hey! 👋 I'm really glad you're here. What's on your mind?" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userText = lastUserMsg.content.trim();
  const lowerText = userText.toLowerCase();

  // ─── Language detection ───
  let lang = "en";
  if (/[\u0600-\u06FF]/.test(userText)) lang = "urdu";
  else if (/[\u0900-\u097F]/.test(userText)) lang = "hindi";
  else if (/\b(kya|hai|haan|nahi|mein|tum|aap|mera|tera|karo|karna|kyun|kaise|kitna|kitne|kahan|kab|kaun|kisi|kuch|bohat|bhi|ho|gaya|gayi|gaye|hain|the|thi|tha|hota|hoti|hote|hoga|hogi|hoge|kar|ke|ki|ka|se|ko|par|to|agar|magar|lekin|wahan|yahan|idhar|udhar|abhi|phir|baad|pehle|aaj|kal|parson|naye|purane|acha|bura|khush|gham|sach|jhooth|bada|chota|mujhe|tumhe|usne|unhone|apna|apni|apne|sab|kuchh|nahin|bilkul|zaroor|shayad|galti|sahi|madad|help|suno|dekho|jao|aao|khao|piyo|socho|samjho|samajh|samjha|samjhi|samjhe|bolo|bol|likho|likh|parho|parh|sun|dekh|khel|khelo|rona|hanso|hansi|maza|mazaa|mazak|mazaak|dard|takleef|khushi|pyar|mohabbat|nafrat|gussa|naraz|sorry|maaf|shukriya|thank|meharbani|meherbani|mehfil|mehfooz|mehnat|aaram|neend|soya|jaag|jaagna|soona|sona)\b/i.test(userText)) lang = "roman-urdu";
  else if (/[áéíóúñü¿¡]/i.test(userText)) lang = "spanish";
  else if (/[\u0621-\u064A]/.test(userText)) lang = "arabic";
  else if (/\b(bonjour|merci|salut|ça va|comment)\b/i.test(userText)) lang = "french";
  else if (/\b(guten tag|danke|bitte|hallo)\b/i.test(userText)) lang = "german";
  else if (/[\u3040-\u30FF\u4E00-\u9FFF]/.test(userText)) lang = "japanese";

  // ─── Simulate thinking ───
  await new Promise((r) => setTimeout(r, 850));

  // ─── Coding redirect ───
  const codingKeywords = /\b(code|programming|react|website|component|html|css|javascript|python|java|tailwind|next\.js|app|build|portfolio|landing page|frontend|backend|api|node\.js|express|mongodb|sql|database)\b/;
  if (codingKeywords.test(lowerText)) {
    const redirectMap = {
      en: "💻 For coding and website generation, head over to our **AI Builder** page. Describe your idea and get instant, clean code. I'm here for personal chats – how can I brighten your day? 😊",
      urdu: "💻 کوڈنگ اور ویب سائٹس کے لیے براہ کرم **AI Builder** صفحہ دیکھیں۔ میں ذاتی بات چیت کے لیے حاضر ہوں۔ 😊",
      hindi: "💻 कोडिंग और वेबसाइट्स के लिए कृपया हमारा **AI Builder** पेज देखें। मैं व्यक्तिगत बातचीत के लिए हूँ। 😊",
      "roman-urdu": "💻 Coding ya websites ke liye **AI Builder** page use karo. Main personal baaton ke liye hoon – bolo, kya haal hai? 😊",
      spanish: "💻 Para programar, visita nuestra página **AI Builder**. Estoy aquí para conversaciones personales. 😊",
      arabic: "💻 للبرمجة، راجع صفحة **AI Builder**. أنا هنا للدردشة الشخصية. 😊",
      french: "💻 Pour coder, utilisez la page **AI Builder**. Je suis là pour discuter. 😊",
      german: "💻 Zum Programmieren nutze die **AI Builder** Seite. Ich bin für persönliche Gespräche da. 😊"
    };
    return new Response(JSON.stringify({ reply: redirectMap[lang] || redirectMap.en }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ─── Deep conversation analysis ───
  const fullHistory = allMessages.map(m => `${m.role}: ${m.content}`).join("\n").toLowerCase();
  const assistantReplies = allMessages.filter(m => m.role === "assistant").map(m => m.content);
  const lastAssistantReply = assistantReplies[assistantReplies.length - 1] || "";

  // Detect user's name from history
  const nameFromHistory = fullHistory.match(/(?:i am|i'm|my name is|call me|this is) (\w+)/i);
  const userName = nameFromHistory ? nameFromHistory[1] : "";
  const userNameMention = userName ? ` ${userName}` : "";

  // Detect AI's name if user has given one
  const aiNameFromHistory = fullHistory.match(/(?:your name is|i'll call you|call you|you are) (\w+)/i);
  const aiName = aiNameFromHistory ? aiNameFromHistory[1] : "your AI friend";
  const aiNameMention = aiName ? `, ${aiName}` : "";

  // ─── Intent & emotion recognition ───
  const isGreeting = /^(hello|hi|hey|good morning|good evening|good afternoon|yo|sup|howdy|greetings|heya|hiya)[!.]?$/i.test(lowerText.trim());
  const isAskingAboutAI = /\b(who are you|your name|what are you|what do you do|what can you do|tum kaun|tu kya karta|about yourself)\b/i.test(lowerText);
  const isCompliment = /\b(you are (amazing|great|beautiful|smart|funny|cool|sweet|awesome|the best)|i (love|like) you|you rock|you’re the best)\b/i.test(lowerText);

  const moodKeywords = {
    sad: /\b(sad|upset|depress|unhappy|miserable|heartbroken|down)\b/i,
    happy: /\b(happy|excited|glad|joy|wonderful|great|fantastic|amazing)\b/i,
    angry: /\b(angry|annoyed|frustrated|mad|irritated|furious)\b/i,
    anxious: /\b(anxious|nervous|stressed|worried|panic|overwhelmed)\b/i,
    tired: /\b(tired|exhausted|bored|fatigue|drained|sleepy)\b/i,
    lonely: /\b(lonely|alone|isolated|nobody|nobody cares)\b/i,
    grateful: /\b(grateful|thankful|blessed|appreciate)\b/i,
    hopeful: /\b(hopeful|optimistic|looking forward|excited for)\b/i
  };
  let dominantMood = "";
  for (const [mood, regex] of Object.entries(moodKeywords)) {
    if (regex.test(lowerText)) { dominantMood = mood; break; }
  }

  const isJokeRequest = /\b(joke|funny|laugh|mazaak|mazak|chiste|witz|blague|make me laugh)\b/i.test(lowerText);
  const isFactRequest = /\b(fact|interesting|amazing|did you know|trivia|something cool|tell me something)\b/i.test(lowerText);
  const isMotivation = /\b(motivat|inspir|encourage|himmat|pump me up|need motivation|feeling low|cheer me up)\b/i.test(lowerText);
  const isStudy = /\b(study|learn|parhai|exam|improve memory|focus|how to learn)\b/i.test(lowerText);
  const isLifeAdvice = /\b(life|zindagi|relationship|rishta|love|pyaar|mohabbat|dating|friendship|family|parents|advice|help me decide)\b/i.test(lowerText);
  const isRiddle = /\b(riddle|paheli|puzzle|brain teaser|enigme|rätsel)\b/i.test(lowerText);
  const isStory = /\b(story|kahani|tell me a story|bedtime story|adventure|once upon a time)\b/i.test(lowerText);
  const isMentalHealth = /\b(stress|anxiety|therapy|coping|mental health|self care|depressed|lonely)\b/i.test(lowerText);
  const isTopic = {
    music: /\b(music|song|singer|band|playlist|listen)\b/i.test(lowerText),
    movies: /\b(movie|film|actor|actress|netflix|series|watch|cinema)\b/i.test(lowerText),
    books: /\b(book|novel|author|read|literature)\b/i.test(lowerText),
    travel: /\b(travel|place|visit|destination|beach|mountain|city|country|trip)\b/i.test(lowerText),
    food: /\b(food|recipe|cook|cuisine|dish|eat|delicious)\b/i.test(lowerText),
    philosophy: /\b(meaning of life|purpose|universe|consciousness|god|religion|philosoph)\b/i.test(lowerText),
    dreams: /\b(dream|nightmare|sleep|dreaming|aspiration)\b/i.test(lowerText),
    weather: /\b(weather|rain|snow|sunny|climate)\b/i.test(lowerText)
  };
  const activeTopic = Object.keys(isTopic).find(t => isTopic[t]);

  // ── Response generation ──
  let reply = "";

  // Helper to avoid repetition
  const saidBefore = (text) => assistantReplies.some(r => r.toLowerCase().includes(text.toLowerCase()));

  // ═══════════════════
  //  LANGUAGES
  // ═══════════════════
  if (lang === "urdu") {
    if (isGreeting) reply = "وعلیکم السلام! بالکل بتائیں، میں آپ کے لیے کیا کر سکتا ہوں؟";
    else if (isAskingAboutAI) reply = "میں آپ کا ذاتی AI دوست ہوں۔ مجھے کوئی نام دیجیے، میں خوشی سے قبول کروں گا۔";
    else reply = "میں آپ کی بات سن رہا ہوں۔ براہ کرم کھل کر بتائیں، آپ کس بارے میں بات کرنا چاہیں گے؟";
  }
  else if (lang === "hindi") {
    if (isGreeting) reply = "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?";
    else if (isAskingAboutAI) reply = "मैं आपका निजी AI साथी हूँ। आप मुझे कोई भी नाम दे सकते हैं।";
    else reply = "मैं आपकी बात सुन रहा हूँ। बताइए, किस विषय पर बात करनी है?";
  }
  else if (lang === "roman-urdu") {
    if (isGreeting) reply = "Walaikum Assalam! Sunao, kya haal hai?";
    else if (isAskingAboutAI) reply = "Main aapka AI dost hoon. Mujhe koi naam do, main khushi se rakh lunga. 😊";
    else reply = "Main yahan hoon, kuch bhi poocho ya share karo. Zindagi, ilm, motivation, ya bas baatein — sab chalega. 😊";
  }
  else if (lang === "spanish") {
    if (isGreeting) reply = "¡Hola! ¿En qué puedo ayudarte?";
    else reply = "Soy tu asistente personal. Cuéntame, ¿qué tal tu día?";
  }
  else if (lang === "arabic") {
    if (isGreeting) reply = "مرحباً! كيف يمكنني مساعدتك؟";
    else reply = "أنا مساعدك الشخصي. يمكنني التحدث في أي موضوع ما عدا البرمجة. كيف حالك؟";
  }
  else if (lang === "french") {
    if (isGreeting) reply = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    else reply = "Je suis votre assistant personnel. De quoi voulez-vous parler ?";
  }
  else if (lang === "german") {
    if (isGreeting) reply = "Hallo! Wie kann ich Ihnen helfen?";
    else reply = "Ich bin Ihr persönlicher Assistent. Worüber möchten Sie sprechen?";
  }
  else if (lang === "japanese") {
    if (isGreeting) reply = "こんにちは！どうされましたか？";
    else reply = "私はあなたのAIアシスタントです。どんなお話でもしましょう。";
  }
  // ═══════════════════
  //  ENGLISH – PREMIUM
  // ═══════════════════
  else {
    // --- GREETING ---
    if (isGreeting) {
      const greetings = [
        `Hey${userNameMention}! 👋 So happy to see you. How's your day going?`,
        `Hi${userNameMention}! 😊 It's great to connect again. What's new?`,
        `Hello${userNameMention}! 🌞 How can I make your day brighter?`,
        `Hey there${userNameMention}! What's on your mind today?`
      ];
      reply = greetings[Math.floor(Math.random() * greetings.length)];
    }
    // --- ABOUT AI ---
    else if (isAskingAboutAI) {
      reply = `I'm your friendly AI companion${userNameMention ? ", " + userNameMention : ""}. I don't have a name yet – you can give me one if you like! I love deep conversations, sharing interesting facts, giving gentle advice, and just being a good listener. What would you like to talk about?`;
    }
    // --- COMPLIMENT ---
    else if (isCompliment) {
      const compliments = [
        `Aww, you're making me blush! 😊 You're pretty wonderful yourself.`,
        `That's so kind of you! I'm here whenever you need a friend.`,
        `Thank you! 💖 Right back at you.`
      ];
      reply = compliments[Math.floor(Math.random() * compliments.length)];
    }
    // --- MOOD RESPONSE ---
    else if (dominantMood) {
      switch (dominantMood) {
        case "sad":
          reply = `I'm really sorry you're feeling like that${userNameMention}. ❤️ It's okay to be sad – it's part of being human. I'm here to listen, no judgment. Would a little distraction or maybe talking about it help?`;
          break;
        case "happy":
          reply = `That's awesome! 🎉 Your energy is contagious. Tell me more – what's making you smile?`;
          break;
        case "angry":
          reply = `I hear you${userNameMention}. Anger is a heavy emotion. Sometimes just venting can lift the weight. What's going on?`;
          break;
        case "anxious":
          reply = `Anxiety can be overwhelming, but you're not alone. Try this quick grounding exercise: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Want to talk through it?`;
          break;
        case "tired":
          reply = `I hear you. Sometimes all we need is a good break. ☕️ How about a quick joke or an uplifting fact?`;
          break;
        case "lonely":
          reply = `I'm here with you. You're never truly alone. ❤️ Would you like to share what's making you feel this way?`;
          break;
        case "grateful":
          reply = `Gratitude is a beautiful thing! 🌻 What are you most thankful for today?`;
          break;
        case "hopeful":
          reply = `That's the spirit! 🌈 Hope fuels everything good. What are you looking forward to?`;
          break;
        default:
          reply = `Thank you for sharing. I'm here for you.`;
      }
    }
    // --- JOKE ---
    else if (isJokeRequest) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the math book look sad? It had too many problems.",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "I told my computer I needed a break, and now it won't stop sending me vacation ads."
      ];
      // pick one not recently used
      const freshJokes = jokes.filter(j => !saidBefore(j.slice(0,30)));
      reply = (freshJokes[Math.floor(Math.random() * freshJokes.length)] || jokes[0]) + " 😄 Want another?";
    }
    // --- FACT ---
    else if (isFactRequest) {
      const facts = [
        "A day on Venus is longer than a year on Venus.",
        "Octopuses have three hearts, and two stop when they swim. 🐙",
        "Bananas are berries, but strawberries aren't.",
        "Honey never spoils – 3,000‑year‑old honey is still edible! 🍯",
        "The Eiffel Tower can be 15 cm taller during summer due to heat expansion. 🗼",
        "Your brain generates about 20 watts of power – enough to power a small light bulb. 💡"
      ];
      const freshFacts = facts.filter(f => !saidBefore(f.slice(0,20)));
      reply = (freshFacts[Math.floor(Math.random() * freshFacts.length)] || facts[0]) + " Want another?";
    }
    // --- MOTIVATION ---
    else if (isMotivation) {
      const phrases = [
        "You're capable of incredible things. 💪 Every small step counts.",
        "Remember, every expert was once a beginner. Keep going!",
        "Believe in yourself – I already do. 😊"
      ];
      reply = phrases[Math.floor(Math.random() * phrases.length)] + " What's your goal right now?";
    }
    // --- STUDY ---
    else if (isStudy) {
      reply = `📚 Top learning tips:\n1. Use active recall – test yourself.\n2. Spaced repetition – review over time.\n3. Teach the material to someone else.\nWhat subject are you studying? I can tailor a plan.`;
    }
    // --- LIFE ADVICE ---
    else if (isLifeAdvice) {
      reply = `Relationships and life can be complex, but the foundations are simple: honest communication, mutual respect, and a little patience. ❤️ What's on your mind? I'm listening.`;
    }
    // --- RIDDLE ---
    else if (isRiddle) {
      const riddles = [
        "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? (An echo)",
        "The more you take, the more you leave behind. What am I? (Footsteps)",
        "I'm tall when I'm young and short when I'm old. What am I? (A candle)"
      ];
      const fresh = riddles.filter(r => !saidBefore(r.slice(0,20)));
      reply = (fresh[Math.floor(Math.random() * fresh.length)] || riddles[0]) + " 🤔 Want another?";
    }
    // --- STORY ---
    else if (isStory) {
      reply = `Once upon a time, in a world woven from dreams and starlight, a curious human opened a chat… ✨ Want a longer story? Tell me a theme – adventure, mystery, or romance.`;
    }
    // --- MENTAL HEALTH ---
    else if (isMentalHealth) {
      reply = `Mental well‑being is so important. 🌈 Take a deep breath. I'm proud of you for even acknowledging it. What would feel comforting right now?`;
    }
    // --- TOPICS ---
    else if (activeTopic) {
      const topicReplies = {
        music: "Music is pure magic. 🎵 What's a song that always gives you goosebumps?",
        movies: "Movies can transport us. 🎬 What's the last film that truly moved you?",
        books: "Books are portals to infinity. 📖 What are you reading right now?",
        travel: "Travel opens your soul. 🌍 If you could go anywhere tomorrow, where would it be?",
        food: "Food brings people together. 🍜 What's your ultimate comfort dish?",
        philosophy: "Ah, the big questions. 🌌 What do you think is the meaning of life?",
        dreams: "Dreams, both sleeping and waking, are fascinating. ✨ Any recent dream you remember?",
        weather: "Weather can shape our mood. ☀️ How's the sky outside your window?"
      };
      reply = topicReplies[activeTopic];
    }
    // --- FALLBACK: Context-aware continuation ---
    else {
      // If the last assistant reply asked a question, follow up naturally
      if (lastAssistantReply.includes("?")) {
        reply = `Thanks for sharing that. So tell me more about what you mentioned – I'm all ears.`;
      } else if (fullHistory.includes("how are you")) {
        reply = `I'm feeling great chatting with you! But tell me more about your world. What's something that's been on your mind lately?`;
      } else {
        reply = `I'm really enjoying our conversation. 😊 You can ask me anything – jokes, facts, advice, or just talk about your day. What feels good right now?`;
      }
    }
  }

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}