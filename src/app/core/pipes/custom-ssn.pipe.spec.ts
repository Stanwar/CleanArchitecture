import { CustomSSNPipe } from './custom-ssn.pipe';

describe('CustomSSNPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomSSNPipe();
    expect(pipe).toBeTruthy();
  });
});
