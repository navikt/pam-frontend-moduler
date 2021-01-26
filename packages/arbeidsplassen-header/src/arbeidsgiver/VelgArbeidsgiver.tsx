import * as React from 'react';
import { Container, Row, Column } from 'nav-frontend-grid';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import ArbeidsgiverSelect from './ArbeidsgiverSelect';
import { Arbeidsgiver } from './PropTypes';
import { Header, AuthStatus } from '../felles/Header';
import './VelgArbeidsgiver.less';

const LENKE_RETTIGHETER = 'https://www.altinn.no/hjelp/profil/roller-og-rettigheter/';

interface VelgArbeidsgiverProps {
  onArbeidsgiverSelect: (orgNummer?: string) => void;
  arbeidsgivere: Array<Arbeidsgiver>;
  valgtArbeidsgiverId?: string;
  onLoggUt: () => void;
}

export const VelgArbeidsgiver = ({ arbeidsgivere, valgtArbeidsgiverId, onArbeidsgiverSelect, onLoggUt } : VelgArbeidsgiverProps) => (
    <React.Fragment>
        <Header
            onLogoutClick={onLoggUt}
            onLoginClick={() => {}}
            authenticationStatus={AuthStatus.IS_AUTHENTICATED}
            useMenu="none"
        />
        <div className="subheader">
            <Container>
                <h1 className="h1 display-1">Velg aktuell arbeidsgiver</h1>
            </Container>
        </div>
        <Container className="container-arbeidsgiver">
            <Panel className="panel--arbeidsgiver">
                <Row className="">
                    <Column xs="12">
                        <Element className="element--underscore blokk-s">
                            Du representerer flere arbeidsgivere
                        </Element>
                        <div className="blokk-m">
                            <ArbeidsgiverSelect
                                arbeidsgivere={arbeidsgivere}
                                valgtArbeidsgiverId={valgtArbeidsgiverId}
                                onArbeidsgiverSelect={onArbeidsgiverSelect}
                                label="Velg aktuell arbeidsgiver fra listen under."
                            />
                        </div>
                        <Element>Finner du ikke den aktuelle arbeidsgiveren i listen?</Element>
                        <Normaltekst>
                            Bruk av våre rekrutteringstjenester forutsetter at du har fått tilgang til Altinn-tjenesten
                            Rekruttering for virksomheten du representerer. Disse rollene gir deg automatisk tilgang:
                        </Normaltekst>
                        <ul>
                            <li><Normaltekst>Utfyller/Innsender</Normaltekst></li>
                            <li><Normaltekst>Lønn og personalmedarbeider</Normaltekst></li>
                        </ul>

                        <Normaltekst className="blokk-s">
                            Alternativt kan du få tilgang til enkelttjenesten Rekruttering.
                        </Normaltekst>
                        <Normaltekst className="blokk-s">
                            {'Mer informasjon om tildeling av roller og rettigheter finnes på '}
                            <a
                                className="link ekstern-lenke"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={LENKE_RETTIGHETER}
                            >
                                Altinn
                            </a>
                        </Normaltekst>
                    </Column>
                </Row>
            </Panel>
        </Container>
    </React.Fragment>
);
