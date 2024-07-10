import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';

registerLocale('ja', ja);

interface SearchFormProps {
    onMonthChange: (month: number) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onMonthChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // DatePickerで選択された月が変更された際に呼ばれるコールバック
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            const selectedMonth = date.getMonth();
            onMonthChange(selectedMonth);
        }
    };

    const today = new Date();

    return (
        <div className="mb-4">
            <DatePicker
                locale="ja"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                todayButton="今日"
                showMonthYearPicker
                showFullMonthYearPicker
                maxDate={today}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm cursor-pointer ${className}"
            />
        </div>
    );
};

export default SearchForm;
