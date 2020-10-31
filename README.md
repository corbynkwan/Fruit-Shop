# 4Hour Fruit Shop Website Coding Challenge

![Project Image](./src/assets/images/fruitsunion.png)


---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [My Information](#My-Information)

---

## Description

A Fruit Shop Website done for the coding challenge. Users can create an account and buy fruits which sends it to the firebase server that stores their order.

#### Technologies

- React
- Firebase
- HTML5
- CSS
- Git

[Back To The Top](#4Hour-Fruit-Shop-Website-Coding-Challenge)

---

## How To Use

### Opening the website

Open the terminal and go to the project directory. Then you run in order:
#### `npm install`
Installs dependencies into the /node_modules directory.<br>

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. You should see a UI like this:

![Website Image](./src/assets/images/4hourwebsiteindex.PNG)

You can click **Less/More** on each product item to increase the quantity of the product(s) you want. 
<br>

Click **Order Now** for an order summary to be shown:

![Order Summary](./src/assets/images/orderSummary.PNG)

Click **CONTINUE** for your order to be processed and uploaded to the **database**. Information on how to view the **database** can be viewed [here](#Viewing-the-Database )


Apart from ordering you can also create an account by clicking the **Create Account** button.  
![Create Account Popup](./src/assets/images/createAccountPopup.PNG)

Enter a unique **username** and **password** not in the database amd click **Create Account**, and an account will be added to the database. 

Afterwards enter the **username** and **password** of your newly created account in the login form. This notification should appear:

![Successful Login Notification](./src/assets/images/successfulLoginNotification.PNG)

### Viewing the Database  
Click this [link](https://console.firebase.google.com/project/market-project-da10f/database/market-project-da10f/data) to view the database in the browser. You should see a UI like this:
![Database Image](./src/assets/images/firebase.PNG)

You can click the **+** icon to view the fields of these variables . 

The following is an explations of what each variable's purpose is:
#### `accounts`
Stores all the **accounts** created.<br>
![Accounts Image](./src/assets/images/accounts.PNG)

#### `orders`
Stores all the **orders** created. Each order stores a **name**, **address**, **price**, and **products** <br>
![Product Prices Image](./src/assets/images/orders.PNG)


#### `product_prices`
Stores all the **price of each product**

![Product Prices Image](./src/assets/images/product_prices.PNG)


You can change the price of the products by **double clicking** on the value, **typing** the desired price, and **pressing** the enter key. **Refresh** the website and the changes will be reflected.

#### `products`
Stores the name of **products** that are being sold<br>
![Product Quantity Image](./src/assets/images/products_quantity.PNG)

You can change the price of the products by **double clicking** on the value, **typing** the desired quantity, and **pressing** the enter key. **Refresh** the website and the changes will be reflected.
#### API Reference



[Back To The Top](#4Hour-Fruit-Shop-Website-Coding-Challenge)

---

## My Information
[<img align="left" alt="corbynkwan" width="22px" src="https://raw.githubusercontent.com/iconic/open-iconic/master/svg/globe.svg" />](https://github.com/corbynkwan)
[<img align="left" alt="corbynkwan | LinkedIn" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />](https://www.linkedin.com/in/corbyn-kwan)
[<img align="left" alt="corbynkwan | Github" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg" />](https://github.com/corbynkwan)




<br>

[Back To The Top](#4Hour-Fruit-Shop-Website-Coding-Challenge)
