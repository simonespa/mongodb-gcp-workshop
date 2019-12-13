import { openAudioStream } from '../helper';

export default function play(request, response) {
  const { mongodb } = request.app.locals;
  const { id } = request.params;
  try {
    openAudioStream(mongodb, id).pipe(response);
  } catch (error) {
    response.json({
      error: error.message
    });
  }
}
