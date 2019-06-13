<template>
  <v-container>
    <ListaTreinadoresPrincipais/>
    <ListaTreinadoresInterinos/>
    <ListaTreinadoresAssistentes/>
  </v-container>
</template>

<script>

import ListaTreinadoresPrincipais from '@/components/ListaTreinadoresPrincipais'
import ListaTreinadoresInterinos from '@/components/ListaTreinadoresInterinos'
import ListaTreinadoresAssistentes from '@/components/ListaTreinadoresAssistentes'
export default {
  components: {
    ListaTreinadoresPrincipais,
    ListaTreinadoresInterinos,
    ListaTreinadoresAssistentes
  }
}
</script>
