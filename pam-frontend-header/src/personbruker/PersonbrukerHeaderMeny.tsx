import * as React from 'react';
import { Personbruker } from './PropTypes';
import './PersonbrukerHeaderMeny.less';
import { IkkeInnloggetMeny } from "./IkkeInnloggetMeny";
import { InnloggetMeny } from "./InnloggetMeny";


interface PersonbrukerHeaderMenyProps {
  onLoggUt: () => void;
  onLoggInn: () => void;
  personbruker: Personbruker;
  erInnlogget: boolean;
}


export const PersonbrukerHeaderMeny = ({ onLoggUt, erInnlogget, personbruker, onLoggInn } : PersonbrukerHeaderMenyProps) => (
    <div className="HeaderMeny">
        {erInnlogget ? (
            <InnloggetMeny onLoggUt={onLoggUt} personbruker={personbruker} />
        ) : (
            <IkkeInnloggetMeny onLoggInn={onLoggInn} />
        )}
    </div>
);
