import model from '../../model/client-model'
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
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(handleError)
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
      .then(data => {
        commit('doLogin', data)
        notify({
          content: '登录成功'
        })
        resolve()
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}