// Stub implementation for frontend - actual implementation is in ../../../api/shared/walletPassModel.js
export const DEFAULT_WALLET_ROOT_URL = "https://hushhtech.com";
export const WALLET_CARD_BADGE_TEXT = "HUSHH GOLD";
export const WALLET_CARD_TITLE = "Hushh Gold Investor Pass";
export const WALLET_CARD_ORGANIZATION_NAME = "Hushh Technologies";
export const WALLET_CARD_ORGANIZATION_FALLBACK = "Hushh";
export const WALLET_CARD_STATUS = "Gold Member";

const getTrimmedString = (value) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : "";

export const getWalletPayloadFieldValue = (fields, key, fallback = "") => {
  if (!Array.isArray(fields)) {
    return fallback;
  }
  const field = fields.find((item) => item?.key === key);
  const value = getTrimmedString(field?.value);
  return value || fallback;
};

export const getWalletInvestmentClass = (amount) => {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "Class C";
  }
  if (amount >= 5_000_000) return "Class A";
  if (amount >= 2_000_000) return "Class B";
  return "Class C";
};

const normalizeInvestmentClass = (value) => {
  const normalizedValue = getTrimmedString(value).replace(/^Investor\s*-\s*/i, "");
  return normalizedValue || "Class C";
};

const buildInvestmentLabel = (investmentClass) => `Investor - ${investmentClass}`;

const getDisplayValue = (value, fallback) => getTrimmedString(value) || fallback;

const buildPublicProfileUrl = (input) =>
  getTrimmedString(input?.slug)
    ? `${DEFAULT_WALLET_ROOT_URL}/investor/${getTrimmedString(input.slug)}`
    : null;

const buildMembershipId = (input) =>
  getTrimmedString(input?.slug) ||
  getTrimmedString(input?.userId) ||
  (getTrimmedString(input?.email)
    ? getTrimmedString(input.email).split("@")[0]
    : "hushh-investor");

export const buildWalletCardContent = (input) => ({
  badgeText: WALLET_CARD_BADGE_TEXT,
  title: WALLET_CARD_TITLE,
  holderName: getDisplayValue(input?.name, "Hushh Investor"),
  organizationName: WALLET_CARD_ORGANIZATION_NAME,
  membershipId: buildMembershipId(input),
  investmentClass: normalizeInvestmentClass(
    buildInvestmentLabel(
      getWalletInvestmentClass(input?.investmentAmount)
    )
  ),
  email: getDisplayValue(input?.email, ""),
  passUrl: `${DEFAULT_WALLET_ROOT_URL}/wallet-pass`,
  profileUrl: buildPublicProfileUrl(input),
});

export const buildGoldPassPayload = (input) => ({
  holderName: getDisplayValue(input?.name, "Hushh Investor"),
  organizationName: WALLET_CARD_ORGANIZATION_NAME,
  investmentClass: normalizeInvestmentClass(
    buildInvestmentLabel(
      getWalletInvestmentClass(input?.investmentAmount)
    )
  ),
  membershipId: buildMembershipId(input),
  email: getDisplayValue(input?.email, ""),
  passUrl: `${DEFAULT_WALLET_ROOT_URL}/wallet-pass`,
  profileUrl: buildPublicProfileUrl(input),
});
