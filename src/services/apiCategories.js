import supabase from "./supabase";

export default async function getAllCategories() {
  let { data, error } = await supabase.from("Categories").select("*");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return data;
}
