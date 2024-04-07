import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import TaskModal from '@/Components/TaskModal';

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

  const handleModalSave = (title: string, description: string, start: string, end: string) => {
    console.log(title);
    console.log(description);
    console.log(start);
    console.log(end);
    // 処理内容
    setModalShow(false);
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
      <TaskModal
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