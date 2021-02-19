import * as React from "react";
import {storiesOf} from '@storybook/react'
import {optionsKnob} from '@storybook/addon-knobs';
import {Arbeidsgivermeny, ArbeidsgiverTabId} from "../arbeidsgiver/Arbeidsgivermeny";
import {PersonbrukerApplikasjon, Personbrukermeny} from "../personbruker/Personbrukermeny";
import {AuthStatus, Header} from "../felles/Header";

const arbeidsgiverTabs = {
    VAAR_SIDE: ArbeidsgiverTabId.VAAR_SIDE,
    KANDIDATSOK: ArbeidsgiverTabId.KANDIDATSOK,
    KANDIDATLISTER: ArbeidsgiverTabId.KANDIDATLISTER,
    STILLINGSANNONSER: ArbeidsgiverTabId.STILLINGSANNONSER
}

const defaultActiveArbeidsgiverTab = ArbeidsgiverTabId.VAAR_SIDE

storiesOf('Arbeidsplassen header', module)
    .add('Arbeidsgivermeny', () => (
        <Arbeidsgivermeny
            activeTabID={
                optionsKnob(
                    'Aktiv fane',
                    arbeidsgiverTabs,
                    defaultActiveArbeidsgiverTab,
                    {
                        display: 'inline-radio'
                    },
                    'ACTIVE_ARBEIDSGIVER_TAB_GROUP'
                )
            }
        />
    ))
    .add('Personbrukermeny', () => (
        <Personbrukermeny
            applikasjon={
                optionsKnob(
                    'Applikasjon',
                    {
                        CV: PersonbrukerApplikasjon.CV,
                        STILLINGSSOK: PersonbrukerApplikasjon.STILLINGSSOK,
                    },
                    PersonbrukerApplikasjon.CV,
                    {
                        display: 'inline-radio'
                    },
                    'ACTIVE_PERSONBRUKER_APPLICATION'
                )
            }
            onNavigationClick={(_url) => () => null}
        />
    ))
    .add('Felles', () => (
        <Header
            authenticationStatus={
                optionsKnob(
                    'Authentication status',
                    AuthStatus,
                    AuthStatus.NOT_AUTHENTICATED,
                    {
                        display: 'inline-radio'
                    },
                    'AUTHENTICATION_STATUS'
                )
            }
            onLoginClick={() => null}
            onLogoutClick={() => null}
            useMenu={
                optionsKnob(
                    'Modus',
                    {
                        ARBEIDSGIVER: 'arbeidsgiver',
                        PERSONBRUKER: 'personbruker',
                        NOT_APPLICABLE: 'none'
                    },
                    'arbeidsgiver',
                    {
                        display: 'inline-radio'
                    },
                    'HEADER_MODUS'
                )
            }
        />
    ))
