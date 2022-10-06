# firebase-emulator-react-scripts

This repo is created to highlight an error when using the `'@firebase/rules-unit-testing'` SDK and firestore emulator.

To reproduce:

```
cd my-app
yarn install
yarn test
```

You will get this output

```
Error: FIRESTORE (8.10.1) INTERNAL ASSERTION FAILED: Unexpected state

    at fail (/Users/julestestard/go/src/github.com/piepacker/firestore-react-scripts-error/my-app/node_modules/@firebase/rules-unit-testing/node_modules/@firebase/firestore/src/util/assert.ts:40:9)
    at hardAssert (/Users/julestestard/go/src/github.com/piepacker/firestore-react-scripts-error/my-app/node_modules/@firebase/rules-unit-testing/node_modules/@firebase/firestore/src/util/assert.ts:54:5)
    at fromBytes (/Users/julestestard/go/src/github.com/piepacker/firestore-react-scripts-error/my-app/node_modules/@firebase/rules-unit-testing/node_modules/@firebase/firestore/src/remote/serializer.ts:252:5)
    at fromWatchChange (/Users/julestestard/go/src/github.com/piepacker/firestore-react-scripts-error/my-app/node_modules/@firebase/rules-unit-testing/node_modules/@firebase/firestore/src/remote/serializer.ts:475:25)
```
