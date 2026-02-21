"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import Link from 'next/link'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData,setActiveQuestionIndex}) {
    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
   
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
       
        results?.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      
      },[results])

      useEffect(()=>{
        // Only trigger when recording stops and we have enough content
        if(!isRecording && userAnswer?.length > 10 && !isProcessing)
        {
          UpdateUserAnswer();
        } 
      },[isRecording])
         
      const StartStopRecording=async()=>{
        if(isRecording)
        {
          stopSpeechToText()
        }
        else{
          startSpeechToText();
        }
      }

      const UpdateUserAnswer=async()=>{
        // Prevent multiple concurrent calls
        if(isProcessing) return;
        setIsProcessing(true);

        console.log(userAnswer)
        setLoading(true)
        const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
        ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question "+
        " please give us rating for answer and feedback as area of improvmenet if any "+
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

        let result;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            result = await chatSession.sendMessage(feedbackPrompt);
            break; // Success, exit loop
          } catch (error) {
            if (error.message.includes("503") && attempt < 2) {
              await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1))); // Wait 2s, 4s, etc.
              continue; // Retry
            } else {
              toast('AI service is busy. Please try again later.');
              setLoading(false);
              setIsProcessing(false);
              return;
            }
          }
        }

        let mockJsonResp = result.response.text().replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
        const resp=await db.insert(UserAnswer)
        .values({
          mockIdRef:interviewData?.mockId,
          question:mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
        })

        if(resp)
        {
          toast('User Answer recorded successfully');
          setUserAnswer('');
          setResults([]);
        }
        setResults([]);
        
        setLoading(false);
        setIsProcessing(false);
      }


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam.png'} width={200} height={200} alt = "webcam img"
            className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:500,
                width:500,
                zIndex:10,
            }}
            />
        </div>
        {loading && <p className='text-sm text-gray-500 animate-pulse'>Processing your answer...</p>}
        
        <div className='flex items-center gap-4 my-10'>
            {activeQuestionIndex > 0 && (
                <Button
                    variant="outline"
                    className="hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600 transition-all"
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                >
                    Previous Question
                </Button>
            )}
            
            <Button 
                variant="outline" 
                className={isRecording ? 'bg-red-50 border-red-300 hover:bg-red-100' : 'hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600 transition-all'}
                onClick={StartStopRecording}
            >
                {isRecording?
                    <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                        <StopCircle/>Stop Recording
                    </h2>
                    :
                    <h2 className='text-primary flex gap-2 items-center'>
                        <Mic/> Record Answer
                    </h2>
                }
            </Button>
            
            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
                <Button
                    variant="outline"
                    className="hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600 transition-all"
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                >
                    Next Question
                </Button>
            ) : (
                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                    <Button className="bg-green-600 hover:bg-green-700 transition-all">
                        End Interview
                    </Button>
                </Link>
            )}
        </div>
    </div>
  )
}

export default RecordAnswerSection