import { createSandbox } from 'sinon';
import cacheControl from '../../../src/controllers/cacheControl';

const sandbox = createSandbox();

describe('controllers/cacheControl.js', function() {
  it('should set the "Cache-Control" header once and call the next middleware', function() {
    // Given
    let request;
    const response = {
      set: sandbox.spy()
    };
    const next = sandbox.spy();
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
    // Cleanup
    sandbox.restore();
  });
});
