// Backend-friendly mock data for Wallet & Transactions

export const walletStats = {
  totalBalance: 847300,            // INR
  totalCredits: 1200000,
  totalDebits: 352700,
  pendingTransactions: 24100,
  changes: {
    totalBalance: 12.5,            // %
    totalCredits: 18.7,
    totalDebits: 8.2,
    pendingTransactions: -5.3,
  },
};

// Keep fields close to what your API will return
export const walletTransactions = [
  {
    id: "TXN001",
    user: "DJ Melody",
    type: "credit",
    amount: 15000,
    description: "Royalty Payment - Spotify",
    status: "Completed",
    date: "2024-01-28",
    month: "Jan 2024",
    licence: "Standard",
    account: "Main",

    // Newly added fields
    availableBalance: 50000,
    monthEarnings: 25000,
    walletStatus: "Active", // Active | Frozen | Suspended
    bankAccount: "XXXX-1234",
    ifsc: "HDFC0005678",
  },
  {
    id: "TXN002",
    user: "Sound Wave",
    type: "debit",
    amount: 2500,
    description: "Platform Fee",
    status: "Completed",
    date: "2024-01-27",
    month: "Jan 2024",
    licence: "Standard",
    account: "Main",

    availableBalance: 120000,
    monthEarnings: 18000,
    walletStatus: "Active",
    bankAccount: "XXXX-9823",
    ifsc: "ICIC0003421",
  },
  {
    id: "TXN003",
    user: "Rhythm Master",
    type: "credit",
    amount: 8750,
    description: "Merchandise Sale",
    status: "Pending",
    date: "2024-01-26",
    month: "Jan 2024",
    licence: "Pro",
    account: "Store",

    availableBalance: 76000,
    monthEarnings: 22000,
    walletStatus: "Frozen",
    bankAccount: "XXXX-5544",
    ifsc: "SBIN0011223",
  },
  {
    id: "TXN004",
    user: "Bass Line",
    type: "credit",
    amount: 12300,
    description: "Subscription Revenue",
    status: "Completed",
    date: "2024-01-25",
    month: "Jan 2024",
    licence: "Pro",
    account: "Main",

    availableBalance: 30500,
    monthEarnings: 14500,
    walletStatus: "Active",
    bankAccount: "XXXX-8877",
    ifsc: "PNB0009087",
  },
  {
    id: "TXN005",
    user: "Vocal Star",
    type: "debit",
    amount: 1200,
    description: "Withdrawal Request",
    status: "Processing",
    date: "2024-01-24",
    month: "Jan 2024",
    licence: "Standard",
    account: "Main",

    availableBalance: 15000,
    monthEarnings: 3500,
    walletStatus: "Suspended",
    bankAccount: "XXXX-6633",
    ifsc: "AXIS0004412",
  },
];

// Dropdown options (can be fed from API later)
export const statusOptions = ["All Status", "Completed", "Pending", "Processing"];
export const licenceOptions = ["All Licences", "Standard", "Pro"];
export const monthOptions = ["All Months", "Jan 2024"];
export const accountOptions = ["All Accounts", "Main", "Store"];
export const typeOptions = ["All Types", "Credit", "Debit"];