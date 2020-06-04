import { AssessmentAreaModel } from './AssessmentAreaModel';
import { FSMLookupModel } from './FSMLookupModel';
import { SizeLookupModel } from './SizeLookupModel';
export class SAModel {
  scenarioName: string;
  urn: number;
  name: string;
  latestTerm: string;
  termOfScenario: string;
  overallPhase: string;
  overallPhaseLatestTerm: string;
  overallPhaseWSixthForm: string;
  overallPhaseWSixthFormLatestTerm: string;
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
}
