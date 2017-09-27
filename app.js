let _ = require('lodash')
let fetch = require('node-fetch')
let request = require('sync-request')
let util = require('util')
let fs = require('fs')

let fileIds = [
  103426, 103427, 103428, 103429, 103430, 103431, 103432,

]

let itemUrl = 'http://diyhistory.lib.uiowa.edu/api/items/3600'

let url = 'http://diyhistory.lib.uiowa.edu/api/files?item=3598'

let res = request('GET', url)

let record = JSON.parse(res.getBody('utf8'))

//console.log(JSON.stringify(res, null, 10))

//console.log(util.inspect(record, {showHidden: false, depth: 5}))

let cards = []

_.forEach(record, function(item) {
  let card = {} 
  _.forEach(item.element_texts, function (element) {
    card.id = item.id
    card.item_id = item.item.id
    card.image_url = item.file_urls.original
    card[element.element.name] = element.text    
  })
  cards.push(card)
})

fs.writeFile('/Users/mtbutler/Desktop/eggcard-exporter/eggcards.json', JSON.stringify(cards, null, 4), function (err) {
  if (err) return console.log(err)
  console.log('worked')
})
