export default <T = Record<string, string>>(url?: string) => {
  if (!url || url.length <= 1) return {} as unknown as T;
  let params: Record<string, string> = {};
  const searchParams = new URLSearchParams(url);
  searchParams.forEach((value, key) => {
    try {
      params[key] = JSON.parse(value);
    }
    catch(error) {
      console.log(error);
    }
  });
  return (params as unknown) as T;
}
