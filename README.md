# 🎭 UX Prototype Automation Playbook

A developer-centric framework for orchestrating automated UX walkthroughs. This system allows you to define user flows as "playbooks" that visually execute on top of React components.

Play it around: Clone a copy with your google account and start adding presets and components: 
https://ai.studio/apps/drive/1OfaSEDyezA3rRm0yXI-E2r9GyLD0yAIZ

---

## 💡 Why I Build This

- **Managing Complexity**: Users with no coding experience often stumble as app complexity grows while building with LLMs. More features make manual testing difficult; they often don't know what might have accidentally broken. I added "Playbooks" so they can verify their flows quickly and visually.
- **Bridging the Gap**: Realistically, it is very difficult for a user with zero coding knowledge to build a production-ready application. This tool allows them to build a high-fidelity "toy" (prototype) that effectively communicates their vision, which can then be shipped to a professional developer for implementation.
- **No Complexity Ceiling**: The benefit of using this is that there should be no complexity growth ceiling that will ruin an LLM since we are just building one flow after another. We can continue to use it and iterate on it indefinitely.

---

## 🚀 System Architecture (3-Layer Pattern)

### 1. `/system` (The Control Plane)
The "Engine" room. Contains the orchestration UI and command execution logic.
- `PlaybookOrchestrator.tsx`: The automated control bar.
- `useCommandExecutor.ts`: The driver translating DSL to React state.

### 2. `/views` (The Experience Layer)
High-level prototype screens. These are the pages being demonstrated.
- `DashboardView.tsx`, `SignupView.tsx`, etc.

### 3. `/components` (The Data Plane / UI Primitives)
Atomic, reusable building blocks used by views.
- `AutomatedInput.tsx`, `PlaybookButton.tsx`.

---

## 🤖 LLM Implementation Protocol (Agent Guide)

When updating this system, follow these steps to ensure architectural integrity:

### Step 1: Implementation
1. Define the flow in `/presets/`.
2. Register the flow in `/presets/index.ts`.
3. If creating a new view, place it in `/views/` and ensure it uses `PlaybookButton` and `AutomatedInput` from `/components/`.
4. Update `App.tsx` routing if new views are introduced.

---

## 🛠 Contribution Rules

- **DRY Principle**: Do not duplicate "Automated" logic. Update shared building blocks in `/components`.
- **Unified Feedback**: Every command execution MUST be visible. If the script "clicks", the UI must pulse.
- **Async Seeds**: Every flow must provide a `seeds()` function to mimic data readiness.

---
*Prototype Automation OS // AI-First Orchestration*