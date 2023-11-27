# MeeOrder Project

MeeOrder, a Next.js app, simplifies restaurant management with a rich dashboard. Customers enjoy an intuitive interface for effortless ordering.

[See a Demo](https://meeorder-frontend.vercel.app?session-id=65566cc1a9162a10d8bc28e3)

![Startup Pitch Deck (1)](https://github.com/meeorder/meeorder-frontend/assets/90249534/b49b2f46-f952-4e95-9f91-08e7559621d9)


## Getting Started

To get started with the MeeOrder project, follow these steps:

1. Clone the project repository from GitHub:
```sh
git clone https://github.com/meeorder/meeorder-frontend.git
```
2. Install the required dependencies using npm install or yarn install.
```sh
npm install
# or
yarn install
```
3. Run the project using npm run dev or yarn dev.
```sh
npm run dev
# or
yarn dev
```
4. Access the web application through your browser.
5. Make sure you have the necessary environment variables and configurations set up, and the project should run smoothly.

## Table of Contents

1. [User Account and Sign-in](#user-account-and-sign-in)
2. [Restaurant Dashboard](#restaurant-dashboard)
   - [Access](#access)
   - [Dashboard](#dashboard)
   - [Sales Reports](#sales-reports)
   - [Menus, Ingredients, and Coupons](#menus-ingredients-and-coupons)
   - [Order Management](#order-management)
   - [Settings](#settings)
3. [Customer Side](#customer-side)
   - [Access](#access)
   - [Ordering](#ordering)
   - [Cart](#cart)
   - [Order Tracking](#order-tracking)
   - [Coupon Usage](#coupon-usage)
4. [Terminology](#terminology)
5. [External Menu and Coupon Viewing](#external-menu-and-coupon-viewing)

## User Account and Sign-in

- Create a user account.
- Sign in to access the restaurant management dashboard or customer side.

## Restaurant Dashboard

### Access

- Restaurant owners and staff can log in to the dashboard.
- Each account has a role, such as cashier or manager, with specific permissions.

### Dashboard

- View restaurant statistics, including bill count, net income, coupon usage, popular menu items, and average revenue per bill.
- Access sales reports.

### Sales Reports

- View sales data by specified time intervals.

### Menus, Ingredients, and Coupons

- Manage restaurant menus, including adding, deleting, and editing menu items.
- Organize menus into categories.
- Add and edit ingredients and toppings for menu items.
- Create and manage coupons.
- Set up draft menus and preview sample menus.

### Order Management

- Manage tables within the restaurant.
- Open and close tables.
- Edit orders for each table.
- Display QR codes for customers to scan and order from their tables.
- Cancel orders (by cashiers through order editing).

### Settings

- Configure restaurant settings.
- Set the restaurant logo and name.
- Manage user accounts.
- Change user roles.
- Reset user passwords.
- Delete user accounts.

## Customer Side

### Access

- Customers can access the customer interface by scan QR Code.

### Ordering

- Browse restaurant menus by category.
- Add items to the cart.

### Cart

- View the cart, including details of the selected items.
- Edit item details.

### Order Tracking

- Track orders.
- Use coupons for discounts.

### Coupon Usage

- Apply coupons to orders for discounts.

## Terminology

- **Bill**: A customer's bill, representing an order.
- **Table**: A customer's dining table within the restaurant.
- **Coupon**: A discount voucher for use in orders.
- **Ingredient**: Components of a menu item.
- **Topping**: Additional options for menu items.
- **Menu Category**: A way to categorize menu items.

## External Menu and Coupon Viewing

- Customers can view the restaurant's menu without the need for login.
- Customers can also view coupons offered by the restaurant after login.

This readme provides an overview of the MeeOrder project and instructions for getting started with the application. The project leverages the Next.js framework for web development.
