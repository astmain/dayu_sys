// models.ts
import { Model, Field } from './decorators';

@Model()
export class User {
  @Field({ type: 'Int', id: true, generated: true })
  id: number;

  @Field({ type: 'String' })
  name: string;

  @Field({ type: 'DateTime', default: 'now()' })
  createdAt: Date;
}
