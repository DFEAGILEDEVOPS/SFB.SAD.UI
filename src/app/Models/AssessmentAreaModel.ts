import { TresholdModel } from './TresholdModel';
export class AssessmentAreaModel {
  assessmentAreaType: string;
  assessmentAreaName: string;
  schoolData: number;
  schoolDataLatestTerm: number;
  percentageSchoolData: number;
  totalForAreaType: number;
  totalForAreaTypeLatestTerm: number;
  allTresholds: TresholdModel[];
  matchingTreshold: TresholdModel;
  schoolDataFormat: string;

  constructor(assessmentAreaType: string, assessmentAreaName: string) {
    this.assessmentAreaType = assessmentAreaType;
    this.assessmentAreaName = assessmentAreaName;
  }
}
