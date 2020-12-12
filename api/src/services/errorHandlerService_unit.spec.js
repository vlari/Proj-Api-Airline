const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const errorHandlerService = require('./errorHandlerService');

describe('Error Handler Service', () => {
  it('should return an error object', () => {
    const error = { statusCode: 500, message: 'Error' };
    const json = sinon.spy();
    const status = sinon.stub();
    const res = { json, status };
    status.returns(res);

    errorHandlerService.handleError(error, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });
});
