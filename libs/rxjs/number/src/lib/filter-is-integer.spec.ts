import { from } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
import { filterIsInteger } from '@henryqrm/rxjs-number';

describe('filterIsInteger', () => {
  it('should return valid numbers that are integers', (done) => {
    from([1, 2, 3.14, '2', false, true, null])
      .pipe(
        filterIsInteger(),
        reduce<number, number[]>((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        take(1),
      )
      .subscribe({
        next: (value) => expect(value).toStrictEqual([1, 2]),
        complete: () => done(),
      });
  });
});
