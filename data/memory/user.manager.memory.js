class UserManager {
  static #users = [];
  constructor() {}
  createUser({ name, photo, email, ...data }) {
    try {
      if (!name || !photo || !email) {
        throw new Error("ingrese todos los datos");
      }
      const user = {
        id:
          UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        name,
        photo,
        email,
      };
      UserManager.#users.push(user);
      return user;
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      const allUsers = UserManager.#users;
      if (allUsers.length === 0) {
        throw new Error("No hay ningun usuario");
      } else {
        return allUsers;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    return UserManager.#users.find((each) => each.id === Number(id));
  }
}

const users = new UserManager();

console.log(
  users.createUser({
    name: "Ronaldo",
    photo: "https://cdn.conmebol.com/wp-content/uploads/2018/05/r92.jpg",
    email: "ronaldonazario@outlook.com",
  })
);

console.log(
  users.createUser({
    name: "Raul",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Raul_Gonzalez_10mar2007.jpg/640px-Raul_Gonzalez_10mar2007.jpg",
    email: "raulgonzalez@outlook.com",
  })
);
