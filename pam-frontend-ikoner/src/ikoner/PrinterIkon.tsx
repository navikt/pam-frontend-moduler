import * as React from 'react';
import { BaseProps } from './types';

const PrinterIkon = ({ fargeKode = '#0067C5', className }: BaseProps) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
    >
        <g
            stroke={fargeKode}
            fill="none"
        >
            <path d="M5.5 18.5h-3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h19c1.101 0 2 .9 2 2v6c0 1.1-.899 2-2 2h-3M5.5 6.5v-4h10l3 3v1" />
            <path d="M5.5 15.5h13v8h-13z" />
            <circle cx="3.5" cy="11.5" r="1" />
            <path d="M7.5 17.5h9M7.5 19.5h9M7.5 21.5h9M15.5 2.5v3h3" />
        </g>
    </svg>
);

export default PrinterIkon;
