// resources/js/Pages/Reports/Index.tsx

import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import BarChart from "@/Components/Charts/TaskCount";

interface Task {
    date: string;
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
                    <BarChart tasks={props.tasks} />
                </div>
                
            </div>
        </Authenticated>
    );
}
