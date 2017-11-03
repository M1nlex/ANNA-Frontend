import LogsApi from '@/api/test/logs';

const state = {
    logs: [],
    log: {}
};

const mutations = {
    SET_ALL_LOGS(state, logs) {
        state.logs = logs;
    },

    SELECT_LOG(state, log) {
        state.log = log;
    }
};

const actions = {
    retrieveLogs({commit, state}, force = false) {
        return new Promise((resolve, reject) => {
            if (state.logs.length === 0 || force) {
                LogsApi.getAll()
                    .then(logs => {
                        commit('SET_ALL_LOGS', logs);
                        resolve();
                    })
                    .catch(err => reject(err));
            }
            else {
                resolve();
            }
        });
    },

    selectLog({dispatch, commit, state}, id) {
        return dispatch('retrieveLogs')
            .then(_ => {
                const log = state.logs.filter(log => log.id === parseInt(id))[0];

                if (typeof log !== 'undefined') commit('SELECT_LOG', log);
                else throw Error;
            });
    },
};

const getters = {
    logs(state) {
        return state.logs;
    },

    selectedLog(state) {
        return state.log;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};