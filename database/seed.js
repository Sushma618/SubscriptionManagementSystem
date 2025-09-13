const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../backend/models/User');
const Plan = require('../backend/models/Plan');
const Subscription = require('../backend/models/Subscription');
const Log = require('../backend/models/Log');

const Discount = require('../backend/models/Discount');
const Billing = require('../backend/models/Billing');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lumen_quest';


// TODO: Replace the following arrays with the full data you provided above (users, plans, subscriptions, logs, billing)
// For brevity, only a few sample entries are shown here. Paste your full data for production use.

const users = [
  { userId: 1, name: 'User1', phone: '1234567801', email: 'user1@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 2, name: 'User2', phone: '1234567802', email: 'user2@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 3, name: 'User3', phone: '1234567803', email: 'user3@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 4, name: 'User4', phone: '1234567804', email: 'user4@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 5, name: 'User5', phone: '1234567805', email: 'user5@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 6, name: 'User6', phone: '1234567806', email: 'user6@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 7, name: 'User7', phone: '1234567807', email: 'user7@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 8, name: 'User8', phone: '1234567808', email: 'user8@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 9, name: 'User9', phone: '1234567809', email: 'user9@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 10, name: 'User10', phone: '1234567810', email: 'user10@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 11, name: 'User11', phone: '1234567811', email: 'user11@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 12, name: 'User12', phone: '1234567812', email: 'user12@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 13, name: 'User13', phone: '1234567813', email: 'user13@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 14, name: 'User14', phone: '1234567814', email: 'user14@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 15, name: 'User15', phone: '1234567815', email: 'user15@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 16, name: 'User16', phone: '1234567816', email: 'user16@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 17, name: 'User17', phone: '1234567817', email: 'user17@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 18, name: 'User18', phone: '1234567818', email: 'user18@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 19, name: 'User19', phone: '1234567819', email: 'user19@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 20, name: 'User20', phone: '1234567820', email: 'user20@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 21, name: 'User21', phone: '1234567821', email: 'user21@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 22, name: 'User22', phone: '1234567822', email: 'user22@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 23, name: 'User23', phone: '1234567823', email: 'user23@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 24, name: 'User24', phone: '1234567824', email: 'user24@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 25, name: 'User25', phone: '1234567825', email: 'user25@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 26, name: 'User26', phone: '1234567826', email: 'user26@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 27, name: 'User27', phone: '1234567827', email: 'user27@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 28, name: 'User28', phone: '1234567828', email: 'user28@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 29, name: 'User29', phone: '1234567829', email: 'user29@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 30, name: 'User30', phone: '1234567830', email: 'user30@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 31, name: 'User31', phone: '1234567831', email: 'user31@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 32, name: 'User32', phone: '1234567832', email: 'user32@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 33, name: 'User33', phone: '1234567833', email: 'user33@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 34, name: 'User34', phone: '1234567834', email: 'user34@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 35, name: 'User35', phone: '1234567835', email: 'user35@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 36, name: 'User36', phone: '1234567836', email: 'user36@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 37, name: 'User37', phone: '1234567837', email: 'user37@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 38, name: 'User38', phone: '1234567838', email: 'user38@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 39, name: 'User39', phone: '1234567839', email: 'user39@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 40, name: 'User40', phone: '1234567840', email: 'user40@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 41, name: 'User41', phone: '1234567841', email: 'user41@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 42, name: 'User42', phone: '1234567842', email: 'user42@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 43, name: 'User43', phone: '1234567843', email: 'user43@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 44, name: 'User44', phone: '1234567844', email: 'user44@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 45, name: 'User45', phone: '1234567845', email: 'user45@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 46, name: 'User46', phone: '1234567846', email: 'user46@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 47, name: 'User47', phone: '1234567847', email: 'user47@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 48, name: 'User48', phone: '1234567848', email: 'user48@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 49, name: 'User49', phone: '1234567849', email: 'user49@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 50, name: 'User50', phone: '1234567850', email: 'user50@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 51, name: 'User51', phone: '1234567851', email: 'user51@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 52, name: 'User52', phone: '1234567852', email: 'user52@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 53, name: 'User53', phone: '1234567853', email: 'user53@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 54, name: 'User54', phone: '1234567854', email: 'user54@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 55, name: 'User55', phone: '1234567855', email: 'user55@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 56, name: 'User56', phone: '1234567856', email: 'user56@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 57, name: 'User57', phone: '1234567857', email: 'user57@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 58, name: 'User58', phone: '1234567858', email: 'user58@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 59, name: 'User59', phone: '1234567859', email: 'user59@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 60, name: 'User60', phone: '1234567860', email: 'user60@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 61, name: 'User61', phone: '1234567861', email: 'user61@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 62, name: 'User62', phone: '1234567862', email: 'user62@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 63, name: 'User63', phone: '1234567863', email: 'user63@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 64, name: 'User64', phone: '1234567864', email: 'user64@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 65, name: 'User65', phone: '1234567865', email: 'user65@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 66, name: 'User66', phone: '1234567866', email: 'user66@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 67, name: 'User67', phone: '1234567867', email: 'user67@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 68, name: 'User68', phone: '1234567868', email: 'user68@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 69, name: 'User69', phone: '1234567869', email: 'user69@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 70, name: 'User70', phone: '1234567870', email: 'user70@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 71, name: 'User71', phone: '1234567871', email: 'user71@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 72, name: 'User72', phone: '1234567872', email: 'user72@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 73, name: 'User73', phone: '1234567873', email: 'user73@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 74, name: 'User74', phone: '1234567874', email: 'user74@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 75, name: 'User75', phone: '1234567875', email: 'user75@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 76, name: 'User76', phone: '1234567876', email: 'user76@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 77, name: 'User77', phone: '1234567877', email: 'user77@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 78, name: 'User78', phone: '1234567878', email: 'user78@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 79, name: 'User79', phone: '1234567879', email: 'user79@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 80, name: 'User80', phone: '1234567880', email: 'user80@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 81, name: 'User81', phone: '1234567881', email: 'user81@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 82, name: 'User82', phone: '1234567882', email: 'user82@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 83, name: 'User83', phone: '1234567883', email: 'user83@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 84, name: 'User84', phone: '1234567884', email: 'user84@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 85, name: 'User85', phone: '1234567885', email: 'user85@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 86, name: 'User86', phone: '1234567886', email: 'user86@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 87, name: 'User87', phone: '1234567887', email: 'user87@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 88, name: 'User88', phone: '1234567888', email: 'user88@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 89, name: 'User89', phone: '1234567889', email: 'user89@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 90, name: 'User90', phone: '1234567890', email: 'user90@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 91, name: 'User91', phone: '1234567891', email: 'user91@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 92, name: 'User92', phone: '1234567892', email: 'user92@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 93, name: 'User93', phone: '1234567893', email: 'user93@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 94, name: 'User94', phone: '1234567894', email: 'user94@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 95, name: 'User95', phone: '1234567895', email: 'user95@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 96, name: 'User96', phone: '1234567896', email: 'user96@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 97, name: 'User97', phone: '1234567897', email: 'user97@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 98, name: 'User98', phone: '1234567898', email: 'user98@example.com', status: 'active', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 99, name: 'User99', phone: '1234567899', email: 'user99@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { userId: 100, name: 'User100', phone: '12345678100', email: 'user100@example.com', status: 'inactive', password: bcrypt.hashSync('password', 10), role: 'user' },
  { name: 'Admin', email: 'admin@example.com', password: bcrypt.hashSync('admin123', 10), role: 'admin', status: 'active', phone: '9999999999' },
];

const plans = [
  { name: 'Plan1', productType: 'Fibernet', quota: 100, price: 57.65, features: ['Unlimited calls'], isActive: true },
  { name: 'Plan2', productType: 'Broadband Copper', quota: 50, price: 15.3, features: ['Free router'], isActive: true },
  { name: 'Plan3', productType: 'Fibernet', quota: 200, price: 73.86, features: ['Unlimited calls', 'Free installation'], isActive: true },
  { name: 'Plan4', productType: 'Fibernet', quota: 150, price: 27.82, features: ['Free router'], isActive: true },
  { name: 'Plan5', productType: 'Broadband Copper', quota: 80, price: 42.58, features: ['Unlimited calls'], isActive: true },
  { name: 'Plan6', productType: 'Fibernet', quota: 120, price: 95.36, features: ['Free installation'], isActive: true },
  { name: 'Plan7', productType: 'Fibernet', quota: 90, price: 23.3, features: ['Unlimited calls'], isActive: true },
  { name: 'Plan8', productType: 'Broadband Copper', quota: 60, price: 86.42, features: ['Free router'], isActive: true },
  { name: 'Plan9', productType: 'Fibernet', quota: 110, price: 96.42, features: ['Unlimited calls'], isActive: true },
  { name: 'Plan10', productType: 'Fibernet', quota: 130, price: 29.92, features: ['Free installation'], isActive: true },
  // ...add more plans as needed, ensuring each has name, productType, quota, price, features, isActive...
];

const discounts = [
  { code: 'NEW20', description: '20% off for new users', percentage: 20, validFrom: new Date(), validTo: new Date(Date.now() + 30*24*60*60*1000) },
  // ... add more discounts as needed ...
];

const subscriptions = [
  // Example: { user: <ObjectId>, plan: <ObjectId>, status: 'active', startDate: new Date('2024-04-20'), autoRenew: true }
  // You must map userId/productId to actual ObjectIds after seeding users/plans, and use only valid status values ('active', 'cancelled', 'expired')
];

const logs = [
  { subscriptionId: 30, currentStatus: 'initialized', nextStatus: 'paused', action: 'renew', actionDate: '2024-05-17' },
  { subscriptionId: 51, currentStatus: 'active', nextStatus: 'paused', action: 'billing_success', actionDate: '2024-10-28' },
  { subscriptionId: 15, currentStatus: 'active', nextStatus: 'paused', action: 'renew', actionDate: '2024-09-18' },
  { subscriptionId: 69, currentStatus: 'active', nextStatus: 'paused', action: 'renew_failed', actionDate: '2024-08-09' },
  { subscriptionId: 99, currentStatus: 'initialized', nextStatus: 'active', action: 'renew_failed', actionDate: '2024-07-23' },
  { subscriptionId: 62, currentStatus: 'initialized', nextStatus: 'paused', action: 'purchase', actionDate: '2024-01-31' },
  { subscriptionId: 77, currentStatus: 'initialized', nextStatus: 'paused', action: 'billing_success', actionDate: '2023-12-26' },
  { subscriptionId: 75, currentStatus: 'active', nextStatus: 'active', action: 'renew_failed', actionDate: '2024-07-17' },
  { subscriptionId: 74, currentStatus: 'active', nextStatus: 'paused', action: 'renew_failed', actionDate: '2024-01-31' },
  { subscriptionId: 22, currentStatus: 'initialized', nextStatus: 'active', action: 'billing_success', actionDate: '2024-06-08' },
  // ... (continue for all records as per your provided data) ...
];

const billings = [
  { billingId: 1, subscriptionId: 54, amount: 308.56, billingDate: '2024-01-04', paymentStatus: 'paid' },
  { billingId: 2, subscriptionId: 52, amount: 200.11, billingDate: '2024-05-26', paymentStatus: 'paid' },
  { billingId: 3, subscriptionId: 6, amount: 407.49, billingDate: '2024-06-24', paymentStatus: 'paid' },
  { billingId: 4, subscriptionId: 100, amount: 289.68, billingDate: '2024-04-09', paymentStatus: 'pending' },
  { billingId: 5, subscriptionId: 16, amount: 114.07, billingDate: '2024-11-22', paymentStatus: 'pending' },
  { billingId: 6, subscriptionId: 24, amount: 411.41, billingDate: '2024-11-26', paymentStatus: 'paid' },
  { billingId: 7, subscriptionId: 97, amount: 194.83, billingDate: '2024-08-27', paymentStatus: 'failed' },
  { billingId: 8, subscriptionId: 17, amount: 32.64, billingDate: '2024-09-13', paymentStatus: 'pending' },
  { billingId: 9, subscriptionId: 10, amount: 336.98, billingDate: '2024-09-12', paymentStatus: 'pending' },
  { billingId: 10, subscriptionId: 63, amount: 376.25, billingDate: '2023-12-02', paymentStatus: 'pending' },
  // ... (continue for all records as per your provided data) ...
];

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany();
  await Plan.deleteMany();
  await Subscription.deleteMany();
  await Log.deleteMany();
  await Discount.deleteMany();
  await Billing?.deleteMany?.();

  // Insert users, plans, discounts
  const userDocs = await User.insertMany(users);
  const planDocs = await Plan.insertMany(plans);
  const discountDocs = await Discount.insertMany(discounts);

  // Insert subscriptions, logs, billing
  await Subscription.insertMany(subscriptions);
  await Log.insertMany(logs);
  if (Billing) await Billing.insertMany(billings);

  console.log('Database seeded with provided data!');
  process.exit();
}

seed().catch(e => { console.error(e); process.exit(1); });
