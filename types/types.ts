export type Stage = {
  id?: string;
  title: string;
  icon: any;
  href: string;
  description?: string;
  is_completed?: boolean;
  updated_at?: string;
  stage_status?: "blocked" | "active" | "done";
  order?: number;
  type?: "action" | "form";
  stage_blocks?: any[];
};

export type Premise = {
  id: string;
  name: string;
  order: number;
  area: number;
  project_id: string;
};
