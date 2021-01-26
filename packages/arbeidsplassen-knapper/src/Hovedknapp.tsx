import * as React from 'react';
import Knapp, { KnappProps } from './Knapp';

const Hovedknapp = (props: KnappProps) => {
    return <Knapp type="hoved" {...props} />;
};

export default Hovedknapp;
