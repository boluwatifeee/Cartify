import dotenv from "dotenv";
import connectDB from "./config/db";
import Product from "./models/productModel";
import User from "./models/userModel";
import Order from "./models/orderModel";
import { users } from "./data/users";
import { products } from "./data/products";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // create users
    const createdUsers = await User.insertMany(users);
    // Only admin user can add products
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data imported successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error importing data", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("Data destroyed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error destroying data", error);
    process.exit(1);
  }
};

if (process.argv[2] === "--d") {
  destroyData();
} else {
  importData();
}
