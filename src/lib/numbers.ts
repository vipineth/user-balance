export function limitDecimals(amount: number, decimals: number = 2) {
  return Number(amount.toFixed(decimals))
}
