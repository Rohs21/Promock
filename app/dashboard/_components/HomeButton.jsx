// app/dashboard/interview/[interviewId]/feedback/_components/HomeButton.jsx
"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomeButton() {
    const router = useRouter();

    return (
        <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    );
}