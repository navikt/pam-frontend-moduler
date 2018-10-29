import * as React from 'react';
import { Container, Row, Column } from 'nav-frontend-grid';
import { Panel } from 'nav-frontend-paneler';
import { Innholdstittel, Normaltekst, Element } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import ArbeidsgiverSelect from './ArbeidsgiverSelect';
import { Header } from './Header';
import { Arbeidsgiver } from './PropTypes';

import './VelgArbeidsgiver.less';

const LENKE_RETTIGHETER = 'https://www.altinn.no/hjelp/profil/roller-og-rettigheter/';

interface VelgArbeidsgiverProps {
  onArbeidsgiverSelect: (orgNummer?: string) => void;
  arbeidsgivere: Array<Arbeidsgiver>;
  valgtArbeidsgiverId?: string;
  onLoggUt: () => void;
}

export const VelgArbeidsgiver = ({ arbeidsgivere, valgtArbeidsgiverId, onArbeidsgiverSelect, onLoggUt } : VelgArbeidsgiverProps) => (
    <div>
        <Header onLoggUt={onLoggUt} />
        <Container className="container-arbeidsgiver">
            <Panel className="panel--arbeidsgiver">
                <Row className="text-center blokk-xxs">
                    <Ikon kind="info-sirkel-orange" />
                </Row>
                <Row className="text-center blokk-xxs">
                    <Innholdstittel>Velg aktuell arbeidsgiver </Innholdstittel>
                </Row>
                <Row className="text-center blokk-s">
                    <div className="stroke" />
                </Row>
                <Row className="">
                    <Column xs="12">
                        <Normaltekst className="blokk-s">
                            Du representerer flere arbeidsgivere. Velg aktuell arbeidsgiver fra listen under.
                        </Normaltekst>
                        <Row className="text-center blokk-s">
                            <ArbeidsgiverSelect
                                arbeidsgivere={arbeidsgivere}
                                valgtArbeidsgiverId={valgtArbeidsgiverId}
                                onArbeidsgiverSelect={onArbeidsgiverSelect}
                            />
                        </Row>
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
                            Mer informasjon om tildeling av roller og rettigheter finnes på:{' '}
                            <a
                                className="lenke"
                                href={LENKE_RETTIGHETER}
                            >
                                Altinn
                            </a>
                        </Normaltekst>
                    </Column>
                </Row>
            </Panel>
        </Container>
    </div>
);
