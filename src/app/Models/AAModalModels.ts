import { AAModalModel } from './AAModalModel';
export class AAModalModels {
  models: AAModalModel[];
  constructor() {
    this.models = [
      {
        assessmentArea : 'Teaching staff',
        title : 'Spending on teaching staff as a percentage of total expenditure',
        textContent : `<p>Spend on teaching staff typically takes up the largest proportion of a school’s overall spending.</p>
        <p>Schools may receive an amber or red rating on this indicator if they spend significantly less or
        more of their budget on teaching staff than other schools.</p>
        <p>Schools should understand their rating and whether any changes are required to achieve better resource management.</p>`
      },
      {
        assessmentArea : 'Energy',
        title : 'Spending on energy as a percentage of total expenditure',
        textContent : `<p>Schools may receive an amber or red rating on this indicator if they spend significantly more of their
        budget on energy than other schools.</p>
        <p>Schools should understand their rating and whether any changes are required to achieve better resource management.</p>
        <p>Spend that is significantly higher than other schools may suggest that too much resource is spent on energy and more conservation
        may need to be considered for both environmental and expense reasons.</p>`
      },
      {
        assessmentArea : 'Supply staff',
        title : 'Spending on supply staff as a percentage of total expenditure',
        textContent : `<p>n/a</p>`
      }

    ];
  }
}
