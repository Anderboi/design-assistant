export type Stage = {
  id?: string;
  title: string;
  icon: any ;
  href: string;
  description?: string;
  is_completed?: boolean;
  updated_at?: string;
  stage_status?: "blocked" | "active" | "done";
  order?: number;
  type?: "action" | "form";
  stage_blocks?: any[];
};
