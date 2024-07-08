import bcypt from "bcrypt";
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcypt.hash(password, saltRounds);
  return hashedPassword;
};
export const comparePassword = async (password, hashedPassword) => {
  return bcypt.compare(password, hashedPassword);
};
