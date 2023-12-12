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
            : UserManager.#users[UserManager.#users.length - 1].id++,
        name,
        photo,
        email,
      };
      UserManager.#users.push(user);
      return user;
    } catch (error) {
      return error;
    }
  }
  read() {
    return UserManager.#users;
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
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Raul_Gonzalez_10mar2007.jpg/640px-Raul_Gonzalez_10mar2007.jpg",
      email: "raulgonzalez@outlook.com",
    })
  );
