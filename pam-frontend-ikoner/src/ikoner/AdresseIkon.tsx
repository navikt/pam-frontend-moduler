/* eslint-disable */
import * as React from 'react';
import { BaseProps } from './types';

interface AdresseIkonProps extends BaseProps {
    fargeKode?: string;
}
const AdresseIkon = ({ className, fargeKode = '#0067C5' }: AdresseIkonProps) => (
    <svg width="24px" height="24px" viewBox="0 0 24 34" version="1.1" className={className} >
        <g id="Symbols" stroke="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <g id="header/-profil" transform="translate(-868.000000, -168.000000)" stroke={fargeKode}>
                <g id="location-pin-3" transform="translate(868.000000, 168.000000)">
                    <path d="M21.9583333,11.3333333 C21.9583333,17.204 11.3333333,33.2916667 11.3333333,33.2916667 C11.3333333,33.2916667 0.708333333,17.204 0.708333333,11.3333333 C0.708333333,5.4655 5.46408333,0.708333333 11.3333333,0.708333333 C17.2011667,0.708333333 21.9583333,5.4655 21.9583333,11.3333333 Z" id="Shape" />
                    <circle id="Oval" cx="11.3333333" cy="11.3333333" r="4.25" />
                </g>
            </g>
        </g>
    </svg>
);
export default AdresseIkon;
