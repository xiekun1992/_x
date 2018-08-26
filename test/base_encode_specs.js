'use strict';

var baseEncode = new BaseEncode();
describe('when use base64,', function() {
  it('"" should equal ""', function() {
    expect(baseEncode.base64("")).toEqual("");
  });
  it('f should equal Zg==', function() {
    expect(baseEncode.base64("f")).toEqual("Zg==");
  });
  it('fo should equal Zm8=', function() {
    expect(baseEncode.base64("fo")).toEqual("Zm8=");
  });
  it('foo should equal Zm9v', function() {
    expect(baseEncode.base64("foo")).toEqual("Zm9v");
  });
  it('foob should equal Zm9vYg==', function() {
    expect(baseEncode.base64("foob")).toEqual("Zm9vYg==");
  });
  it('fooba should equal Zm9vYmE=', function() {
    expect(baseEncode.base64("fooba")).toEqual("Zm9vYmE=");
  });
  it('foobar should equal Zm9vYmFy', function() {
    expect(baseEncode.base64("foobar")).toEqual("Zm9vYmFy");
  });
});

describe('when use base32,', function() {
  it('"" should equal ""', function() {
    expect(baseEncode.base32("")).toEqual("");
  });
  it('f should equal MY======', function() {
    expect(baseEncode.base32("f")).toEqual("MY======");
  });
  it('fo should equal MZXQ====', function() {
    expect(baseEncode.base32("fo")).toEqual("MZXQ====");
  });
  it('foo should equal MZXW6===', function() {
    expect(baseEncode.base32("foo")).toEqual("MZXW6===");
  });
  it('foob should equal MZXW6YQ=', function() {
    expect(baseEncode.base32("foob")).toEqual("MZXW6YQ=");
  });
  it('fooba should equal MZXW6YTB', function() {
    expect(baseEncode.base32("fooba")).toEqual("MZXW6YTB");
  });
  it('foobar should equal MZXW6YTBOI======', function() {
    expect(baseEncode.base32("foobar")).toEqual("MZXW6YTBOI======");
  });
});

describe('when use base32hex,', function() {
  it('"" should equal ""', function() {
    expect(baseEncode.base32hex("")).toEqual("");
  });
  it('f should equal CO======', function() {
    expect(baseEncode.base32hex("f")).toEqual("CO======");
  });
  it('fo should equal CPNG====', function() {
    expect(baseEncode.base32hex("fo")).toEqual("CPNG====");
  });
  it('foo should equal CPNMU===', function() {
    expect(baseEncode.base32hex("foo")).toEqual("CPNMU===");
  });
  it('foob should equal CPNMUOG=', function() {
    expect(baseEncode.base32hex("foob")).toEqual("CPNMUOG=");
  });
  it('fooba should equal CPNMUOJ1', function() {
    expect(baseEncode.base32hex("fooba")).toEqual("CPNMUOJ1");
  });
  it('foobar should equal CPNMUOJ1E8======', function() {
    expect(baseEncode.base32hex("foobar")).toEqual("CPNMUOJ1E8======");
  });
});

describe('when use base16,', function() {
  it('"" should equal ""', function() {
    expect(baseEncode.base16("")).toEqual("");
  });
  it('f should equal 66', function() {
    expect(baseEncode.base16("f")).toEqual("66");
  });
  it('fo should equal 666F', function() {
    expect(baseEncode.base16("fo")).toEqual("666F");
  });
  it('foo should equal 666F6F', function() {
    expect(baseEncode.base16("foo")).toEqual("666F6F");
  });
  it('foob should equal 666F6F62', function() {
    expect(baseEncode.base16("foob")).toEqual("666F6F62");
  });
  it('fooba should equal 666F6F6261', function() {
    expect(baseEncode.base16("fooba")).toEqual("666F6F6261");
  });
  it('foobar should equal 666F6F626172', function() {
    expect(baseEncode.base16("foobar")).toEqual("666F6F626172");
  });
});