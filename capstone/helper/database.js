import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists littlelemon (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getLocalData() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from littlelemon', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveDataToLocal(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
      // Check the createTable() function above to see all the different columns the table has
      // Hint: You need a SQL statement to insert multiple rows at once.
      tx.executeSql(`insert into littlelemon (name, price, description, image, category) values ${menuItems.map((mItem) => `("${mItem.name}", "${mItem.price}", "${mItem.description}", "${mItem.image}", "${mItem.category}")`).join(", ")}`, (tx, result) => { console.log("Success"); }, error => { console.log("error"); });

    }, reject,
      resolve);
  });
}

export async function filterByQuery(query) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`select * from littlelemon where name LIKE '%${query}%'`, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function filterByCategory(categoryName) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`select * from littlelemon where category = '${categoryName}'`, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

// name LIKE '%${query}%' and category = '${categoryName}'