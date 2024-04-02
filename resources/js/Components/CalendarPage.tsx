import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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

  const handleDateSelect = (selectInfo: MyDateSelectArg) => {
    const startDate = new Date(selectInfo.startStr);
    const endDate = new Date(selectInfo.endStr);
    
    const formatter = new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format;

  const formatDateTime = (date:Date) => {
    // Intl.DateTimeFormatでのフォーマット後、日付と時刻の間にTが入るのを修正
    return formatter(date).replace(/\//g, '-').replace(/(\d{2}):(\d{2}):(\d{2})/, ' $1:$2:$3');
  };

  const formattedStartDate = formatDateTime(startDate);
  const formattedEndDate = formatDateTime(endDate);

  // フォーマットされた日付でアラート表示
  alert(`日時: ${formattedStartDate} から ${formattedEndDate}`);
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // 選択した部分の選択を解除
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
        events={'https://fullcalendar.io/api/demo-feeds/events.json'}
        select={handleDateSelect}
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
      />
    </div>
  );
}

export default CalendarPage;