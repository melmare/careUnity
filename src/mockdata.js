const mockEntry = {
  title: 'Dienstag, 21.05.2019',
  author: 'Melli',
  text:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
};

const mockToDos = [
  {
    title: 'Apfel mitbringen',
    author: 'Melli'
  },
  {
    title: 'Bild aufhängen',
    author: 'Marlies'
  }
];

const mockMedication = [
  (medicationOne = {
    time: 'morning',
    medicine: 'voltaren',
    dosage: '20mg'
  }),
  (medicationOne = {
    time: 'evening',
    medicine: 'bepanthen',
    dosage: '200mg'
  })
];

export default mockMedication;
