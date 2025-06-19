import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
