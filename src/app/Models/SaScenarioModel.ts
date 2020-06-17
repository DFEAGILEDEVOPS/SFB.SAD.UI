import { SaData } from './SaData';
import { AssessmentAreaModel } from './AssessmentAreaModel';
import { FSMLookupModel } from './FSMLookupModel';
import { SizeLookupModel } from './SizeLookupModel';
import { getAADataFormat } from '../core/network/services/getAADataFormat';
export class SaScenarioModel {
  scenarioName: string;
  urn: number;
  name: string;
  termOfScenario: string;
  latestTerm: string;
  overallPhase: string;
  overallPhaseLatestTerm: string;
  hasSixthForm: boolean;
  hasSixthFormLatestTerm: boolean;
  londonWeighting: string;
  londonWeightingLatestTerm: string;
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
  sadSizeLookup: SizeLookupModel;
  sadFSMLookup: FSMLookupModel;
  sadAssesmentAreas: AssessmentAreaModel[];

  scenarioNo: number;
  isEdited: boolean;
  data: SaData;

  constructor(data: SaData) {
    this.data = data;
    this.name = data.name;
    this.urn = data.urn;
    this.latestTerm = data.latestTerm;
    this.hasSixthFormLatestTerm = data.hasSixthFormLatestTerm;
    this.overallPhaseLatestTerm = data.overallPhaseLatestTerm;
    this.londonWeightingLatestTerm = data.londonWeightingLatestTerm;
    this.numberOfPupilsLatestTerm = data.numberOfPupilsLatestTerm;
    this.fsmLatestTerm = data.fsmLatestTerm;
    this.ofstedRating = data.ofstedRating;
    this.ofstedInspectionDate = data.ofstedInspectionDate;
    this.progressScore = data.progressScore;
    this.progressScoreType = data.progressScoreType;
    this.progress8Banding = data.progress8Banding;
    this.totalExpenditureLatestTerm = data.totalExpenditureLatestTerm;
    this.totalIncomeLatestTerm = data.totalIncomeLatestTerm;
    this.sadSizeLookup = data.sadSizeLookup;
    this.sadFSMLookup = data.sadFSMLookup;
    this.sadAssesmentAreas = data.sadAssesmentAreas;

    this.termOfScenario = this.latestTerm;
    this.scenarioName = this.termOfScenario ? this.termOfScenario + ' finance data' : null;
    this.overallPhase = this.overallPhaseLatestTerm;
    this.hasSixthForm = this.hasSixthFormLatestTerm;
    this.totalIncome = this.totalIncomeLatestTerm;
    this.totalExpenditure = this.totalExpenditureLatestTerm;
    this.londonWeighting = this.londonWeightingLatestTerm;
    this.numberOfPupils = this.numberOfPupilsLatestTerm;
    this.fsm = this.fsmLatestTerm;

    this.initializeAssessmentAreas();
  }

  get overallPhaseWSixthForm(): string {
    if (this.hasSixthForm && this.overallPhase !== 'All-through') {
     return this.overallPhase + ' with sixth form';
    }
    return this.overallPhase;
  }

  get spendingAAs(): AssessmentAreaModel[] {
    return this.sadAssesmentAreas?.filter(aa => aa.assessmentAreaType === 'Spending');
  }

  get reserveAAs(): AssessmentAreaModel[] {
    return this.sadAssesmentAreas?.filter(aa => aa.assessmentAreaType === 'Reserve and balance');
  }

  get characteristicAAs(): AssessmentAreaModel[] {
    return this.sadAssesmentAreas?.filter(aa => aa.assessmentAreaType === 'School characteristics');
  }

  getAAValue(aaName: string): number {
    return this.sadAssesmentAreas?.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData;
  }

  getAALatestTermValue(aaName: string): number {
    return this.sadAssesmentAreas?.filter(aa => aa.assessmentAreaName === aaName)[0].schoolDataLatestTerm;
  }

  setAAValue(aaName: string, value: number) {
    this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData = value;
  }

  private initializeAssessmentAreas() {
    this.sadAssesmentAreas?.forEach(aa => {
        aa.schoolData = aa.schoolDataLatestTerm;
        aa.totalForAreaType = aa.totalForAreaTypeLatestTerm;

      if (aa.schoolData) {
        aa.percentageSchoolData = parseFloat((aa.schoolData / aa.totalForAreaType).toFixed(2));
      }

      aa.matchingTreshold = aa.allTresholds
        .find(t => aa.percentageSchoolData >= t.scoreLow && aa.percentageSchoolData <= t.scoreHigh);

      aa.schoolDataFormat = getAADataFormat(aa.assessmentAreaName);
    });
  }
}


