export default function handler(request, response) {
  const name = request.query.name || 'World';
  response.status(200).send(`Hello, ${name}!`);
}