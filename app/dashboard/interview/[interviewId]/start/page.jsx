"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import QuestionsSection from './_components/QuestionsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Dynamically import RecordAnswerSection with ssr: false
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection'), {
  ssr: false, // Disable SSR for this component
});

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    // Unwrap params at the component level
    const unwrappedParams = React.use(params);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, unwrappedParams.interviewId));

            if (result.length > 0) {
                let jsonMockResp = JSON.parse(result[0].jsonMockResp);
                
                // Handle if AI returned an object wrapper instead of array
                if (!Array.isArray(jsonMockResp) && typeof jsonMockResp === 'object') {
                    // Try to extract array from common wrapper keys
                    const possibleKeys = ['questions', 'interview_questions', 'interviewQuestions', 'data'];
                    for (const key of possibleKeys) {
                        if (Array.isArray(jsonMockResp[key])) {
                            jsonMockResp = jsonMockResp[key];
                            break;
                        }
                    }
                    // If still not an array, try the first array property found
                    if (!Array.isArray(jsonMockResp)) {
                        const arrayProp = Object.values(jsonMockResp).find(v => Array.isArray(v));
                        if (arrayProp) jsonMockResp = arrayProp;
                    }
                }
                
                if (Array.isArray(jsonMockResp)) {
                    setMockInterviewQuestion(jsonMockResp);
                } else {
                    console.error("jsonMockResp is not an array:", jsonMockResp);
                    setMockInterviewQuestion([]); // Default to empty array if not an array
                }
                setInterviewData(result[0]);
            } else {
                console.error("No interview data found for mockId:", unwrappedParams.interviewId);
                setMockInterviewQuestion([]);
                setInterviewData(null);
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
            setMockInterviewQuestion([]); // Fallback to empty array on error
            setInterviewData(null);
        }
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />

                {/* Video/ Audio Recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                />
            </div>
        </div>
    )
}

export default StartInterview