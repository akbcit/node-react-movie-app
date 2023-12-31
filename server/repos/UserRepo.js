const User = require("../models/User");

class UserRepo {
  // method to fetch user details
  async getUserDetails(username, fieldsArray) {
    console.log(
      `Fetching details for ${fieldsArray} for user ${username} from the database!`
    );
    // create projection object
    const projection = fieldsArray.reduce(
      (proj, field) => ({ ...proj, [field]: 1 }),
      {}
    );
    // find user
    try {
      const userDetails = await User.findOne(
        { username: username },
        projection
      );

      if (userDetails) {
        console.log(userDetails);
        return userDetails;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }
  // method to get user by username
  async getUserByUsername(username) {
    try {
      console.log(`Getting user: ${username} from database`);
      const user = await User.findOne({ username: username });
      return user;
    } catch (err) {
      console.log(`Unable to find user with username: ${username}`);
      return false;
    }
  }

   // method to get user by id
   async getUserById(id) {
    try {
      console.log(`Getting user: ${id} from database`);
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.log(`Unable to find user with id: ${id}`);
      return false;
    }
  }
  // method to get all users
  async getAllUsers(filter={},sortOrder = { firstName: 1, lastName: 1 }) {
    try {
      const users = await User.find(filter).sort(sortOrder);
      return users;
    } catch (err) {
      console.log(`Error while fetching users from database: ${err.message}`);
      return false;
    }
  }

  // method to get users who are clients
  async getAllClients(
    sortOrder = { firstName: 1, lastName: 1, "clientDetails.company": 1 }
  ) {
    try {
      const clients = await User.find({ "clientDetails.isClient": true }).sort(
        sortOrder
      );
      return clients;
    } catch (err) {
      console.log(`Error while fetching clients from database: ${err.message}`);
      return false;
    }
  }

  // method to create user
  async createUser(newUser,password) {
    try {
      // Register user
      console.log("registering user");
      await User.register(new User(newUser),password);  
      return `${newUser.username} created and registered successfully!`;
    } catch (err) {
      console.log(`Error while creating user: ${err}`);
      return `Error while creating user ${newUser.username}`;
    }
  }
  // method to edit user
  async editUser(username, editedUser) {
    try {
      // retrive the doc
      const userDoc = await User.findOne({ username: username });
      if (!userDoc) {
        return `Error while fetching or finding ${username}`;
      }
      // save only relevant fields
      Object.assign(userDoc, editedUser);
      // saving user doc
      console.log(`saving updated doc for ${username}`);
      await userDoc.save();
      // return success message
      return `${editedUser.username}'s records updated successfully`;
    } catch (err) {
      console.log(`Error while updating: ${err.message}`);
      return `Error while updating ${username}`;
    }
  }

  // method to delete users
  async deleteUser(username) {
    try {
      const response = await User.findOneAndDelete({ username: username });
      return response;
    } catch (err) {
      console.log(`Error while deleting ${username}: ${err.message}`);
      return false;
    }
  }
}

module.exports = UserRepo;
