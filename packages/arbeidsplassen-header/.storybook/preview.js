import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {withKnobs} from "@storybook/addon-knobs";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    layout: 'fullscreen'
}

export const decorators = [
    withKnobs,
    (Story) => (
        <>
            <BrowserRouter>
                <Story/>
            </BrowserRouter>
        </>
    )
]
