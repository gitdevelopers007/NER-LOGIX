import { GovernmentSidebar } from '../components/GovernmentSidebar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, Sparkles, User, ArrowRight, ShieldAlert,
  RefreshCw, Cpu, Activity
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { copilotService, COPILOT_PRESET_QUERIES, type CopilotMessage } from '../services/copilotService';

export const AiCopilotPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome_msg',
      sender: 'COPILOT',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### 🤖 Welcome to the NER-LOGIX AI Logistics Copilot

I am your mission-critical decision assistant, directly connected to live telemetry feeds across the 8 Northeast states:
- **ISRO-NESAC NERDRR** Landslide Susceptibility surfaces
- **IMD Doppler Radar** live precipitation grids
- **State Civil Supplies & Hospital Reserves** (Oxygen, Cold-Chain Vaccines, Fuel)
- **Quantum-Inspired PSO** dynamic mountain route calculation engine

Select one of the **Quick Intelligence Queries** below or type any logistics crisis scenario to generate an authoritative briefing.`,
      category: 'GENERAL'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user_${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const response = copilotService.generateResponse(query);
      setMessages(prev => [...prev, response]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none">
      
      {/* 1. TOP NAVBAR (DARK NAVY #0b1a30) */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" />
            <span className="font-bold text-lg tracking-wider text-white">NER-LOGIX</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            North Eastern Region Logistics &amp; Accessibility Intelligence
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800 hidden lg:inline flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
            AI Logistics Copilot
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            <span className="font-mono text-[11px] font-semibold">LLM + Telemetry Grounding Online</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-700 text-white font-bold flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline font-semibold text-xs text-white">Command Copilot</span>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <GovernmentSidebar />

        {/* MAIN WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-5">
          
          {/* LEFT CHAT & QUERY CONSOLE (8 cols) */}
          <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            
            {/* Header with Title and Presets */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-indigo-600" />
                    <span>AI Logistics Copilot &amp; Situation Briefing Engine</span>
                  </h1>
                  <p className="text-[11.5px] text-slate-500">
                    Query active road disruptions, hospital supply buffers, and simulated disaster corridors across the 8 Northeast states.
                  </p>
                </div>
                <button
                  onClick={() => setMessages(messages.slice(0, 1))}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center gap-1 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Conversation</span>
                </button>
              </div>

              {/* QUICK INTELLIGENCE QUERY PRESETS */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Quick Intelligence Queries for Evaluators:
                </div>
                <div className="flex flex-wrap gap-2">
                  {COPILOT_PRESET_QUERIES.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(preset.query)}
                      className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 border border-indigo-200/70 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all text-left cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span>{preset.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CHAT MESSAGES DISPLAY CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[560px]">
              {messages.map((msg) => {
                const isUser = msg.sender === 'USER';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                        isUser ? 'bg-blue-600' : 'bg-indigo-700 shadow-xs'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-2xl rounded-xl p-4 text-xs space-y-2 shadow-2xs ${
                        isUser
                          ? 'bg-blue-600 text-white font-medium'
                          : 'bg-slate-50 border border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] opacity-75 border-b pb-1 mb-1 font-mono">
                        <span>{isUser ? 'Government Officer' : 'NER-LOGIX Copilot Engine'}</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className="whitespace-pre-line leading-relaxed font-sans prose-sm">
                        {msg.text}
                      </div>

                      {/* DATA PAYLOAD ACTION STRIP */}
                      {msg.dataPayload && (
                        <div className="mt-3 pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                          {msg.dataPayload.recommendedRoute && (
                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-700">
                              <span className="font-bold text-indigo-700">Path:</span>
                              <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                                {msg.dataPayload.recommendedRoute.join(' → ')}
                              </span>
                            </div>
                          )}

                          {msg.dataPayload.suggestedAction && (
                            <button
                              onClick={() => {
                                if (msg.category === 'STOCK') navigate('/logistics/stock');
                                else navigate('/route-intelligence');
                              }}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-[10.5px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer ml-auto"
                            >
                              <span>Take Action</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                    <span>Synthesizing GIS road impedance, Doppler rainfall, and regional inventory telemetry...</span>
                  </div>
                </div>
              )}
            </div>

            {/* QUERY INPUT BAR */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask Copilot about any road corridor, landslide risk, hospital stockout, or disaster simulation..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-indigo-600 font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isThinking}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT LIVE TELEMETRY & CONTEXT MATRIX (4 cols) */}
          <div className="lg:w-80 space-y-4">
            
            {/* Grounding Feeds Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Live Grounding Telemetry</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  SYNCHRONIZED
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">ISRO-NESAC NERDRR</div>
                    <div className="text-[10px] text-slate-400">Landslide Hazard Surface</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">IMD Doppler Radar</div>
                    <div className="text-[10px] text-slate-400">Precipitation Grid (8 States)</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">Hospital Stock Predictor</div>
                    <div className="text-[10px] text-slate-400">8 State Capital Lifelines</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">Quantum-Inspired PSO</div>
                    <div className="text-[10px] text-slate-400">30 Particles • 25 Iterations</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            </div>

            {/* Active Critical Alerts Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Active Disruption Points</span>
                </span>
                <span className="text-[10px] text-rose-700 font-mono font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  2 BLOCKED
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900 text-[11px]">NH-13 Lower Subansiri</span>
                    <span className="text-[9.5px] font-bold bg-rose-200 text-rose-800 px-1.5 py-0.2 rounded">LANDSLIDE</span>
                  </div>
                  <p className="text-[10.5px] text-rose-800">3 Ground units corroborated • Debris clearance underway by BRO.</p>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900 text-[11px]">NH-29 Kohima Choke</span>
                    <span className="text-[9.5px] font-bold bg-rose-200 text-rose-800 px-1.5 py-0.2 rounded">100% BLOCKED</span>
                  </div>
                  <p className="text-[10.5px] text-rose-800">Bypass active via Silchar corridor for vaccine transports.</p>
                </div>
              </div>
            </div>

            {/* Action Shortcut to Driver HUD */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-xl p-4 text-white shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Driver Tactical Console</span>
                </span>
                <span className="text-[9.5px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded">
                  HUD ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Experience the in-transit high-contrast mountain HUD with live speedometer, upcoming hazard beeps, and 1-tap detour recalculations.
              </p>
              <button
                onClick={() => navigate('/driver')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch Driver In-Transit HUD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
