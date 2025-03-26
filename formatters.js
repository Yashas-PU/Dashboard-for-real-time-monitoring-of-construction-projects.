exports.formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

exports.formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
};