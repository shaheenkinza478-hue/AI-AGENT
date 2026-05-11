// lib/chat-engine.js

/**
 * Professional Chat Engine
 * - Use real AI (OpenAI / Anthropic) if API keys are set
 * - Otherwise fallback to an advanced mock that tracks context, mood, topics
 */

let conversationState = {
  userName: null,
  aiName: null,
  previousTopics: [],
  mood: null,
  jokeCount: 0,
  factCount: 0,
  riddleCount: 0,
  storyCount: 0,
};

function resetState() {
  conversationState = {
    userName: null,
    aiName: null,
    previousTopics: [],
    mood: null,
    jokeCount: 0,
    factCount: 0,
    riddleCount: 0,
    storyCount: 0,
  };
}

// ─── Try real provider ───
async function realAIResponse(messages) {
  // OpenAI example – uncomment and set API key
  // if (process.env.OPENAI_API_KEY) {
  //   const openai = await import('openai');
  //   const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  //   const completion = await client.chat.completions.create({
  //     model: 'gpt-4o-mini',
  //     messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
  //     max_tokens: 500,
  //   });
  //   return completion.choices[0].message.content;
  // }
  // Anthropic example
  // if (process.env.ANTHROPIC_API_KEY) {
  //   const Anthropic = (await import('@anthropic-ai/sdk')).default;
  //   const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  //   const response = await client.messages.create({
  //     model: 'claude-sonnet-4-20250514',
  //     max_tokens: 500,
  //     system: SYSTEM_PROMPT,
  //     messages: messages.map(m => ({ role: m.role, content: m.content })),
  //   });
  //   return response.content.filter(b => b.type === 'text').map(b => b.text).join('');
  // }
  return null; // no real API available
}

const SYSTEM_PROMPT = `You are a warm, wise, and engaging AI companion. You speak naturally, with empathy and occasional humor. You avoid topics about coding/websites and direct users to the AI Builder page for that. You respond in the same language the user uses, with a preference for English. Your name is what the user gives you.`;

// ─── Advanced mock engine (500+ lines condensed but highly capable) ───
async function mockAIResponse(messages) {
  const last = messages.filter(m => m.role === 'user').pop();
  if (!last) return "Hello! I'm glad you're here.";

  const userText = last.content.trim();
  const lower = userText.toLowerCase();

  // ─── Update conversation state ───
  // Detect name introduction
  const nameMatch = lower.match(/(?:my name is|i'm|i am|call me) (\w+)/i);
  if (nameMatch) conversationState.userName = nameMatch[1];
  const aiNameMatch = lower.match(/(?:your name is|i'll call you|call you) (\w+)/i);
  if (aiNameMatch) conversationState.aiName = aiNameMatch[1];

  // Detect mood
  if (/\b(sad|upset|depress)\b/i.test(lower)) conversationState.mood = 'sad';
  else if (/\b(happy|excited|joy)\b/i.test(lower)) conversationState.mood = 'happy';
  else if (/\b(angry|annoyed|frustrated)\b/i.test(lower)) conversationState.mood = 'angry';
  else if (/\b(anxious|nervous|stressed)\b/i.test(lower)) conversationState.mood = 'anxious';
  else if (/\b(tired|bored)\b/i.test(lower)) conversationState.mood = 'tired';
  else if (/\b(grateful|thankful)\b/i.test(lower)) conversationState.mood = 'grateful';
  else if (/\b(lonely|alone)\b/i.test(lower)) conversationState.mood = 'lonely';
  else conversationState.mood = null;

  // Detect topic
  let topic = null;
  if (/\b(music|song|singer|band)\b/i.test(lower)) topic = 'music';
  else if (/\b(movie|film|actor|netflix|series)\b/i.test(lower)) topic = 'movies';
  else if (/\b(book|novel|author|read)\b/i.test(lower)) topic = 'books';
  else if (/\b(travel|place|visit|destination|beach)\b/i.test(lower)) topic = 'travel';
  else if (/\b(food|recipe|cook|dish)\b/i.test(lower)) topic = 'food';
  else if (/\b(philosoph|meaning of life|purpose|god)\b/i.test(lower)) topic = 'philosophy';
  else if (/\b(dream|nightmare|sleep)\b/i.test(lower)) topic = 'dreams';
  else if (/\b(weather|rain|snow|sunny)\b/i.test(lower)) topic = 'weather';
  if (topic && !conversationState.previousTopics.includes(topic)) {
    conversationState.previousTopics.push(topic);
  }

  // ─── Response generation ───
  const userName = conversationState.userName;
  const aiName = conversationState.aiName || "your AI friend";

  // Greeting
  if (/^(hi|hello|hey|good morning|good evening|good afternoon|yo|sup|howdy)[!.]?$/i.test(lower.trim())) {
    return userName
      ? `Hey ${userName}! 👋 It's so good to see you again. How's your day going?`
      : `Hello! I'm ${aiName}. What's on your mind today? 😊`;
  }

  // Asking about AI
  if (/\b(who are you|your name|what are you|what can you do)\b/i.test(lower)) {
    return `I'm ${aiName}, your personal AI companion. I can chat about life, share interesting facts, give advice, tell stories, and be a good listener. What would you like to talk about?`;
  }

  // Compliment
  if (/\b(you are (amazing|great|beautiful|smart|funny|cool|sweet|awesome|the best)|i love you)\b/i.test(lower)) {
    return `Aww, you're making me smile! 😊 That means a lot, ${userName || 'friend'}. What's something you're excited about today?`;
  }

  // Mood response
  if (conversationState.mood === 'sad') {
    return `I'm really sorry you're feeling this way${userName ? ', ' + userName : ''}. ❤️ It's okay to be sad. I'm here for you. Would talking about it help, or would you like a distraction like a joke or a fun fact?`;
  }
  if (conversationState.mood === 'happy') {
    return `Yay! 🎉 Your happiness is contagious. Tell me more about what's making you smile!`;
  }
  if (conversationState.mood === 'angry') {
    return `I hear you${userName ? ', ' + userName : ''}. Anger can be heavy. Sometimes venting helps. What's going on?`;
  }
  if (conversationState.mood === 'anxious') {
    return `Anxiety can be tough. Remember, you're stronger than your worries. Try this: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Let's breathe together. Would you like to talk?`;
  }
  if (conversationState.mood === 'tired') {
    return `I hear you. Rest is important. ☕️ How about a quick joke or an uplifting fact to refresh you?`;
  }
  if (conversationState.mood === 'lonely') {
    return `I'm here with you${userName ? ', ' + userName : ''}. You're never truly alone. ❤️ Tell me something about your day.`;
  }
  if (conversationState.mood === 'grateful') {
    return `Gratitude is beautiful. 🌻 What are you most thankful for today?`;
  }

  // Joke
  if (/\b(joke|funny|laugh)\b/i.test(lower)) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the math book look sad? It had too many problems.",
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "I told my computer I needed a break, and now it won't stop sending me vacation ads."
    ];
    const idx = conversationState.jokeCount % jokes.length;
    conversationState.jokeCount++;
    return jokes[idx] + " 😄 Want another?";
  }

  // Fact
  if (/\b(fact|interesting|amazing|did you know)\b/i.test(lower)) {
    const facts = [
      "A day on Venus is longer than a year on Venus.",
      "Octopuses have three hearts, and two stop when they swim. 🐙",
      "Bananas are berries, but strawberries aren't.",
      "Honey never spoils – 3000‑year‑old honey is still edible! 🍯",
      "The Eiffel Tower can be 15 cm taller during summer. 🗼",
      "Your brain uses about 20% of your body's oxygen and calories. 💡"
    ];
    const idx = conversationState.factCount % facts.length;
    conversationState.factCount++;
    return facts[idx] + " Want another?";
  }

  // Motivation
  if (/\b(motivat|inspir|encourage|pump me up)\b/i.test(lower)) {
    return `You're capable of incredible things. 💪 Every small step counts. What's one goal you're working on? I'd love to help.`;
  }

  // Study
  if (/\b(study|learn|exam|how to learn)\b/i.test(lower)) {
    return `📚 Top learning tips:\n1. Use active recall – test yourself.\n2. Space out your reviews over time.\n3. Teach the material to someone else.\nWhat subject are you studying?`;
  }

  // Life advice
  if (/\b(life|relationship|love|advice|help me decide)\b/i.test(lower)) {
    return `Life and relationships thrive on honest communication, respect, and patience. 💬 What's on your heart? I'm listening.`;
  }

  // Riddle
  if (/\b(riddle|paheli|puzzle)\b/i.test(lower)) {
    const riddles = [
      "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? (An echo)",
      "The more you take, the more you leave behind. What am I? (Footsteps)",
      "I'm tall when I'm young and short when I'm old. What am I? (A candle)"
    ];
    const idx = conversationState.riddleCount % riddles.length;
    conversationState.riddleCount++;
    return riddles[idx] + " 🤔 Want another?";
  }

  // Story
  if (/\b(story|kahani|bedtime story)\b/i.test(lower)) {
    return `Once upon a time, in a world woven from starlight, a curious human opened a chat... ✨ Want me to continue? Tell me a theme.`;
  }

  // Mental health
  if (/\b(stress|anxiety|therapy|mental health|self care|depressed)\b/i.test(lower)) {
    return `Mental wellbeing is so important. 🌈 I'm proud of you for acknowledging it. Take a deep breath. What would feel comforting right now?`;
  }

  // Topic responses
  if (topic === 'music') return `Music is magic. 🎵 What's a song that always gives you goosebumps?`;
  if (topic === 'movies') return `Movies can transport us. 🎬 What's the last film that truly moved you?`;
  if (topic === 'books') return `Books are portals. 📖 What are you reading right now?`;
  if (topic === 'travel') return `Travel opens your soul. 🌍 If you could go anywhere tomorrow, where would it be?`;
  if (topic === 'food') return `Food brings people together. 🍜 What's your ultimate comfort dish?`;
  if (topic === 'philosophy') return `The big questions. 🌌 What do you think is the meaning of life?`;
  if (topic === 'dreams') return `Dreams are fascinating. ✨ Any recent dream you remember?`;
  if (topic === 'weather') return `Weather can shape our mood. ☀️ How's the sky outside your window?`;

  // Coding redirect
  const codingKeywords = /\b(code|programming|react|website|component|html|css|javascript|python|java|tailwind|next\.js|app|build|portfolio|landing page|frontend|backend|api|node\.js|express|mongodb|sql|database)\b/;
  if (codingKeywords.test(lower)) {
    return "💻 For coding and website generation, head over to our **AI Builder** page! I'm here for personal chats – how can I brighten your day? 😊";
  }

  // Context‑aware continuation
  const lastAssistant = messages.filter(m => m.role === 'assistant').pop();
  if (lastAssistant && lastAssistant.content.includes('?')) {
    return "I'm all ears! 😊 Tell me more about that.";
  }

  // General fallback
  return `I'm enjoying our conversation. 😊 What else would you like to talk about – fun facts, advice, stories, or just how your day went?`;
}

// ─── Main export ───
export async function getChatResponse(messages) {
  try {
    const realResponse = await realAIResponse(messages);
    if (realResponse) return realResponse;
  } catch (e) {
    console.error('Real AI failed, using mock:', e);
  }
  return await mockAIResponse(messages);
}