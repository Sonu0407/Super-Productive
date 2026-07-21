import db from "../database/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const getMe = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, firstname, lastname, email FROM users WHERE id = $1",
      [req.userId],
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  // let take the date from the body
  try {
    const { firstname, lastname, email, password, confirm_password } = req.body;

    if (!firstname || !lastname || !email || !password || !confirm_password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // check if user already exists
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const result = await db.query(query, values);
      if (result.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
    } catch (error) {
      console.error("Database error in registerUser:", error);
      res.status(500).json({ message: "Internal server error" });
    }

    // email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    // password verification
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one letter, one number, and one special character",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedConfirmPassword = await bcrypt.hash(
      confirm_password,
      saltRounds,
    );

    // TODO : modify the navbar tomorrow

    try {
      const walletBalance = 2.0; // Initialize wallet balance for new users
      const query =
        "INSERT INTO users (firstname, lastname, email, password, confirm_password, wallet_balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING firstname, lastname, email, wallet_balance";
      const values = [
        firstname,
        lastname,
        email,
        hashedPassword,
        hashedConfirmPassword,
        walletBalance,
      ];
      const result = await db.query(query, values);
      res.status(201).json({
        message: "User registered successfully",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Database error in registerUser:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const result = await db.query(query, values);
      if (result.rows.length === 0) {
        return res.status(401).json({
          message: "Email not found. Please register first.",
        });
      }
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const {
        password: _,
        confirm_password: __,
        ...userWithoutPassword
      } = user;

      // generate token
      const token = generateToken(user.id, res);

      res
        .status(200)
        .json({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
      console.error("Error in loginUser:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWalletBalance = async (req, res) => {
  try {
    const userId = req.userId;

    try {
      const query = "SELECT wallet_balance FROM users WHERE id = $1";
      const values = [userId];
      const result = await db.query(query, values);
      console.log(result.rows[0].wallet_balance);
      res.status(200).json({ wallet_balance: result.rows[0].wallet_balance });
    } catch (error) {
      console.error("Database error in getWalletBalance:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in getWalletBalance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserWallet = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Validate input first — no point hitting the DB otherwise
    if (
      !req.body ||
      req.body.wallet_balance === undefined ||
      req.body.wallet_balance === null
    ) {
      return res
        .status(400)
        .json({ message: "Please enter the wallet_balance amount" });
    }

    const amountToAdd = Number(req.body.wallet_balance);

    if (isNaN(amountToAdd) || amountToAdd < 0) {
      return res
        .status(400)
        .json({ message: "wallet_balance must be a valid positive number" });
    }

    // 2. Fetch current balance
    const selectQuery = "SELECT wallet_balance FROM users WHERE id = $1";
    const selectResult = await db.query(selectQuery, [userId]);

    if (selectResult.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // pg returns NUMERIC/DECIMAL as strings — must parse before doing math
    const prevWalletBalance =
      parseFloat(selectResult.rows[0].wallet_balance) || 0;
    const newWalletBalance = prevWalletBalance + amountToAdd;

    // 3. Update with the new total
    const updateQuery = "UPDATE users SET wallet_balance = $1 WHERE id = $2";
    const updateResult = await db.query(updateQuery, [
      newWalletBalance,
      userId,
    ]);

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Wallet updated successfully.",
      wallet_balance: newWalletBalance,
    });
  } catch (error) {
    console.log("Error in updateUserWallet", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
