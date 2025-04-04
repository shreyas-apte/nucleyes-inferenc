export const apiUrl = (path: string) => {
  return process.env.NEXT_PUBLIC_SERVER_URL + path;
};
