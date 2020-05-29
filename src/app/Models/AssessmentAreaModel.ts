import { TresholdModel } from './TresholdModel';
export class AssessmentAreaModel {
  assesmentAreaName: string;
  schoolData: number;
  percentageSchoolData: number;
  allTresholds: TresholdModel[];
  matchingTreshold: TresholdModel;
}
