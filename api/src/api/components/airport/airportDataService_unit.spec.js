const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const airportDataService = require('./airportDataService');
const Airport = require('./airport');

describe('Airport Service', () => {
  const errorResponse = {
    parent: { errno: 1 },
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('Get Airports', () => {
    it('should return a list of airports', async () => {
      const airportsMock = [
        {
          id: 1,
          name: 'Hamburg Airport',
          address: '',
          code: 'HAM',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          CityId: 7,
        },
      ];
      const airportStub = sinon.stub(Airport, 'findAll').returns(airportsMock);
      const query = {};

      const response = await airportDataService.getAll(query);

      expect(airportStub.called).to.be.true;
      expect(response).to.deep.equal(airportsMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('CityId');
    });

    it('should return a list of airports by code', async () => {
      const airportsMock = [
        {
          id: 3,
          name: 'Sochi International Airport',
          address: '',
          code: 'AER',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          CityId: 3,
        },
      ];
      const airportStub = sinon.stub(Airport, 'findAll').returns(airportsMock);
      const query = { code: 'AER' };

      const response = await airportDataService.getAll(query);

      expect(airportStub.called).to.be.true;
      expect(response).to.deep.equal(airportsMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('CityId');
    });

    it('should return a list of airports by name', async () => {
      const airportsMock = [
        {
          id: 9,
          name: 'Barcelona Airport',
          address: '',
          code: 'BCN',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          CityId: 9,
        },
      ];
      const airportStub = sinon.stub(Airport, 'findAll').returns(airportsMock);
      const query = { name: 'Barcelona Airport' };

      const response = await airportDataService.getAll(query);

      expect(airportStub.called).to.be.true;
      expect(response).to.deep.equal(airportsMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('CityId');
    });

    it('should return an sql error', async () => {
      const airportStub = sinon.stub(Airport, 'findAll').returns(errorResponse);

      const response = await airportDataService.getAll();

      expect(airportStub.called).to.be.true;
      expect(response).to.deep.equal(errorResponse);
      expect(response).to.be.an('object');
      expect(response.parent).to.have.property('errno');
    });
  });

  describe('Add Airport', () => {
    it('should create a new airport', async () => {
      const airportMock = {
        name: 'Barcelona Airport',
        address: '',
        code: 'BCN',
        CityId: 9,
      };
      const airportStub = sinon.stub(Airport, 'create').returns(airportMock);

      const response = await airportDataService.add(airportMock);

      expect(airportStub.called).to.be.true;
      expect(response).to.deep.equal(airportMock);
      expect(response).to.be.an('object');
      expect(response).to.have.property('name');
      expect(response).to.have.property('address');
      expect(response).to.have.property('code');
      expect(response).to.have.property('CityId');
    });
  });
});
