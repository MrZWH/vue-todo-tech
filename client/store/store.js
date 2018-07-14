import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDev, // 只在开发环境中使用，规范vuex store 中数据的修改
    state: defaultState,
    mutations,
    getters
  })
}