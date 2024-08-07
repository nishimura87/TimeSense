import React from 'react';

interface Props {
    type?: "submit" | "button" | "reset" | undefined;
    className?: string;
    processing: boolean;
    children: React.ReactNode;
}

export default function Button({ type = 'submit', className = '', processing, children }: Props) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center flex justify-center px-4 py-3 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 
                text-sm ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
