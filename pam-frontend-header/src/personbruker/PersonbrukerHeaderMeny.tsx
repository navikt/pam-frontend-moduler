import * as React from 'react';
import { Personbruker } from './PropTypes';
import './PersonbrukerHeaderMeny.less';
import { HeaderUtenMenypunkter } from "./HeaderUtenMenypunkter";
import { InnloggetMeny } from "./InnloggetMeny";
import { PersonbrukerApplikasjon } from '..';


interface PersonbrukerHeaderMenyProps {
  loggInnUrl: string;
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
    loggInnUrl,
    applikasjon,
    validerNavigasjon
} : PersonbrukerHeaderMenyProps) => (
    <div>
        {erInnlogget ? (
            <InnloggetMeny
                loggUtUrl={loggUtUrl}
                personbruker={personbruker}
                applikasjon={applikasjon}
                validerNavigasjon={validerNavigasjon}
            />
        ) : (
            <HeaderUtenMenypunkter loggInnUrl={loggInnUrl} erInnlogget={false} />
        )}
    </div>
);
