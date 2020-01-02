import { createSandbox } from 'sinon';
import homeGet from '../../../src/controllers/homeGet';

const sandbox = createSandbox();

describe('controllers/homeGet.js', function() {
  it('should render the "home" view', function() {
    // Given
    let request;
    const response = {
      status: sandbox.stub().returnsThis(),
      render: sandbox.spy()
    };
    // When
    homeGet(request, response);
    // Then
    sandbox.assert.calledOnce(response.status);
    sandbox.assert.calledWithExactly(response.status, 200);

    sandbox.assert.calledOnce(response.render);
    sandbox.assert.calledWithExactly(response.render, 'home');

    // Cleanup
    sandbox.restore();
  });
});
