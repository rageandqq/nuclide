'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import {React, ReactDOM} from 'react-for-atom';
import {Disposable} from 'atom';

import createPackage from '../../commons-atom/createPackage';
import UniversalDisposable from '../../commons-node/UniversalDisposable';

import WizardComponent from './WizardComponent';

let atomPanel: ?atom$Panel;
let dialogComponent: ?React$Component<any, any, any>;

class Activation {
  _disposables: UniversalDisposable;

  constructor(state: ?mixed) {
    this._disposables = new UniversalDisposable();

    this._disposables.add(new Disposable(this._closeDialog.bind(this)));
    this._disposables.add(atom.commands.add(
        'atom-workspace',
        'nuclide-new-project-wizard:open',
        this._openDialog.bind(this),
      ),
    );
  }

  _openDialog(): void {
    const props = {
        onDismiss: this._closeDialog.bind(this),
    };
    const elem = document.createElement('div');
    atomPanel = atom.workspace.addModalPanel({item: elem});
    dialogComponent = ReactDOM.render(
        <WizardComponent {...props}/>,
        elem,
    );
  }

  _closeDialog(): void {
    if (atomPanel != null) {
      if (dialogComponent != null) {
        ReactDOM.unmountComponentAtNode(atomPanel.getItem());
        dialogComponent = null;
      }

      atomPanel.destroy();
      atomPanel = null;
    }
  }

  dispose(): void {
    this._disposables.dispose();
  }
}

export default createPackage(Activation);
