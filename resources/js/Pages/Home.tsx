import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";

export default function Dashboard(props: any) {
    const isAuthenticated = props.auth.user !== null;
    return (
        <Authenticated
            auth={props.auth}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-center font-bold text-lg">TimeSense</h2>
                            <div className="w-4/5 mx-auto py-4">
                                ・このアプリケーションはタスク管理と工数計測を実現します。<br />
                                ・それぞれのタスクはカレンダーに登録することが可能です。<br />
                                ・データを集計してエクスポートする機能を持っています。<br />
                                {!isAuthenticated && (
                                    <div className="p-4">
                                        まずは <Link href={route('login')} className="text-blue-500 hover:underline">ログイン</Link> して機能を試してください。
                                    </div>
                                )}
                            </div>
                            <img
                                src="/images/home.png"
                                alt="Description of image"
                                className="block mx-auto w-4/5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
