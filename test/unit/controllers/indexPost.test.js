import { createSandbox } from 'sinon';
import indexPost from '../../../src/controllers/indexPost';

const sandbox = createSandbox();

describe.skip('controllers/indexPost.js', () => {
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

  it('should ...', () => {
    // When
    indexPost(request, response);
    // Then
    sandbox.assert.calledOnce(response.status);
    sandbox.assert.calledWithExactly(response.status, 200);

    sandbox.assert.calledOnce(response.render);
    sandbox.assert.calledWithExactly(response.render, 'index');
  });
});
