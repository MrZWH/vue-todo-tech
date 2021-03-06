// import model from '../../model/client-model'
import model from 'model'
import notify from '../../components/notification/functions'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '你得先登录啊！'
    })
    bus.$emit('auth')
  }
}

// 处理异步修改数据的方法
export default {
  updateCountSync (store, data) {

  },
  fetchTodos ({commit}) {
    commit('startLoading')
    return model.getAllTodos()
    .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      commit('startLoading')
      model.login(username, password)
      .then(data => {
        commit('endLoading')
        commit('doLogin', data)
        notify({
          content: '登录成功'
        })
        resolve()
      }).catch(err => {
        commit('endLoading')
        handleError(err)
        reject(err)
      })
    })
  },
  addTodo ({commit}, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updateTodo ({commit}, {id, todo}) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('updateTodo', {id, todo: data})
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo ({commit}, id) {
    commit('startLoading')
    model.deleteTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted ({commit, state}) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    commit('startLoading')
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('endLoading')
        commit('deleteAllCompleted')
        notify({
          content: '清理一下'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  
}