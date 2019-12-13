import { expect } from 'chai';
import { createSandbox } from 'sinon';
import error from '../../../src/controllers/error';

const sandbox = createSandbox();

describe('controllers/error.js', function() {
  let errorObj;
  let request;
  let response;
  let next;

  beforeEach(function() {
    next = sandbox.spy();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when the header has been already sent', function() {
    it('should call the default Express error handler', function() {
      // Given
      errorObj = new Error();
      response = { headersSent: true };
      // When
      error(errorObj, request, response, next);
      // Then
      sandbox.assert.calledOnce(next);
      sandbox.assert.calledWithExactly(next, errorObj);
    });
  });

  describe('when the header has not been sent yet', function() {
    beforeEach(function() {
      request = {
        path: '/test/path'
      };
      response = {
        headersSent: false,
        locals: {},
        status: sandbox.spy(),
        render: sandbox.spy()
      };
    });

    it('should render the "Page Not Found" view', function() {
      // Given
      errorObj = new Error('PAGE_NOT_FOUND');
      // When
      error(errorObj, request, response, next);
      // Then
      sandbox.assert.notCalled(next);

      sandbox.assert.calledOnce(response.render);
      sandbox.assert.calledWithExactly(response.render, 'other');

      sandbox.assert.calledOnce(response.status);
      sandbox.assert.calledWithExactly(response.status, 404);

      expect(response.locals).to.be.deep.equal({
        title: 'Page not found',
        content: `Can't find ${request.path}`
      });
    });

    it('should render the "Error page" view', function() {
      // Given
      errorObj = new Error('anything else');
      // When
      error(errorObj, request, response, next);
      // Then
      sandbox.assert.notCalled(next);

      sandbox.assert.calledOnce(response.render);
      sandbox.assert.calledWithExactly(response.render, 'other');

      sandbox.assert.calledOnce(response.status);
      sandbox.assert.calledWithExactly(response.status, 500);

      expect(response.locals).to.be.deep.equal({
        title: 'Error',
        content: errorObj.message
      });
    });
  });
});
