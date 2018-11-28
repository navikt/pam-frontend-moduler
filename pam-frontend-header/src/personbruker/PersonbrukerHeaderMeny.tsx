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


export const PersonbrukerHeaderMeny = ({ onLoggUt, erInnlogget, personbruker, onLoggInn } : PersonbrukerHeaderMenyProps) => {
    return (
        <div className="HeaderMeny">
            {!erInnlogget ? (
                <IkkeInnloggetMeny onLoggInn={onLoggInn} />
            ) : (
                <InnloggetMeny onLoggUt={onLoggUt} personbruker={personbruker} />
            )}
        </div>
    );
};
