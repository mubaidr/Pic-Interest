<template>
  <div>
    <form class="form-horizontal">
      <fieldset>
        <legend>Add media</legend>
        <div class="form-group">
          <label class="col-lg-2 control-label">Title</label>
          <div class="col-lg-10">
            <input type="text" class="form-control" placeholder="Title" v-model="media.title">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-2 control-label">Type</label>
          <div class="col-lg-10">
            <div class="radio-type" :class="{'selected': media.type === t}" v-for="(t, index) in types" :key="t" @click="setType(t)">
              {{t}}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-2 control-label">Link</label>
          <div class="col-lg-10">
            <input type="text" class="form-control" placeholder="Link to the media" v-model="media.link"><br/>
            <div class="well preview">
              <div class="progress progress-striped active">
                <div class="progress-bar" style="width: 100%"></div>
              </div>
              Look, I'm in a well!
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="button" class="btn btn-primary" :disabled="loading" @click="addMedia">Submit</button>
            <router-link to="/home" class="btn btn-link">Cancel</router-link>
            <br/>
            <div v-show="loading">
              <div class="progress progress-striped active">
                <div class="progress-bar" style="width: 100%"></div>
              </div>
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

  export default {
    data () {
      return {
        media: {
          type: 'Image',
          title: '',
          link: ''
        },
        types: ['Image', 'Video'],
        verify: 0,
        loading: false
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      setType (t) {
        this.media.type = t
      },
      addMedia () {
        this.loading = true

        axios.post(this.getAPI.url + '/api/media/', this.media).then(() => {
          router.push('/home')
        }).catch(err => {
          alert(err)
        }).then(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style>

</style>
