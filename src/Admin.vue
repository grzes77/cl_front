<template>
  <v-app>
    <div v-if="$store.state.loading" class="loader">
      <img :src="loadingGif" >
    </div>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>


      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>


      <v-menu offset-y>

        <v-btn to="/basket" color="primary" dark slot="activator"> koszyk {{$store.state.added.length}}</v-btn>


      </v-menu>
    </v-toolbar>

    <v-content>

      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>

  import loadingGif from './assets/89.gif'
export default {
  data () {
    return {
        loadingGif: loadingGif,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Shorter'
    }
  },
  name: 'Admin',

    methods:{
      remove(item){
          axios.delete(`orders/${item.id}`)
              .then(result=>{

                  this.$store.state.added.splice(item, 1)
              })

      }
    },
    created (){

                  axios(`orders`)
                      .then(result=>{
                          this.$store.state.added = result.data
                      },
                      )


    }
}
</script>
<style scope>
    .loader{
      width: 100vw;
      height: 100vw;
      background: rgba(0,0,0,.5);
      position:absolute;
      z-index: 100;
    }
  .fotter span{
    padding-left: 40%;
  }
</style>
