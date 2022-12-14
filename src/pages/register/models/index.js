import { login, register } from '../services';

export default {
    namespace: 'user',
    state: {},
    effects: {
        *register({ payload = {} }, { call }) {
            const resp = yield call(register, payload);
            const { success } = resp;
            if (success) {
                return resp;
            }
            return false;
        },
        *login({ payload = {} }, { call }) {
            const resp = yield call(login, payload);
            const { success } = resp;
            if (success) {
                return resp;
            }
            return false;
        },
    },
    reducers: {},
};
