<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="addUser">提交</a>
      <a href="javascript:;" @click="jh">jh</a>
    </form>
  </div>
</template>
<script>
  import axios from 'axios'

export default {
  name: 'hello',
  data () {
    return {
      msg: '任务执行情况',
      userName: '',
      age: ''
    }
  },
  methods: {
    
    jh() {
      var name = this.userName;
      var age = this.age;
      this.$http.post('/api/user/addUser',data =>{
        console.log(data)
                    // this.$set('name', data.name);
                    // this.$set('age', data.age);
      },{}).then((response) => {
        console.log(response);
      })
    },
    addUser() {
      var name = this.userName;
      var age = this.age;
      this.$http.post('/api/user/addUser', {
        username: name,
        age: age
      },{}).then((response) => {
        console.log(response);
      })
    },
    
  }
}
</script>
