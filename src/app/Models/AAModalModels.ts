import { AAModalModel } from './AAModalModel';
export class AAModalModels {
  models: AAModalModel[];
  constructor() {
    this.models = [
      {
        assessmentArea : 'Teaching staff',
        title : 'Spend on teaching staff as a percentage of total expenditure',
        textContent : `<p>Spend on teaching staff typically takes up the largest proportion of a school’s overall spending.</p>
        <p>Spend on teaching staff includes the salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance, and teacher’s pensions) of permanent teaching staff.</p>
        <p>It excludes teachers employed casually and directly. For example supply teachers, and any teacher not employed directly by the school, such as agency staff.</p>`
      },
      {
        assessmentArea : 'Supply staff',
        title : 'Spend on supply staff as a percentage of total expenditure',
        textContent : `<p>Spend on supply staff includes salaries and wages (including allowances, maternity pay, employer contributions to National Insurance, and teachers’ pensions) for supply teaching staff employed to cover teaching staff absence.</p>
        <p>It includes supply teachers that are employed directly by the school and those that are paid through an agency or third party. It also includes premiums paid to insurers for supply teacher cover and sums de-delegated by the local authority for centrally managed schemes for supply cover.</p>`
      },
      {
        assessmentArea : 'Education support staff',
        title : 'Spend on education support staff as a percentage of total expenditure',
        textContent : `<p>Spend on education support staff typically takes up the second largest proportion of a school’s overall spending.</p>
        <p>Spend on education support staff includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for permanent support staff employed directly by the school in support of pupils’ education.</p>
        <p>It excludes education support staff that are not employed directly by the school and costs that are incurred as part of a service contract.</p>`
      },
      {
        assessmentArea : 'Administrative and clerical staff',
        title : 'Spend on administrative and clerical staff as a percentage of total expenditure',
        textContent : `<p>Spend on administrative and clerical staff includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for administrative and clerical staff employed directly by the school.</p>
        This includes:
        <ul class="list list-bullet">
          <li>business managers and bursars</li>
          <li>clerk to the governing body</li>
          <li>receptionists, school secretaries, other administrative staff</li>
          <li>telephonists, typists</li>
          <li>IT managers</li>
        </ul>
        <p>It excludes administrative and clerical staff that are not employed directly by the school and costs that are incurred as part of a service contract. It also excludes IT teachers and staff employed to manage and support the school’s special facilities.</p>`
      },
      {
        assessmentArea : 'Other staff costs',
        title : 'Spend on other staff costs as a percentage of total expenditure',
        textContent : `<p>Spend on other staff costs includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for other staff employed directly by the school.</p>
        <p>It also includes indirect employee expenses (excluding salary costs), staff development and training (excluding the cost of supply staff used to cover teacher absence), and staff-related insurance (excluding insurance for supply teachers; premises related insurance; vehicle insurance; and school trip insurance).</p>`
      },
      {
        assessmentArea : 'Premises costs',
        title : 'Spend on premises (including staff) costs as a percentage of total expenditure',
        textContent : `<p>Spend on premises includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for premises staff employed directly by the school.</p>
        This includes:
        <ul class="list list-bullet">
          <li>Caretakers, cleaners</li>
          <li>grounds staff, maintenance staff</li>
          <li>porters, messengers</li>
          <li>security staff</li>
        </ul>
        <p>It also includes costs associated with building and grounds maintenance, improvement and cleaning and caretaking, and PFI costs.</p>`
      },
      {
        assessmentArea : 'Teaching resources',
        title : 'Spend on teaching resources costs as a percentage of total expenditure',
        textContent : `<p>Spend on teaching resources includes curriculum ICT costs and the cost of test and examination fees and any accreditation costs related to pupils.<p>
        <p>The latter includes GCSEs and A/AS levels. Primary schools are unlikely to have any costs associated with examination fees.</p>`
      },
      {
        assessmentArea : 'Energy',
        title : 'Spend on energy as a percentage of total expenditure',
        textContent : `<p>Spend on energy includes all costs related to fuel and energy. It excludes any costs arising from repairs or maintenance to energy supplies.</p>
        <p>Spend that is significantly higher than other schools may suggest that too much resource is spent on energy and more conservation may need to be considered for both environmental and expense reasons.</p>
        <p><a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/find-a-dfe-approved-framework-for-your-school">Deals for schools</a> provides information on a wide range of non-staff deals that have been reviewed by the Schools Commercial Team (SCT) in DfE. These are assessed for compliance with procurement regulations, ease of use, suitability and value for money.</p>`
      },
      {
        assessmentArea : 'In-year balance',
        title : 'In-year balance as a percentage of total income',
        textContent : `<p>An in-year deficit is indicated by a negative result, and an in-year surplus is indicated by a positive result. Schools will receive an amber or red rating on this indicator depending on the degree of in year deficit relative to the school’s annual income.</p>
        <p>Schools should set a well-informed and balanced budget that does not lead to an excessive surplus or deficit at the end of the year.</p>
        <p>Schools may spend more than their income in a given year for a range of planned and sensible reasons, but it may also be a sign the school is not effectively managing its budget.</p>`
      },
      {
        assessmentArea : 'Revenue reserve',
        title : 'Revenue reserve as a percentage of total income',
        textContent : `<p>Revenue reserve is the restricted and unrestricted funds carried forward from the previous year plus this year’s balance.</p>
        <p>Schools will receive an amber or red rating on this indicator if their total revenue reserves are negative and how large that reserve deficit is compared to the school’s total annual income.  Any schools running a deficit should have a plan to eliminate the deficit.</p>`
      },
      {
        assessmentArea : 'Average teacher cost',
        title : 'Average teacher cost',
        textContent : `<p>The Average teacher cost is the Spend on teaching staff divided by the number of teaching staff (full time equivalent).</p>
        <p>An average teacher cost that is significantly different from other schools may suggest that the staffing grade profile; the responsibility structure of the school; or the pay flexibilities (for example differentiating pay by teachers’ performance) are different from other schools and may be a consideration for change.</p>`
      },
      {
        assessmentArea : 'Senior leaders as a percentage of workforce',
        title : 'Senior leaders as a percentage of workforce',
        textContent : `<p>Full time-equivalent number of teachers in the leadership group includes headteachers, deputy headteacher, and assistant headteachers. Schools have different senior leadership teams and structures.</p>
        <p>Having a high proportion of the workforce in the leadership group may suggest that not enough of the workforce is focused on teaching.</p>`
      },
      {
        assessmentArea : 'Pupil to teacher ratio',
        title : 'Pupil to teacher ratio',
        textContent : `<p>The pupil to teacher ratio indicates how many pupils there are to each teacher across the whole school. Full time equivalent number of teachers includes both classroom teachers and teachers in the leadership group. It excludes teaching assistants, non-classroom based school support staff, and auxiliary staff.</p>
        <p>A relatively low pupil to teacher ratio may suggest that class sizes are small which may be costly and not the best use of resources. A relatively high pupil to teacher ratio may affect pupil outcomes and teacher workload.</p>`
      },
      {
        assessmentArea : 'Pupil to adult ratio',
        title : 'Pupil to adult ratio',
        textContent : `<p>The pupil to adult ratio indicates how many pupils there are to each member of staff across the whole school.</p>
        <p>A relatively low pupil to adult ratio may suggest that there are too many members of staff for the number of pupils which may not be a suitable use of resource.</p>
        <p>A relatively high pupil to adult ratio may affect pupil outcomes and staff workload.</p>
        <p>A high pupil to teacher ratio but a low pupil to adult ratio may suggest that the school’s workforce could be weighted too greatly towards non-teaching staff.</p>`
      },
      {
        assessmentArea : 'Teacher contact ratio (less than 1)',
        title : 'Teacher contact ratio',
        textContent : `<p>The teacher contact ratio will always be less than 1.0.</p>
        <p>Thresholds for this indicator are set on the basis of Association of School and College Leaders (ASCL) aspirational target of 0.78. All teachers should have a guaranteed minimum of 10% timetabled planning, preparation and assessment (PPA) time.</p>`
      },
      {
        assessmentArea : 'Predicted percentage pupil number change in 3-5 years',
        title : 'Predicted percentage pupil number change in 3-5 years',
        textContent : `<p>Schools should be making 3 to 5 year financial projections and assumptions. A key factor determining a school’s finances is pupil numbers.</p>
        <p>Predicting a significant reduction in pupil numbers over this period risks implying that the school may not be financially sustainable in the medium term. The school should consider how medium-term budgets may be affected by the pupil projections and what could be put in place now to mitigate risks and ensure it has the necessary funding in the future.</p>
        <p>Schools predicting a reduction in pupil numbers of more than 10% receive a red rating; schools predicting a reduction in pupil numbers of between 2% and 10% receive an amber rating; and all others receive a light green rating.</p>`
      },
      {
        assessmentArea : 'Average Class size',
        title : 'Average Class size',
        textContent : `<p>Average class sizes are a key determinant of the cost of running a school.</p>
        <p>A relatively low average class size could imply that the per-pupil funding does not cover the cost of delivering the class and may not be an effective use of resources.</p>
        <p>A relatively large average class size may affect pupil outcomes and teacher workload and may contribute to higher costs in other areas of the budget.</p>`
      },

    ];
  }
}
