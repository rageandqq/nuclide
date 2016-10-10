'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type {NuclideUri} from '../../commons-node/nuclideUri';
import type {
  Definition,
  DefinitionQueryResult,
} from '../../nuclide-definition-service/lib/rpc-types';
import type {LanguageService} from './LanguageService';

import {ConnectionCache} from '../../nuclide-remote-connection';
import {trackTiming} from '../../nuclide-analytics';
import {getFileVersionOfEditor} from '../../nuclide-open-files';

export type DefinitionConfig = {
  version: string,
  priority: number,
};

export class DefinitionProvider<T: LanguageService> {
  name: string;
  priority: number;
  grammarScopes: Array<string>;
  _connectionToLanguageService: ConnectionCache<T>;

  constructor(
    name: string,
    grammars: Array<string>,
    priority: number,
    connectionToLanguageService: ConnectionCache<T>,
  ) {
    this.name = name + 'DefinitionProvider';
    this.priority = priority;
    this.grammarScopes = grammars;
    this._connectionToLanguageService = connectionToLanguageService;
  }

  static register(
    name: string,
    grammars: Array<string>,
    config: DefinitionConfig,
    connectionToLanguageService: ConnectionCache<T>,
  ): IDisposable {
    return atom.packages.serviceHub.provide(
      'nuclide-definition-provider',
      config.version,
      new DefinitionProvider(
        name,
        grammars,
        config.priority,
        connectionToLanguageService,
      ));
  }

  // TODO: Fixup track timing id
  @trackTiming('hack.get-definition')
  async getDefinition(editor: TextEditor, position: atom$Point): Promise<?DefinitionQueryResult> {
    const fileVersion = await getFileVersionOfEditor(editor);
    const languageService = this._connectionToLanguageService.getForUri(editor.getPath());
    if (languageService == null || fileVersion == null) {
      return null;
    }
    return await (await languageService).getDefinition(fileVersion, position);
  }

  // TODO: Fixup track timing id
  @trackTiming('hack.get-definition-by-id')
  async getDefinitionById(filePath: NuclideUri, id: string): Promise<?Definition> {
    const languageService = this._connectionToLanguageService.getForUri(filePath);
    if (languageService == null) {
      return null;
    }

    return await (await languageService).getDefinitionById(filePath, id);
  }
}
