import { createSandbox } from 'sinon';
import * as helper from '../../../src/helper';
import play from '../../../src/controllers/play';

const sandbox = createSandbox();

describe('controllers/play.js', function() {
  let request;
  let response;

  beforeEach(function() {
    request = {
      app: {
        locals: {
          mongodb: {}
        }
      },
      params: {
        id: 'test-id'
      }
    };
    response = {
      json: sandbox.spy()
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should pipe the audio stream if no error happens', function() {
    const pipeSpy = sandbox.spy();
    const helperStub = sandbox.stub(helper, 'openAudioStream').returns({
      pipe: pipeSpy
    });

    play(request, response);

    const { mongodb } = request.app.locals;
    const { id } = request.params;
    sandbox.assert.calledOnce(helperStub);
    sandbox.assert.calledWithExactly(helperStub, mongodb, id);
    sandbox.assert.calledOnce(pipeSpy);
    sandbox.assert.calledWithExactly(pipeSpy, response);
  });

  it('should render an error message if the audio stream throws an error', function() {
    const errorMessage = 'Error Message';
    sandbox.stub(helper, 'openAudioStream').throws(new Error(errorMessage));

    play(request, response);

    sandbox.assert.calledOnce(response.json);
    sandbox.assert.calledWithExactly(response.json, {
      error: errorMessage
    });
  });
});
