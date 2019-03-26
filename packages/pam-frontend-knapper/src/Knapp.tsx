import * as React from 'react';
import classNames from 'classnames';
import { CustomHTMLButtonAttributes } from './CustomHTMLButtonAttributes';
import './styles.less';

export interface KnappProps extends CustomHTMLButtonAttributes {
    htmlType?: 'submit' | 'button' | 'reset';
    mini?: boolean;
    spinner?: boolean;
    type?: 'hoved' | 'link' | 'flat';
}

const Knapp = ({
    children,
    className,
    disabled,
    htmlType,
    mini,
    onClick,
    spinner,
    type,
    ...rest
}: KnappProps) => {
    const cls = () => classNames('Knapp', className, {
        'Knapp--hoved': type === 'hoved',
        'Knapp--link': type === 'link',
        'Knapp--flat': type === 'flat',
        'Knapp--mini': mini,
        'Knapp--disabled': disabled,
        'Knapp--spinner': spinner
    });

    const spinnerNode = spinner ? <span className="Knapp__spinner" /> : null;
    const ariaLabel= spinner ? { 'aria-label': 'Laster' } : {};

    return (
        <button
            className={cls()}
            disabled={disabled}
            onClick={onClick}
            type={htmlType}
            {...ariaLabel}
            {...rest}
        >
            {children}
            {spinnerNode}
        </button>
    );
};

export default Knapp;
