import { TresholdModel } from './TresholdModel';
export class AssessmentAreaModel {
  assessmentAreaType: string;
  assessmentAreaName: string;
  schoolData: number;
  schoolDataLatestTerm: number;
  percentageSchoolData: number;
  percentageSchoolDataLatestTerm: number;
  allTresholds: TresholdModel[];
  matchingTreshold: TresholdModel;
  schoolDataFormat: string;
}
