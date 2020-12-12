const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const accountDataService = require('./accountDataService');
const Account = require('./models/traveler');
const DocumentType = require('./models/documentType');
const Address = require('./models/address');

describe('account service', () => {
  const errorResponse = {
    parent: { errno: 1 },
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('Get Account Details', () => {
    it('should return the current account', async () => {
      const accountMock = {
        id: 1,
        accountCode: 'T1',
        firstName: 'Jane',
        lastName: 'Doe',
        documentNumber: 'D001423',
        dateOfBirth: '1990-02-02',
        email: 'devdarklorddev@gmail.com',
        phone: '8023458888',
        createdAt: '2020-12-10T19:54:54.000Z',
        updatedAt: '2020-12-10T19:54:54.000Z',
        DocumentTypeId: 1,
        DocumentType: {
          id: 1,
          name: 'Passport',
        },
      };
      const accountStub = sinon.stub(Account, 'findByPk').returns(accountMock);
      const id = 1;

      const response = await accountDataService.getAccount(id);

      expect(accountStub.called).to.be.true;
      expect(response).to.deep.equal(accountMock);
      expect(response).to.be.an('object');
      expect(response).to.have.property('id');
      expect(response).to.have.property('DocumentType');
    });

    it('should return a list of document types', async () => {
      const documentTypeMock = [
        {
          id: 2,
          name: 'NationalId',
          deescription: null,
          createdAt: '2020-12-10T19:54:37.000Z',
          updatedAt: '2020-12-10T19:54:37.000Z',
        },
      ];
      const accountStub = sinon
        .stub(DocumentType, 'findAll')
        .returns(documentTypeMock);

      const response = await accountDataService.getDocumentTypes();

      expect(accountStub.called).to.be.true;
      expect(response).to.deep.equal(documentTypeMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('name');
    });

    it('should return a list of addresses', async () => {
      const addressesMock = [
        {
          id: 2,
          address: 'NationalId',
          city: '',
          country: '',
          state: '',
          zip: '',
          createdAt: '2020-12-10T19:54:37.000Z',
          updatedAt: '2020-12-10T19:54:37.000Z',
        },
      ];
      const addressStub = sinon.stub(Address, 'findAll').returns(addressesMock);
      const id = 2;

      const response = await accountDataService.getAddresses(id);

      expect(addressStub.called).to.be.true;
      expect(response).to.deep.equal(addressesMock);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('id');
      expect(response[0]).to.have.property('address');
      expect(response[0]).to.have.property('city');
      expect(response[0]).to.have.property('country');
    });
  });
});
