import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import React, {useState} from 'react';
import * as FileSystem from 'expo-file-system'

import { styles } from './styles';
import { theme } from '../../theme';
import {FeedbackType} from '../../components/Widget';
import {ScreenshotButtom} from '../../components/ScreenshotButtom';
import {Buttom} from '../../components/Buttom';
import {feedbackTypes} from '../../utils/feedbackTypes'; 

import {captureScreen} from 'react-native-view-shot'
import { api } from '../../libs/api';

interface Props{
  feedbackType : FeedbackType;
  onFeedbackCanceled: () => void,
  onFeedbackSent: () => void
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {

  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const feedbackTypeInfo = feedbackTypes[feedbackType]



  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
    .then((uri)=>{return setScreenshot(uri)})
    .catch((err)=>{console.log(err)})
  }

  function handleScreenshotRemove(){
    setScreenshot(null)
  }


  async function handleSendFeedback(){
    if(isSendingFeedback){
      return
    }
    setIsSendingFeedback(true)

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

    try{
      await api.post('/feedbacks',{
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment,
      } )

      onFeedbackSent()
    }
    catch(err){
      console.log(err)
      setIsSendingFeedback(false)
    }
  }




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} ></ArrowLeft>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={feedbackTypeInfo.image}/>
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
      onChangeText={setComment}
      autoCorrect={false}
       multiline
       style={styles.input}
       placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo."
       placeholderTextColor={theme.colors.text_secondary}
       />

      <View style={styles.footer}>
      <ScreenshotButtom
        onTakeShot={handleScreenshot}
        onRemoveShot={handleScreenshotRemove}
        screenshot={screenshot}
      />
      <Buttom onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>

  );
}