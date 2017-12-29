/* eslint-disable space-before-function-paren,comma-spacing,no-trailing-spaces,no-useless-return */
import Vue from 'vue'

/* eslint-disable indent,quotes,semi,keyword-spacing,no-undef,no-new */

Vue.component('Editbl', {
  template: '<div contenteditable="true" @input="update" @keydown.enter="block" @keydown.ctrl.86="block"></div>',
  props: ['html'],
  methods: {
    block: function (e) {
      e.preventDefault()
    },
    update: function (event) {
      let localMas = JSON.stringify(event.target.innerHTML)
      localMas = localMas.replace(/['"]+/g, '')
      localMas = localMas.replace(/&nbsp;/, '')
      localMas = localMas.split(' ')
      for (let i = 0; i <= localMas.length; i++) {
        switch (true) {
          // find words 'and' and 'or'
          case redRule(localMas[i]) :
            localMas[i] = '<span style=\'color: red\'>' + localMas[i] + '</span>'
            break;
          // find fraze 'exponential moving average'
          case greenRule(localMas[i],localMas[i - 1],localMas[i - 2]) :
            localMas[i - 2] = '<strong style=\'background-color: green\'>' + localMas[i - 2]
            localMas[i] = localMas[i] + '</strong>'
            break;
          // find frazes 'than lower' and 'than higher'
          case strongDablRule(localMas[i],localMas[i - 1]) :
            localMas[i] = '<strong>' + localMas[i] + '</strong>'
            break;
          // find words 'lower' and 'higher'
          case strongRule(localMas[i]) :
            localMas[i] = '<strong>' + localMas[i] + '</strong>'
            break;
          // find fraze 'simple moving average'
          case orangeDablRule(localMas[i],localMas[i - 1],localMas[i - 2]) :
            localMas[i - 2] = '<strong style=\'background-color: orange\'>' + localMas[i - 2]
            localMas[i] = localMas[i] + '</strong>'
            break;
          // find words 'moving' and 'average'
          case orangeRule(localMas[i],localMas[i - 1]) :
            localMas[i - 1] = '<strong style=\'background-color: orange\'>' + localMas[i - 1]
            localMas[i] = localMas[i] + '</strong>'
            break;
          default:
            break;
        }
      }
      function redRule (item) {
        return item === 'and' || item === 'or';
      }
      function greenRule (itemF,itemS,itemT) {
        return itemT === 'exponential' && itemS === 'moving' && itemF === 'average';
      }
      function strongDablRule (itemF,itemS) {
        return (itemF === 'than' && itemS === '<strong>lower</strong>') || (itemF === 'than' && itemS === '<strong>higher</strong>');
      }
      function strongRule (itemF) {
        return itemF === 'lower' || itemF === 'higher'
      }
      function orangeDablRule (itemF,itemS,itemT) {
        return itemT === 'simple' && itemS === 'moving' && itemF === 'average'
      }
      function orangeRule (itemF,itemS) {
        return itemS === 'moving' && itemF === 'average'
      }

      this.$emit('update', localMas.join(' '))
    }
  }
})

export default {
  name: 'Editbl'
}
