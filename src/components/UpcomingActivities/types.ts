export interface Activity {
  crop: string;
  date: Date;
  action: string;
  reason: string;
  status: 'completed' | 'pending';
}