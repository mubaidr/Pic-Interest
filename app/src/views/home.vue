<template>
  <div>
    <template v-if="loading">
      <div class="progress progress-striped active">
        <div class="progress-bar" style="width: 100%"></div>
      </div>
    </template>
    <template v-else>
      <div v-show="media.length > 0" ref="grid" class="grid">
        <div class="grid-item" v-for="m in media" :key="m._id">
          <div class="media-elem">
            <span class="title" :title="m.upload_date">{{m.title}}</span>
            <img :alt="m.title" :src="m.link" v-if="m.type='Image'" />
            <video controls v-else>
              <source src="movie.mp4" type="video/mp4">
              <source src="movie.ogg" type="video/ogg"> Your browser does not support the video tag.
            </video>
            <div class="toolbar">
              <span class="uploader" title="uploader">@{{m.uploader.username}}</span>
              <span class="votes" @click="toggleVote(m)">
                <i class="fa fa-thumbs-up" aria-hidden="true" title="unlike" v-if="hasVoted(m.votes)"></i>
                <i class="fa fa-thumbs-o-up" aria-hidden="true" title="like" v-else></i>
                {{m.votes.length}}
              </span>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-show="media.length === 0">
      <div class="alert alert-info">
        <strong>Oops!</strong> No media found!
      </div>
    </div>
    <pre>{{media}}</pre>
  </div>
</template>

<script>
  /* global Masonry */
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
        this.initializeMasonry()
      }).catch(err => {
        alert(err)
      }).then(() => {
        this.loading = false
      })
    },
    methods: {
      hasVoted (votes) {
        return votes ? votes.filter((item) => {
          item.user._id === this.getUser._id
        }).length > 0 : false
      },
      toggleVote (media) {
        axios.post(this.getAPI.url + '/api/vote/', {
          mediaId: media._id
        }).then(res => {
          if (res.data.voted) {
            media.votes.push(res.data.vote)
          } else {
            var index = media.votes.findIndex(function (item) {
              return item.media === media._id
            })
            media.votes.splice(index, 1)
          }
        }).catch(err => {
          alert(err)
        })
      },
      initializeMasonry () {
        setTimeout(() => {
          this.$nextTick(() => {
            new Masonry(this.$refs.grid, {
              itemSelector: '.grid-item',
              columnWidth: 1,
              gutter: 10
            })
          })
        }, 250)
      }
    }
  }
</script>

<style>

</style>

