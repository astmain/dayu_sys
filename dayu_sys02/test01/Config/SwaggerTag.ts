import { SetMetadata } from '@nestjs/common';

export const SWAGGER_TAG_KEY = 'swagger:tag';

export const SwaggerTag = (tag: string): ClassDecorator => SetMetadata(SWAGGER_TAG_KEY, tag);
