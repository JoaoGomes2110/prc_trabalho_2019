<template>
  <v-app>
    <layoutBar/>
    <v-content class="grey lighten-4">
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
    import layoutBar from '@/components/layoutBar';
    export default {
        name: 'App',
        components:{
          layoutBar
        }
    }
</script>
