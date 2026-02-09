
import React, { useState, useRef, useEffect } from 'react';
import { AttachedFile, Message } from '../types';
import { generateResponse } from '../services/geminiService';
import { marked } from 'marked';

const Workspace: React.FC = () => {
  const [file, setFile] = useState<AttachedFile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    const reader = new FileReader();
    const isImage = selectedFile.type.startsWith('image/');
    const isPDF = selectedFile.type === 'application/pdf';
    const isText = selectedFile.type.includes('text') || selectedFile.name.endsWith('.md') || selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.json');

    if (isImage || isPDF) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setFile({
          name: selectedFile.name,
          type: selectedFile.type,
          data: reader.result as string,
          isBinary: true
        });
        setMessages([{
          role: 'model',
          content: `I've received **${selectedFile.name}**. I'm ready to perform deep analysis. What specific information or insights do you need from this document?`
        }]);
      };
    } else if (isText) {
      reader.readAsText(selectedFile);
      reader.onload = () => {
        setFile({
          name: selectedFile.name,
          type: selectedFile.type,
          data: reader.result as string,
          isBinary: false
        });
        setMessages([{
          role: 'model',
          content: `I have indexed **${selectedFile.name}**. Ask me anything about its contents, and I'll provide a direct answer.`
        }]);
      };
    } else {
      setError("Unsupported file format. Please try a PDF, Image, or Text-based file.");
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await generateResponse(userMessage, messages, file || undefined);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderMarkdown = (content: string) => {
    const rawHtml = marked.parse(content) as string;
    return { __html: rawHtml };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl p-6 transition-colors duration-300">
            <h2 className="text-lg font-black mb-4 flex items-center text-gray-900 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              Attached File
            </h2>
            
            {!file ? (
              <button 
                className="w-full aspect-video border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-300">Add Data</span>
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              </button>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Active File</span>
                  <button onClick={() => setFile(null)} className="text-blue-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-tight">{file.type}</p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Capabilities</h3>
              <ul className="space-y-3">
                {['Deep Logic Analysis', 'Structural Extraction', 'Architectural Insight', 'Content Synthesis'].map((cap, i) => (
                  <li key={i} className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 mr-3"></div>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden transition-colors duration-300">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && !file && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Welcome to ReadAble</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">Upload a document to start a deep architectural reasoning session.</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-3xl p-5 ${
                  m.role === 'user' 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white dark:text-black shadow-lg shadow-blue-200 dark:shadow-none' 
                    : 'bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-zinc-700 shadow-sm'
                }`}>
                  <div 
                    className="text-sm prose-chat"
                    dangerouslySetInnerHTML={renderMarkdown(m.content)}
                  />
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-3xl p-5 border border-gray-100 dark:border-zinc-700 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                  <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 ml-2 uppercase tracking-tighter">Gemini Thinking...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-3xl text-red-700 dark:text-red-400 text-sm flex flex-col space-y-3">
                <div className="flex items-center font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Request Failed
                </div>
                <p className="leading-relaxed">{error}</p>
              </div>
            )}  
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-black/50 transition-colors duration-300">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={file ? "Ask a specific question about the file..." : "Add a file to begin reasoning..."}
                disabled={loading || !file}
                className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-gray-900 dark:text-white shadow-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || !file}
                className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-blue-600 dark:hover:bg-blue-400 transition-all shadow-md disabled:opacity-50 disabled:bg-gray-400 dark:disabled:bg-zinc-800 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 text-center uppercase tracking-widest font-bold">
              Powered by Gemini 3 Pro Reasoning Engine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
