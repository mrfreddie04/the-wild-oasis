import supabase, { supabaseUrl } from "./supabase";
import { BUCKET_USER_AVATARS } from "../utils/constants";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return;
}

export async function getCurrentUser() {
  //get data from local storage
  const { data: { session } = {} } = await supabase.auth.getSession();
  if (!session) {
    //no sessions - means no logged in user
    return null;
  }

  //console.log("SESSION", session);

  //get user from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  //console.log("DATA", data);
  return data?.user;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  const prevAvatar = data?.user?.user_metadata?.avatar;

  // 2. Check if avatar is provided
  if (!avatar || typeof avatar === "string") return data;

  // 3. Upload the avatar
  const avatarName = `avatar-${data.user.id}-${Math.random()}`.replaceAll("/", "");
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/${BUCKET_USER_AVATARS}/${avatarName}`;
  const { error: storageError } = await supabase.storage
    .from(BUCKET_USER_AVATARS)
    .upload(avatarName, avatar);
  if (storageError) throw new Error("User's avatar couldn't be uploaded");

  // 4. Update avatar
  const { data: updatedUser, error: avatarError } = await supabase.auth.updateUser({
    data: { avatar: avatarPath },
  });
  if (avatarError) throw new Error(error.message);

  // 5. delete old avatar
  if (prevAvatar) {
    const arrFile = prevAvatar.split("/").slice(-1);
    await supabase.storage.from(BUCKET_USER_AVATARS).remove(arrFile);
    // const { data, error } = await supabase.storage.from(BUCKET_USER_AVATARS).remove(arrFile);
    // console.log("P", arrFile, data, error);
  }

  return updatedUser;
}
