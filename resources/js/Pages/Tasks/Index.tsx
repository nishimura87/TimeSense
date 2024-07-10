import React, { useState, useEffect } from 'react';
import Authenticated from "@/Layouts/Authenticated";
import SubmitTask from '@/Components/SubmitTask';
import Task from '@/Components/Task';
import ReactPaginate from 'react-paginate';
import { Inertia } from '@inertiajs/inertia';
import ErrorMessages from '@/Components/ErrorMessages';
import SearchForm from '@/Components/SearchForm';

export default function Index(props: any) {
    const tasks = Array.isArray(props.tasks.data) ? props.tasks.data : [];
    const [currentPage, setCurrentPage] = useState(0);
    const tasksPerPage = 10; // 1ページあたりのtask数
    const [forcePage, setForcePage] = useState(props.tasks.current_page - 1);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    useEffect(() => {
        filterTasksByMonth(selectedMonth);
    }, [selectedMonth, tasks]);

    // 現在のページに表示するtasksを計算
    const currentTasks = filteredTasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage);

    // ページ変更時のハンドラ
    const handlePageClick = (event: any) => {
        const newPage = event.selected;
        setCurrentPage(newPage);
        setForcePage(newPage);
        Inertia.visit(`/task?page=${newPage + 1}`);
    };

    // Taskをクリックした時の処理
    const handleTaskClick = (task: any) => {
        // ここにクリックした時の処理を書く。例えば:
        console.log("Task clicked:", task);
    };

    const filterTasksByMonth = (month: number) => {
        const filtered = tasks.filter(task => {
            const taskMonth = new Date(task.created_at).getMonth();
            return taskMonth === month;
        });
        setFilteredTasks(filtered);
    };

    return (
        <Authenticated auth={props.auth}>
            <div className="max-w-4xl mx-auto p-3 bg-white border rounded">
                <SubmitTask />
                {Object.keys(props.errors).length > 0 && (
                <div className="mt-3">
                    {Object.entries(props.errors).map(([field, errors]) => (
                        // errorsの型をstring[] | undefinedに強制する
                        <ErrorMessages key={field} errors={errors as string[] | undefined} />
                    ))}
                </div>
                )}
                <hr className="my-3" />
                
                <div className="flex items-center px-1 space-x-4 justify-end">
                    <h3 className="text-lg font-bold mb-2">表示月の選択</h3>
                    <SearchForm onMonthChange={setSelectedMonth} />
                </div>

                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="w-5/12 pb-2">タスク</th>
                            <th className="w-2/12 pb-2">進捗</th>
                            <th className="w-2/12 pb-2">期日</th>
                            <th className="w-2/12 pb-2">工数計測</th>
                            <th className="w-1/12 pb-2">削除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.map((task: any) => (
                            <Task key={task.id} task={task} onClick={handleTaskClick} />
                        ))}
                    </tbody>
                </table>
                {props.tasks.last_page > 1 && (
                    <ReactPaginate
                        previousLabel={"前"}
                        nextLabel={"次"}
                        breakLabel={"..."}
                        pageCount={props.tasks.last_page}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        forcePage={forcePage}
                        onPageChange={handlePageClick}
                        containerClassName="flex my-2 text-lg items-center"
                        pageClassName="border"
                        activeClassName="text-white bg-black"
                        pageLinkClassName="mx-2"
                        previousClassName="mr-2"
                        nextClassName="ml-2"
                    />
                )}
            </div>
        </Authenticated>
    );
}
