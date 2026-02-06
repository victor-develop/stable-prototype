
import React from 'react';
import { MousePointer2, BookOpen, Code2, Sparkles, FolderTree, Lightbulb } from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: 'signup' | 'login') => void;
  activeId?: string;
}

export const LandingView: React.FC<LandingViewProps> = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
          <MousePointer2 size={12} /> System Ready
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          Prototype <span className="text-indigo-600">Automation</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          Centralized orchestration for UX walkthroughs. Built to be extended by AI.
        </p>
        <p className="text-lg text-slate-400 font-medium">
          请使用顶部的控制条选择并执行预设流程。
        </p>
      </div>

      {/* LLM / AI Studio Guide for Non-Coders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 text-left border-t border-slate-200 pt-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <Sparkles size={24} />
            <h2 className="text-2xl font-bold">AI Collaborative Development</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            This project is designed for <strong>AI-First development</strong>. Even if you don't know how to code, you can use <strong>AI Studio</strong> or an <strong>LLM IDE</strong> to add new features.
          </p>
          <p className="text-slate-500 italic">
            本项目专为 <strong>AI 优先开发</strong> 设计。即使你没有编程经验，也可以通过 <strong>AI Studio</strong> 或 <strong>LLM IDE</strong> 扩展新功能。
          </p>

          {/* Pro Tips Section */}
          <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm uppercase tracking-wider">
              <Lightbulb size={16} /> Pro Tips / 开发小贴士
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Direct File References</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When asking for UI changes, mention the specific file name (e.g., <code>SignupView.tsx</code>). This helps the AI stay focused and prevents unnecessary changes.
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  修改 UI 时，直接告诉 AI 文件名（如 <code>SignupView.tsx</code>），这能让 AI 更精准地操作，避免多余的变更。
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Flow Control</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Presets use plain-English commands. You can simply tell the LLM to <em>"Add a new step to the login flow"</em> or <em>"Delete the second command in signup"</em>.
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Preset 剧本是纯英文指令，易于阅读。你可以直接对 AI 说：“在登录流程里加一个步骤”或“删掉注册流程的第二个指令”。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Guide Card 1: Presets */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors">
            <div className="flex gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl h-fit">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">1. Read the "Playbooks" (Presets)</h3>
                <p className="text-sm text-slate-500 mb-2">Explore the <code>/presets/</code> folder. A preset is just a list of steps like <em>"navigate"</em>, <em>"keyin"</em> (type), or <em>"click"</em>.</p>
                <p className="text-xs text-slate-400 font-medium">
                  <strong>查看“剧本” (Presets):</strong> 打开 <code>/presets/</code> 目录。每个预设就是一个操作清单，非常直观，无需代码背景。
                </p>
              </div>
            </div>
          </div>

          {/* Guide Card 2: Views */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors">
            <div className="flex gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl h-fit">
                <FolderTree size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">2. Identify the "Screens" (Views)</h3>
                <p className="text-sm text-slate-500 mb-2">Screens live in <code>/playbookComponents/</code>. Look for files ending in <code>...View.tsx</code> to see what's currently built.</p>
                <p className="text-xs text-slate-400 font-medium">
                  <strong>识别“屏幕” (Views):</strong> 界面都在 <code>/playbookComponents/</code> 下。寻找以 <code>...View.tsx</code> 结尾的文件来定位页面。
                </p>
              </div>
            </div>
          </div>

          {/* Guide Card 3: Prompting */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors">
            <div className="flex gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl h-fit">
                <Code2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">3. Prompt the AI to Extend</h3>
                <p className="text-sm text-slate-500 mb-2 italic">"Add a new flow for 'Password Reset'. Create a ResetPasswordView in playbookComponents and a new preset."</p>
                <p className="text-xs text-slate-400 font-medium">
                  <strong>让 AI 帮你扩展:</strong> 尝试输入：“添加一个‘重置密码’流程。在 playbookComponents 中新建视图，并增加剧本。”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4 mt-16 animate-bounce duration-[3000ms]">
        <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-transparent rounded-full" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Start by selecting a flow above</span>
      </div>
    </div>
  );
};
