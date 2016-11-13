'use babel';
/* @flow */

import {React} from 'react-for-atom';

import {Button} from '../../nuclide-ui/Button';
import {ButtonGroup} from '../../nuclide-ui/ButtonGroup';
import {Modal} from '../../nuclide-ui/Modal';

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

 type Props = {
     onDismiss: () => void,
 };

export default class WizardComponent extends React.Component {
    type: Props

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {}

    componentWillUnmount(): void {}

    render(): React.Element<any> {
        return (
            <Modal onDismiss={this.props.onDismiss}>
                <div className="block">
                    <label>New Project Wizard</label>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <ButtonGroup>
                    <Button onClick={this.props.onDismiss}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </div>
            </Modal>
        );
    }
}
