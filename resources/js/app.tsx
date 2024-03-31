import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client"; // 変更: createRootをインポート
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el); // 新しい root インスタンスを作成
        root.render(<App {...props} />); // renderメソッドの代わりにroot.renderを使用
    },
});

InertiaProgress.init({ color: "#4B5563" });