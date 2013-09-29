'use strict';

var places = {
  epsi: {
    name: 'EPSI Nantes',
    address: '2 Rue Fénelon, 44000 Nantes',
    maps: 'http://goo.gl/maps/EO03M'
  },
  cantine: {
    name: 'Cantine numérique',
    address: 'cantine, 44000 Nantes',
    maps: 'http://goo.gl/maps/EO03M'
  }
};

// Load from yml with https://github.com/jeremyfa/yaml.js
var speakers = {
  sebastienPrunier: {
    name: 'Sebastien Prunier',
    gravatar: 'sebastien.prunier@gmail.com',
    photo: null,
    bio: '"Je suis Développeur chez SERLI, spécialisé dans les technologies Java, Cloud et NoSQL (MongoDB, Couchbase). Je m\'intéresse plus récemment au langage Javascript, côté client (Angular.js) et côté serveur (Node.js) . Je fais aussi quelques contributions autour de la solution BPM Bonita. Vous pouvez me croiser dans différentes conférences : JUGs, Devoxx France, JugSummerCamp, BreizhCamp, Google Dev Fest ..."'
  },
  alexisMoussinePouchkine: {
    bio: '',
    name: 'Alexis Moussine-Pouchkine',
    github: '',
    twitter: '',
    website: '',
    email: 'alexis.mp@gmail.com',
    gravatar: 'alexis.mp@gmail.com',
    image: '',
    url: ''
  },
  manuelBoillod: {
    name: 'Manuel Boillod',
    gravatar: 'boillodmanuel@gmail.com',
    photo: null,
    bio: ''
  },
  s1: {
    name: 'S1',
    bio: 'BIO S1'
  },
  s2: {
    name: 'S2',
    bio: 'BIO S2'
  }
};

var events = [
  //event 1
  {
    id: 1,
    title: 'Cloud Pattern',
    date: new Date(2013, 10, 10),
    time: '19',
    register: 'https://guestlistapp.com/events/190722',
    place: places.epsi,
    subjects: [
      {
        title: 'Un petit tour de l\'actualité',
        length: '20 min',
        type: 'quickie',
        abstract: 'Sébastien Prunier nous présentera les actualités, et lance par la même occasion les quickies',
        speakers: [speakers.sebastienPrunier]
      }
    ]
  },
  //event 2
  {
    id: 2,
    title: 'Event 2',
    date: new Date(2013, 11, 5),
    time: '19',
    register: '',
    place: places.cantine,
    subjects: [
      {
        title: 'Sujet 1',
        length: '20 min',
        type: 'quickie',
        abstract: 'abstract 1',
        speakers: [speakers.s1, speakers.s2]
      },
      {
        title: 'Sujet 2',
        length: '1h 30min',
        type: 'talk',
        abstract: 'abstract 1',
        speakers: [speakers.s1, speakers.s2]
      }
    ]
  }
];

function getEvent(eventId) {
  for (var i = 0; i < events.length; i++) {
    if (events[i].id === eventId) {
      return events[0];
    }
  }
  return null;
}

angular.module('nantesjugApp')
    .controller('NextEventCtrl', function ($scope) {
      var event = getEvent(1);
      $scope.event = event;

      var eventDetailledView = {};
      eventDetailledView[event.id] = true;
      $scope.eventDetailledView = eventDetailledView;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };

    })
    .controller('EventsCtrl', function ($scope) {
      $scope.events = events;

      //Events detailled view
      var eventDetailledView = {};
      events.forEach(function (event) {
        eventDetailledView[event.id] = false;
      });
      $scope.eventDetailledView = eventDetailledView;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };
    })
    .controller('EventCtrl', function ($scope, $routeParams) {
      var eventId = parseInt($routeParams.eventId, 10);
      var event = getEvent(eventId);
      $scope.event = event;

      var eventDetailledView = {};
      eventDetailledView[event.id] = true;
      $scope.eventDetailledView = eventDetailledView;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };

    })
    .controller('SpeakersCtrl', function ($scope) {
      $scope.speakers = speakers;
    })
;
