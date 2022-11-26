import { getList, add, update, deluser } from '../services';


export default {
    namespace: 'analysis',
    state: {},
    effects: {
        *getList({ payload = {} }, { call }) {
            const resp = yield call(getList, payload);
            const { success, data } = resp;
            if (success) {
                return data;
            }
            return false;
        },
        *add({ payload = {} }, { call }) {
            const resp = yield call(add, payload);
            const { success, result } = resp;
            if (success) {
                return result;
            }
            return false;
        },
        *update({ payload = {} }, { call }) {
            const resp = yield call(update, payload);
            const { success, result } = resp;
            if (success) {
                return result;
            }
            return false;
        },
        *deluser({ payload = {} }, { call }) {
            const resp = yield call(deluser, payload);
            const { success } = resp;
            if (success) {
                return true;
            }
            return false;
        },
    },
    reducers: {},
}
