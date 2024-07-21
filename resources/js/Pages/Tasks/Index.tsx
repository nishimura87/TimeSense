import React, { useState, useEffect } from 'react';
import Authenticated from "@/Layouts/Authenticated";
import SubmitTask from '@/Components/SubmitTask';
import Task from '@/Components/Task';
import ReactPaginate from 'react-paginate';
import { Inertia } from '@inertiajs/inertia';
import ErrorMessages from '@/Components/ErrorMessages';
import SearchForm from '@/Components/SearchForm';

interface TaskType {
    id: number;
    // 他のタスクのプロパティもここに追加する
}

interface TasksResponse {
    data: TaskType[];
    current_page: number;
    last_page: number;
}

interface Props {
    auth: any;
    tasks: TasksResponse;
    selectedMonth?: string;
    errors: Record<string, string[]>;
}

export default function Index(props: Props) {
    const [currentPage, setCurrentPage] = useState(props.tasks.current_page - 1);
    const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth || '');
    const [tasks, setTasks] = useState(props.tasks.data || []);
    const [totalPages, setTotalPages] = useState(props.tasks.last_page || 1);

    useEffect(() => {
        Inertia.visit(`/task?page=${currentPage + 1}&month=${selectedMonth}`, {
            preserveState: true,
            onSuccess: (response: any) => {
                setTasks(response.props.tasks.data);
                setTotalPages(response.props.tasks.last_page);
            }
        });
    }, [currentPage, selectedMonth]);

    const handlePageClick = (event: { selected: number }) => {
        if (event.selected !== currentPage) {
            setCurrentPage(event.selected);
        }
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
        setCurrentPage(0); // ページをリセット
    };

    return (
        <Authenticated auth={props.auth}>
            <div className="max-w-4xl mx-auto p-3 bg-white border rounded">
                <SubmitTask />
                {Object.keys(props.errors).length > 0 && (
                    <div className="mt-3">
                        {Object.entries(props.errors).map(([field, errors]) => (
                            <ErrorMessages key={field} errors={errors} />
                        ))}
                    </div>
                )}
                <hr className="my-3" />
                <div className="flex justify-end">
                    <SearchForm onMonthChange={handleMonthChange} initialMonth={props.selectedMonth} />
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
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4">表示するタスクがありません</td>
                            </tr>
                        ) : (
                            tasks.map((task) => (
                                <Task key={task.id} task={task} />
                            ))
                        )}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <ReactPaginate
                        previousLabel={"前"}
                        nextLabel={"次"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        forcePage={currentPage}
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
