import { AAModalModel } from './AAModalModel';
export class AAModalModels {
  models: AAModalModel[];
  constructor() {
    this.models = [
      {
        assessmentArea : 'Ofsted',
        title : 'Ofsted rating',
        textContent : `<p>Schools Ofsted rating is taken from the most recent rating available to DfE through Get Information about schools serves.  There can be a few days delay between the Ofsted publication of a rating and linking through to GIAS and ultimately to Schools Financial Benchmarking.</p>
        <p>Schools rated Inadequate receive a red rating; schools rated Requires Improvement receive an amber rating; schools rated Good receive a light green rating; and schools rated Outstanding receive a dark green rating.</p>`
      },
      {
        assessmentArea : 'KS2',
        title : 'KS 2 Average progress score',
        textContent : `<p>KS 2 Average progress score is an average of the reading, writing and maths progress scores. Individually these show how much progress pupils have made between the end of key stage 1 and the end of key stage 2, compared to pupils across all of England who achieved similar results at the end of key stage 1. This measure only applies to schools with key stage 2 classes.</p>
        <p>Schools will receive an amber or red rating if their KS 2 Average progress score is below average.</p>
        <p>Progress scores can be found on the <a href="https://www.find-school-performance-data.service.gov.uk" class="govuk-link" target="_blank" rel="external noopener noreferrer">Find school and college performance data in England website</a>.</p>`
      },
      {
        assessmentArea : 'P8',
        title : 'Progress 8 score',
        textContent : `<p>Progress 8 scores show how much progress pupils have made between the end of key stage 2 and the end of key stage 4, compared to pupils across all of England who got similar results at the end of key stage 2. This measure only applies to schools with key stage 4.</p>
        <p>Schools will receive an amber or red rating if their progress score is below average.</p>
        <p>Progress scores can be found on the <a href="https://www.find-school-performance-data.service.gov.uk" class="govuk-link" target="_blank" rel="external noopener noreferrer">Find school and college performance data in England website</a>.</p>
        <p>Thresholds have been set using the department’s progress measure bandings.</p>`
      },
      {
        assessmentArea : 'P8Part',
        title : 'Progress 8 score',
        textContent : `<p>Progress 8 scores show how much progress pupils have made between the end of key stage 2 and the end of key stage 4, compared to pupils across all of England who got similar results at the end of key stage 2. This measure only applies to schools with key stage 4.</p>
        <p>Schools will receive an amber or red rating if their progress score is below average.</p>
        <p>Progress scores can be found on the <a href="https://www.find-school-performance-data.service.gov.uk" class="govuk-link" target="_blank" rel="external noopener noreferrer">Find school and college performance data in England website</a>.</p>
        <p>Thresholds have been set using the department’s progress measure bandings.</p>
        <h2 class="govuk-heading-s">This school or college does not cover the full Progress 8 period. </h2>
        <p>Some schools start educating pupils partway through the 5-year period covered by Progress 8, which should be taken into account when comparing their results with schools that start at Key Stage 3.</p>`
      },
      {
        assessmentArea : 'Teaching staff',
        title : 'Spend on teaching staff as a percentage of total expenditure',
        textContent : `<p>Spend on teaching staff typically takes up the largest proportion of a school’s overall spending.</p>
        <p>Spend on teaching staff includes the salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance, and teacher’s pensions) of permanent teaching staff.</p>
        <p>It excludes teachers employed casually and directly. For example supply teachers, and any teacher not employed directly by the school, such as agency staff.</p>
        <p>Some schools may wish to consider looking at the department’s
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/integrated-curriculum-and-financial-planning-icfp">guidance for Integrated Curriculum & Financial Planning</a>
         (ICFP) which can help schools to identify staffing solutions and ways to optimise their curriculum offer.</p>
        <p>The department has created a
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://teaching-vacancies.service.gov.uk/">Teaching Vacancies</a> website to help schools post teacher vacancy listings and assist with recruitment.
        </p>`
      },
      {
        assessmentArea : 'Supply staff',
        title : 'Spend on supply staff as a percentage of total expenditure',
        textContent : `<p>Spend on supply staff includes salaries and wages (including allowances, maternity pay, employer contributions to National Insurance, and teachers’ pensions) for supply teaching staff employed to cover teaching staff absence.</p>
        <p>It includes supply teachers that are employed directly by the school and those that are paid through an agency or third party. It also includes premiums paid to insurers for supply teacher cover and sums de-delegated by the local authority for centrally managed schemes for supply cover.</p>
        <p>
        On the basis of these findings some schools may wish to explore the
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://find-dfe-approved-framework.service.gov.uk/list/pre-emp-checks">employee screening service</a>
         which is a comprehensive service covering all employee screening service requirements. (Expires 05/11/2020)
        </p>
        <p>
        The department also has support for
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://find-dfe-approved-framework.service.gov.uk/list/supply-teachers">hiring supply teachers and agency workers</a>. This is a database of suppliers available for all temporary and fixed term teaching and non-teaching staff for schools, colleges or other educational establishments within the public sector such as an academy, trust, nursery, pupil referral unit, children centre or further education institution, across the UK. (Expires: 29/08/2022)
        </p>`
      },
      {
        assessmentArea : 'Education support staff',
        title : 'Spend on education support staff as a percentage of total expenditure',
        textContent : `<p>Spend on education support staff typically takes up the second largest proportion of a school’s overall spending.</p>
        <p>Spend on education support staff includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for permanent support staff employed directly by the school in support of pupils’ education.</p>
        <p>It excludes education support staff that are not employed directly by the school and costs that are incurred as part of a service contract.</p>
        <p>     Some schools may wish to consider departmental guidance on
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/government/publications/school-workforce-planning?_ga=2.93871573.975864943.1595511923-122211844.1591105723">schools workforce planning</a>.
        This is designed to help school leaders to review their staff structures regularly as part of annual school improvement, curriculum and financial planning.
        </p>`
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
        <p>It excludes administrative and clerical staff that are not employed directly by the school and costs that are incurred as part of a service contract. It also excludes IT teachers and staff employed to manage and support the school’s special facilities.</p>
        <p>Some schools may wish to consider departmental guidance on
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/government/publications/school-workforce-planning?_ga=2.93871573.975864943.1595511923-122211844.1591105723">schools workforce planning</a>.
        This is designed to help school leaders to review their staff structures regularly as part of annual school improvement, curriculum and financial planning.
        </p>`
      },
      {
        assessmentArea : 'Other staff costs',
        title : 'Spend on other staff costs as a percentage of total expenditure',
        textContent : `<p>Spend on other staff costs includes salaries and wages (including allowances, maternity pay, employer’s contributions to National Insurance and pensions) for other staff employed directly by the school.</p>
        <p>It also includes indirect employee expenses (excluding salary costs), staff development and training (excluding the cost of supply staff used to cover teacher absence), and staff-related insurance (excluding insurance for supply teachers; premises related insurance; vehicle insurance; and school trip insurance).</p>
        <p>
        There are a diverse range of expenditures in this category and there may be very varied reasons for any over/under spend in relation to other similar schools.
        </p>
        <p>
          Some schools may wish to consider departmental guidance on
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://find-dfe-approved-framework.service.gov.uk/list/cost-recovery">spend analysis and recovery services</a>.
          These are services to help schools identify and recover supplier overpayments, overcharges or missed discounts and rebates. (Expires: 15/01/2021)
        </p>`
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
        <p>It also includes costs associated with building and grounds maintenance, improvement and cleaning and caretaking, and PFI costs.</p>
        <p>
        Some schools may wish to explore the full list of DfE support for
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://find-dfe-approved-framework.service.gov.uk/list#category-facilities">facilities management and estates</a>
         which covers a range of premises related categories.
        </p>`
      },
      {
        assessmentArea : 'Educational supplies',
        title : 'Spend on educational supplies costs as a percentage of total expenditure',
        textContent : `<p>Spend on educational supplies includes curriculum ICT costs and the cost of test and examination fees and any accreditation costs related to pupils.<p>
        <p>The latter includes GCSEs and A/AS levels. Primary schools are unlikely to have any costs associated with examination fees.</p>
        <p>Some schools may wish to explore the guidance available on
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="http://gov.uk/">gov.uk</a>
         for the
         <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/buying-for-schools/books-and-educational-resources">purchasing of educational supplies</a>
          and
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/buying-for-schools/ict-and-computer-hardware">ICT and computer hardware</a> in order to cut costs and optimise their resource management. There are also further
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://find-dfe-approved-framework.service.gov.uk/list#category-books">deals for schools</a>
          available on <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="http://gov.uk/">gov.uk</a>.</p>`
      },
      {
        assessmentArea : 'Energy',
        title : 'Spend on energy as a percentage of total expenditure',
        textContent : `<p>Spend on energy includes all costs related to fuel and energy. It excludes any costs arising from repairs or maintenance to energy supplies.</p>
        <p>Spend that is significantly higher than other schools may suggest that too much resource is spent on energy and more conservation may need to be considered for both environmental and expense reasons.</p>
        <p><a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/find-a-dfe-approved-framework-for-your-school">Deals for schools</a> provides information on a wide range of non-staff deals that have been reviewed by the Schools Commercial Team (SCT) in DfE. These are assessed for compliance with procurement regulations, ease of use, suitability and value for money.</p>
        <p>
        <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/government/publications/deals-for-schools/deals-for-schools">Deals for schools</a>
        are available on <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="http://gov.uk/">gov.uk</a>. These provide information on a wide range of non-staff deals, including energy costs, that have been reviewed by the Schools Commercial Team (SCT) in DfE.
        </p>`
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
        <p>An average teacher cost that is significantly different from other schools may suggest that the staffing grade profile; the responsibility structure of the school; or the pay flexibilities (for example differentiating pay by teachers’ performance) are different from other schools and may be a consideration for change.</p>
        <p>
          Some schools may wish to consider looking at the department’s
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/integrated-curriculum-and-financial-planning-icfp">guidance for Integrated Curriculum & Financial Planning</a>
          (ICFP) which can help schools to identify staffing solutions and ways to optimise their curriculum offer.
        </p>`
      },
      {
        assessmentArea : 'Senior leaders as a percentage of workforce',
        title : 'Senior leaders as a percentage of workforce',
        textContent : `<p>Full time-equivalent number of teachers in the leadership group includes headteachers, deputy headteacher, and assistant headteachers. Schools have different senior leadership teams and structures.</p>
        <p>Having a high proportion of the workforce in the leadership group may suggest that not enough of the workforce is focused on teaching.</p>
        <p>
          Some schools may wish to consider looking at the department’s
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/integrated-curriculum-and-financial-planning-icfp">guidance for Integrated Curriculum & Financial Planning</a>
          (ICFP) which can help schools to identify staffing solutions and ways to optimise their curriculum offer.
        </p>`
      },
      {
        assessmentArea : 'Pupil to teacher ratio',
        title : 'Pupil to teacher ratio',
        textContent : `<p>The pupil to teacher ratio indicates how many pupils there are to each teacher across the whole school. Full time equivalent number of teachers includes both classroom teachers and teachers in the leadership group. It excludes teaching assistants, non-classroom based school support staff, and auxiliary staff.</p>
        <p>A relatively low pupil to teacher ratio may suggest that class sizes are small which may be costly and not the best use of resources. A relatively high pupil to teacher ratio may affect pupil outcomes and teacher workload.</p>
        <p>
          Some schools may wish to consider looking at the department’s
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/integrated-curriculum-and-financial-planning-icfp">guidance for Integrated Curriculum & Financial Planning</a>
          (ICFP) which can help schools to identify staffing solutions and ways to optimise their curriculum offer.
        </p>`
      },
      {
        assessmentArea : 'Pupil to adult ratio',
        title : 'Pupil to adult ratio',
        textContent : `<p>The pupil to adult ratio indicates how many pupils there are to each member of staff across the whole school.</p>
        <p>A relatively low pupil to adult ratio may suggest that there are too many members of staff for the number of pupils which may not be a suitable use of resource.</p>
        <p>A relatively high pupil to adult ratio may affect pupil outcomes and staff workload.</p>
        <p>A high pupil to teacher ratio but a low pupil to adult ratio may suggest that the school’s workforce could be weighted too greatly towards non-teaching staff.</p>
        <p>
          Some schools may wish to consider looking at the department’s
          <a class="govuk-link" target="_blank" rel="external noopener noreferrer" href="https://www.gov.uk/guidance/integrated-curriculum-and-financial-planning-icfp">guidance for Integrated Curriculum & Financial Planning</a>
          (ICFP) which can help schools to identify staffing solutions and ways to optimise their curriculum offer.
        </p>`
      },
      {
        assessmentArea : 'Teacher contact ratio (less than 1)',
        title : 'Teacher contact ratio',
        textContent : `<p>The teacher contact ratio will always be less than 1.0. It is calculated as:<br/>
        <span class="govuk-!-font-weight-bold">Teacher contact ratio = total amount of contact time (in hours) timetabled for all teachers in the school ÷ total possible teaching time for all teachers in the school</p>
        <p>Thresholds for this indicator are set on the basis of Association of School and College Leaders (ASCL) aspirational target of 0.78. All teachers should have a guaranteed minimum of 10% timetabled planning, preparation and assessment (PPA) time.</p>`
      },
      {
        assessmentArea : 'Predicted percentage pupil number change in 3-5 years',
        title : 'Predicted percentage pupil number change in 3-5 years',
        textContent : `<p>Schools should be making 3 to 5 year financial projections and assumptions. A key factor determining a school's finances is pupil numbers.</p>
        <p>Predicting a significant reduction in pupil numbers over this period risks implying that the school may not be financially sustainable in the medium term. The school should consider how medium-term budgets may be affected by the pupil projections and what could be put in place now to mitigate risks and ensure it has the necessary funding in the future.</p>
        <p>Schools predicting a reduction in pupil numbers of more than 10% receive a red rating; schools predicting a reduction in pupil numbers of between 2% and 10% receive an amber rating; and all others receive a light green rating.</p>`
      },
      {
        assessmentArea : 'Average Class size',
        title : 'Average Class size',
        textContent : `<p>Average class sizes are a key determinant of the cost of running a school. it is calulated as:<br>
        <span class="govuk-!-font-weight-bold">Average class size = FTE number of children in your school ÷ number of classes</span></p>
        <p>A relatively low average class size could imply that the per-pupil funding does not cover the cost of delivering the class and may not be an effective use of resources.</p>
        <p>A relatively large average class size may affect pupil outcomes and teacher workload and may contribute to higher costs in other areas of the budget.</p>`
      },

    ];
  }
}
