import { AssessmentAreaModel } from './AssessmentAreaModel';
import { FSMLookupModel } from './FSMLookupModel';
import { SizeLookupModel } from './SizeLookupModel';
export class SAModel {
  urn: number;
  name: string;
  latestTerm: string;
  overallPhaseWSixthForm: string;
  sadSizeLookup: SizeLookupModel;
  sadFSMLookup: FSMLookupModel;
  sadAssesmentAreas: AssessmentAreaModel;
}
