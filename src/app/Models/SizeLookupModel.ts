export class SizeLookupModel {
  constructor(
    public noPupilsMin: number,
    public noPupilsMax: number,
    public sizeType: string,
    public overallPhase: string,
    public hasSixthForm: boolean,
    public term: string) { }
}
