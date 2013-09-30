/*jshint unused: false */
var njEvents = [
  //event 1
  {
    id: 1,
    title: 'Cloud Pattern',
    date: new Date(2013, 10, 10),
    time: '19',
    register: 'https://guestlistapp.com/events/190722',
    place: njPlaces.epsi,
    subjects: [
      {
        title: 'Tour de l\'actualité',
        length: '20 min',
        type: 'quickie',
        intro: 'présenté par Sébastien Prunier qui lance par la même occasion les quickies.',
        speakers: [njSpeakers.sebastienPrunier]
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
        speakers: [njSpeakers.nicolasDeloof]
      }
    ]
  },
  //event 2
  {
    id: 2,
    title: 'Event 2',
    date: new Date(2013, 08, 5),
    time: '19',
    register: '',
    place: njPlaces.cantine,
    subjects: [
      {
        title: 'Sujet 1',
        length: '20 min',
        type: 'quickie',
        abstract: ['abstract 1'],
        speakers: [njSpeakers.s1, njSpeakers.s2]
      },
      {
        title: 'Sujet 2',
        length: '1h 30min',
        type: 'talk',
        abstract: ['abstract 2'],
        speakers: [njSpeakers.s1, njSpeakers.s2]
      }
    ]
  }
];