import DriveApi from '@/modules/drive/drive_api';

const state = {
    folder: {},
    selected: {},
    percentCompleted: 0,
    searchResults : [],
    searchKeyWord : '',
};

const mutations = {
    SET_FOLDER(state, folder) {
        state.folder = folder;
    },

    SET_SELECTED(state, file) {
        state.selected = file;
    },

    CLEAR_DRIVE(state) {
        state.selected = {};
    },
    UPDATE_PROGRESS(state, progress) {
        state.percentCompleted = progress;
    },
    SET_RESULT(state, result) {
        state.searchResults = result;
    },
    SET_KEYWORD(state, keyWord) {
        state.searchKeyWord = keyWord;
    },
};

const actions = {
    async retrieveFolder({commit, dispatch}, id) {
        let folder = await DriveApi.getFolder(id);
        await dispatch('setFolderOwners', folder.data);
        commit('SET_FOLDER', folder.data);
        await dispatch('unselectFile');
    },

    selectFile({commit}, file) {
        return new Promise(resolve => {
            commit('SET_SELECTED', file);
            resolve();
        });
    },

    async updateProgress({commit, dispatch}, progress) {
        return new Promise(resolve => {
            commit('UPDATE_PROGRESS', progress);
            resolve();
        });
    },

    resetProgress({commit, dispatch}) {
        commit('UPDATE_PROGRESS', 0);
    },

    unselectFile({commit}) {
        return new Promise(resolve => {
            commit('SET_SELECTED', {});
            resolve();
        });
    },

    async setFolderOwners({dispatch}, folder) {

        let user = await dispatch('getUserById', folder.ownerId);
        folder.owner = user;

        let promises = [];
        folder.children.forEach(child => {
            promises.push(dispatch('getUserById', child.ownerId).then(user => {child.owner = user;}));
        });

        await Promise.all(promises);

        return folder;
    },

    async setSearchOwners({dispatch}, searchResults) {
        let promises  = [];
        searchResults.forEach(result => {
            promises.push(dispatch('getUserById', result.ownerId).then(user => {result.owner = user;}));
        });

        await Promise.all(promises);

        return true;
    },

    async getFoldersList({dispatch}, folderId) {
        let res = await DriveApi.getFoldersList(folderId);
        return res.data;
    },

    async search ({dispatch, commit}, str) {
        let result = await DriveApi.search(str);
        await dispatch('setSearchOwners', result.data);
        commit('SET_RESULT', result.data);
    },
};

const getters = {
    folder(state) {
        return state.folder;
    },

    content(state) {
        if(state.folder) {
            return state.folder.children;
        }

        return {};
    },

    selectedFile(state) {
        return state.selected;
    },

    progress(state) {
        return state.percentCompleted;
    },

    searchResultsContent(state) {
        return state.searchResults;
    },

    keyWord(state) {
        return state.searchKeyWord;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
