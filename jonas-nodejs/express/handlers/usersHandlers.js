import { readFileSync, writeFile } from "fs";

// USERS DATA
const users = JSON.parse(
  readFileSync(new URL("../dev-data/data/users.json", import.meta.url), "utf-8")
);

// ROUTE HANDLERS
function getAllUsers(req, res) {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
}

function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
}

function createUser(req, res) {
  const newId = users.length + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);

  writeFile(
    new URL("../dev-data/data/users.json", import.meta.url),
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { user: newUser },
      });
    }
  );
}

function updateUser(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  const updatedUser = Object.assign(user, req.body);

  writeFile(
    new URL("../dev-data/data/users.json", import.meta.url),
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: "success",
        data: { user: updatedUser },
      });
    }
  );
}

function deleteUser(req, res) {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  users.splice(userIndex, 1);

  writeFile(
    new URL("../dev-data/data/users.json", import.meta.url),
    JSON.stringify(users),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
