import React from 'react';
import Authenticated from "@/Layouts/Authenticated";

export default function Index(props: any) {
    return (
        <Authenticated auth={props.auth}>
            <div className="flex justify-center">
            </div>
        </Authenticated>
    );
}
