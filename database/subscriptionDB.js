import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('subscriptions.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS subscriptions (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          amount REAL NOT NULL,
          due_day INTEGER NOT NULL,
          cycle TEXT NOT NULL,
          category TEXT NOT NULL,
          status TEXT NOT NULL,
          payment_method TEXT,
          notes TEXT,
          icon TEXT,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        );`,
        [],
        () => {
          console.log('✅ Database criado com sucesso!');
          resolve();
        },
        (_, error) => {
          console.log('❌ Erro ao criar banco:', error);
          reject(error);
        }
      );
    });
  });
};

export const addSubscription = (subscription) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO subscriptions 
        (id, name, amount, due_day, cycle, category, status, payment_method, notes, icon, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          subscription.id,
          subscription.name,
          subscription.amount,
          subscription.dueDay,
          subscription.cycle,
          subscription.category,
          subscription.status,
          subscription.paymentMethod,
          subscription.notes,
          subscription.icon,
          subscription.createdAt,
          subscription.updatedAt
        ],
        (_, result) => {
          console.log('✅ Assinatura salva:', subscription.name);
          resolve(result);
        },
        (_, error) => {
          console.log('❌ Erro ao salvar:', error);
          reject(error);
        }
      );
    });
  });
};

export const getSubscriptions = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM subscriptions ORDER BY due_day ASC',
        [],
        (_, { rows }) => {
          console.log(`📊 Assinaturas encontradas: ${rows._array.length}`);
          resolve(rows._array);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const updateSubscription = (subscription) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE subscriptions SET 
        name = ?, amount = ?, due_day = ?, cycle = ?, category = ?, status = ?, 
        payment_method = ?, notes = ?, icon = ?, updated_at = ? 
        WHERE id = ?`,
        [
          subscription.name,
          subscription.amount,
          subscription.dueDay,
          subscription.cycle,
          subscription.category,
          subscription.status,
          subscription.paymentMethod,
          subscription.notes,
          subscription.icon,
          subscription.updatedAt,
          subscription.id
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteSubscription = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM subscriptions WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};