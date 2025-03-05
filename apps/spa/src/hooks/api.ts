import { apiClient } from "#lib/api/index";
import createClient from "openapi-react-query";

export const {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useSuspenseQuery,
  queryOptions,
} = createClient(apiClient)
