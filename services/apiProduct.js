import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .single(); // بيجيب عنصر واحد فقط

  if (error) throw error;
  if (!data) throw new Error("المنتج غير موجود");

  return data;
}
