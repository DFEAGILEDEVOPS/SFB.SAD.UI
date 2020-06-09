import { AssessmentAreaModel } from './AssessmentAreaModel';
import { FSMLookupModel } from './FSMLookupModel';
import { SizeLookupModel } from './SizeLookupModel';
export class SaScenario {
  scenarioName: string;
  urn: number;
  name: string;
  latestTerm: string;
  termOfScenario: string;
  overallPhase: string;
  hasSixthForm: string;
  hasSixthFormLatestTerm: string;
  overallPhaseLatestTerm: string;
  overallPhaseWSixthForm: string;
  londonWeighting: string;
  londonWeightingLatestTerm: string;
  numberOfPupils: number;
  numberOfPupilsLatestTerm: number;
  fsm: number;
  fsmLatestTerm: number;
  ofstedRating: string;
  ofstedInspectionDate: string;
  progressScore: number;
  progressScoreType: string;
  progress8Banding: number;
  totalExpenditure: number;
  totalExpenditureLatestTerm: number;
  totalIncome: number;
  totalIncomeLatestTerm: number;
  sadSizeLookup: SizeLookupModel;
  sadFSMLookup: FSMLookupModel;
  sadAssesmentAreas: AssessmentAreaModel[];
  spendingAAs: AssessmentAreaModel[];
  reserveAAs: AssessmentAreaModel[];
  characteristicAAs: AssessmentAreaModel[];
  outcomeAAs: AssessmentAreaModel[];

  getAAValue(aaName: string) {
    return this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData;
  }

  getAALatestTermValue(aaName: string) {
    return this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolDataLatestTerm;
  }

  setAAValue(aaName: string, value: any) {
    this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData = value;
  }
}
