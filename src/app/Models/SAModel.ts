import { AssessmentAreaModel } from './AssessmentAreaModel';
import { FSMLookupModel } from './FSMLookupModel';
import { SizeLookupModel } from './SizeLookupModel';
export class SAModel {
  urn: number;
  name: string;
  latestTerm: string;
  overallPhaseWSixthForm: string;
  londonWeighting: string;
  numberOfPupils: number;
  fsm: number;
  sadSizeLookup: SizeLookupModel;
  sadFSMLookup: FSMLookupModel;
  sadAssesmentAreas: AssessmentAreaModel[];
  spendingAAs: AssessmentAreaModel[];
  reserveAAs: AssessmentAreaModel[];
  characteristicAAs: AssessmentAreaModel[];
  outcomeAAs: AssessmentAreaModel[];
}
