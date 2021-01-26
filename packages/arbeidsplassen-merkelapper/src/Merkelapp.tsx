import * as React from 'react';
import './Merkelapp.less';

interface MerkelappProps {
    canRemove?: boolean;
    children: React.ReactNode;
    onRemove: (...args: any[]) => void;
    value: string;
}

const Merkelapp = ({
    canRemove,
    children,
    onRemove,
    value
}: MerkelappProps) => {
    const onRemoveClick = () => {
        if (onRemove) {
            onRemove(value);
        }
    };

    return (
        (canRemove || canRemove === undefined) ? (
            <button
                className="Merkelapp typo-element"
                aria-label="Slett"
                onClick={onRemoveClick}
                type="button"
            >
                <div className="Merkelapp__text">
                        {children}
                </div>
                <i className="Merkelapp__slett__icon" />
            </button>
        ) : (
            <div
                className="Merkelapp typo-element"
            >
                <div className="Merkelapp__text">
                        {children}
                </div>
            </div>
        )
    );
};

export default Merkelapp;
