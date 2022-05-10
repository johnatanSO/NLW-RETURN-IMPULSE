import React from 'react'
import { feedbackTypes } from '..'
import CloseButton from '../../CloseButton'

function FeedbackTypeStep(props) {
  return (
    <>
      <header>
          <span className="text-xl leading-6">Deixe o seu feedback</span>
          <CloseButton />
        </header>

      <div className="flex py-8 gap-2 w-full">
          {Object.entries(feedbackTypes).map(([key, value]) => {
            return (
              <button onClick={() => props.onFeedbackTypeChanged(key)} key={key} type="button" className="flex flex-1 flex-col gap-2 border-2 border-transparent items-center bg-zinc-800 rounded-lg py-5 w-24 hover:border-brand-500 focus:border-brand-500 focus:outline-none">
                <img src={value.image.source} alt={value.image.alt} />
                <span>{value.title}</span>
              </button>
            )
          })}
        </div>
    </>
  )
}

export default FeedbackTypeStep