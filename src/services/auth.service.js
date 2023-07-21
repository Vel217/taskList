import Admin from "../models/Admin.js";
import Session from "../models/Session.js";

export const login = async (loginFields) => {
  const { username, password } = loginFields;
  const admin = await Admin.findOne({
    where: { username: username, password: password },
  });
  return admin;
};

export const SessionGet = async (userId) => {
  const session = await Session.findOne({
    where: { userId: userId },
  });

  return session;
};

export const SessionCreate = async (id) => {
  const session = Session.create({ userId: id, session: true });

  return session;
};

export const SessionUpdate = async (id) => {
  const session = await Session.findOne({
    where: { userId: id },
  });

  const updateSession = { session: !session.session };
  const newSessionStatus = await session.update(updateSession);

  return newSessionStatus;
};
