'use babel';
/* @flow */

import {React} from 'react-for-atom';

import {AtomInput} from '../../nuclide-ui/AtomInput';
import {Button} from '../../nuclide-ui/Button';
import {ButtonGroup} from '../../nuclide-ui/ButtonGroup';
import {Dropdown} from '../../nuclide-ui/Dropdown';
import {Modal} from '../../nuclide-ui/Modal';
import {Section} from '../../nuclide-ui/Section';

import type {ProjectType} from './main';
/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

type Props = {
  onDismiss: () => void,
  projectTypes: Array<ProjectType>,
};

type State = {
  projectName: string,
  projectPath: string,
  projectTypeIndex: ?number,
};

export default class WizardComponent extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
          projectName: "",
          projectPath: "",
          projectTypeIndex: null,
        };
    }

    componentDidMount(): void {}

    componentWillUnmount(): void {}

    _onProjectNameChanged(name: string): void {
      this.setState({
        projectName: name,
      });
    }

    _onProjectPathChanged(path: string): void {
      this.setState({
        projectPath: path,
      });
    }

    _onProjectTypeChanged(typeIndex: number): void {
      this.setState({
        projectTypeIndex: typeIndex,
      });
    }

    _onCreate(): void {
      let {projectPath} = this.state;
      const {projectName} = this.state;

      if (projectPath.trim() === '') {
        projectPath = './';
      }

      const projectFullPath = projectPath.concat(projectName);

      this.props.onDismiss();
      // TODO: Call `onCreate` prop
    }

    render(): React.Element<any> {
        return (
            <Modal onDismiss={this.props.onDismiss}>
              <div className="nuclide-new-project-wizard-content">
                <h2>New Project Wizard</h2>
                <div>
                  <span>Project Name</span>
                  <AtomInput
                    size="lg"
                    initialValue={this.state.projectName}
                    placeholderText="My Awesome Nuclide Project"
                    onDidChange={this._onProjectNameChanged.bind(this)}/>

                  <span>Project Path</span>
                  <AtomInput
                    size="lg"
                    initialValue={this.state.projectPath}
                    placeholderText="./"
                    onDidChange={this._onProjectNameChanged.bind(this)}/>

                  <span>Project Type</span>
                  <Dropdown
                    className="nuclide-new-project-wizard-dropdown"
                    value={this.state.projectTypeIndex}
                    options={this.props.projectTypes}
                    onChange={this._onProjectTypeChanged.bind(this)}/>
                </div>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end"}}>
                <ButtonGroup>
                  <Button
                    onClick={this.props.onDismiss}>
                    Cancel
                  </Button>
                  <Button
                    buttonType={"PRIMARY"}
                    onClick={this._onCreate.bind(this)}>
                    Create
                  </Button>
                </ButtonGroup>
              </div>
            </Modal>
        );
    }
}
