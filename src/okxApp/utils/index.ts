export function calculateMA5(data: number[]) {
  for (let i = 0; i < data.length; i++) {
    if (i >= 4) {
      let sum = 0;
      for (let j = i - 4; j <= i; j++) {
        sum += data[j];
      }
      const ma5 = sum / 5;
      return ma5;
    }
  }
}

export function calculateBoll(data: number[]) {
  // 计算BOLL指标
  for (let i = 0; i < data.length; i++) {
    if (i >= 19) {
      let sum = 0;
      for (let j = i - 19; j <= i; j++) {
        sum += data[j];
      }
      const ma20 = sum / 20;
      let sumSquareDeviation = 0;
      for (let j = i - 19; j <= i; j++) {
        sumSquareDeviation += Math.pow(data[j] - ma20, 2);
      }
      const stdDeviation = Math.sqrt(sumSquareDeviation / 20);
      const bollUpper = ma20 + 2 * stdDeviation;
      const bollLower = ma20 - 2 * stdDeviation;
      return [bollUpper, ma20, bollLower];
    }
  }
}
