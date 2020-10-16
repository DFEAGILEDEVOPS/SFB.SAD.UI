import { EditModalModel } from './EditModalModel';
export class EditModalModels {
  models: EditModalModel[];
  constructor() {
    this.models = [
      {
        formControlName : 'scenarioTerm',
        title : 'Year of scenario',
        textContent : '<p>This is used to apply the correct banding ratios that may differ from year to year, e.g. Teaching staff ratios and Average salary has been adjusted with a graded uplift from years 17/18 to 19/20. It is also presented on the side by side dashboard to help users identified when two scenarios are for different years. </p>'
      },
      {
        formControlName : 'numberOfPupils',
        title : 'Number of pupils (FTE)',
        textContent : `<p>The number of pupils, full time equivalent, in the school for the year of the scenario.</p>
        <p>This information is used to ensure the school is being compared with schools of a similar size for Primary and Secondary phase schools. It is also used to calculate ratios of pupils to teachers and pupils to all workforce. </p>`
      },
      {
        formControlName : 'schoolWorkforce',
        title : 'School workforce (FTE)',
        textContent : `<p>The total full-time equivalent count of the school's workforce for the year of the scenario.</p>
        <p>This information is used to calculate workforce and pupil to workforce ratios.</p>`
      },
      {
        formControlName : 'numberOfTeachers',
        title : 'Number of teachers (FTE)',
        textContent : `<p>The total full-time equivalent count of the school's teaching staff for the year of the scenario.  Full time equivalent number of teachers includes both classroom teachers and teachers in the leadership group. It excludes teaching assistants, non-classroom based school support staff, and auxiliary staff.This information is used to calculate average salaries, leadership ratios, and pupil to teacher ratios.</p>`
      },
      {
        formControlName : 'seniorLeadership',
        title : 'Senior leadership (FTE)',
        textContent : `<p>The total full-time equivalent count of the school's leadership team for the year of the scenario. Full time-equivalent number of teachers in the leadership group includes headteachers, deputy headteacher, and assistant headteachers.This information is used to calculate Senior leadership ratios for the school.</p>`
      },
      {
        formControlName : 'fsm',
        title : 'Percentage of pupils eligible for FSM',
        textContent : `<p>Percentage of pupils eligible for free school meals (FSM) in the scenario year. This information is used to ensure the school is being compared with schools with similar FSM rates.</p>`
      },
      {
        formControlName : 'teacherContactRatio',
        title : 'Teacher contact ratio (less than 1.0)',
        textContent : `<ul>
        <li>
            <p>For secondary schools: Teacher contact ratio = total number of teaching periods timetabled for all teachers in the school ÷ total possible number of teaching periods</p>
            <p>The total possible number of teaching periods is equivalent to the number of teaching periods in the timetable cycle multiplied by the full time equivalent number of teachers.</p>
            <p>Full time equivalent number of teachers includes both classroom teachers and teachers in the leadership group. It excludes teaching assistants, non-classroom based school support staff, and auxiliary staff.</p>
        </li>
        <li>
            <p>For primary schools: Teacher contact ratio = total number of classes ÷ full time equivalent number of teachers</p>
            <p>Full time equivalent number of teachers includes both classroom teachers and teachers in the leadership group. It excludes teaching assistants, non-classroom based school support staff, and auxiliary staff.</p>
        </li>
        </ul>
        <p>The teacher contact ratio will always be less than 1.0</p>`
      },
      {
        formControlName : 'predictedPupil',
        title : 'Predicted percentage pupil number change in 3-5 years',
        textContent : `<p>This is the percentage of pupils the school is expected to grow or shrink by over the next 3-5 years. A key factor determining a school’s finances is pupil numbers and schools should take this into account for financial projections and assumptions. This number cannot be lower than -100%</p>`
      },
      {
        formControlName : 'averageClassSize',
        title : 'Average class size',
        textContent : `<p>Average class sizes are a key determinant of the cost of running a school.</p>`
      },
      {
        formControlName : 'totalIncome',
        title : 'Total income',
        textContent : `<p>This is the Total income for the school in the scenario year, actual or predicted if future. It is a Mandatory field as it is used to calculate the annual balance, and as baseline for the percentage of annual overspend and the relative size of any strategic reserve deficit.</p>`
      },
      {
        formControlName : 'totalExpenditure',
        title : 'Total expenditure',
        textContent : `<p>This is the total expenditure for the school in the scenario year. It is a mandatory field and should be greater than all the other spend items listed here. </p>
        <p>It includes all the spend on the risk items plus the additional items not risk assessed in the dashboard including catering staff and supplies, water and sewerage, rent and rates, other occupation costs, special facilities, educational consultancy, professional services, auditor costs, other insurance premiums, administrative supplies,  direct revenue finance, and interest charges for loan and bank. </p>`
      },
      {
        formControlName : 'rr',
        title : 'Revenue reserve',
        textContent : `<p>This is the Restricted and unrestricted funds carried forward from the previous year + total income from current year – total expenditure in current year. </p>
        <p>A cumulative deficit / negative reserve is indicated by a negative result, and a cumulative surplus / positive reserve is indicated by a positive result. The risk significance of a cumulative deficit is assessed relative to the Total income. </p>`
      },
      {
        formControlName : 'teachingStaff',
        title : 'Spend on teaching staff',
        textContent : `<p>Spend on teaching staff typically takes up the largest proportion of a school’s overall spending. Spend on teaching staff includes the salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance, and teachers’ pensions) of permanent teaching staff.</p>
        <p>It excludes teachers employed casually and directly, such as supply teachers, and any teacher not employed directly by the school such as agency staff.</p>`
      },
      {
        formControlName : 'supplyStaff',
        title : 'Spend on supply staff',
        textContent : `<p>Spend on supply staff includes salaries and wages (including allowances, maternity pay, employer contributions to National Insurance, and teachers’ pensions) for supply teaching staff employed to cover teaching staff absence.</p>
        <p>It includes supply teachers that are employed directly by the school and those that are paid through an agency or third party.</p>
        <p>It also includes premiums paid to insurers for supply teacher cover and sums de-delegated by the local authority for centrally managed schemes for supply cover.</p>`
      },
      {
        formControlName : 'educationSupportStaff',
        title : 'Spend on education support staff',
        textContent : `<p>Spend on education support staff includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for permanent support staff employed directly by the school in support of pupils’ education.</p>
        <p>It excludes education support staff that are not employed directly by the school and costs that are incurred as part of a service contract.</p>`
      },
      {
        formControlName : 'adminStaff',
        title : 'Spend on administrative and clerical staff',
        textContent : `<p>Spend on administrative and clerical staff includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for administrative and clerical staff employed directly by the school. This includes:</p>
        <ul>
          <li>business managers and bursars</li>
          <li>clerk to the governing body</li>
          <li>receptionists, school secretaries</li>
          <li>other administrative staff</li>
          <li>telephonists, typists</li>
          <li>IT managers</li>
        </ul>
        <p>It excludes administrative and clerical staff that are not employed directly by the school and costs that are incurred as part of a service contract.</p>
        <p>It also excludes IT teachers and staff employed to manage and support the school’s special facilities.</p>`
      },
      {
        formControlName : 'otherStaff',
        title : 'Spend on other staff costs',
        textContent : `<p>Spend on other staff costs includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for other staff employed directly by the school.</p>
        <p>It also includes indirect employee expenses (excluding salary costs), staff development and training (excluding the cost of supply staff used to cover teacher absence), and staff-related insurance (excluding insurance for supply teachers; premises related insurance; vehicle insurance; and school trip insurance).</p>`
      },
      {
        formControlName : 'premises',
        title : 'Spend on premises (including staff costs)',
        textContent : `<p>Spend on premises includes all costs of building and maintenance plus salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for premises staff employed directly by the school.</p>
        <p>This includes:</p>
        <ul>
          <li>caretakers, cleaners</li>
          <li>grounds staff, maintenance staff</li>
          <li>porters, messengers</li>
          <li>security staff</li>
        </ul>
        <p>And all other costs and material associated with</p>
        <ul>
          <li>building and grounds maintenance</li>
          <li>improvements and repairs</li>
          <li>cleaning and caretaking materials, and </li>
          <li>PFI costs</li>
        </ul>
        <p>It does not include capital expenditure on new build.</p>`
      },
      {
        formControlName : 'teachingResources',
        title : 'Spend on educational supplies',
        textContent : `<p>Spend on educational supplies includes curriculum ICT costs and the cost of test and examination fees and any accreditation costs related to pupils. The latter includes GCSEs and A/AS levels. Primary schools are unlikely to have any costs associated with examination fees.</p>`
      },
      {
        formControlName : 'energy',
        title : 'Spend on energy',
        textContent : `<p>Spend on energy includes all costs related to fuel and energy for the scenario year. It excludes any costs arising from repairs or maintenance to energy supplies.</p>`
      }
    ];
  }
}
