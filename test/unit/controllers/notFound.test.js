import { createSandbox } from 'sinon';
import notFound from '../../../src/controllers/notFound';

const sandbox = createSandbox();

describe('controllers/notFound.js', function() {
  it('should redirect to the error handler rendering the "Page Not Found" view', function() {
    // Given
    let request;
    let response;
    const next = sandbox.spy();
    // When
    notFound(request, response, next);
    // Then
    sandbox.assert.calledOnce(next);
    sandbox.assert.calledWithExactly(next, sandbox.match.instanceOf(Error));
    sandbox.assert.calledWithExactly(
      next,
      sandbox.match.has('message', 'PAGE_NOT_FOUND')
    );
    // Cleanup
    sandbox.restore();
  });
});
