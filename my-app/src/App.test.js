import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing'
import { setDoc, doc } from "firebase/firestore";
import fs from "fs";

export const user1ID = 'BkgtLV6o1GTNsW6hXpRK3eJbhG02';

describe('firestore', () => {
  const projectId = `rules-spec-${Date.now()}`;
  beforeAll(async () => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))
    var admin = await initializeTestEnvironment({
      projectId: projectId,
      firesore: {rules: fs.readFileSync('src/allowall.rules', 'utf8')}
    });
    const adminDB = admin.authenticatedContext("admin");
    const d = users[0]
    const ref = doc(adminDB.firestore(), `users/${d.ID}`)
    try {
      await setDoc(ref, {data: "some-data"});
    } catch (e) {
      console.error("setting admin data", e)
    }
  })
  test('do nothing', async () => {
  });
});
