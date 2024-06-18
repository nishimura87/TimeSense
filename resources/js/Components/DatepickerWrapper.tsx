import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ja', ja);

interface Props {
    selected: Date | null;
    initialDate: Date;
    onChange: (date: Date | null) => void;
}

const DatepickerWrapper: React.FC<Props> = ({ selected, initialDate, onChange }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected || initialDate);
    const today = new Date();
    
    const getDayClassName = (date: Date): string => {
        const day = date.getDay();
        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        // 今日より前の日付にはスタイルを適用しない
        if (date < today && !isToday) {
            return '';
        }
        if (day === 6) {
            return 'react-datepicker__day--saturday';
        } else if (day === 0) {
            return 'react-datepicker__day--sunday';
        }
        return '';
    };

    const handleChange = (date: Date | null): void => {
        setSelectedDate(date);
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <>
            <style>
                {`
                    .react-datepicker__day--saturday {
                        color: blue;
                    }
                    .react-datepicker__day--sunday {
                        color: red;
                    }
                `}
            </style>
            <DatePicker
                locale="ja"
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="yyyy-MM-dd"
                dateFormatCalendar="yyyy年 MM月"
                todayButton="今日"
                dayClassName={getDayClassName}
                minDate={today}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm cursor-pointer ${className}"
            />
        </>
    );
};

DatepickerWrapper.propTypes = {
    selected: PropTypes.instanceOf(Date), // Date型であることを検証
    initialDate: PropTypes.instanceOf(Date).isRequired, // 必須のDate型であることを検証
    onChange: PropTypes.func.isRequired, // 必須の関数であることを検証
};

export default DatepickerWrapper;
