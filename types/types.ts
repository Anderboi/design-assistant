export type Stage = {
  id: number;
  title: string;
  icon: React.ReactElement | null;
  href: string;
  description: string;
  is_completed?: boolean;
  updated_at?: string;
};
