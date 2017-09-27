<template>
  <div>
    <h1>Profile</h1>
    <p>Update your profile.</p>
    <hr/>
    <form class="form-horizontal">
      <fieldset>
        <div class="form-group">
          <label class="col-lg-2 control-label">First Name</label>
          <div class="col-lg-10">
            <input type="text" class="form-control" placeholder="First Name" :disabled="loading" v-model="user.first_name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-2 control-label">Last Name</label>
          <div class="col-lg-10">
            <input type="text" class="form-control" placeholder="Last Name" :disabled="loading" v-model="user.last_name">
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <router-link to="/home" class="btn btn-default">Cancel</router-link>
            <button type="submit" class="btn btn-primary" @click="updateProfile" :disabled="loading">Update</button>
            <br/> <br/>
            <div class="progress progress-striped active" v-if="loading">
              <div class="progress-bar" style="width: 45%"></div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import router from './../utilities/router'
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import api from '../api'

  export default {
    data () {
      return {
        loading: true,
        user: {
          first_name: '',
          last_name: ''
        }
      }
    },
    computed: {
      ...mapGetters(['getUser'])
    },
    methods: {
      getProfile () {
        axios.get(api.url + '/api/users/self/').then(res => {
          this.user = res.data
        }).catch(err => {
          console.log(err)
        }).then(() => {
          this.loading = false
        })
      },
      updateProfile () {
        this.loading = true

        axios.put(api.url + '/api/users/', this.user).then(() => {
          router.push('/home')
        }).catch(err => {
          console.log(err)
        })
      }
    }, mounted () {
      this.getProfile()
    }
  }
</script>

<style>

</style>
