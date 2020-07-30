import { SaData } from './SaData';
import { AssessmentAreaModel } from './AssessmentAreaModel';
import { FSMLookupModel } from './FSMLookupModel';
import { SizeLookupModel } from './SizeLookupModel';
export class SaScenarioModel {
  scenarioName: string;
  urn: number;
  name: string;
  financeType: string;
  termOfScenario: string;
  latestTerm: string;
  overallPhase: string;
  hasSixthForm: boolean;
  londonWeighting: string;
  numberOfPupils: number;
  numberOfPupilsLatestTerm: number;
  fsm: number;
  fsmLatestTerm: number;
  totalExpenditure: number;
  totalExpenditureLatestTerm: number;
  totalIncome: number;
  totalIncomeLatestTerm: number;
  ofstedRating: string;
  ofstedInspectionDate: string;
  progressScore: number;
  progressScoreType: string;
  progress8Banding: number;
  teachersTotal: number;
  teachersLeader: number;
  workforceTotal: number;
  teachersTotalLastTerm: number;
  teachersLeaderLastTerm: number;
  workforceTotalLastTerm: number;
  sadSizeLookup: SizeLookupModel;
  sadFSMLookup: FSMLookupModel;
  sadAssessmentAreas: AssessmentAreaModel[];

  scenarioNo: number;
  isEdited: boolean;
  isTresholdsRefreshed: boolean;
  lastEditTimeStamp: Date;
  data: SaData;

  constructor(data: SaData) {
    this.data = data;
    this.name = data.name;
    this.urn = data.urn;
    this.latestTerm = data.latestTerm;
    this.financeType = data.financeType;
    this.hasSixthForm = data.hasSixthForm;
    this.overallPhase = data.overallPhase;
    this.londonWeighting = data.londonWeighting;
    this.numberOfPupilsLatestTerm = data.numberOfPupilsLatestTerm;
    this.fsmLatestTerm = data.fsmLatestTerm;
    this.ofstedRating = data.ofstedRating;
    this.ofstedInspectionDate = data.ofstedInspectionDate;
    this.progressScore = data.progressScore;
    this.progressScoreType = data.progressScoreType;
    this.progress8Banding = data.progress8Banding;
    this.totalExpenditureLatestTerm = data.totalExpenditureLatestTerm;
    this.totalIncomeLatestTerm = data.totalIncomeLatestTerm;
    this.teachersTotalLastTerm = data.teachersTotalLastTerm;
    this.teachersLeaderLastTerm = data.teachersLeaderLastTerm;
    this.workforceTotalLastTerm = data.workforceTotalLastTerm;
    this.sadSizeLookup = data.sadSizeLookup;
    this.sadFSMLookup = data.sadFSMLookup;
    this.sadAssessmentAreas = data.sadAssesmentAreas;

    this.termOfScenario = this.latestTerm;
    this.scenarioName = this.termOfScenario ? this.termOfScenario + ' submitted data' : null;
    this.totalIncome = this.totalIncomeLatestTerm;
    this.totalExpenditure = this.totalExpenditureLatestTerm;
    this.numberOfPupils = this.numberOfPupilsLatestTerm;
    this.fsm = this.fsmLatestTerm;
    this.teachersTotal = data.teachersTotalLastTerm;
    this.teachersLeader = data.teachersLeaderLastTerm;
    this.workforceTotal = data.workforceTotalLastTerm;

    this.initAAsWithCalculatedData();
  }

  get overallPhaseWSixthForm(): string {
    if (this.hasSixthForm && this.overallPhase !== 'All-through') {
      return this.overallPhase + ' with sixth form';
    }
    return this.overallPhase;
  }

  get spendingAAs(): AssessmentAreaModel[] {
    return this.sadAssessmentAreas?.filter(aa => aa.assessmentAreaType === 'Spending');
  }

  get reserveAAs(): AssessmentAreaModel[] {
    return this.sadAssessmentAreas?.filter(aa => aa.assessmentAreaType === 'Reserve and balance');
  }

  get characteristicAAs(): AssessmentAreaModel[] {
    return this.sadAssessmentAreas?.filter(aa => aa.assessmentAreaType === 'School characteristics');
  }

  getAAValue(aaName: string): number {
    return this.sadAssessmentAreas?.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData;
  }

  getAALatestTermValue(aaName: string): number {
    return this.sadAssessmentAreas?.filter(aa => aa.assessmentAreaName === aaName)[0].schoolDataLatestTerm;
  }

  setAAValue(aaName: string, value: number) {
    this.sadAssessmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData = value;
  }

  initAAsWithCalculatedData() {
    this.initSpendingAAsWithCalculatedData();

    this.initReserveAAsWithCalculatedData();

    this.initCharacteristicAAsWithCalculatedData();

    this.isTresholdsRefreshed = true;
  }

  private initCharacteristicAAsWithCalculatedData() {

    const averageTeacherCostAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Average teacher cost');
    if (averageTeacherCostAA) {
      averageTeacherCostAA.totalForAreaType = this.teachersTotal;
      averageTeacherCostAA.schoolData = this.getAAValue('Teaching staff');
      if (averageTeacherCostAA.schoolData != null) {
        averageTeacherCostAA.calculatedSchoolData = parseFloat((averageTeacherCostAA.schoolData
          / averageTeacherCostAA.totalForAreaType).toFixed(2));
      } else {
        averageTeacherCostAA.calculatedSchoolData = null;
      }
      this.setAAsMatchingTreshold(averageTeacherCostAA);
    }

    const seniorLeadersAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Senior leaders as a percentage of workforce');
    if (seniorLeadersAA) {
      seniorLeadersAA.totalForAreaType = this.workforceTotal;
      seniorLeadersAA.schoolData = this.teachersLeader;
      if (seniorLeadersAA.schoolData != null) {
        seniorLeadersAA.calculatedSchoolData = parseFloat((seniorLeadersAA.schoolData
          / seniorLeadersAA.totalForAreaType).toFixed(2));
      } else {
        seniorLeadersAA.calculatedSchoolData = null;
      }
      this.setAAsMatchingTreshold(seniorLeadersAA);
    }

    const pupilToTeacherAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Pupil to teacher ratio');
    if (pupilToTeacherAA) {
      pupilToTeacherAA.totalForAreaType = this.teachersTotal;
      pupilToTeacherAA.schoolData = this.numberOfPupils;
      if (pupilToTeacherAA.schoolData != null) {
        pupilToTeacherAA.calculatedSchoolData = parseFloat((pupilToTeacherAA.schoolData
          / pupilToTeacherAA.totalForAreaType).toFixed(2));
      } else {
        pupilToTeacherAA.calculatedSchoolData = null;
      }
      this.setAAsMatchingTreshold(pupilToTeacherAA);
    }

    const pupilToAdultAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Pupil to adult ratio');
    if (pupilToAdultAA) {
      pupilToAdultAA.totalForAreaType = this.workforceTotal;
      pupilToAdultAA.schoolData = this.numberOfPupils;
      if (pupilToAdultAA.schoolData != null) {
        pupilToAdultAA.calculatedSchoolData = parseFloat((pupilToAdultAA.schoolData
          / pupilToAdultAA.totalForAreaType).toFixed(2));
      } else {
        pupilToAdultAA.calculatedSchoolData = null;
      }
      this.setAAsMatchingTreshold(pupilToAdultAA);
    }

    const teacherContactRatioAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Teacher contact ratio (less than 1)');
    if (teacherContactRatioAA) {
      teacherContactRatioAA.calculatedSchoolData = teacherContactRatioAA.schoolData;
      this.setAAsMatchingTreshold(teacherContactRatioAA);
    }

    // tslint:disable-next-line:max-line-length
    const pupilChangeAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Predicted percentage pupil number change in 3-5 years');
    if (pupilChangeAA) {
      pupilChangeAA.calculatedSchoolData = pupilChangeAA.schoolData;
      this.setAAsMatchingTreshold(pupilChangeAA);
    }

    const avClassSizeAA = this.sadAssessmentAreas?.find(aa => aa.assessmentAreaName === 'Average Class size');
    if (avClassSizeAA) {
      avClassSizeAA.calculatedSchoolData = avClassSizeAA.schoolData;
      this.setAAsMatchingTreshold(avClassSizeAA);
    }

  }

  private initReserveAAsWithCalculatedData() {
    this.reserveAAs?.forEach(aa => {
      aa.totalForAreaType = this.totalIncome;
      if (aa.schoolData === undefined) {
        aa.schoolData = aa.schoolDataLatestTerm;
      }

      if (aa.schoolData != null) {
        aa.calculatedSchoolData = parseFloat((aa.schoolData / aa.totalForAreaType).toFixed(2));
      } else {
        aa.calculatedSchoolData = null;
      }

      this.setAAsMatchingTreshold(aa);
    });
  }

  private initSpendingAAsWithCalculatedData() {
    this.spendingAAs?.forEach(aa => {
      aa.totalForAreaType = this.totalExpenditure;
      if (aa.schoolData === undefined) {
        aa.schoolData = aa.schoolDataLatestTerm;
      }

      if (aa.schoolData != null) {
        aa.calculatedSchoolData = parseFloat((aa.schoolData / aa.totalForAreaType).toFixed(2));
      } else {
        aa.calculatedSchoolData = null;
      }

      this.setAAsMatchingTreshold(aa);
    });
  }

  private setAAsMatchingTreshold(aa: AssessmentAreaModel) {
    if (aa.calculatedSchoolData) {
      aa.matchingTreshold = aa.allTresholds
        .find(t => (aa.calculatedSchoolData >= t.scoreLow || t.scoreLow == null)
          && (aa.calculatedSchoolData <= t.scoreHigh || t.scoreHigh === null));
    } else {
      aa.matchingTreshold = null;
    }
  }
}


