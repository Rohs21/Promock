import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function InterviewItemCard({interview}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onStart = () => {
        setIsLoading(true);
        // Simulate navigation delay and then redirect
        setTimeout(() => {
            router.push('/dashboard/interview/' + interview?.mockId);
        }, 100);
    }

    const onFeedbackPress = () => {
        setIsLoading(true);
        // Simulate navigation delay and then redirect
        setTimeout(() => {
            router.push('/dashboard/interview/' + interview?.mockId + "/feedback");
        }, 100);
    }

    return (
        <>
            <div className='border shadow-sm rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200 h-full flex flex-col'>
                <div className='flex-1 space-y-2'>
                    <h2 className='font-bold text-primary text-lg leading-tight'>{interview?.jobPosition}</h2>
                    <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
                    <h2 className='text-xs text-gray-400'>Created At: {interview?.createdAt}</h2>
                </div>
                
                <div className='flex justify-between gap-3 mt-4 pt-3 border-t border-gray-100'>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 hover:bg-gray-50 cursor-pointer"
                        onClick={onFeedbackPress}
                        disabled={isLoading}
                    >
                        Feedback
                    </Button>
                    <Button 
                        size="sm" 
                        className="flex-1 cursor-pointer"
                        onClick={onStart}
                        disabled={isLoading}
                    >
                        Start
                    </Button>
                </div>
            </div>

            {/* Loading Modal */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 shadow-2xl border max-w-sm w-full mx-4">
                        <div className="flex flex-col items-center space-y-4">
                            {/* Loading Spinner */}
                            <div className="relative">
                                <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-primary"></div>
                            </div>
                            
                            {/* Loading Text */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    Loading...
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Preparing your interview session
                                </p>
                            </div>
                            
                            {/* Loading Dots Animation */}
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default InterviewItemCard