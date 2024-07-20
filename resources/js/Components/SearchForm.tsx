import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ja', ja);

// SearchFormコンポーネントのプロパティの型を定義
interface SearchFormProps {
    onMonthChange: (month: string) => void;
    initialMonth?: string; // 初期値として表示する月
}

const SearchForm: React.FC<SearchFormProps> = ({ onMonthChange, initialMonth }) => {
    const [selectedMonth, setSelectedMonth] = useState<Date | null>(
        initialMonth ? new Date(`${initialMonth}-01`) : null
    );
    const datePickerRef = useRef<DatePicker>(null);

    const handleMonthChange = (date: Date | null) => {
        if (date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 月は0から始まるため1を加える
            const formattedMonth = `${year}-${month.toString().padStart(2, '0')}`; // YYYY-MM形式に変換
            setSelectedMonth(date); // 状態を更新
            onMonthChange(formattedMonth);
            // カレンダーを閉じる処理
            setTimeout(() => {
                if (datePickerRef.current) {
                    datePickerRef.current.setOpen(false);
                }
            }, 0);
        }
    };

    return (
        <div className="mb-4">
            <label>
                タスクを作成した月表示:
                <DatePicker
                    locale="ja"
                    selected={selectedMonth}
                    onChange={handleMonthChange}
                    todayButton="今月"
                    placeholderText="表示月を選択" 
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    className="ml-2 p-1 border rounded"
                    ref={datePickerRef}
                />
            </label>
        </div>
    );
};

export default SearchForm;
