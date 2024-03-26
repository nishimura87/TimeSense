import React from 'react';

interface Props {
    errors: any;
    className?: string;
}

export default function ValidationErrors({ errors, className }: Props) {
    return (
        <div className={className}>
            { Object.keys(errors).length > 0 && (
                <div className="mb-4">
                    <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                        {Object.keys(errors).map(function (key, index) {
                            return <li key={index}>{errors[key]}</li>;
                        })}
                    </ul>
                </div>
            )
            }
        </div>
    );
}
