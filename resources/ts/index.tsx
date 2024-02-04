import React from 'react';
import { createRoot } from 'react-dom/client';

// index.blade.phpのid="app"を読み込む
const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <div className="text-blue-500 text-4xl">
        Laravel React+Typescrip+Tailwind環境構築
    </div>
);