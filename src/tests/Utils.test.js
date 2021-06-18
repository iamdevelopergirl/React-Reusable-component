import {isNil, isString} from '../Utils.js';

it("should return correct value for isNil", ()=>{
    let ret = isNil(null);
    expect(ret).toBe(true);

    ret = isNil(undefined);
    expect(ret).toBe(true);

    ret = isNil();
    expect(ret).toBe(true);

    ret = isNil({});
    expect(ret).toBe(false);

    ret = isNil({"1" : "1"});
    expect(ret).toBe(false);
});

it("should return correct value for isString", ()=>{
    let ret = isString(null);
    expect(ret).toBe(false);

    ret = isString(undefined);
    expect(ret).toBe(false);

    ret = isString();
    expect(ret).toBe(false);

    ret = isString({});
    expect(ret).toBe(false);

    ret = isString({"1" : "1"});
    expect(ret).toBe(false);

    ret = isString("formdata");
    expect(ret).toBe(true);
});