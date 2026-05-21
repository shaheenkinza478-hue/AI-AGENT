"use client";
import { useState, useRef, useEffect } from "react";
import ChatFeaturesSection from "@/components/chat/ChatFeaturesSection";
import ChatExampleSection from "@/components/chat/ChatExampleSection";
import ChatFAQSection from "@/components/chat/ChatFAQSection";
import ChatStatsSection from "@/components/chat/ChatStatsSection";

// Quick prompts – friendly, non‑coding topics
const quickPromptsList = [
  "Tell me a joke",
  "How are you?",
  "Give me study tips",
  "Motivate me",
  "What's your name?",
  "Tell me a fun fact",
];

/* ── Animated typing bubbles (bouncing dots) ── */
function TypingDots() {
  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-sm w-fit">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (content) => {
    if (!content?.trim()) return;
    const userMsg = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      const aiMsg = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Heading */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Chat with AI,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Your friendly personal assistant. Ask me anything – no coding, just conversation.
        </p>
      </section>

      {/* Quick Prompts */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickPromptsList.map((p, i) => (
            <button
              key={i}
              onClick={() => sendMessage(p)}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm text-sm font-medium text-gray-700"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Chat Box */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
            <div className="relative bg-white rounded-2xl border border-gray-200 flex flex-col" style={{ height: "450px" }}>
              {/* Messages with custom scrollbar */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll"
              >
                {messages.length === 0 && !loading && (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400">Start a conversation below!..</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <MessageBubble key={i} role={msg.role} content={msg.content} />
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <TypingDots />
                  </div>
                )}
              </div>
              {/* Input */}
              <InputBox onSend={sendMessage} disabled={loading} inputRef={inputRef} />
            </div>
          </div>
        </div>
      </section>

      {/* Other sections unchanged */}
      <ChatFeaturesSection />
      <ChatExampleSection />
      <ChatFAQSection />
      <ChatStatsSection />
    </div>
  );
}

/* ── Internal Components ── */
function renderMarkdown(text) {
  // Convert **bold**, *italic*, and newlines to JSX
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part === "\n") {
      return <br key={i} />;
    }
    return part;
  });
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
            : "bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200"
        }`}
      >
        {isUser ? content : renderMarkdown(content)}
      </div>
    </div>
  );
}

function InputBox({ onSend, disabled, inputRef }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
    inputRef?.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex gap-3">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 transition-all shadow-md"
      >
        Send
      </button>
    </form>
  );
}