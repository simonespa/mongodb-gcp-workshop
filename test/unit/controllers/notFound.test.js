import { createSandbox } from 'sinon';
import notFound from '../../../src/controllers/notFound';

const sandbox = createSandbox();

describe('controllers/notFound.js', () => {
  let request;
  let response;
  let next;

  before(() => {
    next = sandbox.spy();
  });

  after(() => {
    sandbox.restore();
  });

  it('should redirect to the error handler rendering the "Page Not Found" view', () => {
    // When
    notFound(request, response, next);
    // Then
    sandbox.assert.calledOnce(next);
    sandbox.assert.calledWithExactly(next, sandbox.match.instanceOf(Error));
    sandbox.assert.calledWithExactly(
      next,
      sandbox.match.has('message', 'PAGE_NOT_FOUND')
    );
  });
});
