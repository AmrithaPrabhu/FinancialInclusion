export const mockApiResponse = (input: string): string => {
  const message = input.toLowerCase();

  if (message.includes("loan")) {
    return "A loan is borrowed money you must repay with interest. Make sure to compare interest rates and terms before borrowing.";
  }

  if (message.includes("fd") || message.includes("fixed deposit")) {
    return "Fixed Deposits offer stable returns and low risk, ideal for conservative investors.";
  }

  if (message.includes("sip") || message.includes("mutual fund")) {
    return "SIP (Systematic Investment Plan) allows you to invest a fixed amount in mutual funds regularly. It helps build wealth gradually.";
  }

  if (message.includes("gold bond") || message.includes("sovereign gold bond")) {
    return "Sovereign Gold Bonds are government-backed securities linked to the price of gold. They offer interest and can be redeemed in cash.";
  }

  if (message.includes("stock") || message.includes("equity")) {
    return "Stocks represent ownership in a company. They offer high returns but carry market risk.";
  }

  if (message.includes("comparison")) {
    return "Here's a basic comparison: Stocks - high risk & return; SIP - moderate risk; FD - low risk & fixed return; Gold Bonds - stable with gold value.";
  }

  if (message.includes("save") || message.includes("saving")) {
    return "Start with a small amount regularly. Use FDs or SIPs depending on your risk level.";
  }

  if (message.includes("budget")) {
    return "A budget helps manage your income and expenses. Always prioritize needs over wants.";
  }

  if (message.includes("scam") || message.includes("fraud")) {
    return "Beware of 'too good to be true' schemes. Always verify sources, avoid sharing OTPs or banking details.";
  }

  return "I'm LaxmiBot! Ask me anything about savings, investments, loans, or budgeting.";
};
