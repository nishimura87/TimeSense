// resources/js/Pages/Reports/Index.tsx

import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import TaskCount from "@/Components/Charts/TaskCount";


interface Task {
    month: string;
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
}

export default function Index(props: PageProps) {
    return (
        <Authenticated auth={props.auth}>
            <div className="flex justify-center w-4/5">
                <div className="flex">
                    <TaskCount tasks={props.tasks} />
                </div>
                
            </div>
        </Authenticated>
    );
}
