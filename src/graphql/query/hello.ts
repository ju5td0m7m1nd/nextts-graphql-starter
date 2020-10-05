export const getHello = async (_parent, _args, { db }, _info) => {
  try {
    // Retrieve data and respond
    return 'Hello';
  } catch (e) {
    return false;
  }
};
