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
    id: 'sebastien_prunier',
    name: 'Sebastien Prunier',
    twitter: 'sebprunier',
    gravatar: 'sebastien.prunier@gmail.com',
    photo: null,
    bio: '"Je suis Développeur chez SERLI, spécialisé dans les technologies Java, Cloud et NoSQL (MongoDB, Couchbase). Je m\'intéresse plus récemment au langage Javascript, côté client (Angular.js) et côté serveur (Node.js) . Je fais aussi quelques contributions autour de la solution BPM Bonita. Vous pouvez me croiser dans différentes conférences : JUGs, Devoxx France, JugSummerCamp, BreizhCamp, Google Dev Fest ..."'
  },
  alexisMoussinePouchkine: {
    id: 'alexis_moussine_pouchkine',
    bio: '',
    name: 'Alexis Moussine-Pouchkine',
    github: '',
    twitter: '',
    gplus: 'alexis.mp@gmail.com',
    website: '',
    email: 'alexis.mp@gmail.com',
    gravatar: 'alexis.mp@gmail.com',
    image: '',
    url: ''
  },
  manuelBoillod: {
    id: 'manuel_boillod',
    name: 'Manuel Boillod',
    gravatar: 'boillodmanuel@gmail.com',
    twitter: 'mboillod',
    gplus: '118411837237007699175',
    photo: null,
    bio: 'Manuel Boillod est consultant Java et responsable de l\'agence Zenika Nantes. Ses diverses expériences, pour des grands comptes ou pour des startups, lui ont permis d\'appréhender de nombreux framework et librairies Java au niveau des technologies serveur, clientes, du système d\'information en général et plus récemment autour du cloud-computing. Il est d\'ailleurs formateur sur plusieurs technos dont Spring, Hibernate, Grails ou Wicket.'
  },
  nicolasDeloof: {
    id: 'nicolas_deloof',
    name: 'Nicolas Deloof',
    gravatar: 'nicolas.deloof@gmail.com',
    twitter: 'ndeloof',
    gplus: null,
    photo: null,
    bio: '"I\'ve been a Java Architect for 14 years in French IT Services companies. Techno-addict and open-source developer, I joined the Apache Maven team in 2007, focussing on Google Web Toolkit plugin, and later the Jenkins community. With many relations in French Java community, I created BreizhJUG in 2008, Java User Group in Rennes, France. I later founded the BreizhCamp 2 days conference. I have spoken on various conferences about Maven, Continuous Integration and Software Factory. I joined CloudBees to contribute an awesome project : run Java in the cloud, from source code to production."'
  },
  s1: {
    id: 's1',
    name: 'S1',
    bio: 'BIO S1'
  },
  s2: {
    id: 's2',
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
        title: 'Tour de l\'actualité',
        length: '20 min',
        type: 'quickie',
        intro: 'présenté par Sébastien Prunier qui lance par la même occasion les quickies.',
        speakers: [speakers.sebastienPrunier]
      },
      {
        title: 'Les "Cloud Patterns"',
        length: '1h30',
        type: 'talk',
        intro: 'par Nicolas Deloof, en avant-première avant Devoxx.be, dont nous avons gardé la description originale.',
        abstract: [
          'Le sujet lui sera bien en français - mais le speaker est trop flemmard - enfin c\'est lui qui le dit :p.',
          'Cloud "Platform as a Service" promise to host your application without a change, but things are not so simple and you can\'t deploy your legacy EJB 1.0 application to the Cloud without some refactoring.',
          'During this session, I will explain some architecture patterns to apply to your new developments, and the possible refactoring or platform services that can help to get your existing application migrated without major changes, so that your transition to the cloud is as smooth as possible. To avoid a pure theoretical talk, I\'ll share experience about migrating devoxx application from traditional hosting to cloud.'
        ],
        speakers: [speakers.nicolasDeloof]
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
        abstract: ['abstract 1'],
        speakers: [speakers.s1, speakers.s2]
      },
      {
        title: 'Sujet 2',
        length: '1h 30min',
        type: 'talk',
        abstract: ['abstract 2'],
        speakers: [speakers.s1, speakers.s2]
      }
    ]
  }
];

function getEvent(eventId) {
  for (var i = 0; i < events.length; i++) {
    if (events[i].id === eventId) {
      return events[i];
    }
  }
  return null;
}
function getSpeaker(speakerId) {
  for (var speaker in speakers) {
    if (speakers.hasOwnProperty(speaker)) {
      if (speakers[speaker].id === speakerId) {
        return speakers[speaker];
      }
    }
  }
  return null;
}

angular.module('nantesjugApp')
    .controller('MenuCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    })
    .controller('MainCtrl', function ($scope) {
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
    .controller('SpeakerCtrl', function ($scope, $routeParams) {
      var speaker = getSpeaker($routeParams.speakerId);
      $scope.speaker = speaker;
    })
;
