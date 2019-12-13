import { createSandbox } from 'sinon';
import cacheControl from '../../../src/controllers/cacheControl';

const sandbox = createSandbox();

describe('controllers/cacheControl.js', () => {
  let request;
  let response;
  let next;

  before(() => {
    request = null;
    response = {
      set: sandbox.spy()
    };
    next = sandbox.spy();
  });

  after(() => {
    sandbox.restore();
  });

  it('should set the "Cache-Control" header once and call the next middleware', () => {
    // When
    cacheControl(request, response, next);
    // Then
    sandbox.assert.calledOnce(response.set);
    sandbox.assert.calledOnce(next);
    sandbox.assert.calledWithExactly(
      response.set,
      'Cache-Control',
      'public, max-age=0, no-cache, no-store'
    );
    sandbox.assert.calledWithExactly(next);
  });
});
