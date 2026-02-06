
import React, { useState } from 'react';
import { MousePointer2, BookOpen, Code2, Sparkles, FolderTree, Lightbulb, Languages } from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: 'signup' | 'login') => void;
  activeId?: string;
}

type Lang = 'zh-TW' | 'zh-CN' | 'en';

export const LandingView: React.FC<LandingViewProps> = () => {
  const [lang, setLang] = useState<Lang>('zh-TW');

  const content = {
    'zh-TW': {
      heroTitle1: '原型',
      heroTitle2: '自動化',
      heroSub: '集中式 UX 演示編排系統。專為 AI 擴充而生。',
      heroAction: '請使用頂部的控制條選擇並執行預設流程。',
      introTitle: 'AI 協同開發',
      introDesc: '本項目專為 AI 優先開發設計。即使你沒有編程經驗，也可以透過 AI Studio 或 LLM IDE 擴充新功能。',
      step1Title: '1. 閱讀「劇本」 (Presets)',
      step1Desc: '查看 /presets/ 目錄。預設流程就是一系列操作清單（如導航、輸入、點擊），直觀且無需代碼背景。',
      step2Title: '2. 識別「屏幕」 (Views)',
      step2Desc: '界面都在 /views/ 下。尋找以 ...View.tsx 結尾的文件即可定位頁面。',
      step3Title: '3. 引導 AI 進行擴充',
      step3Desc: '嘗試輸入：「添加一個『重置密碼』流程。在 views 中新建視圖，並增加劇本。」',
      tipsTitle: 'Pro Tips / 開發小貼士',
      tip1Title: '直接引用文件名',
      tip1Desc: '修改 UI 時，告訴 AI 具體文件名（如 SignupView.tsx），這能讓 AI 更精準操作，避免多餘變更。',
      tip2Title: '流程控制',
      tip2Desc: 'Preset 劇本不需要 Coding 知識。你可以直接對 AI 說：「在登錄流程加一個步驟」或「修改特定流程的操作內容」。',
      footer: '從上方選擇一個流程開始'
    },
    'zh-CN': {
      heroTitle1: '原型',
      heroTitle2: '自动化',
      heroSub: '集中式 UX 演示编排系统。专为 AI 扩充而生。',
      heroAction: '请使用顶部的控制条选择并执行预设流程。',
      introTitle: 'AI 协同开发',
      introDesc: '本项目专为 AI 优先开发设计。即使你没有编程经验，也可以通过 AI Studio 或 LLM IDE 扩展新功能。',
      step1Title: '1. 阅读“剧本” (Presets)',
      step1Desc: '查看 /presets/ 目录。预设流程就是一系列操作清单（如导航、输入、点击），直观且无需代码背景。',
      step2Title: '2. 识别“屏幕” (Views)',
      step2Desc: '界面都在 /views/ 下。寻找以 ...View.tsx 结尾的文件即可定位页面。',
      step3Title: '3. 引导 AI 进行扩充',
      step3Desc: '尝试输入：“添加一个‘重置密码’流程。在 views 中新建视图，并增加剧本。”',
      tipsTitle: 'Pro Tips / 开发小贴士',
      tip1Title: '直接引用文件名',
      tip1Desc: '修改 UI 时，告诉 AI 具体文件名（如 SignupView.tsx），这能让 AI 更精准操作，避免多余的变更。',
      tip2Title: '流程控制',
      tip2Desc: 'Preset 剧本不需要 Coding 知识。你可以直接对 AI 说：“在登录流程加一个步骤”或“修改特定流程的操作内容”。',
      footer: '从上方选择一个流程开始'
    },
    'en': {
      heroTitle1: 'Prototype',
      heroTitle2: 'Automation',
      heroSub: 'Centralized orchestration for UX walkthroughs. Built to be extended by AI.',
      heroAction: 'Start by selecting a flow from the orchestrator above.',
      introTitle: 'AI Collaborative Development',
      introDesc: 'This project is designed for AI-First development. Even if you don\'t know how to code, you can use AI Studio or an LLM IDE to add new features.',
      step1Title: '1. Read the Playbooks (Presets)',
      step1Desc: 'Explore the /presets/ folder. A preset is just a list of steps like navigate, keyin, or click. It\'s readable without coding knowledge.',
      step2Title: '2. Identify the Screens (Views)',
      step2Desc: 'Screens live in /views/. Look for files ending in ...View.tsx to see what\'s currently built.',
      step3Title: '3. Prompt the AI to Extend',
      step3Desc: 'Try: "Add a new flow for Password Reset. Create a ResetPasswordView in views and a new preset."',
      tipsTitle: 'Pro Tips',
      tip1Title: 'Direct File References',
      tip1Desc: 'When asking for UI changes, mention the specific file name (e.g., SignupView.tsx). This helps the AI stay focused.',
      tip2Title: 'Flow Control',
      tip2Desc: 'Presets are readable even without coding skills. You can simply tell the LLM to "Add/remove a step" or "Modify a specific flow".',
      footer: 'Start by selecting a flow above'
    }
  };

  const t = content[lang];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-1000">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
          <MousePointer2 size={12} /> System Ready
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          {t.heroTitle1} <span className="text-indigo-600">{t.heroTitle2}</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          {t.heroSub}
        </p>
        <div className="flex justify-center gap-2 mt-8">
          {['zh-TW', 'zh-CN', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as Lang)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
            >
              {l === 'en' ? 'English' : l === 'zh-TW' ? '繁體中文' : '简体中文'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-slate-200 pt-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <Sparkles size={24} />
            <h2 className="text-2xl font-bold">{t.introTitle}</h2>
          </div>
          <p className="text-slate-600">{t.introDesc}</p>
          <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2"><Lightbulb size={16}/> {t.tipsTitle}</h4>
            <p className="text-xs text-slate-600">{t.tip1Desc}</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { icon: <BookOpen />, title: t.step1Title, desc: t.step1Desc },
            { icon: <FolderTree />, title: t.step2Title, desc: t.step2Desc },
            { icon: <Code2 />, title: t.step3Title, desc: t.step3Desc }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
