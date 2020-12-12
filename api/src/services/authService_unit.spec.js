const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const authService = require('./authService');

describe('Auth Service', () => {
  const payload = { id: 1 };
  const privateKey = 'testKey';

  afterEach(() => {
    sinon.restore();
  });

  it('should return a hashed password', async () => {
    const password = 'a1234';
    const hashedSpy = sinon.spy(authService, 'getHashedPassword');

    const hashedPassword = await authService.getHashedPassword(password);

    expect(hashedSpy.calledOnce).to.be.true;
    expect(hashedPassword).to.be.a('string');
  });

  it('should return password integrity', async () => {
    const password = 'a1234';
    const hashedPassword =
      '$2b$10$VihMurcu/hZtfE69xJM84./AE47iqdUm2.TuegAgxU7mrH0YD4/pK';
    const hashedSpy = sinon.spy(authService, 'isValidPassword');

    const isValid = await authService.isValidPassword(password, hashedPassword);

    expect(hashedSpy.calledOnce).to.be.true;
    expect(isValid).to.be.true;
    expect(isValid).to.be.a('boolean');
  });

  it('should return signed token', () => {
    const signedSpy = sinon.spy(authService, 'getSignedToken');

    const signedToken = authService.getSignedToken(payload, privateKey);

    expect(signedSpy.calledOnce).to.be.true;
    expect(signedToken).to.be.a('string');
  });

  it('should return a decoded token', () => {
    const decodedSpy = sinon.spy(authService, 'getDecodedToken');

    const signedToken = authService.getSignedToken(payload, privateKey);
    const decodedToken = authService.getDecodedToken(signedToken, privateKey);

    expect(decodedSpy.calledOnce).to.be.true;
    expect(decodedToken).to.be.an('object');
  });

  it('should return hashed key', async () => {
    const hashedKeySpy = sinon.spy(authService, 'getHashedKey');

    const secretkey = authService.getHashedKey(payload);

    expect(hashedKeySpy.calledOnce).to.be.true;
    expect(secretkey).to.be.a('string');
  });
});
