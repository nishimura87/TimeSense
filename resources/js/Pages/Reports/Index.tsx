// resources/js/Pages/Reports/Index.tsx

import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import TaskCount from "@/Components/Charts/TaskCount";
import TaskProgress from "@/Components/Charts/TaskProgress";

interface Task {
    day: string;
    progress: string;
    count: number;
}

interface Progress {
    progress: string;
    count: number;
}

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    tasks: Task[];
    currentMonthProgress: Progress[];
}

export default function Index(props: PageProps) {
    return (
        <Authenticated auth={props.auth}>
            <div className="flex justify-center mb-4">
                <div className="w-4/5 border border-gray-300 rounded p-4 h-80 bg-white flex justify-center items-center">
                    <TaskCount tasks={props.tasks} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row justify-center items-center w-4/5 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/3 border border-gray-300 rounded p-4 h-80 bg-white flex justify-center items-center">
                        <TaskProgress tasks={props.currentMonthProgress} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
