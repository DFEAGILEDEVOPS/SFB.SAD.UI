
import { TestBed, async } from '@angular/core/testing';
import { AaValueFormatPipe } from './aa-value-format.pipe';

describe('Pipe: aaValueFormat', () => {
  let pipe = new AaValueFormatPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms currencies correctly', () => {
    expect(pipe.transform(1000, 'Average teacher cost')).toBe('£1,000.00');
  });

  it('transforms ratios correctly', () => {
    expect(pipe.transform(10, 'Pupil to teacher ratio')).toBe("10.00");
  });

  it('transforms percentages correctly', () => {
    expect(pipe.transform(0.49, null)).toBe('49.0%');
  });

});
