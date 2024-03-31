import React from 'react';

interface Props {
    type?: "submit" | "button" | "reset" | undefined;
    className?: string;
    processing: boolean;
    children: React.ReactNode;
    onClick?: () => void; 
}

export default function DangerButton({ type = 'submit', className = '', processing, children, onClick }: Props) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center flex justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 
                ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}