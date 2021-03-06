import * as React from "react";
import {storiesOf} from '@storybook/react'
import {optionsKnob} from '@storybook/addon-knobs';
import {Arbeidsgivermeny, ArbeidsgiverTabId} from "../arbeidsgiver/Arbeidsgivermeny";
import {PersonbrukerApplikasjon, Personbrukermeny} from "../personbruker/Personbrukermeny";
import {AuthStatus, Header} from "../felles/Header";
import {VelgArbeidsgiver} from "../arbeidsgiver/VelgArbeidsgiver";

storiesOf('Arbeidsplassen header', module)
    .add('Arbeidsgivermeny', () => (
        <Arbeidsgivermeny
            activeTabID={
                optionsKnob(
                    'Aktiv fane',
                    ArbeidsgiverTabId,
                    ArbeidsgiverTabId.VAAR_SIDE,
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
    .add('Velg arbeidsgiver', () => (
        <VelgArbeidsgiver
            arbeidsgivere={
                [
                    {
                        orgNummer: '111111111',
                        navn: 'Bed Rift AS'
                    },
                    {
                        orgNummer: '222222222',
                        navn: 'Evil Corp'
                    }
                ]
            }
            valgtArbeidsgiverId={
                optionsKnob(
                    'Valgt arbeidsgiver',
                    {
                        NONE: '',
                        BED_RIFT_AS: '111111111',
                        EVIL_CORP: '222222222'
                    },
                    '',
                    {
                        display: 'inline-radio'
                    },
                    'SELECTED_ORGANIZATION'
                )
            }
            onLoggUt={() => null}
            onArbeidsgiverSelect={console.log}
        />
    ))
