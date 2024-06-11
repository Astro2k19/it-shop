import { ApiError } from '@it-shop/schemas';

export function isFetchBaseQueryError(
    error: unknown
): error is { data: ApiError } {
    return typeof error === 'object' && error != null && 'data' in error;
}
