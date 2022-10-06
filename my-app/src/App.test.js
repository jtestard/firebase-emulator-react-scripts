import {
  assertFails,
  assertSucceeds,
  initializeTestApp,
  loadFirestoreRules,
} from '@firebase/rules-unit-testing'
import fs from "fs";

export const user1ID = 'BkgtLV6o1GTNsW6hXpRK3eJbhG02';

describe('firestore', () => {
  let user1;
  const projectId = `rules-spec-${Date.now()}`;
  beforeAll(async () => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))
    try {
      await loadFirestoreRules({
        projectId,
        rules: fs.readFileSync('src/allowall.rules', 'utf8'),
      });
    } catch (e) {
      console.error("firestore rules load", e)
    }
    var admin = await initializeTestApp({projectId: projectId});
    const adminDB = admin.firestore();
    for (const doc of users) {
      const ref = adminDB.doc(`users/${doc.ID}`);
      try {
        await ref.set(doc.Data);
      } catch (e) {
        console.error("setting admin data", e)
      }
    }
    const user1App = await initializeTestApp({
      projectId: projectId,
      auth: { uid: user1ID },
    });
    user1 = user1App.firestore()
    expect.extend({
      async toAllow(x) {
        let pass = false;
        try {
          await assertSucceeds(x);
          pass = true;
        } catch (err) {}

        return {
          pass,
          message: () =>
              'Expected Firebase operation to be allowed, but it was denied',
        };
      },
    });

    expect.extend({
      async toDeny(x) {
        let pass = false;
        try {
          await assertFails(x);
          pass = true;
        } catch (err) {}
        return {
          pass,
          message: () =>
              'Expected Firebase operation to be denied, but it was allowed',
        };
      },
    });
  })

  test('user_extras', async () => {
    const ref1 = user1.doc(`users/${user1ID}`);

    // Read user doc with self id should succeed
    await expect(ref1.get()).toAllow();
  });



  //
  // afterAll(async () => {
  //   await teardown();
  // });
});
