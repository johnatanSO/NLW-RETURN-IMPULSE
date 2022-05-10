import React, { useState } from "react";
import bugImageURL from "../../assets/bug.svg";
import ideaImageURL from "../../assets/idea.svg";
import thoughtImageURL from "../../assets/thought.svg";
import FeedbackTypeStep from "./Steps/FeedbackTypeStep";
import FeedbackContentStep from "./Steps/FeedbackContentStep";
import FeedbackSuccessStep from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageURL,
      alt: "Imagem de um inseto",
    },
  },
  IDEIA: {
    title: "Ideia",
    image: {
      source: ideaImageURL,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageURL,
      alt: "Imagem de uma núvem",
    },
  },
};

function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState(null);

  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackSent={() => setFeedbackSent(true)}
              onFeedbackRestartRequest={handleRestartFeedback}
              feedbackType={feedbackType}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com 💜 por{" "}
        <a
          className="underline underline-offset-2 text-brand-500"
          href="https://github.com/johnatanSO"
        >
          Johnatan
        </a>
      </footer>
    </div>
  );
}

export default WidgetForm;
