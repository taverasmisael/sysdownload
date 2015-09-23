(function(){
    'use strict';
    angular.module('SysDownload')
            .controller('HomeController' ,['$scope', HomeCtrl]);

    function HomeCtrl ($scope) {
      var vm = this;
      var CARDCOLORS = ['materialize-red darken-1', 'pink darken-2', 'deep-purple darken-2', 'blue darken-1', 'cyan darken-2', 'green darken-3', 'yellow darken-3', 'orange darken-2', 'brown darken-3', 'blue-grey darken', 'red darken-2', 'purple darken-3', 'light-blue darken-2', 'teal darken-3'];
      var programas = [
        {
          _id: '0001',
          info: {
            name: 'Avast free Antivirus',
            resume: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla odio, porro saepe consectetur eum velit.',
            category: 'Seguridad'
          },
          file: {
            path: 'programs/avst2015.exe',
            mime: 'application/exe',
            size: '250Mb'
          },
          meta: {
            ratting: 3,
            lastDownload: new Date()
          },
          createAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '0002',
          info: {
            name: 'Cisco Packet Tracer 2015',
            resume: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis soluta quidem consequuntur explicabo eligendi, incidunt ipsam nobis. Illo, odio rem animi dolorem optio!',
            category: 'Utilidad'
          },
          file: {
            path: 'programs/cspt2015.exe',
            mime: 'application/exe',
            size: '250Mb'
          },
          meta: {
            ratting: 8,
            lastDownload: new Date()
          },
          createAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '0003',
          info: {
            name: 'Windows 8.1 All',
            resume: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente at maiores deserunt cum ipsa. Velit blanditiis dolore excepturi, totam repellendus.',
            category: 'Sistema Operativo'
          },
          file: {
            path: 'programs/w8.iso',
            mime: 'application/iso',
            size: '250Mb'
          },
          meta: {
            ratting: 10,
            lastDownload: new Date()
          },
          createAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '0004',
          info: {
            name: 'Cyber Control',
            resume: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, asperiores.',
            category: 'Utilidad'
          },
          file: {
            path: 'programs/CCtrl.exe',
            mime: 'application/exe',
            size: '250Mb'
          },
          meta: {
            ratting: 10,
            lastDownload: new Date()
          },
          createAt: new Date(),
          updatedAt: new Date()
        }
      ];

      for (var i = 0; i < programas.length; i += 1) {
        programas[i].cardColor = CARDCOLORS[Math.floor(Math.random() * CARDCOLORS.length)];
      }
      vm.programas = programas;
      console.log(vm.programas);
    }
})();
