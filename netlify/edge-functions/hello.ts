import { Context } from 'https://edge.netlify.com';

export default (_: Request, context: Context) =>
  context.json({ message: 'Hello chat!' });
