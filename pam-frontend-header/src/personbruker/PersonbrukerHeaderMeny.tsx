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
  applikasjon: PersonbrukerApplikasjon;
  visAlleMenyPunkter?: boolean;
}


export const PersonbrukerHeaderMeny = ({ onLoggUt, erInnlogget, personbruker, onLoggInn, applikasjon, visAlleMenyPunkter = false } : PersonbrukerHeaderMenyProps) => (
    <div className="HeaderMeny">
        {erInnlogget ? (
            <InnloggetMeny onLoggUt={onLoggUt} personbruker={personbruker} applikasjon={applikasjon} visAlleMenyPunkter={visAlleMenyPunkter} />
        ) : (
            <IkkeInnloggetMeny onLoggInn={onLoggInn} />
        )}
    </div>
);
