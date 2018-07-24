<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <!-- <router-link to="/app/123">app</router-link> -->
        <!-- <Todo></Todo> -->
        <transition name="fade">
            <router-view/>
        </transition>
        <!-- <router-view name="a"/> -->
        <notification content="test content"/>
        <Footer></Footer>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters
} from 'vuex'
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import Todo from './views/todo/todo.vue'

export default {
    components: {
        Header,
        Footer,
        Todo,
    },
    computed: {
        ...mapState(['count'])
        // ...mapState({
        //     counter: 'count'
        // }),
        // ...mapState({
        //     counter: (state) => state.count
        // })
        // ...mapGetters(['fullName'])
    }
}
</script>
<style lang="stylus" scoped>
#app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


