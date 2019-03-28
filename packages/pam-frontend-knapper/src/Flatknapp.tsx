import * as React from 'react';
import Knapp, { KnappProps } from './Knapp';

const Flatknapp = (props: KnappProps) => {
    return <Knapp type="flat" {...props} />;
};

export default Flatknapp;
