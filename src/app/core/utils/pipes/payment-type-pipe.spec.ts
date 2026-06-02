import {PaymentTypePipe} from './payment-type-pipe';

describe('PaymentTypePipe', () => {
  it('create an instance', () => {
    const pipe = new PaymentTypePipe();
    expect(pipe).toBeTruthy();
  });
});
