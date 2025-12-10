import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Paperclip, MoreVertical, Trash2 } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', content: 'Hello! I\'m CodeREX. How can I help you with your code today?' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const botMsg = { id: Date.now() + 1, type: 'bot', content: data.response };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error:', error);
            const errorMsg = { id: Date.now() + 1, type: 'bot', content: 'Error connecting to backend.' };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col glass rounded-3xl overflow-hidden shadow-xl shadow-pink-500/5">
            {/* Chat Header */}
            <div className="p-5 border-b border-white/40 flex justify-between items-center bg-white/40 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <Bot size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg">CodeREX AI</h2>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            <span className="text-xs text-slate-500 font-medium">Online</span>
                        </div>
                    </div>
                </div>
                <button className="p-2 hover:bg-white/50 rounded-xl text-slate-400 hover:text-pink-600 transition-all duration-300">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.type === 'bot'
                            ? 'bg-white border border-white/50 text-pink-500'
                            : 'bg-gradient-to-br from-pink-500 to-yellow-500 text-white'
                            }`}>
                            {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                        </div>

                        <div className={`max-w-[75%] rounded-2xl p-5 shadow-sm ${msg.type === 'bot'
                            ? 'bg-white/60 border border-white/50 text-slate-700 rounded-tl-none'
                            : 'bg-gradient-to-br from-pink-500 to-yellow-500 text-white rounded-tr-none shadow-lg shadow-pink-500/20'
                            }`}>
                            <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/40 bg-white/40 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center space-x-3">
                    <button
                        type="button"
                        className="p-3 text-slate-400 hover:text-pink-600 hover:bg-white/50 rounded-xl transition-all duration-300"
                    >
                        <Paperclip size={22} />
                    </button>

                    <div className="flex-1 relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-300 blur-sm"></div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about your code..."
                            className="relative w-full bg-white border border-white/50 text-slate-800 placeholder-slate-400 rounded-xl py-4 px-5 focus:outline-none focus:ring-0 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300"
                    >
                        <Send size={20} />
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">AI can make mistakes. Please verify generated code.</p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
