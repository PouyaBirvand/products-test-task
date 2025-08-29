import { z } from "zod";

export const searchParamsSchema = z.object({
  q: z.string().optional().default(""),
  sort: z.enum(["name", "price"]).optional().default("name"),
  dir: z.enum(["asc", "desc"]).optional().default("asc"),
  page: z.coerce.number().min(1).optional().default(1),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export function parseSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  const result = searchParamsSchema.safeParse(searchParams);
  return result;
}
