import React, { useState } from "react";
import { Preview, CodeBlock } from "../Preview";
import { Questionnaire, QuestionDef } from "../../../../packages/core/src/components/Questionnaire";
import { AutoAnatomy, AutoAnatomyLegend } from "../AutoAnatomy";

const RISK_QUESTIONS: QuestionDef[] = [
  {
    id: "horizon",
    prompt: "When do you expect to start withdrawing from this account?",
    description: "This shapes how much time your investments have to recover from a downturn.",
    options: [
      { value: "lt5", label: "Less than 5 years" },
      { value: "5to15", label: "5–15 years" },
      { value: "gt15", label: "More than 15 years" },
    ],
  },
  {
    id: "reaction",
    prompt: "If your balance dropped 15% in a month, what would you do?",
    options: [
      { value: "sell", label: "Move to safer investments" },
      { value: "hold", label: "Hold and wait it out" },
      { value: "buy", label: "See it as a buying opportunity" },
    ],
  },
  {
    id: "experience",
    prompt: "How would you describe your investing experience?",
    options: [
      { value: "new", label: "New to investing" },
      { value: "some", label: "Some experience" },
      { value: "experienced", label: "Experienced" },
    ],
  },
];

export default function QuestionnairePage() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <h1 className="site-h1">Questionnaire</h1>
      <p className="site-lede">
        A single-question-per-step assessment flow — e.g. a retirement risk-tolerance questionnaire. Composed
        entirely from existing primitives (<code>Progress</code> + <code>RadioGroup</code> + <code>Button</code>),
        not a new interaction model — every accessibility property (labeling, focus, keyboard) is inherited from
        those, not reinvented.
      </p>

      <h2 className="site-section-title" id="anatomy">Anatomy</h2>
      <div className="site-panel" data-theme="core" data-mode="light" style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", background: "var(--core-color-bg-page)" }}>
        <AutoAnatomy points={[
          { n: 1, label: "Progress — % of questions answered, not just current step", anchor: "top" },
          { n: 2, label: "One question per screen — never a long scrolling form", anchor: "left" },
          { n: 3, label: "Next disabled until answered — no silent skip", anchor: "bottom" },
        ]}>
          <div style={{ width: 360, padding: 20, border: "1px solid var(--core-color-border-subtle)", borderRadius: "var(--core-card-radius)", background: "var(--core-card-bg)" }}>
            <Questionnaire
              title="Risk tolerance"
              questions={RISK_QUESTIONS}
              answers={answers}
              currentIndex={i}
              onAnswer={(id, v) => setAnswers((prev) => ({ ...prev, [id]: v }))}
              onBack={() => setI((n) => Math.max(0, n - 1))}
              onNext={() => setI((n) => Math.min(RISK_QUESTIONS.length - 1, n + 1))}
              onSubmit={() => setSubmitted(true)}
            />
          </div>
        </AutoAnatomy>
        <AutoAnatomyLegend points={[
          { n: 1, label: "Progress: computed from questions answered so far, not just position — reflects real completion", anchor: "top" },
          { n: 2, label: "One question per screen: the prompt is the largest text on screen, options directly below", anchor: "left" },
          { n: 3, label: "Next/Submit: disabled until the current question has an answer — never lets you silently skip one", anchor: "bottom" },
        ]} />
      </div>

      {submitted && (
        <div className="site-panel site-panel--flush" style={{ padding: 20 }}>
          <strong>Submitted:</strong> {JSON.stringify(answers)}
        </div>
      )}

      <h2 className="site-section-title">Accessibility</h2>
      <ul style={{ color: "var(--site-text-dim)", lineHeight: 1.8, fontSize: 14 }}>
        <li>The whole flow is one <code>role="form"</code> region labeled by its title, so assistive tech announces which questionnaire is active.</li>
        <li>Each question is a real <code>RadioGroup</code> (<code>role="radiogroup"</code>) — arrow-key navigable, single managed value.</li>
        <li>Progress uses CORE's <code>Progress</code> component, which exposes its percentage via <code>aria-valuenow</code>, not just visually.</li>
        <li>Next/Submit is disabled (not hidden) until answered, so its presence and state are always discoverable.</li>
      </ul>

      <h2 className="site-section-title">Code</h2>
      <div className="site-panel site-panel--flush">
        <CodeBlock>{`<Questionnaire
  title="Risk tolerance"
  questions={riskQuestions}
  answers={answers}
  currentIndex={i}
  onAnswer={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))}
  onBack={() => setI((n) => Math.max(0, n - 1))}
  onNext={() => setI((n) => Math.min(riskQuestions.length - 1, n + 1))}
  onSubmit={submitAssessment}
/>`}</CodeBlock>
      </div>
    </div>
  );
}
