import * as React from 'react';
import { Personbruker } from './PropTypes';
import './PersonbrukerHeaderMeny.less';
import { IkkeInnloggetMeny } from "./IkkeInnloggetMeny";
import { InnloggetMeny } from "./InnloggetMeny";
import { PersonbrukerApplikasjon } from '..';


interface PersonbrukerHeaderMenyProps {
  onLoggInn: () => void;
  loggUtUrl: string;
  validerNavigasjon?: ValiderNavigasjonProps;
  personbruker: Personbruker;
  erInnlogget: boolean;
  applikasjon: PersonbrukerApplikasjon;
}

export interface ValiderNavigasjonProps {
  redirectTillates: () => boolean;
  redirectForhindretCallback: (url: string) => void;
}


export const PersonbrukerHeaderMeny = ({
    loggUtUrl,
    erInnlogget,
    personbruker,
    onLoggInn,
    applikasjon,
    validerNavigasjon
} : PersonbrukerHeaderMenyProps) => (
    <div className="PersonbrukerHeaderMeny">
        {erInnlogget ? (
            <InnloggetMeny
                loggUtUrl={loggUtUrl}
                personbruker={personbruker}
                applikasjon={applikasjon}
                validerNavigasjon={validerNavigasjon}
            />
        ) : (
            <IkkeInnloggetMeny onLoggInn={onLoggInn} />
        )}
    </div>
);
