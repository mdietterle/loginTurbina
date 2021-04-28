<template>
  <q-page class="flex flex-center">
      <div class="small">
  </div>
  <div>
    <div class="q-pb-sm">
      Model: {{ model }}
    </div>

    <q-date v-model="model" range />
  </div>

  <q-btn color="teal" @click="extratoGeral">
    <q-icon left size="3em" name="map" />
    <div>Buscar dados</div>
  </q-btn>
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
  </q-page>
</template>
<script>
import ExtratoService from 'src/services/Extrato'
export default {
  name: 'Uso',
  components: {
  },
  data () {
    // var categories = [];
    return {
      model: { from: '2020/07/08', to: '2020/07/17' }
    }
  },
  methods: {
    extratoGeral () {
      console.log('model', this.model)
      ExtratoService.getTotalTime(this.model)
        .then(data => console.log(data))
        .catch(error => console.error('erro extrato geral ', error))
    }
  }

}
</script>
<style scoped>

  #backButton {
    border-radius: 4px;
    padding: 8px;
    border: none;
    font-size: 16px;
    background-color: #2eacd1;
    color: white;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .invisible {
    display: none;
  }
</style>
