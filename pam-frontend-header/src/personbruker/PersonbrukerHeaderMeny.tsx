import * as React from 'react';
import { Personbruker } from './PropTypes';
import './PersonbrukerHeaderMeny.less';
import { IkkeInnloggetMeny } from "./IkkeInnloggetMeny";
import { InnloggetMeny } from "./InnloggetMeny";
import { PersonbrukerApplikasjon } from '..';


interface PersonbrukerHeaderMenyProps {
  onLoggUt: () => void;
  onLoggInn: () => void;
  validerNavigasjon?: ValiderNavigasjonProps;
  personbruker: Personbruker;
  erInnlogget: boolean;
  applikasjon: PersonbrukerApplikasjon;
  visAlleMenyPunkter?: boolean;
}

export interface ValiderNavigasjonProps {
  valider: () => boolean;
  callback: (url: string) => void;
}


export const PersonbrukerHeaderMeny = ({
    onLoggUt,
    erInnlogget,
    personbruker,
    onLoggInn,
    applikasjon,
    validerNavigasjon,
    visAlleMenyPunkter = false
} : PersonbrukerHeaderMenyProps) => (
    <div className="HeaderMeny">
        {erInnlogget ? (
            <InnloggetMeny
                onLoggUt={onLoggUt}
                personbruker={personbruker}
                applikasjon={applikasjon}
                validerNavigasjon={validerNavigasjon}
                visAlleMenyPunkter={visAlleMenyPunkter}
            />
        ) : (
            <IkkeInnloggetMeny onLoggInn={onLoggInn} />
        )}
    </div>
);
