export const formatNumber = (amount: number, locale = "en-US") => {
  const fixedAmount = Number(amount).toFixed(2);

  return parseFloat(fixedAmount).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
