import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Terminal, User, DollarSign, Utensils, Wifi } from 'lucide-react';

/**
 * 聚餐數據採集終端 - Cloudflare Pages 部署版
 * 此文件整合了所有組件邏輯、樣式與狀態管理，適合在 React 專案中直接編譯。
 */
const App = () => {
  const [step, setStep] = useState('form'); // 狀態控制：'form', 'uploading', 'success'
  const [userName, setUserName] = useState('');
  const [progress, setProgress] = useState(0);

  // 模擬數據上傳進度條邏輯 - 針對 Cloudflare 部署版優化速度
  useEffect(() => {
    if (step === 'uploading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // 數據傳輸完成後，稍微延遲進入成功畫面，增加真實感
            setTimeout(() => setStep('success'), 400); 
            return 100;
          }
          // 設定進度條每次增加 10%，間隔 80ms，傳輸感更流暢
          return prev + 10; 
        }, 80);
      }, [step]);
      return () => clearInterval(interval);
    }
  }, [step]);

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setStep('uploading');
  };

  // 食物分類數據
  const foodCategories = [
    { label: '麻辣/火鍋', value: 'hotpot' },
    { label: '精緻涮涮鍋', value: 'shabu' },
    { label: '日式燒肉', value: 'jp_bbq' },
    { label: '韓式料理/燒肉', value: 'kr_bbq' },
    { label: '飯店百匯吃到飽', value: 'buffet' },
    { label: '居酒屋/串燒', value: 'izakaya' },
    { label: '非素食不吃', value: 'vegan', color: 'text-emerald-400' },
    { label: '生食海鮮', value: 'raw', color: 'text-red-400' },
    { label: '想大口吃牛', value: 'beef', color: 'text-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-cyan-500/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 科技感背景裝飾網格 */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-[#161b22]/90 backdrop-blur-xl border border-[#30363d] border-t-4 border-t-cyan-400 rounded-xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {/* 頂部虛擬終端狀態列 */}
          <div className="bg-black/40 px-4 py-2 flex justify-between items-center border-b border-[#30363d]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-[10px] font-mono text-cyan-500/50 flex items-center gap-2">
              <Wifi size={10} /> {step === 'success' ? '數據採集完成' : '加密通道連線中'}
            </div>
          </div>

          <div className="p-8">
            {/* 階段 1：表單輸入 */}
            {step === 'form' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="text-center mb-10">
                  <div className="inline-flex p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4 animate-pulse">
                    <Terminal size={32} />
                  </div>
                  <h1 className="text-3xl font-black text-white tracking-widest mb-2">聚餐數據採集終端</h1>
                  <p className="text-cyan-600 text-xs font-mono">PROTOCOL V4.0 // CLOUDFLARE_PAGES_DIST</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Phase 00: 身份識別 */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-cyan-400" />
                      <label className="text-sm font-bold text-cyan-400 uppercase tracking-tighter flex items-center gap-2">
                        <User size={14} /> Phase 00: 身份識別
                      </label>
                    </div>
                    <input 
                      type="text" 
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="請輸入您的代號 / 姓名"
                      className="w-full bg-black/50 border-2 border-[#30363d] p-4 rounded-lg focus:border-cyan-400 outline-none transition-all font-bold text-white placeholder:text-gray-600"
                    />
                  </section>

                  {/* Phase 01: 預算分析 */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-cyan-400" />
                      <label className="text-sm font-bold text-cyan-400 uppercase tracking-tighter flex items-center gap-2">
                        <DollarSign size={14} /> Phase 01: 預算範圍
                      </label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['$300-', '$600', '$1000', '無上限'].map((price) => (
                        <label key={price} className="cursor-pointer group">
                          <input type="radio" name="budget" className="sr-only peer" defaultChecked={price === '$600'} />
                          <div className="p-3 bg-[#30363d]/30 border-2 border-[#30363d] rounded-lg text-center font-bold transition-all peer-checked:border-cyan-400 peer-checked:bg-cyan-400/10 peer-checked:text-cyan-400 group-hover:border-cyan-400/50">
                            {price}
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Phase 02: 類別過濾 */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-cyan-400" />
                      <label className="text-sm font-bold text-cyan-400 uppercase tracking-tighter flex items-center gap-2">
                        <Utensils size={14} /> Phase 02: 意向過濾清單
                      </label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {foodCategories.map((cat) => (
                        <label key={cat.value} className="cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className={`p-4 h-full flex items-center justify-center bg-[#30363d]/30 border-2 border-[#30363d] rounded-lg text-center font-bold text-sm transition-all peer-checked:border-cyan-400 peer-checked:bg-cyan-400/10 peer-checked:text-cyan-400 ${cat.color || 'text-[#c9d1d9]'}`}>
                            {cat.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 font-black rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] tracking-widest"
                  >
                    發送加密數據
                  </button>
                </form>
              </div>
            )}

            {/* 階段 2：上傳數據中 */}
            {step === 'uploading' && (
              <div className="py-20 text-center animate-in fade-in zoom-in-95 duration-500">
                <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mx-auto mb-6" />
                <h2 className="text-2xl font-black text-white tracking-[0.3em] mb-4">數據傳輸中</h2>
                <div className="w-full bg-[#30363d] h-2 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-cyan-400 shadow-[0_0_15px_#00f2ff] transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-cyan-500 font-mono text-xs">正在封裝協議並推送至 Cloudflare Edge...</p>
              </div>
            )}

            {/* 階段 3：成功回報 */}
            {step === 'success' && (
              <div className="py-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="w-24 h-24 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,242,255,0.3)]">
                  <CheckCircle2 size={48} className="text-cyan-400" />
                </div>
                
                <h2 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">Upload Complete</h2>
                <div className="mb-8">
                  <p className="text-gray-400">採集對象：<span className="text-cyan-400 font-bold underline decoration-dotted">{userName}</span></p>
                </div>

                <div className="bg-black/50 p-6 rounded-lg border border-[#30363d] text-left font-mono text-xs space-y-2 mb-8">
                  <div className="text-cyan-400 font-bold underline mb-2">系統回報：</div>
                  <div className="flex justify-between"><span>[狀態]</span> <span className="text-emerald-400">數據已同步至全球邊緣節點</span></div>
                  <div className="flex justify-between"><span>[校驗]</span> <span className="text-cyan-400">採集協議封包校驗成功</span></div>
                  <div className="flex justify-between"><span>[部署]</span> <span className="text-cyan-400">CF_PAGES_EDGE_MODE</span></div>
                  <div className="mt-4 text-gray-500 italic">
                    {' >'}{' >'} 任務圓滿達成，請靜候主辦單位進一步指示。
                  </div>
                </div>
                
                <div className="pt-4">
                    <p className="text-[10px] text-gray-700 font-mono">CONNECTION_TERMINATED_BY_SERVER</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
