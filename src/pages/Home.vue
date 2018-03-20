<template>
  <div class="m-home">
    <section class="text-white mb-0" id="about">
      <div class="container">
        <h2 class="text-center text-uppercase text-secondary mb-0">Upload file</h2>
        <hr class="star-dark mb-5">
        <div class="text-center">
          <PulseLoader class="mb-5" :loading="loading" :color="color"/>
          <label :hidden="loading">
            <a class="btn btn-primary btn-xl btn-outline-light">
                <i class="fa fa-upload mr-2"></i>
                CSV to JSON
                <input type="file" v-on:change="convertCsvToJson($event)" accept=".csv" hidden>
            </a>
          </label>
          <label :hidden="loading">
             <a class="btn btn-primary btn-xl btn-outline-light">
                <i class="fa fa-upload mr-2"></i>
                JSON to CSV
                <input type="file" v-on:change="convertJsonToCsv($event)" accept=".json" hidden>
            </a>
          </label>
          <label :hidden="loading">
             <a class="btn btn-primary btn-xl btn-outline-light">
                <i class="fa fa-upload mr-2"></i>
                JSON to XML
                <input type="file" v-on:change="convertJsonToXml($event)" accept=".json" hidden>
            </a>
          </label>
          <label :hidden="loading">
             <a class="btn btn-primary btn-xl btn-outline-light">
                <i class="fa fa-upload mr-2"></i>
                XML or RSS to JSON
                <input type="file" v-on:change="convertXmlToJson($event)" accept=".xml,.rss" hidden>
            </a>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ConvertService from '@/services/converter-service'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  name: 'Home',
  data () {
    return {
      loading: false,
      color: '#81D4FA'
    }
  },
  mounted () {
    let js = document.createElement('script')
    js.setAttribute('src', '/static/js/freelancer.min.js')
    document.head.appendChild(js)
  },
  methods: {
    convertCsvToJson (event) {
      let file = event.target.files[0]
      if (file != null) {
        this.loading = true
        ConvertService.convertCsvToJson(file).then((res) => {
          this.loading = false
        })
      }
    },
    convertJsonToCsv (event) {
      let file = event.target.files[0]
      if (file != null) {
        this.loading = true
        ConvertService.convertJsonToCsv(file).then((res) => {
          this.loading = false
        })
      }
    },
    convertXmlToJson (event) {
      let file = event.target.files[0]
      if (file != null) {
        this.loading = true
        ConvertService.convertXmlToJson(file).then((res) => {
          this.loading = false
        })
      }
    },
    convertJsonToXml (event) {
      let file = event.target.files[0]
      if (file != null) {
        this.loading = true
        ConvertService.convertJsonToXml(file).then((res) => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
