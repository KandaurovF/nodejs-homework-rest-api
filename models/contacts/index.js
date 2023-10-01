import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function getAllContacts() {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

export async function getContactById(id) {
  const contacts = await getAllContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
}

export async function addContact({ name, email, phone }) {
  const contacts = await getAllContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export async function deleteContactById(id) {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

export const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};
