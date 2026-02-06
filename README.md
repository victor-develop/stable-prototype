# 🎭 UX Prototype Automation Playbook

A developer-centric framework for orchestrating automated UX walkthroughs. This system allows you to define user flows as "playbooks" that visually execute on top of React components.

Play it around: Clone a copy with your google account and start adding presets and components: 
https://ai.studio/apps/drive/1OfaSEDyezA3rRm0yXI-E2r9GyLD0yAIZ

---

## 💡 Why I Build This

- **Managing Complexity**: Users with no coding experience often stumble as app complexity grows while building with LLMs. More features make manual testing difficult; they often don't know what might have accidentally broken. I added "Playbooks" so they can verify their flows quickly and visually.
- **Bridging the Gap**: Realistically, it is very difficult for a user with zero coding knowledge to build a production-ready application. This tool allows them to build a high-fidelity "toy" (prototype) that effectively communicates their vision, which can then be shipped to a professional developer for implementation.

---

## 🚀 System Architecture

### 1. The Command Language
Mapped in `cmdhooks/useCommandExecutor.ts`:
- `navigate [view]` : Switches top-level view.
- `keyin [selector] [value]` : Simulates typing with visual highlights.
- `click [id]` : Simulates button press with active-state feedback.
- `wait [ms]` : Pauses execution for timing/animations.
- `assert [logic]` : Logs validation points.

### 2. Folder Structure
- `/presets/`: Flow definitions. **Rule: One flow per file.**
- `/playbookComponents/`: **CORE AUTOMATED ASSETS**. Contains Views and shared automated components (`PlaybookButton`, `AutomatedInput`).
- `/components/`: Generic non-automated UI primitives.
- `/orchestrator/`: The control bar container.
- `/cmdhooks/`: The driver that translates commands to React state.

---

## 🤖 LLM Implementation Protocol (Agent Guide)

When updating this system, follow these steps to ensure architectural integrity:

### Step 1: Flow Sequencing
Analyze the requirement and design a sequence of CLI-style commands.
*Example: planned command set for "Delete Item"*
`navigate dashboard` -> `click item-checkbox-1` -> `click delete-btn` ...

### Step 2: Component Gap & Reuse Analysis
Before creating new UI, check `/playbookComponents` for existing shared assets.
- **MANDATORY REUSE**: Always use `PlaybookButton` and `AutomatedInput` for any interactive element to ensure visual synchronization with the automation engine.
- **STRICT HIERARCHY**: Automated views and their shared sub-components MUST live in `/playbookComponents/`.
- **STATE BINDING**: Ensure all interactive elements receive and use the `isActive` prop (determined by `activeId === id`).

### Step 3: Implementation
1. Define the flow in `/presets/`.
2. Register the flow in `/presets/index.ts`.
3. If creating a new view, ensure it utilizes the `activeId` prop from `App.tsx` and passes it to all shared interactive components.
4. Update `App.tsx` routing if new views are introduced.

---

## 🛠 Contribution Rules

- **DRY Principle**: Do not duplicate "Automated" logic. If an input needs a pulse effect, update the shared `AutomatedInput`.
- **Unified Feedback**: Every command execution MUST be visible. If the script "clicks" or "keys in", the UI must pulse, glow, or scale.
- **Async Seeds**: Every flow must provide a `seeds()` function to mimic data readiness before the UI sequence begins.

---
*Prototype Automation OS // AI-First Orchestration*