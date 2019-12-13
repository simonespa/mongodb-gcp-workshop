import { createSandbox } from 'sinon';
import indexGet from '../../../src/controllers/indexGet';

const sandbox = createSandbox();

describe('controllers/indexGet.js', function() {
  it('should render the "index" view', function() {
    // Given
    let request;
    const response = {
      status: sandbox.stub().returnsThis(),
      render: sandbox.spy()
    };
    // When
    indexGet(request, response);
    // Then
    sandbox.assert.calledOnce(response.status);
    sandbox.assert.calledWithExactly(response.status, 200);

    sandbox.assert.calledOnce(response.render);
    sandbox.assert.calledWithExactly(response.render, 'index');

    // Cleanup
    sandbox.restore();
  });
});
