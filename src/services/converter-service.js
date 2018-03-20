import Papa from 'papaparse'
import Xml2js from 'xml2js'

import DownloadService from './download-service'
import ReaderService from './reader-service'

class ConverterService {
  convertCsvToJson (file) {
    return new Promise((resolve, reject) => {
      let fileName = file.name.split('.')[0] + '.json'
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          DownloadService.downloadJson(result.data, fileName)
          resolve(1)
        }
      })
    })
  }
  convertJsonToCsv (file) {
    return new Promise((resolve, reject) => {
      let fileName = file.name.split('.')[0] + '.csv'
      ReaderService.readFileContent(file).onload = (evt) => {
        let data = JSON.parse(evt.target.result)
        let result = Papa.unparse(data)
        DownloadService.downloadCsv(result, fileName)
        resolve(1)
      }
    })
  }
  convertXmlToJson (file) {
    return new Promise((resolve, reject) => {
      let fileName = file.name.split('.')[0] + '.json'
      ReaderService.readFileContent(file).onload = (evt) => {
        Xml2js.parseString(evt.target.result, (_, result) => {
          DownloadService.downloadJson(result, fileName)
          resolve(1)
        })
      }
    })
  }
  convertJsonToXml (file) {
    return new Promise((resolve, reject) => {
      let fileName = file.name.split('.')[0] + '.xml'
      ReaderService.readFileContent(file).onload = (evt) => {
        let readResult = evt.target.result
        let data = JSON.parse(readResult)
        let builder = new Xml2js.Builder()
        let result = builder.buildObject(data)
        DownloadService.downloadXml(result, fileName)
        resolve(1)
      }
    })
  }
}
export default new ConverterService()
