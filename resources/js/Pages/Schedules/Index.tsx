import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import CalendarPage from '@/Components/CalendarPage';

export default function Index(props: any) {
    return (
        <Authenticated auth={props.auth}>
            <div className="flex justify-center">
                <CalendarPage />
            </div>
        </Authenticated>
    );
}
