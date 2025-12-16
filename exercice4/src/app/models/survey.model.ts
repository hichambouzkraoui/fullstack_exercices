export interface SurveyModel {
  id: string;
  name: string;
  description?: string;
  assetId?: string;
  interval?: number;
  status: 'active' | 'inactive' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}