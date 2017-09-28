<template>
  <div>
    <template v-if="loading">
      <div class="progress progress-striped active">
        <div class="progress-bar" style="width: 100%"></div>
      </div>
    </template>
    <template v-else>
      <template v-if="media.length > 0" class="media-container">
        <div class="media" v-for="m in media" :key="m._id">
          <img :alt="m.title" :src="m.link" />
          <p>{{m.title}}</p>
          <div class="toolbar">
            <span class="upoader">{{m.uploader.username}}</span>
            <span class="votes">{{m.votes.length}}</span>
            <span class="date">{{m.upload_date}}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="alert alert-dismissible alert-info">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Oops!</strong> No media found!
        </div>
      </template>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        media: [],
        loading: true
      }
    },
    computed: {
      ...mapGetters(['getAPI', 'getUser'])
    },
    created () {
      axios.get(this.getAPI.url + '/api/media/').then(res => {
        this.media = res.data
      }).catch(err => {
        alert(err)
      }).then(() => {
        this.loading = false
      })
    }
  }
</script>

<style>

</style>

