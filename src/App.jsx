
import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Terminal, User, DollarSign, Utensils, Wifi } from 'lucide-react';

/**
 * 聚餐數據採集終端 - 整合版
 * 處理了所有的表單邏輯、動畫與狀態轉換
 */
export default function App() {
  const [step, setStep] = useState('form'); // 'form', 'uploading', 'success'
  const [userName, setUserName] = useState('');
  const [progress, setProgress] = useState(0);

  // 模擬進度條
  useEffect(() => {
    if (step === 'uploading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('success'), 500);
            return 100;
          }
          return prev + 5;
        }, 50);
      });
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) setStep('uploading');
  };

  const conflictCategories = [
    { label: '麻辣/火鍋', value: 'hotpot' },
    { label: '精緻涮涮鍋', value: 'shabu' },
    { label: '日式燒肉', value: 'jp_bbq' },
    { label: '韓式料理/燒肉', value: 'kr_bbq' },
    { label: '飯店百匯吃到飽', value: 'buffet' },
    { label: '居酒屋/串燒', value: 'izakaya' },
    { label: '非素食不吃', value: 'vegan', color: 'text-emerald-400' },
    { label: '生食海鮮拒絕', value: 'no_raw', color: 'text-red-400' },
    { label: '不吃牛', value: 'no_beef', color: 'text-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-2xl bg-[#161b22]/90 backdrop-blur-xl border border-[#30363d] border-t-4 border-t-cyan-400 rounded-xl shadow-2xl">
        
        {/* 狀態列 */}
        <div className="bg-black/40 px-4 py-2 flex justify-between items-center border-b border-[#30363d]">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[10px] font-mono text-cyan-500/50 flex items-center gap-2">
            <Wifi size={10} /> {step === 'success' ? 'SYSTEM_READY' : 'ENCRYPTED_LINK_ACTIVE'}
          </div>
        </div>

        <div className="p-8">
          {step === 'form' && (
            <div className="animate-in fade-in duration-700">
              <header className="text-center mb-10">
                <Terminal size={32} className="text-cyan-400 mx-auto mb-4 animate-pulse" />
                <h1 className="text-3xl font-black text-white tracking-widest uppercase">聚餐數據採集終端</h1>
                <p className="text-cyan-600 text-[10px] font-mono mt-2">SECURE PROTOCOL V5.0</p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                <section>
                  <label className="text-xs font-bold text-cyan-400 mb-4 block uppercase tracking-widest">Phase 00: 身份識別</label>
                  <input 
                    type="text" required value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="輸入代號..."
                    className="w-full bg-black/50 border-2 border-[#30363d] p-4 rounded-lg focus:border-cyan-400 outline-none text-white"
                  />
                </section>

                <section>
                  <label className="text-xs font-bold text-cyan-400 mb-4 block uppercase tracking-widest">Phase 01: 預算分析</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['$300-', '$600', '$1000', '無上限'].map((p) => (
                      <label key={p} className="cursor-pointer">
                        <input type="radio" name="budget" className="sr-only peer" defaultChecked={p === '$600'} />
                        <div className="p-3 bg-[#30363d]/30 border-2 border-[#30363d] rounded text-center text-sm font-bold peer-checked:border-cyan-400 peer-checked:text-cyan-400 transition-all">
                          {p}
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <section>
                  <label className="text-xs font-bold text-cyan-400 mb-4 block uppercase tracking-widest">Phase 02: 衝突過濾清單</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {conflictCategories.map((cat) => (
                      <label key={cat.value} className="cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className={`p-3 h-full flex items-center justify-center bg-[#30363d]/30 border-2 border-[#30363d] rounded text-center text-xs font-bold peer-checked:border-red-500 peer-checked:text-red-400 transition-all ${cat.color}`}>
                          {cat.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <button type="submit" className="w-full py-4 border-2 border-cyan-400 text-cyan-400 font-black rounded hover:bg-cyan-400 hover:text-black transition-all tracking-[0.3em]">
                  發送加密數據
                </button>
              </form>
            </div>
          )}

          {step === 'uploading' && (
            <div className="py-20 text-center animate-in zoom-in-95 duration-500">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-black text-white tracking-widest mb-4">數據封裝中... {progress}%</h2>
              <div className="w-full bg-[#30363d] h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-100" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-10 text-center animate-in fade-in duration-700">
              <CheckCircle2 size={64} className="text-cyan-400 mx-auto mb-6" />
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Upload Complete</h2>
              <p className="text-gray-500 mb-8 font-mono text-sm">Target ID: {userName}</p>
              <div className="bg-black/50 p-6 rounded border border-[#30363d] text-left font-mono text-[10px] space-y-2 opacity-80">
                <p className="text-cyan-400 underline font-bold">SYSTEM REPORT:</p>
                <p>STATUS: <span className="text-emerald-400">DATA_SYNC_SUCCESS</span></p>
                <p>LOCATION: CLOUDFLARE_EDGE_SERVER_01</p>
                <p>ENCRYPTION: AES-256-GCM</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
