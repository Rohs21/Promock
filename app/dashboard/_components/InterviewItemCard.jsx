import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function InterviewItemCard({interview, onDelete}) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (isDeleting) return;
        
        if (!confirm('Are you sure you want to delete this interview? This will also delete all related answers and feedback.')) {
            return;
        }
        
        setIsDeleting(true);
        try {
            // Delete related user answers first
            await db.delete(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, interview?.mockId));
            
            // Delete the interview
            await db.delete(MockInterview)
                .where(eq(MockInterview.mockId, interview?.mockId));
            
            toast('Interview deleted successfully');
            if (onDelete) onDelete();
        } catch (error) {
            console.error('Error deleting interview:', error);
            toast('Failed to delete interview');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <div className='border shadow-sm rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200 h-full flex flex-col relative'>
                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className='absolute top-2 right-2 p-1.5 rounded-full hover:bg-red-100 transition-colors group'
                    title='Delete Interview'
                >
                    <Trash2 className={`w-4 h-4 ${isDeleting ? 'text-gray-400 animate-pulse' : 'text-gray-400 group-hover:text-red-500'}`} />
                </button>
                
                <div className='flex-1 space-y-2 pr-6'>
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