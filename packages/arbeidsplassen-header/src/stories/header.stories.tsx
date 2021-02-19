import * as React from "react";
import {storiesOf} from '@storybook/react'
import {optionsKnob} from '@storybook/addon-knobs';
import {Arbeidsgivermeny, ArbeidsgiverTabId} from "../arbeidsgiver/Arbeidsgivermeny";

const activeTabs = {
    VAAR_SIDE: ArbeidsgiverTabId.VAAR_SIDE,
    KANDIDATSOK: ArbeidsgiverTabId.KANDIDATSOK,
    KANDIDATLISTER: ArbeidsgiverTabId.KANDIDATLISTER,
    STILLINGSANNONSER: ArbeidsgiverTabId.STILLINGSANNONSER
}

const defaultActiveTab = ArbeidsgiverTabId.VAAR_SIDE

storiesOf('Arbeidsplassen header', module)
    .add('kandidatlister', () => (
        <Arbeidsgivermeny
            activeTabID={
                optionsKnob(
                    'Active tab',
                    activeTabs,
                    defaultActiveTab,
                    {
                        display: 'inline-radio'
                    },
                    'ACTIVE_TAB_GROUP'
                )
            }
        />
    ))
