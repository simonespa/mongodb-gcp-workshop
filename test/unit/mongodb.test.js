import { createSandbox } from 'sinon';
import mongodb from 'mongodb';
import { findDocumentById } from '../../src/mongodb';

const sandbox = createSandbox();

describe.skip('mongodb.js', () => {
  let mongodbStub;

  beforeEach(() => {
    mongodbStub = sandbox.stub(mongodb, 'db');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('findDocumentById', () => {
    it('', () => {
      // Given
      const findOneSpy = sandbox.spy();
      const collectionSpy = sandbox.spy().returns({
        findOne: findOneSpy
      });
      mongodbStub.returns({
        collection: collectionSpy
      });

      // When
      findDocumentById(mongodbStub, 'testId');

      // Then
      sandbox.assert.calledOnce(mongodbStub.db);
    });
  });

  describe('insertDocument', () => {});

  describe('openUploadStreamWithId', () => {});

  describe('openDownloadStream', () => {});
});
