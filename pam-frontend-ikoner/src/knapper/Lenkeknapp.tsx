import * as React from 'react';
import { EditIkon } from '..';
import './Lenkeknapp.less';

type Ikon = 
    "Adresse"
    | "Edit"
    | "Liste"
    | "Mail"
    | "Printer"
    | "Slett"
    | "Telefon"

interface LenkeknappProps {
    ikon: Ikon;
    onClick: () => void;
}

const getIkon = (ikonType: Ikon) => {
    if (ikonType === "Adresse") {
        return <EditIkon />
    }
    return <EditIkon />
}


export default ({ ikon, onClick }: LenkeknappProps) => (
    <div className="typo-sidetittel">
        Ten tekst
        <button
            onClick={onClick}
            type="button"
            className="Lenkeknapp typo-sidetittel">
            {getIkon(ikon)}
            En tekst 2
        </button>

    </div>
)