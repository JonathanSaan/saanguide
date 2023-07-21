"use server";

import { cookies } from "next/headers";

export async function getItem() {
  const token = cookies().get("token");
  const user = cookies().get("user");

  return { 
    token: token,
    user: user 
  };
}

export async function setItem(data) {
  cookies().set("token", data.token);
  cookies().set("user", JSON.stringify(data.user));
}

export async function deleteItem() {
  cookies().delete("token");
  cookies().delete("user");
}
