// generate-prisma.ts
import { getModels, getModelFields } from './decorators';
import fs from 'fs';

function generatePrismaSchema() {
  let schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}\n\n`;

  for (const model of getModels()) {
    const modelName = model.name;
    const fields = getModelFields(model);
    schema += `model ${modelName} {\n`;

    for (const field of fields) {
      const { name, options } = field;
      const attrs: string[] = [];

      if (options.id) attrs.push('@id');
      if (options.generated) attrs.push('@default(autoincrement())');
      else if (options.default) {
        attrs.push(`@default(${options.default})`);
      }

      schema += `  ${name} ${options.type}${attrs.length ? ' ' + attrs.join(' ') : ''}\n`;
    }

    schema += `}\n\n`;
  }

  fs.writeFileSync('schema.prisma', schema);
  console.log('✅ Prisma schema generated to schema.prisma');
}

generatePrismaSchema();
