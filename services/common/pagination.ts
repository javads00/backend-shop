export const paginate = async (query: any, total: number, limit: string, page: string) => {
    let temp = query.sort('-updatedAt');

    const pagination: {
        next?: { page: number; limit: number };
        prev?: { page: number; limit: number };
    } = {};

    const limitHandler = parseInt(limit as string, 10) || 10;
    const newPage = parseInt(page as string, 10) || 1;
    const startIndex = (newPage - 1) * limitHandler;
    const endIndex = newPage * limitHandler;

    temp = temp.skip(startIndex).limit(limitHandler);
    if (startIndex > 0) {
    pagination.prev = {
        page: newPage - 1,
        limit: limitHandler,
    };
    }
    if (endIndex < total) {
    pagination.next = {
        page: newPage + 1,
        limit: limitHandler,
    };
    }

    return await temp;
}