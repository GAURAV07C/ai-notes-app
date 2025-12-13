export type Note = {
  [x: string]: string | undefined;
  id: string;
  user_id: string;
  title: string;
  content: string;
  summary: string;
  created_at: string;
  updated_at: string;
};
