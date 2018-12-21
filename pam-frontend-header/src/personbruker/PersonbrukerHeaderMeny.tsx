import * as React from 'react';
import { Personbruker } from './PropTypes';
import './PersonbrukerHeaderMeny.less';
import { IkkeInnloggetMeny } from "./IkkeInnloggetMeny";
import { InnloggetMeny } from "./InnloggetMeny";
import { PersonbrukerApplikasjon } from '..';


interface PersonbrukerHeaderMenyProps {
  onLoggUt: () => void;
  onLoggInn: () => void;
  personbruker: Personbruker;
  erInnlogget: boolean;
  applikasjon: PersonbrukerApplikasjon
}


export const PersonbrukerHeaderMeny = ({ onLoggUt, erInnlogget, personbruker, onLoggInn, applikasjon } : PersonbrukerHeaderMenyProps) => (
    <div className="HeaderMeny">
        {erInnlogget ? (
            <InnloggetMeny onLoggUt={onLoggUt} personbruker={personbruker} applikasjon={applikasjon} />
        ) : (
            <IkkeInnloggetMeny onLoggInn={onLoggInn} />
        )}
    </div>
);
