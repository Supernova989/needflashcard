import { shuffle } from "../utils";

describe("Function 'Shuffle'", () => {
  test("Should return the same length", () => {
    const a = [11, 22, 33, 44, 55, 66, 77, 88, 99];
    const l = a.length;
    expect(shuffle(a).length).toBe(l);
  });
  test("Should return the same elements in a different order", () => {
    const a = [{ f1: 1 }, { f2: 2 }, { f3: 3 }, { f4: 4 }, { f5: 5 }, { f6: 6 }, { f7: 7 }];
    expect(shuffle(a)).toEqual(expect.arrayContaining(a));
  });
});
