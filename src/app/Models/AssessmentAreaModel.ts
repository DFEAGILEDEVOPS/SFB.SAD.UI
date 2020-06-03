import { TresholdModel } from './TresholdModel';
export class AssessmentAreaModel {
  assessmentAreaType: string;
  assessmentAreaName: string;
  schoolData: number;
  percentageSchoolData: number;
  allTresholds: TresholdModel[];
  matchingTreshold: TresholdModel;
  schoolDataFormat: string;
}
