import * as React from "react";
import {storiesOf} from '@storybook/react'
import {optionsKnob} from '@storybook/addon-knobs';
import {Arbeidsgivermeny, ArbeidsgiverTabId} from "../arbeidsgiver/Arbeidsgivermeny";
import {PersonbrukerApplikasjon, Personbrukermeny} from "../personbruker/Personbrukermeny";

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
