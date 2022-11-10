export function getAADataFormat(assessmentArea): string {
  switch (assessmentArea) {
    case 'Pupil to teacher ratio':
    case 'Pupil to adult ratio':
    case 'Teacher contact ratio (less than 1)':
    case 'Average Class size':
      return 'number';
    case 'Average teacher cost':
      return 'currency';
    case 'Senior leaders as a percentage of workforce':
      return 'percentageOfWf';
    case 'In-year balance':
    case 'Revenue reserve':
      return 'percentageOfInc';
    case 'Predicted percentage pupil number change in 3-5 years':
      return 'percentageOfChange';
    default:
      return 'percentageOfExp';
  }
}
