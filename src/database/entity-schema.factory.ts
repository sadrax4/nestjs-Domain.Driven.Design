import { AggregateRoot } from '@nestjs/cqrs';

import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export interface EntitySchemaFactory<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> {
  create(entity);
  createFromSchema(entitySchema): TEntity;
}
