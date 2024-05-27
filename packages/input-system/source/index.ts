// We can't use "import *" because it breaks treeshaking.
// See: https://github.com/evanw/esbuild/issues/1420
import {
  aKey,
  altLeftKey,
  altRightKey,
  arrowDownKey,
  arrowLeftKey,
  arrowRightKey,
  arrowUpKey,
  bKey,
  backquoteKey,
  backslashKey,
  backspaceKey,
  bracketLeftKey,
  bracketRightKey,
  cKey,
  capsLockKey,
  commaKey,
  contextMenuKey,
  controlLeftKey,
  controlRightKey,
  copyKey,
  cutKey,
  dKey,
  deleteKey,
  digit0Key,
  digit1Key,
  digit2Key,
  digit3Key,
  digit4Key,
  digit5Key,
  digit6Key,
  digit7Key,
  digit8Key,
  digit9Key,
  eKey,
  endKey,
  enterKey,
  equalKey,
  escapeKey,
  f1Key,
  f2Key,
  f3Key,
  f4Key,
  f5Key,
  f6Key,
  f7Key,
  f8Key,
  f9Key,
  f10Key,
  f11Key,
  f12Key,
  f13Key,
  f14Key,
  f15Key,
  f16Key,
  f17Key,
  f18Key,
  f19Key,
  f20Key,
  f21Key,
  f22Key,
  f23Key,
  f24Key,
  fKey,
  findKey,
  fnKey,
  gKey,
  hKey,
  helpKey,
  homeKey,
  iKey,
  insertKey,
  jKey,
  kKey,
  lKey,
  mKey,
  metaLeftKey,
  metaRightKey,
  minusKey,
  nKey,
  numLockKey,
  numpad0Key,
  numpad1Key,
  numpad2Key,
  numpad3Key,
  numpad4Key,
  numpad5Key,
  numpad6Key,
  numpad7Key,
  numpad8Key,
  numpad9Key,
  numpadAddKey,
  numpadDecimalKey,
  numpadDivideKey,
  numpadEnterKey,
  numpadEqualKey,
  numpadMultiplyKey,
  numpadSubtractKey,
  oKey,
  osLeftKey,
  osRightKey,
  pKey,
  pageDownKey,
  pageUpKey,
  pasteKey,
  pauseKey,
  periodKey,
  printScreenKey,
  propsKey,
  qKey,
  quoteKey,
  rKey,
  sKey,
  scrollLockKey,
  semicolonKey,
  shiftLeftKey,
  shiftRightKey,
  slashKey,
  spaceKey,
  tKey,
  tabKey,
  uKey,
  undoKey,
  vKey,
  volumeDownKey,
  volumeMuteKey,
  volumeUpKey,
  wKey,
  xKey,
  yKey,
  zKey,
} from "./keyboard/keys";

import {
  init as kInit,
  isInitialized as kIsInitialized,
  update as kUpdate,
  registerKey,
} from "./keyboard/state";

/** Defines a simple API to interact with Keyboard input. */
export const Keyboard = Object.freeze(
  // Combine everything into a single class for convenience.
  // The consumer can decide how to import it.
  Object.assign(class Keyboard {}, {
    init: kInit,
    isInitialized: kIsInitialized,
    registerKey,
    update: kUpdate,

    aKey,
    altLeftKey,
    altRightKey,
    arrowDownKey,
    arrowLeftKey,
    arrowRightKey,
    arrowUpKey,
    bKey,
    backquoteKey,
    backslashKey,
    backspaceKey,
    bracketLeftKey,
    bracketRightKey,
    cKey,
    capsLockKey,
    commaKey,
    contextMenuKey,
    controlLeftKey,
    controlRightKey,
    copyKey,
    cutKey,
    dKey,
    deleteKey,
    digit0Key,
    digit1Key,
    digit2Key,
    digit3Key,
    digit4Key,
    digit5Key,
    digit6Key,
    digit7Key,
    digit8Key,
    digit9Key,
    eKey,
    endKey,
    enterKey,
    equalKey,
    escapeKey,
    f1Key,
    f2Key,
    f3Key,
    f4Key,
    f5Key,
    f6Key,
    f7Key,
    f8Key,
    f9Key,
    f10Key,
    f11Key,
    f12Key,
    f13Key,
    f14Key,
    f15Key,
    f16Key,
    f17Key,
    f18Key,
    f19Key,
    f20Key,
    f21Key,
    f22Key,
    f23Key,
    f24Key,
    fKey,
    findKey,
    fnKey,
    gKey,
    hKey,
    helpKey,
    homeKey,
    iKey,
    insertKey,
    jKey,
    kKey,
    lKey,
    mKey,
    metaLeftKey,
    metaRightKey,
    minusKey,
    nKey,
    numLockKey,
    numpad0Key,
    numpad1Key,
    numpad2Key,
    numpad3Key,
    numpad4Key,
    numpad5Key,
    numpad6Key,
    numpad7Key,
    numpad8Key,
    numpad9Key,
    numpadAddKey,
    numpadDecimalKey,
    numpadDivideKey,
    numpadEnterKey,
    numpadEqualKey,
    numpadMultiplyKey,
    numpadSubtractKey,
    oKey,
    osLeftKey,
    osRightKey,
    pKey,
    pageDownKey,
    pageUpKey,
    pasteKey,
    pauseKey,
    periodKey,
    printScreenKey,
    propsKey,
    qKey,
    quoteKey,
    rKey,
    sKey,
    scrollLockKey,
    semicolonKey,
    shiftLeftKey,
    shiftRightKey,
    slashKey,
    spaceKey,
    tKey,
    tabKey,
    uKey,
    undoKey,
    vKey,
    volumeDownKey,
    volumeMuteKey,
    volumeUpKey,
    wKey,
    xKey,
    yKey,
    zKey,
  }),
);

import {
  delta,
  init as mInit,
  isInitialized as mIsInitialized,
  update as mUpdate,
} from "./mouse";

import {
  backButton,
  forwardButton,
  leftButton,
  middleButton,
  rightButton,
} from "./mouse/buttons";

/** Defines a simple API to interact with the Mouse. */
export const Mouse = Object.freeze(
  Object.assign(class Mouse {}, {
    init: mInit,
    isInitialized: mIsInitialized,
    update: mUpdate,
    delta,

    leftButton,
    middleButton,
    rightButton,
    backButton,
    forwardButton,
  }),
);
