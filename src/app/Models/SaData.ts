import { AssessmentAreaModel } from './AssessmentAreaModel';
import { SizeLookupModel } from './SizeLookupModel';
import { FSMLookupModel } from './FSMLookupModel';
export class SaData {
  urn: number;
  name: string;
  latestTerm: string;
  financeType: string;
  hasSixthForm: boolean;
  overallPhase: string;
  isReturnsComplete: boolean;
  londonWeighting: string;
  numberOfPupilsLatestTerm: number;
  fsmLatestTerm: number;
  ofstedRating: string;
  ofstedInspectionDate: string;
  progressScore: number;
  progressScoreType: string;
  progress8Banding: number;
  totalExpenditureLatestTerm: number;
  totalIncomeLatestTerm: number;
  teachersTotalLastTerm: number;
  teachersLeaderLastTerm: number;
  workforceTotalLastTerm: number;
  sadSizeLookup: SizeLookupModel;
  sadFSMLookup: FSMLookupModel;
  sadAssesmentAreas: AssessmentAreaModel[];
}
