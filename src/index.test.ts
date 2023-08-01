import { isEquals } from ".";

it("如果ab类型不相等则返回false", () => {
  //基础类型有 number, string, boolean, undefined, null, symbol
  //复杂一点的数据类型 object function array
  expect(isEquals(1, "1")).toBe(false);
  expect(isEquals(1, true)).toBe(false);
  expect(isEquals(0, undefined)).toBe(false);
  expect(isEquals(0, null)).toBe(false);
  expect(isEquals(0, Symbol(0))).toBe(false);
  expect(isEquals("1", true)).toBe(false);
  expect(isEquals("0", undefined)).toBe(false);
  expect(isEquals("0", null)).toBe(false);
  expect(isEquals("0", Symbol("0"))).toBe(false);
  //BOOLEAN
  expect(isEquals(false, undefined)).toBe(false);
  expect(isEquals(false, null)).toBe(false);
  expect(isEquals(false, Symbol())).toBe(false);

  //undefined
  expect(isEquals(null, undefined)).toBe(false);
  expect(isEquals(Symbol(), null)).toBe(false);
  expect(isEquals(undefined, Symbol())).toBe(false);

  //基础数据类型和复杂数据类型的比较
  expect(isEquals({ value: 0 }, 0)).toBe(false);
  expect(isEquals({ value: 0 }, "0")).toBe(false);
  expect(isEquals({}, false)).toBe(false);
  expect(isEquals({}, undefined)).toBe(false);
  expect(isEquals({}, null)).toBe(false);
  expect(isEquals({}, Symbol())).toBe(false);

  expect(isEquals([0], 0)).toBe(false);
  expect(isEquals(["0"], "0")).toBe(false);
  expect(isEquals([], true)).toBe(false);
  expect(isEquals([], undefined)).toBe(false);
  expect(isEquals([], null)).toBe(false);
  expect(isEquals([], Symbol())).toBe(false);

  //复杂数据类型之间的比较
  expect(isEquals({}, [])).toBe(false);
  expect(
    isEquals({}, () => {
      //
    })
  ).toBe(false);

  // expect(isEquals(1, 2)).toBe(true);
  // expect(isEquals(false, true)).toBe(true);
});

it("如果两个参数是基本类型并且值相等，则相等", () => {
  //如果参数为基础数据类型的情况
  expect(isEquals(1, 1)).toBe(true);
  expect(isEquals(1, 2)).toBe(false);
  expect(isEquals("1", "1")).toBe(true);
  expect(isEquals("1", "2")).toBe(false);
  expect(isEquals(false, false)).toBe(true);
  expect(isEquals(false, true)).toBe(false);
  expect(isEquals(undefined, undefined)).toBe(true);
  expect(isEquals(null, null)).toBe(true);
  expect(isEquals(undefined, null)).toBe(false);
  expect(isEquals(Symbol(), Symbol())).toBe(false);

  expect(isEquals({}, {})).toBe(false);
  expect(isEquals([], [])).toBe(false);
});

it("如果两个参数NaN", () => {
  expect(isEquals(NaN, NaN)).toBe(true);
});

it("-0和+0相等", () => {
  expect(isEquals(+0, -0)).toBe(true);
});

it("如果是两个对象，则比较对象的所有字段是否相等", () => {
  expect(isEquals({value: "1"}, {value: "1"})).toBe(true);
  expect(isEquals({value: "1"}, {value: "2"})).toBe(false);
  expect(isEquals(["0", "1"], ["0", "1"])).toBe(true);
  expect(isEquals([0 , "1"], [0, "1"])).toBe(true);
  expect(isEquals([0 , "1"], ["1", 0])).toBe(false);
  expect(isEquals([], [])).toBe(true);
  expect(isEquals({}, {})).toBe(true);
});
