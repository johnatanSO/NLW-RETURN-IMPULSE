import React, {useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import BottomSheet from '@gorhom/bottom-sheet'; 
import { ChatTeardropDots} from 'phosphor-react-native'
import { theme } from '../../theme';
import {feedbackTypes} from '../../utils/feedbackTypes'
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback(){
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent(){
    setFeedbackSent(true)
  }


  return (
    <>
      <TouchableOpacity onPress={handleOpen} style={styles.button}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>
      <BottomSheet 
        ref={bottomSheetRef} 
        snapPoints={[1, 300]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ? <Success onSendAnotherFeedback={handleRestartFeedback} /> 
          :
          <>
            {
              feedbackType ? <Form onFeedbackCanceled={handleRestartFeedback} onFeedbackSent={handleFeedbackSent} feedbackType={feedbackType} /> : <Options onFeedbackTypeChanged={setFeedbackType}/>
            } 
         </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);