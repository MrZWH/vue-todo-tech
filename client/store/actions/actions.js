import model from '../../model/client-model'

const handleError = (err) => {

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
  }
}