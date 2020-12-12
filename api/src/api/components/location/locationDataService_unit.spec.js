const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const locationDataService = require('./locationDataService');
const Region = require('./models/region');
const Country = require('./models/country');
const City = require('./models/city');

describe('location service', () => {
  const errorResponse = {
    parent: { errno: 1 },
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('Get Regions', () => {
    it('should return a list of regions', async () => {
      const regionsMock = [
        {
          id: 1,
          name: 'Asia',
          description: '',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ];
      const regionStub = sinon.stub(Region, 'findAll').returns(regionsMock);

      const response = await locationDataService.getRegions();

      expect(regionStub.called).to.be.true;
      expect(response).to.deep.equal(regionsMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
    });

    it('should return an sql error', async () => {
      const regionStub = sinon.stub(Region, 'findAll').returns(errorResponse);

      const response = await locationDataService.getRegions();

      expect(regionStub.called).to.be.true;
      expect(response).to.deep.equal(errorResponse);
      expect(response).to.be.an('object');
      expect(response.parent).to.have.property('errno');
    });
  });

  describe('Get Countries', () => {
    it('should return a list of countries', async () => {
      const countriessMock = [
        {
          id: 1,
          name: 'Barcelona',
          description: '',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          RegionId: 4,
        },
      ];
      const countryStub = sinon
        .stub(Country, 'findAll')
        .returns(countriessMock);

      const response = await locationDataService.getCountries();

      expect(countryStub.called).to.be.true;
      expect(response).to.deep.equal(countriessMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('RegionId');
    });

    it('should return an sql error', async () => {
      const countryStub = sinon.stub(Country, 'findAll').returns(errorResponse);

      const response = await locationDataService.getCountries();

      expect(countryStub.called).to.be.true;
      expect(response).to.deep.equal(errorResponse);
      expect(response).to.be.an('object');
      expect(response.parent).to.have.property('errno');
    });
  });

  describe('Get Cities', () => {
    it('should return a list of cities', async () => {
      const citiesMock = [
        {
          id: 9,
          name: 'Asia',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          CountryId: 40,
        },
      ];
      const cityStub = sinon.stub(City, 'findAll').returns(citiesMock);

      const response = await locationDataService.getCities();

      expect(cityStub.called).to.be.true;
      expect(response).to.deep.equal(citiesMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('CountryId');
    });

    it('should return an sql error', async () => {
      const cityStub = sinon.stub(Region, 'findAll').returns(errorResponse);

      const response = await locationDataService.getRegions();

      expect(cityStub.called).to.be.true;
      expect(response).to.deep.equal(errorResponse);
      expect(response).to.be.an('object');
      expect(response.parent).to.have.property('errno');
    });
  });
});
