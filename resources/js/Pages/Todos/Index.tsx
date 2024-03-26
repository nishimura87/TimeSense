import React, { useState } from 'react';
import Authenticated from "@/Layouts/Authenticated";
import SubmitTodo from '@/Components/SubmitTodo';
import Todo from '@/Components/Todo';
import ReactPaginate from 'react-paginate';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props: any) {
    const todos = Array.isArray(props.todos.data) ? props.todos.data : [];
    const [currentPage] = useState(0);
    const todosPerPage = 10; // 1ページあたりのtodo数
    const [forcePage, setForcePage] = useState(props.todos.current_page - 1);

    // 現在のページに表示するtodosを計算
    const currentTodos = todos.slice(currentPage * todosPerPage, (currentPage + 1) * todosPerPage);

    // ページ変更時のハンドラ
    const handlePageClick = (event:any) => {
        const newPage = event.selected;
        setForcePage(newPage);
        Inertia.visit(`/todo?page=${newPage + 1}`);
    };

    // Todoをクリックした時の処理
    const handleTodoClick = (todo: any) => {
        // ここにクリックした時の処理を書く。例えば:
        console.log("Todo clicked:", todo);
    };

    return (
        <Authenticated auth={props.auth}>
            <div className="max-w-3xl mx-auto p-3 bg-white mt-3 border rounded">
                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="pb-2">todo</th>
                            <th className="pb-2">進捗</th>
                            <th className="pb-2">期日</th>
                            <th className="pb-2">削除</th>
                            <th className="pb-2">作成日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTodos.map((todo:any) => (
                            <Todo key={todo.id} todo={todo} onClick={handleTodoClick} />
                        ))}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"前"}
                    nextLabel={"次"}
                    breakLabel={"..."}
                    pageCount={props.todos.last_page}
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
                <hr className="my-3" />
                <SubmitTodo />
            </div>
        </Authenticated>
    );
}
