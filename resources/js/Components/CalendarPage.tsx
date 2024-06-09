import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleModal from '@/Components/scheduleModal';

interface MyDateSelectArg {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    allDay: boolean;
    view: {
        calendar: {
        unselect: () => void;
        };
    };
}

function CalendarPage() {
  // eventsステートとそれを更新するsetEvents関数を定義
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false); // モーダルの表示状態
    const [selectedRange, setSelectedRange] = useState({ start: '', end: '' }); // 選択した日付範囲

    useEffect(() => {
        // APIからスケジュールデータを取得し、eventsステートを更新する
        const fetchEvents = async () => {
        const response = await fetch('/api/schedules', {
        headers: {
            'Accept': 'application/json', // サーバーにJSONレスポンスを期待していることを示す
        }
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // データを整形し、setEventsを使ってeventsステートを更新
        const formattedEvents = data.map((event) => ({
            title: event.task.title,
            start: event.start_date,
            end: event.end_date,
        }));
        setEvents(formattedEvents);
        };

        fetchEvents();
    }, []);
    
    const handleDateSelect = (selectInfo: MyDateSelectArg) => {
        setSelectedRange({ start: selectInfo.startStr, end: selectInfo.endStr });
        setModalShow(true); // モーダルを表示
        selectInfo.view.calendar.unselect();
    };

    const handleModalClose = () => {
        setModalShow(false);
    };

    const handleModalSave = async (title: string, description: string, start: string, end: string, setModalShow: (show: boolean) => void) => {
        const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : '';

        // APIエンドポイントにデータを送信
        try {
            // スケジュールの保存
            const scheduleResponse = await fetch('/api/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '' // csrfTokenがnullの場合に空文字列を設定
            },
            body: JSON.stringify({ start, end })
            });

            if (!scheduleResponse.ok) {
            console.error('Failed to add schedule');
            return;
            }

            const scheduleData = await scheduleResponse.json();
            const scheduleId = scheduleData.schedule_id;

            // タスクの保存
            const taskResponse = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '' // csrfTokenがnullの場合に空文字列を設定
            },
            body: JSON.stringify({ title, schedule_id: scheduleId })
            });

            if (taskResponse.ok) {
            console.log('Task added successfully');
            setModalShow(false);
            } else {
            console.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-4/5">
        <FullCalendar
            plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locales={[jaLocale]}
            locale='ja'
            headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay',
            }}
            events={events} // stateから取得したイベントデータを使用
            select={handleDateSelect}
            selectable={true}
            selectMirror={true}
            allDaySlot={false}
        />
        <ScheduleModal
            isOpen={modalShow}
            onClose={handleModalClose}
            onSave={handleModalSave}
            start={selectedRange.start}
            end={selectedRange.end} 
        />
        </div>
    );
}

export default CalendarPage;