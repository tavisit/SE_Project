export default <T = Record<string, string>>(body?: string) => {
  if (!body) return {} as unknown as T;
  let params: Record<string, string> = {};
  try {
    params = JSON.parse(body);
  } catch (error) {
    console.log(error);
    return {} as unknown as T;
  }
  return params as unknown as T;
}
