# Snackbar

## What this is

This is a basic snackbar example, that shows a message and could provide an undo-action to revert the last action. The snackbar simply slides up or down when show() or hide() is called. If a second notification occurs while one is already showing, the first one is hidden before the second one is shown. This could result in unread messages, so think about implementing some kind of queue if necessary.

## Installation

After cloning the repository, run

```npm install```

to install dependencies and then

```react-native run-[ios/android]```

to fire up the application.

## Additional Information

Can be found in index.android.js
