import { z } from 'zod';

export const tbGenSchema = z.object({
  id: z.number().int().min(0),
  name: z.string().min(1),
});

export type TbGen = z.infer<typeof tbGenSchema>; 