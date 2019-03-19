import * as React from 'react';
import './Popover.less'; 

const isDescendant = function isDescendant(parent: Node, child: Node) {
    let node = child.parentNode;
    while (node != null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

interface PopoverProps {
    onClose: () => void;
    children: any;
}

class Popover extends React.Component<PopoverProps> {
    el: any;

    componentDidMount() {
        document.body.addEventListener('click', this.onClickOutside);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.onClickOutside);
    }

    onClickOutside = (e: any) => {
        if (this.el !== e.target && !isDescendant(this.el, e.target)) {
            this.close();
        }
    };

    close = () => {
        this.props.onClose();
    };

    render() {
        const { children } = this.props;
        return (
            <div ref={(el) => { this.el = el; }} className="Popover">
                <button
                    className="Popover__close"
                    onClick={this.close}
                >
                    Lukk
                </button>
                {children}
            </div>
        );
    }
}

export default Popover;