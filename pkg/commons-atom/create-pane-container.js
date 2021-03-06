'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export default function createPaneContainer(): Object {
  const PaneContainer = atom.workspace.paneContainer.constructor;
  return new PaneContainer({
    config: atom.config,
    applicationDelegate: atom.applicationDelegate,
    notificationManager: atom.notifications,
    deserializerManager: atom.deserializers,
  });
}
