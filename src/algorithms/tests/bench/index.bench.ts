import { bench, describe } from 'vitest';
import { maximumOddSum, removeIdenticalLetters } from '../../index';
import { generateListOfNumbers, generateString } from '../testUtil';

describe('removeIdenticalLetters', () => {
  const longString = generateString(150000, 'aabbbbbbccccccdddddddd');

  bench(
    'Supplied input with length 150 000',
    () => {
      removeIdenticalLetters(longString);
    },
    { iterations: 50 },
  );

  const longerString = generateString(20000000, 'aabbbbbbccccccdddddddd');

  bench(
    'Supplied input with length 20 000 000',
    () => {
      removeIdenticalLetters(longerString, {
        maxInputLength: 20000000,
      });
    },
    { iterations: 20 },
  );
});

describe('maximumOddSum', () => {
  bench('Supplied input with length 100 and range 1000', () => {
    maximumOddSum(generateListOfNumbers(100, 1000));
  });

  bench('Supplied input with length 100 and range 1 500 000', () => {
    maximumOddSum(generateListOfNumbers(100, 1500000));
  });

  bench('Supplied input with length 150 000 and range 1000', () => {
    maximumOddSum(generateListOfNumbers(150000, 1000));
  });

  bench('Supplied input with length 150 000 and range 1 500 000', () => {
    maximumOddSum(generateListOfNumbers(150000, 1500000));
  });
});
