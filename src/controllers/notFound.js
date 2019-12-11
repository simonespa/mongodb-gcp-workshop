export default function notFound(request, response, next) {
  next(new Error('PAGE_NOT_FOUND'));
}
