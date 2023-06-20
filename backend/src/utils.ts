export type ClassParameters = {
  k1: { mLowerThan1: number; mGreaterThan1: number };
  k2: { A: number; B: number; C: number };
  RHmin: number;
};

export const VerySensitive: ClassParameters = {
  k1: { mLowerThan1: 1, mGreaterThan1: 2 },
  k2: { A: 1, B: 7, C: 2 },
  RHmin: 80,
};

export const Sensitive: ClassParameters = {
  k1: { mLowerThan1: 0.578, mGreaterThan1: 0.386 },
  k2: { A: 0.3, B: 6, C: 1 },
  RHmin: 80,
};

export const MediumResistant: ClassParameters = {
  k1: { mLowerThan1: 0.072, mGreaterThan1: 0.097 },
  k2: { A: 0, B: 5, C: 1.5 },
  RHmin: 85,
};

export const Resistant: ClassParameters = {
  k1: { mLowerThan1: 0.033, mGreaterThan1: 0.014 },
  k2: { A: 0, B: 3, C: 1 },
  RHmin: 85,
};

export function getClassParameters(wallType: string) {
  switch (wallType) {
    case 'Concrete':
      return MediumResistant;
    case 'Spruce board':
      return Sensitive;
    case 'Pine sapwood':
      return VerySensitive;
    case 'Glass wool':
      return MediumResistant;
    case 'Polyester wool':
      return MediumResistant;
    case 'PUR with polished surface':
      return Resistant;
    case 'PUR with paper surface':
      return Sensitive;
  }
}

export function calculateMmax(
  A: number,
  B: number,
  C: number,
  RHmin: number,
  temperature: number,
  relativeHumidity: number,
) {
  const RHcrit =
    temperature < 20
      ? -0.00267 * Math.pow(temperature, 3) +
        0.16 * Math.pow(temperature, 2) -
        3.13 * temperature +
        100
      : RHmin;
  return (
    A +
    B * ((RHcrit - relativeHumidity) / (RHcrit - 100)) -
    C * Math.pow((RHcrit - relativeHumidity) / (RHcrit - 100), 2)
  );
}

export function calculateMoldIndex(
  mMax: number,
  temperature: number,
  relativeHumidity: number,
  k1MLowerThan1: number,
  k1MGreaterThan1: number,
) {
  const data: number[] = [];
  let currentM = 0;
  let previousM = 0;
  let deltaM = 0;
  let k1 = 0;
  let k2 = 0;
  for (let t = 0; t < 10; t = t + 1) {
    k1 = currentM < 1 ? k1MLowerThan1 : k1MGreaterThan1;
    k2 = Math.max(1 - Math.exp(2.3 * (currentM - mMax)), 0);
    deltaM =
      (k1 * k2) /
      (7 *
        Math.exp(
          -0.68 * Math.log(temperature) -
            13.9 * Math.log(relativeHumidity) +
            66.02,
        ));
    currentM = previousM + deltaM;
    if (currentM < 0) {
      currentM = 0;
    }
    previousM = currentM;
    data.push(currentM);
  }
  return data;
}

export type Parameters = {
  temperature: number;
  humidity: number;
  moldIndex: number;
};
