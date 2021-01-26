import * as React from 'react';
import Knapp, { KnappProps } from './Knapp';

const Lenkeknapp = (props: KnappProps) => {
    return <Knapp type="link" {...props} />;
};

export default Lenkeknapp;
