import supabase, { supabaseUrl } from "./supabase";
import { BUCKET_CABIN_IMAGES } from "../utils/constants";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be deleted");
  }
};

export const createEditCabin = async (cabin, id) => {
  //console.log(cabin, id);

  //check if the image is an object or URL (string)
  const hasImagePath = typeof cabin.image === "string";
  //1. create unique image url, remove slashes - to avoid creation of folders in SP storage
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  //2. create image path
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/${BUCKET_CABIN_IMAGES}/${imageName}`;

  //3. Create cabin record - insert the cabin record into cabins table, set image field value to the expected url to the file in the storage
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  } else {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be created");
  }

  //console.log(data);

  if (!hasImagePath) {
    //4. upload image into cabin-images bucket
    const { error: storageError } = await supabase.storage
      .from(BUCKET_CABIN_IMAGES)
      .upload(imageName, cabin.image);

    //5. Delete the cabin if error uploading image
    if (storageError) {
      console.error(storageError);
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Cabin image couldn't be uploaded");
    }
  }

  return data;
};
