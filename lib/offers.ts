// Store-wide commerce settings. These are placeholders chosen when the site was built, not from the price list.
// Adjust them to match what the business actually offers.
export const FREE_SHIP = 3999;
export const SHIP_FEE = 149;
export const PREPAID_OFF = 50;
export const COD_MAX = 10000;
export const OFFERS = ["PERFUMES FROM ₹350", "100 FRAGRANCES, 3 SIZES", "PAY ONLINE AND SAVE ₹50", "FREE SHIPPING ABOVE ₹3,999", "CASH ON DELIVERY AVAILABLE"];
// Discount display. MRP shown (struck through) = selling price x MRP_MARKUP, rounded up to the next Rs 50 (Rs 500 -> Rs 750).
// PLACEHOLDER: replace with the real MRPs (set `mrp` on each variant) before launch.
export const MRP_MARKUP = 1.5;
// Flip to true once order emails / SMS are wired up, so the order-success page stops saying they are off.
export const NOTIFICATIONS_LIVE = false;
// Only the 30 / 50 / 100 ml perfumes are sold for now (the client has shared those three bottles only).
// Set to true to bring back the 6 ml and 12 ml attars (the copy that mentions attars was removed too, so re-add it as well).
export const ATTARS_ENABLED = false;
