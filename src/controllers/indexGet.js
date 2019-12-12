export default function indexGet(request, response, next) {
  response.status(200).render('index');
}
