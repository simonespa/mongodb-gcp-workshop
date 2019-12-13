import { createSandbox } from 'sinon';
import indexGet from '../../../src/controllers/indexGet';

const sandbox = createSandbox();

describe('controllers/indexGet.js', () => {
  let request;
  let response;

  before(() => {
    response = {
      status: sandbox.stub().returnsThis(),
      render: sandbox.spy()
    };
  });

  after(() => {
    sandbox.restore();
  });

  it('should render the "index" view', () => {
    // When
    indexGet(request, response);
    // Then
    sandbox.assert.calledOnce(response.status);
    sandbox.assert.calledWithExactly(response.status, 200);

    sandbox.assert.calledOnce(response.render);
    sandbox.assert.calledWithExactly(response.render, 'index');
  });
});
