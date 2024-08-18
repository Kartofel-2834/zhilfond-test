// Types
import type { ApiPart } from '@/types/index';
import type { User } from '@/types/api/users-types';
import type { RequestHelper } from '@/types/composables/request-types';

export default ($request: RequestHelper): ApiPart => ({
    // Список пользователей
    list: (params: Partial<User>) => $request.get('/users', { params }),
});
